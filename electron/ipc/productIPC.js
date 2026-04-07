import { ipcMain } from "electron";

export default function registerProductHandler(productService){
    ipcMain.handle('fetch-categories',()=>{
        return productService.getCategories();
    });
     ipcMain.handle('fetch-types',()=>{
        return productService.gettypes();
    });
     ipcMain.handle('fetch-sizes',()=>{
        return productService.getsizes();
    });
     ipcMain.handle('fetch-brands',()=>{
        return productService.getbrands();
    });
     ipcMain.handle('fetch-units',()=>{
        return productService.getUnits();
    });
     ipcMain.handle('fetch-taxes',()=>{
        return productService.getTaxes();
    });
     ipcMain.handle('add-product',(event,product)=>{
        return productService.addProduct(product);
    });
    ipcMain.handle('get-product',(event,filter)=>{
        return productService.getProduct(filter)
    });
} 