const {contextBridge, ipcRenderer}=require('electron')


contextBridge.exposeInMainWorld('api',{
   auth: {
        login:(data)=>ipcRenderer.invoke('authentication',data)
    },
   sales:{ 
        pending:()=>ipcRenderer.invoke('sales-pending'),
        newOrder:()=>ipcRenderer.invoke('newSalesOrder'),
        submitOrder:(order)=>ipcRenderer.invoke('saveOrder',order),
    },
    purchase:{
        new:()=>ipcRenderer.invoke('newPurchase'),
        save:(purchase)=>ipcRenderer.invoke('savePurchase',purchase),
    },
    party:{
        search:(party)=>ipcRenderer.invoke('searchParty',party),
        add:(party)=>ipcRenderer.invoke('addParty',party),
    },
    product:{
        categories:()=>ipcRenderer.invoke('fetch-categories'),
        products:(filter)=>ipcRenderer.invoke('getProduct',filter),
    },
    popup:{
        dialogBox:(message,buttons)=>ipcRenderer.invoke('show-dialog',message,buttons)
    }

});

// contextBridge.exposeInMainWorld('salesApi',{
//     pending:()=>ipcRenderer.invoke('sales-pending'),
//     newOrder:()=>ipcRenderer.invoke('newSalesOrder'),
//     submitOrder:(order)=>ipcRenderer.invoke('saveOrder',order),
// });

// contextBridge.exposeInMainWorld('partyApi',{
//     search:(party)=>ipcRenderer.invoke('searchParty',party),
//     add:(party)=>ipcRenderer.invoke('addParty',party),
// })

// contextBridge.exposeInMainWorld('popupApi',{
//     dialogBox:(message)=>ipcRenderer.invoke('show-dialog',message)
// });

// contextBridge.exposeInMainWorld('productApi',{
//     categories:()=>ipcRenderer.invoke('fetch-categories'),
//     products:(filter)=>ipcRenderer.invoke('getProduct',filter),
// });

// contextBridge.exposeInMainWorld('purchaseApi',{
//     new:()=>ipcRenderer.invoke('newPurchase'),
//     save:(purchase)=>ipcRenderer.invoke('savePurchase',purchase),
   
// })
