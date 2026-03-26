const {contextBridge, ipcRenderer}=require('electron')


contextBridge.exposeInMainWorld('loginApi',{
    login:(data)=>ipcRenderer.invoke('authentication',data)
})

contextBridge.exposeInMainWorld('salesApi',{
    pending:()=>ipcRenderer.invoke('sales-pending'),
    newOrder:()=>ipcRenderer.invoke('newSalesOrder'),
    submitOrder:(order)=>ipcRenderer.invoke('saveOrder',order),
});

contextBridge.exposeInMainWorld('partyApi',{
    search:(name,type)=>ipcRenderer.invoke('searchParty',name,type),
    add:(party)=>ipcRenderer.invoke('addParty',party),
})

contextBridge.exposeInMainWorld('popupApi',{
    dialogBox:(message)=>ipcRenderer.invoke('show-dialog',message)
});

contextBridge.exposeInMainWorld('productApi',{
    categories:()=>ipcRenderer.invoke('fetch-categories'),
    products:(filter)=>ipcRenderer.invoke('getProduct',filter),
});

contextBridge.exposeInMainWorld('purchaseApi',{
    new:()=>ipcRenderer.invoke('newPurchase'),
    save:(purchase)=>ipcRenderer.invoke('savePurchase',purchase),
   
})
