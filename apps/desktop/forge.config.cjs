const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');

/**
 * Copies native (or native-dependent) packages from the monorepo's
 * hoisted node_modules into the packaged app's node_modules.
 *
 * In pnpm workspaces, transitive dependencies may not be resolvable
 * by Electron Forge's built-in prune logic. This hook ensures
 * better-sqlite3 and its dependency chain are available at runtime.
 */
async function copyNativeModules(forgeConfig, buildPath) {
  const { cp, mkdir, readFile, stat, writeFile } = require('fs/promises');

  const nativePackages = ['better-sqlite3', 'bindings', 'file-uri-to-path'];

  // Search for packages in both local and root node_modules (hoisted)
  const searchPaths = [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '../../node_modules'),
  ];

  const destNodeModules = path.resolve(buildPath, 'node_modules');

  for (const pkg of nativePackages) {
    let src = null;
    for (const searchPath of searchPaths) {
      const candidate = path.join(searchPath, pkg);
      try {
        await stat(candidate);
        src = candidate;
        break;
      } catch {
        // not found here, continue searching
      }
    }

    if (src) {
      const dest = path.join(destNodeModules, pkg);
      await mkdir(path.dirname(dest), { recursive: true });
      await cp(src, dest, { recursive: true, dereference: true, preserveTimestamps: true });
    }
  }

}

module.exports = {
  packagerConfig: {
    asar: {
      unpack: '**/{*.node,better-sqlite3/**,bindings/**,file-uri-to-path/**,.vite/renderer/**}',
    },
    prune: true,
    executableName: 'ai-app-starter-desktop',
  },
  rebuildConfig: {
    onlyModules: ['better-sqlite3'],
  },
  hooks: {
    packageAfterCopy: copyNativeModules,
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          bin: 'ai-app-starter-desktop',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          bin: 'ai-app-starter-desktop',
        },
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        build: [
          {
            entry: 'src/main.ts',
            config: 'vite.main.config.ts',
            target: 'main',
          },
          {
            entry: 'src/preload.ts',
            config: 'vite.preload.config.ts',
            target: 'preload',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.ts',
          },
        ],
      },
    },
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      // Required to be true so Playwright can attach to the app for E2E tests.
      [FuseV1Options.EnableNodeCliInspectArguments]: true,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
      [FuseV1Options.GrantFileProtocolExtraPrivileges]: false,
    }),
  ],
};
