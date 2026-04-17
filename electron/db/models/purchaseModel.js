export async function insertNewPurchase(db){

return await db.transaction(async (trx)=>{
   const [purchase_id]= await trx('purchases').insert([
    {status:'draft'}
   ]);

  const [{created_at}] = await trx('purchases').select('created_at').where('purchase_id',draftNo)
    
    return {purchase_id,created_at};
 
 
 });

}

export async function savePurchase(db,purchase,batches){
   console.log("inside purchase model and  Purchase received ",purchase ,'batches are ',batches);
    return "success";
}