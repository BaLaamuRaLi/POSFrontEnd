import { ipcMain } from "electron";

export default function registerPurchaseHandler(purchaseService){
ipcMain.handle('newPurchase',()=>{
   return purchaseService.getNewPurchase();
});
}