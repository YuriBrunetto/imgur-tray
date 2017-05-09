const { app, Tray, Menu, BrowserWindow } = require('electron')
const path = require('path')

const iconPath = path.join(__dirname, 'img/icon.png')
let appIcon = null
let win = null
