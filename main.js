const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs-extra');
const path = require('path');

// Define paths
const preloadPath = path.join(__dirname, 'preload.js');
const userDataPath = path.join(app.getPath('userData'), 'data');

// Ensure user data directory exists
const initializeUser = () => {
	if (!fs.existsSync(userDataPath)) {
		fs.mkdirSync(userDataPath);
	}

	if (!fs.existsSync(path.join(userDataPath, 'user'))) {
		fs.mkdirSync(path.join(userDataPath, 'user'));
	}

	if (!fs.existsSync(path.join(userDataPath, 'chats'))) {
		fs.mkdirSync(path.join(userDataPath, 'chats'));
		const userDatabase = path.join(userDataPath, 'chats', 'database.json');
		fs.writeFileSync(
			userDatabase,
			JSON.stringify({
				chats: [],
			})
		);
	}
};

initializeUser();

// Function to create the main window
function createWindow() {
	const win = new BrowserWindow({
		fullscreen: true,
		minWidth: 1024,
		minHeight: 720,
		frame: false,
		webPreferences: {
			contextIsolation: true,
			preload: preloadPath,
		},
	});

	win.loadURL('http://localhost:3000');
}

// Create the main window when the app is ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// Recreate the main window when the app is activated
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// Register user and save data
ipcMain.on('register-user', (event, data) => {
	const userProfilePath = path.join(userDataPath, 'user', 'userProfile.json');
	fs.writeFileSync(userProfilePath, JSON.stringify(data));

	const imageBuffer = Buffer.from(
		data.displayImage.replace(/^data:image\/\w+;base64,/, ''),
		'base64'
	);
	const displayImagePath = path.join(userDataPath, 'user', 'userImage.jpg');

	fs.writeFileSync(displayImagePath, imageBuffer);

	event.reply('registration-successful', true);
});

// Check registration status
ipcMain.on('check-registration', (event, data) => {
	const userProfilePath = path.join(userDataPath, 'user', 'userProfile.json');

	if (fs.existsSync(userProfilePath)) {
		const userProfileData = fs.readFileSync(userProfilePath, 'utf-8');
		event.reply('registration-status', {
			registered: true,
			userProfileData,
		});
	} else {
		event.reply('registration-status', {
			registered: false,
		});
	}
});

// Logout user and delete files
ipcMain.on('logout-user', async (event, data) => {
	try {
		await fs.remove(userDataPath);
		initializeUser();
		event.reply('logout-successful');
	} catch (error) {
		console.error('Error deleting files:', error);
		event.reply('logout-error', error.message);
	}
});
