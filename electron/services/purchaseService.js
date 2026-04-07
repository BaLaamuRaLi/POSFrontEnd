import { insertNewPurchase } from "../db/models/purchaseModel.js"

export function createPurchaseService(db){
    return {
        getNewPurchase:async ()=>{
          return await insertNewPurchase(db);
        }
    }

}