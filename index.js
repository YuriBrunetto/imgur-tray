'use strict'

const { app, Tray, Menu, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(__dirname)

const assetsDirectory = path.join(__dirname, 'assets')

let tray = null
let _window = null

app.dock.hide()

app.on('ready', () => {
  createTray()
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'icon.png'))

  tray.on('double-click', toggleWindow)
  tray.on('right-click', toggleWindow)
  tray.on('click', (event) => {
    toggleWindow()

    if (_window.isVisible() && process.defaultApp && event.metaKey) {
      _window.openDevTools({ mode: 'detach' })
    }
  })
}

const createWindow = () => {
  _window = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: true,
    transparent: false,
    webPreferences: {
      backgroundThrottling: true
    }
  })

  _window.loadURL(`file://${path.join(__dirname, 'index.html')}`)
}

const toggleWindow = () => {
  if (_window.isVisible()) {
    _window.hide()
  } else {
    showWindow()
  }
}

const getWindowPosition = () => {
  const windowBounds = _window.getBounds()
  const trayBounds = tray.getBounds()

  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return { x: x, y: y }
}

const showWindow = () => {
  const position = getWindowPosition()
  _window.setPosition(position.x, position.y, false)
  _window.show()
  _window.focus()
}
