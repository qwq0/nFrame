const { app, BrowserWindow, Menu } = require("electron");

function createWindow()
{
    const win = new BrowserWindow({
        width: 800,
        height: 500
    });

    win.loadFile("./index.html");
    win.webContents.openDevTools();
}

app.whenReady().then(() =>
{
    createWindow();
    Menu.setApplicationMenu(null);
})