const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const preloadPath = path.join(__dirname, 'preload.js'); // Adjust the path to go up one level

function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		// frame: false,
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			preload: preloadPath,
		},
	});

	// Load the index.html from a URL
	win.loadURL('http://localhost:3000');

	// Open the DevTools.
	win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.

	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

const userDataPath = path.join(app.getPath('userData'), 'user-data.json');

ipcMain.on('register-user', (event, data) => {
	// Save the registration data and image to a file
	fs.writeFileSync(userDataPath, JSON.stringify(data));
	// console.log(data);
	// You can send a response back to the renderer process if needed
	event.reply('registration-successful', true);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
