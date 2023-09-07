// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
ipcRenderer.send('check-registration');

ipcRenderer.on('registration-status', (event, data) => {
	contextBridge.exposeInMainWorld('userData', data);
});
