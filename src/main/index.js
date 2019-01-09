'use strict';

import { createLocalStore } from './../renderer/utils/localStore';
import { app, BrowserWindow, Tray, Menu, ipcMain } from 'electron';

const path = require('path');
const localStorage = createLocalStore();

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow, tray;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 563,
    fullscreenable: false,
    useContentSize: true,
    width: 1000,
    frame: false
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

app.on('ready', () => {
  createWindow();
  const minToTray = localStorage.get('minToTray');
  if (minToTray) {
    createTray();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('window-close', (event, arg) => {
  mainWindow.close();
});

ipcMain.on('window-minimize', (event, arg) => {
    mainWindow.minimize();
});

function createTray() {
  tray = new Tray(path.join(__static, 'icon.png'));
  tray.setToolTip('Minerity-Report\nClick to Restore');
  tray.setContextMenu(Menu.buildFromTemplate([
    { role: 'quit'}
  ]));

  tray.on('click', () => {
    mainWindow.show();
  });

  tray.on('right-click', () => {
    tray.popUpContextMenu();
  });

}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
