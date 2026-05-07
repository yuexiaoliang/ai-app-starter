import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { createDb, bootstrapDb } from '@repo/core/db';
import { createTaskHandlers, createProviderHandlers } from '@repo/core/handlers';
import { taskContract, providerContract, bindContractToIpc } from '@repo/contracts';

// Set database path to Electron's userData directory
const userDataPath = app.getPath('userData');
const dbUrl = `file:${path.join(userDataPath, 'app.db')}`;

// Create database and ensure schema exists
const { db, sqlite } = createDb(dbUrl);
bootstrapDb(sqlite);

// Register IPC handlers via contracts (no HTTP server)
const taskHandlers = createTaskHandlers(db);
const providerHandlers = createProviderHandlers(db);

bindContractToIpc(ipcMain, taskContract, taskHandlers, 'tasks');
bindContractToIpc(ipcMain, providerContract, providerHandlers, 'providers');

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  // Load frontend
  if (!app.isPackaged) {
    void mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL!);
    mainWindow.webContents.openDevTools();
  } else {
    void mainWindow.loadFile(
      path.join(
        process.resourcesPath,
        'app.asar.unpacked',
        '.vite',
        'renderer',
        String(MAIN_WINDOW_VITE_NAME),
        'index.html'
      )
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

void app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  sqlite.close();
});
