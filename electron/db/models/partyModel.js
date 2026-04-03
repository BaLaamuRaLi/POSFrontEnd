export async function insertParty(db,partyData){

    const {type,party}=partyData;
    const { partyCode,Name ,gst ,address ,phone} = party;
 try {
    await db.transaction(async (trx)=>{
    
    const [{type_id}]= await trx('party_types').where({party_type:type.toLowerCase()}).select('type_id')
    
    console.log('type id is ',type_id);
    const [party_id] = await trx('parties').insert([
        {code:partyCode, name:Name,gst_no:gst,address:address,phone:phone},
    ]);

    await trx('party_roles').insert([
        { party_id:party_id,type_id:type_id},
    ]);
    });
    
 } catch (error) {
    throw new Error(`cannot add ${type} ,error:`,error);
    
 }
  return {sucess:true,message:`${type} added successfully`};
}


export async function getParty(db,party) {
 const {Name,type}=party;
 console.log('party is ',party)
 const res= await  db('party_roles as r')
 .join('parties as p','p.party_id','r.party_id')
 .join('party_types as t','t.type_id','r.type_id')
 .where('t.party_type',type.toLowerCase())
 .whereRaw('p.name LIKE ? COLLATE NOCASE', [`%${Name}%`])
 .select('p.*')

 console.log ('resutl is ',res);
 return res;
}