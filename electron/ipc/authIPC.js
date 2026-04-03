import { ipcMain } from "electron";

export   function registerAuthHandlers(authService){
    ipcMain.handle('authentication', async (e,data)=>{
        return  authService.verifyUser(data);
    })
}