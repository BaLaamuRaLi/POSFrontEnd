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
        types:()=>ipcRenderer.invoke('fetch-types'),
        sizes:()=>ipcRenderer.invoke('fetch-sizes'),
        brands:()=>ipcRenderer.invoke('fetch-brands'),
        units:()=>ipcRenderer.invoke('fetch-units'),
        taxes:()=>ipcRenderer.invoke('fetch-taxes'),
        products:(filter)=>ipcRenderer.invoke('get-product',filter),
        addProduct:(product)=>ipcRenderer.invoke('add-product',product),
    },
    popup:{
        dialogBox:(message,buttons)=>ipcRenderer.invoke('show-dialog',message,buttons)
    }

});

