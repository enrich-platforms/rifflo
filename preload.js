// preload.js
const { contextBridge, ipcRenderer, webFrame } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
ipcRenderer.send('check-registration');
ipcRenderer.send('set-hostip');

ipcRenderer.on('registration-status', (event, data) => {
	webFrame.executeJavaScript(`
    window.userData = ${JSON.stringify(data)};
  `);
});

ipcRenderer.on('registration-successful', (event, data) => {
	webFrame.executeJavaScript(`
    window.userData = ${JSON.stringify(data)};
  `);
});
ipcRenderer.on('logout-successful', (event, data) => {
	webFrame.executeJavaScript(`
    window.userData = ${JSON.stringify(data)};
  `);
});

ipcRenderer.on('server-up', (event, data) => {
	webFrame.executeJavaScript(`
    window.serverData = ${JSON.stringify(data).trim()};
  `);
	// contextBridge.exposeInMainWorld('serverData', data.trim());
});

ipcRenderer.on('set-server', (event, data) => {
	webFrame.executeJavaScript(`
    window.serverData = ${JSON.stringify(data).trim()};
  `);
	// contextBridge.exposeInMainWorld('serverData', data);
});

ipcRenderer.on('set-hostip', (event, data) => {
	webFrame.executeJavaScript(`
	    window.localIPAddress = ${JSON.stringify(data).trim()};
	  `);
	// contextBridge.exposeInMainWorld('localIPAddress', data);
});
