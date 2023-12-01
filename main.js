const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

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
		fs.writeFileSync(userDatabase, JSON.stringify({}));
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
			// devTools: false,
			contextIsolation: true,
			preload: preloadPath,
		},
		icon: '/assets/icon.png',
	});
	// if (process.env.NODE_ENV === 'development') {
	// 	win.loadURL('http://localhost:3000');
	// } else {
	// 	win.loadFile('./build/index.html');
	// }
	win.loadURL('http://localhost:3000');

	globalShortcut.register('CommandOrControl+R', () => {
		// Do nothing or show a message to indicate the shortcut is disabled
		console.log('Refresh shortcut is disabled');
	});
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

app.on('will-quit', () => {
	globalShortcut.unregisterAll();
});

// Register user and save data
ipcMain.on('register-user', (event, data) => {
	const userProfilePath = path.join(userDataPath, 'user', 'userProfile.json');
	const stringifyData = JSON.stringify(data);
	fs.writeFileSync(userProfilePath, stringifyData);

	const imageBuffer = Buffer.from(
		data.displayImage.replace(/^data:image\/\w+;base64,/, ''),
		'base64'
	);
	const displayImagePath = path.join(userDataPath, 'user', 'userImage.jpg');

	fs.writeFileSync(displayImagePath, imageBuffer);

	event.reply('registration-successful', {
		registered: true,
		userProfileData: stringifyData,
		ownerUsername: data.username,
	});
});

let ownerUsername = '';
// Check registration status
ipcMain.on('check-registration', (event, data) => {
	const userProfilePath = path.join(userDataPath, 'user', 'userProfile.json');

	if (fs.existsSync(userProfilePath)) {
		const userProfileData = fs.readFileSync(userProfilePath, 'utf-8');
		ownerUsername = JSON.parse(userProfileData).username;
		event.reply('registration-status', {
			registered: true,
			userProfileData,
			ownerUsername,
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
		event.reply('logout-successful', { registered: false });
	} catch (error) {
		console.error('Error deleting files:', error);
		event.reply('logout-error', error.message);
	}
});

// Messaging Server

ipcMain.on('set-server', (event, data) => {
	event.reply('set-server', data);
});

let serverProcess;

ipcMain.on('start-server', (event) => {
	serverProcess = spawn('node', [
		'server.js',
		ownerUsername,
		path.join(app.getPath('userData'), 'data'),
	]);

	serverProcess.stdout.on('data', (data) => {
		event.reply('server-up', data.toString());
	});

	serverProcess.on('close', (code) => {
		console.log(`Server process exited with code ${code}`);
		event.reply('server-down', code);
	});
});

ipcMain.on('stop-server', (event) => {
	if (serverProcess) {
		serverProcess.kill();
		serverProcess = null;
		event.reply('server-stopped');
		console.log(`Server was stopped`);
	} else {
		event.reply('server-not-running');
	}
});

ipcMain.on('set-hostip', (event) => {
	event.reply('set-hostip', getLocalIPAddress());
});

const getLocalIPAddress = () => {
	const interfaces = os.networkInterfaces();
	for (const name in interfaces) {
		for (const net of interfaces[name]) {
			if (net.family === 'IPv4' && !net.internal) {
				return net.address;
			}
		}
	}
};
