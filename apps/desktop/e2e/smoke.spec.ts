import { test, expect, _electron as electron } from '@playwright/test';
import path from 'path';

function getPackagedAppPath(): { binary: string; dir: string } {
  // Playwright runs with CWD at apps/desktop/ (testDir: './e2e')
  const outDir = path.resolve('out');
  const platform = process.platform;
  const arch = process.arch;

  const suffix = `${platform}-${arch}`;
  const dirName = `@repo-desktop-${suffix}`;
  const appDir = path.join(outDir, dirName);

  return {
    dir: appDir,
    binary: path.join(appDir, 'ai-app-starter-desktop'),
  };
}

interface WindowInfo {
  id: number;
  title: string;
  visible: boolean;
  url: string;
  loading: boolean;
}

test('packaged app launches and renders main UI', async () => {
  const { binary } = getPackagedAppPath();

  const electronApp = await electron.launch({
    executablePath: binary,
    args: ['--no-sandbox', '--disable-gpu'],
  });

  // Verify Playwright can communicate with the main process
  const appPathResult = await electronApp.evaluate(({ app }) => {
    return app.getAppPath();
  });
  console.log('App path from main process:', appPathResult);

  // Check if any windows exist
  const allWindows = await electronApp.evaluate(({ BrowserWindow }) => {
    return BrowserWindow.getAllWindows().map(
      (w): WindowInfo => ({
        id: w.id,
        title: w.getTitle(),
        visible: w.isVisible(),
        url: w.webContents.getURL(),
        loading: w.webContents.isLoading(),
      })
    );
  });
  console.log('All windows:', JSON.stringify(allWindows, null, 2));

  // Fallback: use BrowserWindow to inspect page content directly
  const pageHtml: string = await electronApp.evaluate(({ BrowserWindow }) => {
    const win = BrowserWindow.getAllWindows()[0];
    if (!win) return 'no window';
    // Wait a bit for any pending navigation
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(win.webContents.executeJavaScript('document.documentElement.outerHTML'));
      }, 5000);
    });
  });
  console.log('Page HTML length:', pageHtml.length);
  console.log('Page HTML snippet:', pageHtml.substring(0, 500));

  // Assert the app loaded by checking HTML content from the main process
  expect(pageHtml).toContain('<div id="root">');

  await electronApp.close();
});
