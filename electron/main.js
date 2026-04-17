import { app,BrowserWindow, ipcMain } from "electron";
import path from 'node:path'
import { fileURLToPath } from "node:url";
import { dialog } from "electron";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import db from "./db/index.js"
import { createAuthService } from "./services/authService.js";
import { registerAuthHandlers } from "./ipc/authIPC.js";
import { createPartyService } from "./services/partyService.js";
import { registerPartyHandlers } from "./ipc/partyIPC.js";
import registerPurchaseHandler from "./ipc/purchaseIPC.js";
import { createPurchaseService } from "./services/purchaseService.js";
import { createProductService } from "./services/productService.js";
import registerProductHandler from "./ipc/productIPC.js";

const createWindow=()=>{
    const win= new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload:path.join(__dirname,'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
        }
    })
    win.loadURL('http://localhost:5173/');
    win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))

    win.webContents.on('will-navigate', (e) => {
    e.preventDefault()
})
}

app.whenReady().then(async ()=>{
    // try {
    // await db.migrate.latest();
        
    // } catch (error) {
    //     app.quit();
    //     throw error;
    
        
    // }
    const authService= createAuthService(db);
    const partyService=createPartyService(db);
    const purchaseService=createPurchaseService(db);
    const productService=createProductService(db);
    registerAuthHandlers(authService);
    registerPartyHandlers(partyService);
    registerPurchaseHandler(purchaseService);
    registerProductHandler(productService);
    createWindow();
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length===0)createWindow()
    })
});

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin')app.quit()
})

app.on('before-quit',async()=>{
    console.log('inside before quit')
    await db.destroy();
})

// ipcMain.handle('authentication',(event,data)=>{
//     const {name,password}=data;
//     const users = {
//     Admin:["Shibu"],
//     Staff:["Mathew"]
// }

//   if((name==="Shibu"||name==="Mathew") && password==="1"){
    
//   if(users.Staff.includes(name))
//   {
//   return {islogged:true,role:"Staff",page:"Sales"};
//     }
//     else{
//     return({islogged:true,role:"Admin",page:"Dashboard"});
//     }
//   }
// });

ipcMain.handle('sales-pending',()=>{
    const pendingOrders =[
    {id:1,orderNO:"A101", orderDate:"01/01/2010",Name:"Shibu",Agent:"Harry",Amount:1000},
    {id:2,orderNO:"A102", orderDate:"23/01/2012",Name:"Henry",Agent:"Self",Amount:3000},
    {id:3,orderNO:"A103", orderDate:"23/01/2010",Name:"Isabele",Agent:"Self",Amount:200},
    {id:4,orderNO:"A104", orderDate:"23/01/2010",Name:"James",Agent:"Marry",Amount:500},
]
    return pendingOrders
});

ipcMain.handle('newSalesOrder', ()=>{
    const SalesOrders =[
    {id:1,orderNO:"A101", orderDate:"01/01/2010",Name:"Shibu",Agent:"Harry",Amount:1000,phone:"55345",gst:"GA234324",address:"london",prevBalance:0},
    {id:2,orderNO:"A102", orderDate:"23/01/2010",Name:"Henry",Agent:"Self",Amount:3000,phone:"34564356",gst:"GB376567",address:"Dubai",prevBalance:100},
    {id:3,orderNO:"A103", orderDate:"23/01/2010",Name:"Isabele",Agent:"Self",Amount:200,phone:"43545",gst:"GH435435",address:"canada",prevBalance:5},
    {id:4,orderNO:"A104", orderDate:"23/01/2010",Name:"James",Agent:"Marry",Amount:500,phone:"34534",gst:"GK345345",address:"US",prevBalance:10},
]
const digit= SalesOrders.length+1;
   const today=new Date();
   return {billNo:`A10${digit}`,date:today}
});

ipcMain.handle('saveOrder',(event,order)=>{
     console.log("order received is ",order)

    return "success";
})


    const customers =[
    {id:1,partyCode:"p1001",Name:"Shibu",phone:"55345",gst:"GA234324",address:"london",prevBalance:0},
    {id:2,partyCode:"p1002",Name:"Henry",phone:"34564356",gst:"GB376567",address:"Dubai",prevBalance:100},
    {id:3,partyCode:"p1003",Name:"Isabele",phone:"43545",gst:"GH435435",address:"canada",prevBalance:5},
    {id:4,partyCode:"p1004",Name:"James",phone:"34534",gst:"GK345345",address:"US",prevBalance:10},
]
const Agents =[
    {id:1,partyCode:"p1005",Name:"Jimmy",phone:"55345",gst:"GA234324",address:"london",prevBalance:0},
    {id:2,partyCode:"p1006",Name:"Jacob",phone:"34564356",gst:"GB376567",address:"Dubai",prevBalance:100},
    {id:3,partyCode:"p1007",Name:"Alan",phone:"43545",gst:"GH435435",address:"canada",prevBalance:5},
    {id:4,partyCode:"p1008",Name:"Varghese",phone:"34534",gst:"GK345345",address:"US",prevBalance:10},
]

const suppliers =[
    {id:1,partyCode:"p1011",Name:"F&F stores",phone:"55345",gst:"GA234324",address:"london",prevBalance:700},
    {id:2,partyCode:"p1012",Name:"M&M Agencies",phone:"34564356",gst:"GB376567",address:"Dubai",prevBalance:400},
    {id:3,partyCode:"p1013",Name:"ABC traders",phone:"43545",gst:"GH435435",address:"canada",prevBalance:500},
    {id:4,partyCode:"p1014",Name:"JB traders",phone:"34534",gst:"GK345345",address:"US",prevBalance:1000},
]

const parties = [
    {type:"Customer",accounts:customers},
    {type:"Agent",accounts:Agents},
    {type:"Supplier",accounts:suppliers}
]

// ipcMain.handle('searchParty',(event ,party)=>{
//     const {Name,type}=party;
//     const {accounts:custAccounts}= parties.find((item)=>item.type===type);
//     return custAccounts.filter((item)=>item.Name.toLowerCase().startsWith(Name.toLowerCase()))
 
// });


// ipcMain.handle('addParty',(event ,partyData)=>{

//     const {type,party}=partyData;
//      if(!Object.values(party).every(item =>item!==null && item!=="")){
//         res.json({sucess:false,message:"invalid input"})
//         throw new Error("invalid party");
//     }
//     const partyAccounts= parties.find((item)=>item.type===type);
//   if(!partyAccounts){
//     throw new Error("type not found");
    
//   }
//   party.id=partyAccounts.accounts.length+1
//   party.prevBalance=0
//   partyAccounts.accounts.push(party);
//   return {sucess:true,message:`${type} added successfully`};
// });

ipcMain.handle('show-dialog', async (event,msg,buttons)=>{
if(buttons){
    return await dialog.showMessageBox({
        type:"question",
        message:msg,
        title:"confirm",
        buttons:buttons,
    })
}
 return  await dialog.showMessageBox({message:msg})
})

// ipcMain.handle('fetch-categories',()=>{
//     const categories =[
//     "grocery","stationary","electrical"
// ];
//     return categories;
// });

// ipcMain.handle('get-product',(event,filter)=>{

//     console.log('inside getproduct',filter)
//     const inventory =[
//         {ProductCode:"PD21",HSN:"80001",ProductName:"Milk 1L Milma",unit:"no",rate:25,gstRate:18,Expirable:true,type:"milk",size:"1L",brand:"Milma",category:"grocery"}
//     ,
//         {ProductCode:"PD31",HSN:"80001",ProductName:"Milk 2L Milma",unit:"no",rate:25,gstRate:18,Expirable:true,type:"milk",size:"2L",brand:"Milma",category:"grocery"}
//     ,
//          {ProductCode:"PD23",HSN:"80001",ProductName:"Milk 1L Amul",unit:"no",rate:25,gstRate:18,Expirable:true,type:"milk",size:"1L",brand:"Amul",category:"grocery"}
//     ,
//         {ProductCode:"PD32",HSN:"80001",ProductName:"Milk 1L Amul",unit:"no",rate:25,gstRate:18,Expirable:true,type:"milk",size:"1L",brand:"Amul",category:"grocery"}
//     ,
//         {ProductCode:"PD56",HSN:"80001",ProductName:"Cheese small Amul",unit:"no",rate:25,gstRate:18,Expirable:true,type:"cheese",size:"small",brand:"Amul",category:"grocery"}
//     ,
//         {ProductCode:"PD58",HSN:"80001",ProductName:"Cheese small Milma",unit:"no",rate:25,gstRate:18,Expirable:true,type:"cheese",size:"small",brand:"Milma",category:"grocery"}
//     ,
//        {ProductCode:"PD39",HSN:"80001",ProductName:"Apple small kashmiri",unit:"no",rate:25,gstRate:18,Expirable:true,type:"apple",size:"small",brand:"kashmiri",category:"grocery"}
//     ,
//        {ProductCode:"PD33",HSN:"80001",ProductName:"Apple small kashmiri",unit:"no",rate:25,gstRate:18,Expirable:true,type:"apple",size:"large",brand:"kashmiri",category:"grocery"}
//     ,
//         {ProductCode:"PD41",HSN:"80001",ProductName:"Apple small italian",unit:"no",rate:25,gstRate:18,Expirable:true,type:"apple",size:"small",brand:"italian",category:"grocery"}
//     ,
//         {ProductCode:"PD22",HSN:"80021",ProductName:"1B pencil Apsara",unit:"no",rate:20,gstRate:18,Expirable:false,type:"pencil",size:"1B",brand:"Apsara",category:"stationary"}
//     ,
//          {ProductCode:"PD10",HSN:"80022",ProductName:"1HB pencil Apsara",unit:"no",rate:22,gstRate:18,Expirable:false,type:"pencil",size:"1HB",brand:"Apsara",category:"stationary"}
//     ,
//         {ProductCode:"PD18",HSN:"80021",ProductName:"3B pencil Apsara",unit:"no",rate:20,gstRate:18,Expirable:false,type:"pencil",size:"3B",brand:"Apsara",category:"stationary"}
//     ,
//          {ProductCode:"PD20",HSN:"80022",ProductName:"1HB pencil Nataraj",unit:"no",rate:22,gstRate:18,Expirable:false,type:"pencil",size:"1HB",brand:"Nataraj",category:"stationary"}
//     ,
//          {ProductCode:"PD35",HSN:"80022",ProductName:"1B pencil H&G",unit:"no",rate:22,gstRate:18,Expirable:false,type:"pencil",size:"1B",brand:"H&G",category:"stationary"}
//     ,
//         {ProductCode:"PD14",HSN:"80032",ProductName:"Parker pen",unit:"no",rate:30,gstRate:10,Expirable:false,type:"pen",size:"fountain",brand:"Parker",category:"stationary"}
//     ,
//         {ProductCode:"PD24",HSN:"80032",ProductName:"Cello pen",unit:"no",rate:30,gstRate:10,Expirable:false,type:"pen",size:"ball",brand:"Cello",category:"stationary"}
//     ,
//         {ProductCode:"PD74",HSN:"80032",ProductName:"Totenum pen",unit:"no",rate:30,gstRate:10,Expirable:false,type:"pen",size:"ball",brand:"Totenum",category:"stationary"}
//     ,

//         {ProductCode:"PD25",HSN:"8002",ProductName:"bulb 9w Luker",unit:"no",rate:30,gstRate:10,Expirable:false,type:"bulb",size:"9W",brand:"Luker",category:"electrical"}
//     ,
//         {ProductCode:"PD26",HSN:"8002",ProductName:"bulb 18w Luker",unit:"no",rate:30,gstRate:10,Expirable:false,type:"bulb",size:"18W",brand:"Luker",category:"electrical"}
//     ,
//         {ProductCode:"PD27",HSN:"8002",ProductName:"bulb 9w Goldmedal",unit:"no",rate:30,gstRate:10,Expirable:false,type:"bulb",size:"9W",brand:"Goldmedal",category:"electrical"}
//     ,
//         {ProductCode:"PD28",HSN:"8002",ProductName:"bulb 27w Luker",unit:"no",rate:30,gstRate:10,Expirable:false,type:"bulb",size:"27W",brand:"Luker",category:"electrical"}
//     ,
//         {ProductCode:"PD78",HSN:"8002",ProductName:"1way Switch Harison",unit:"no",rate:30,gstRate:10,Expirable:false,type:"switch",size:"1way",brand:"Harison",category:"electrical"}
//     ,
//         {ProductCode:"PD60",HSN:"8002",ProductName:"2way Switch Harison",unit:"no",rate:30,gstRate:10,Expirable:false,type:"switch",size:"2way",brand:"Harison",category:"electrical"}
//     ,
//         {ProductCode:"PD61",HSN:"8002",ProductName:"2way Switch Goldmedal",unit:"no",rate:30,gstRate:10,Expirable:false,type:"switch",size:"2way",brand:"Goldemdal",category:"electrical"}
//     ,
//         {ProductCode:"PD62",HSN:"8002",ProductName:"2way Switch Luker",unit:"no",rate:30,gstRate:10,Expirable:false,type:"switch",size:"2way",brand:"Luker",category:"electrical"}
//     ,
    
// ];
//  if(filter.ProductCode){
      
//     return  {products: inventory.filter((item)=>item.ProductCode.toLowerCase()===filter.ProductCode.toLowerCase())};
//     }
 
    

//    const products= inventory.filter(
//     (item)=>Object.entries(filter).every(
//         ([key,value])=>item[key]?.toLowerCase().includes(value.toLowerCase())
//     ));

//     const filterItems={
//         categories:[...new Set(products.map(p=>p.category))],
//         types:[...new Set(products.map(p=>p.type))],
//         sizes:[...new Set(products.map(p=>p.size))],
//         brands:[...new Set(products.map(p=>p.brand))],
//     }
//     return {products,filterItems};
// });


// ipcMain.handle('newPurchase',()=>{
//     const purchases =[
//     {id:1,billNo:"A101", date:"01/01/2010",Name:"JK Traders",Amount:1000,phone:"55345",gst:"GA234324",address:"london",prevBalance:0},
//     {id:2,billNo:"A102", date:"23/01/2010",Name:"JRK associates",Amount:3000,phone:"34564356",gst:"GB376567",address:"Dubai",prevBalance:100},
//     {id:3,billNo:"A103", date:"23/01/2010",Name:"M&M Agencies",Amount:200,phone:"43545",gst:"GH435435",address:"canada",prevBalance:5},
//     {id:4,billNo:"A104", date:"23/01/2010",Name:"Johnsons Stores",Amount:500,phone:"34534",gst:"GK345345",address:"US",prevBalance:10},
// ];
//     const digit= purchases.length+1;
//     const today=new Date();
//    return {billNo:`B10${digit}`,date:today};
// });

// ipcMain.handle('savePurchase',(event,purchase)=>{
//      console.log("Purchase received ",purchase);
//     return "success";
// })


