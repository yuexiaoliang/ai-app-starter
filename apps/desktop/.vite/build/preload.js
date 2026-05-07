'use strict';
const electron = require('electron');
electron.contextBridge.exposeInMainWorld('bridge', {
  invoke: (channel, payload) => electron.ipcRenderer.invoke(channel, payload),
});
//# sourceMappingURL=preload.js.map
