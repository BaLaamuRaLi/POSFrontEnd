export async function fetchProducts(db,filter) {
   const filters= Object.fromEntries(
        Object.entries(filter).filter(
            ([_,value])=>value!==null&&value!==""
        )
    )
    if(Object.keys(filters).length===0)return; 
    console.log('inside fetch product and filter is ',filter);
 const {ProductCode,ProductName,type,size,brand,category}=filter;

 
const baseQuery=db('products as p')
  .leftJoin('product_batches as b','p.p_id','b.product_id')
  .innerJoin('units as u','p.unit_id','u.u_id')
  .innerJoin('gst as g','p.gst_id','g.gst_id')
  .innerJoin('product_categories as c','p.category','c.cat_id')
  .innerJoin('product_types as t','p.type','t.type_id')
  .innerJoin('product_sizes as s','p.size','s.size_id')
  .innerJoin('product_brands as br','p.brand','br.id')
 
  .modify ((q)=>{
    if(ProductCode) {
        q.where('p.product_code',ProductCode);
        return;
    }
    if(category){
    q.where('c.product_category',category)
    
    }

    if(type){  
    q.where('t.product_type',type)
    }
    if(size){
        q.where('s.product_size',size)

    }
    if(brand) {
        q.where('br.brand',brand)

    }
    
    
    if(ProductName){
   q.where('p.product_name','like', `%${ProductName}%`)
    }
    })
  
  const [products,categories,types,sizes,brands]= await Promise.all([  
    baseQuery.clone().select(
  'p.p_id as productID',
  'p.product_code as ProductCode',
  'p.product_name as ProductName',
  'p.hsn_code as HSN',
  'u.unit',
  'b.cost',
  'b.price',
  'g.gst_value as gstRate',
  'b.stock',
  'p.profit_margin as profit',
  'b.expiry_date as expiry',
  'c.product_category as category',
  't.product_type as type',
  's.product_size as size',
  'br.brand',
  'p.isExpirable',
  
  ),
    baseQuery.clone().distinct('c.product_category'),
    baseQuery.clone().distinct('t.product_type'),
    baseQuery.clone().distinct('s.product_size'),
    baseQuery.clone().distinct('br.brand'),
  ])

    const filterItems={
        categories:categories.map((c)=>c.product_category),
        types:types.map((t)=>t.product_type),
        sizes:sizes.map((s)=>s.product_size),
        brands:brands.map((b)=>b.brand),
    }
    return {products:products,filterItems:filterItems};

}

export async function fetchCategories(db){

return  await db('product_categories').select('product_category');

}

export async function fetchTypes(db) { 
return await db('product_types').select('product_type');

}
export async function fetchSize(db) { 
return await db('product_sizes').select('product_size');

}
export async function fetchBrands(db) { 
return await db('product_brands').select('brand');

}
export async function fetchUnits(db) { 
return await db('units').select('u_id','unit');
}
export async function fetchTaxes(db) { 
return await db('gst').select('gst_id','gst_category','gst_value');

}

export async function  insertProduct (db,product) {

const {
            productCode,
            productName,
            hsn,
            tax,
            unit,
            isExpirable,
            category,
            type,
            size,
            brand,

        } =product;

async function getID( trx,table,column,condition_col,valToInsert){
    let row;
    const value=valToInsert.toLowerCase();
    row = await trx(table).select(column)
    .where(condition_col,value)
    .first(); 

    if(row){
        return row[column];
    }

 
    await trx(table).insert({
        [condition_col]:value
    })
    .onConflict(condition_col)
  .ignore();;

  const insertedRow= await trx(table).select(column)
  .where(condition_col,value)
  .first();

  if (!insertedRow) {
  throw new Error(`Failed to get or create ${table}`);
    }
    
    
    return insertedRow[column];
}


        
await db.transaction(async (trx)=>{
   
   const [{gst_id}]= await trx('gst').select('gst_id').where('gst_category',tax);
  const brandID =  await getID(trx,'product_brands','id','brand',brand)
 const categoryID= await getID (trx,'product_categories','cat_id','product_category',category); 

 const sizeID= await getID(trx,'product_sizes','size_id','product_size',size);
 
 const typeID= await getID(trx,'product_types','type_id','product_type',type); 
  
 
 const [{u_id}]= await trx('units').select('u_id').where('unit',unit); 


            
   await trx('products').insert([
    {product_code:productCode,
      product_name:productName,
      hsn_code:hsn,
      unit_id:u_id,
      gst_id:gst_id,
      category:categoryID,
      type:typeID ,
      size:sizeID ,
      brand:brandID ,
      isExpirable:isExpirable}
   ]); 
  
  

  })
    
 


  
}