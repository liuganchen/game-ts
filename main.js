// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./dist/index.html').then(r => console.log(r))
    win.webContents.openDevTools({
        mode: 'right'
    });
}
// 自动打开调试台

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
