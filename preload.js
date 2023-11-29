// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
ipcRenderer.send('check-registration');
ipcRenderer.send('set-hostip');

ipcRenderer.on('registration-status', (event, data) => {
	contextBridge.exposeInMainWorld('userData', data);
});

ipcRenderer.once('server-on', (event, data) => {
	contextBridge.exposeInMainWorld('serverData', data.trim());
});

ipcRenderer.once('set-server', (event, data) => {
	contextBridge.exposeInMainWorld('serverData', data);
});

ipcRenderer.once('set-hostip', (event, data) => {
	contextBridge.exposeInMainWorld('localIPAddress', data);
});
