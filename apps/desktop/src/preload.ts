import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('bridge', {
  invoke: <T>(channel: string, payload: unknown): Promise<T> =>
    ipcRenderer.invoke(channel, payload),
});
