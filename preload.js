// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
ipcRenderer.send('check-registration');
ipcRenderer.send('set-hostip');

ipcRenderer.on('registration-status', (event, data) => {
	contextBridge.exposeInMainWorld('userData', data);
});

ipcRenderer.on('server-up', (event, data) => {
	contextBridge.exposeInMainWorld('serverData', data.trim());
});

ipcRenderer.on('set-server', (event, data) => {
	contextBridge.exposeInMainWorld('serverData', data);
});

ipcRenderer.on('set-hostip', (event, data) => {
	contextBridge.exposeInMainWorld('localIPAddress', data);
});
