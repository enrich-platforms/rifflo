// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
ipcRenderer.send('check-registration');

ipcRenderer.on('registration-status', (event, data) => {
	contextBridge.exposeInMainWorld('userData', data);
});

// if (!window.serverData) {
// 	ipcRenderer.on('server-on', (event, data) => {
// 		contextBridge.exposeInMainWorld('serverData', data.trim());
// 	});
// }

ipcRenderer.on('set-server', (event, data) => {
	contextBridge.exposeInMainWorld('serverData', data);
});
