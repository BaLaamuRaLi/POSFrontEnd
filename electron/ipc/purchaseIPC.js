import { ipcMain } from "electron";

export default function registerPurchaseHandler(purchaseService){
ipcMain.handle('newPurchase',()=>{
   return purchaseService.getNewPurchase();
});
ipcMain.handle('savePurchase',(event,purchase)=>{
    return purchaseService.updatePurchaseStatus(purchase);
})
} 