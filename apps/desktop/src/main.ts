import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { createDb } from '@repo/core/db';
import { createApp } from '@repo/server/app';

// Set database path to Electron's userData directory
const userDataPath = app.getPath('userData');
const dbUrl = `file:${path.join(userDataPath, 'app.db')}`;

// Create database and app instances
const { db, sqlite } = createDb(dbUrl);
const honoApp = createApp(db, {
  onSyncError: () => {
    // Silently ignore models.dev sync failures in desktop mode
    // (user may be offline or behind a firewall)
  },
});

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
    mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
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

// IPC handler: forward renderer requests to the local Hono app
ipcMain.handle(
  'rpc',
  async (_event, req: { method: string; url: string; params?: unknown; body?: unknown }) => {
    const urlObj = new URL(req.url, 'http://localhost');

    if (req.params && typeof req.params === 'object') {
      for (const [k, v] of Object.entries(req.params)) {
        if (v !== undefined && v !== null) {
          urlObj.searchParams.set(k, String(v));
        }
      }
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const honoReq = new Request(urlObj.toString(), {
      method: req.method,
      headers,
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    const res = await honoApp.fetch(honoReq);
    return res.json();
  }
);
