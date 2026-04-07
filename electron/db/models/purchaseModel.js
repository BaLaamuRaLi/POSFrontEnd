export async function insertNewPurchase(db){

return await db.transaction(async (trx)=>{
   const [draftNo]= await trx('purchases').insert([
    {status:'draft'}
   ]);

  const [{created_at}] = await trx('purchases').select('created_at').where('purchase_id',draftNo)
    
    return {
      billNo: `A0${draftNo}`,
      date:created_at
    };
 
 
 });



}