/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import dotenv from "dotenv/config"
import bcrypt from "bcrypt";
export async function seed(knex) {
  // Deletes ALL existing entries
 
 const apple_key=await bcrypt.hash(process.env.apple_password,10);
 const orange_key=await bcrypt.hash(process.env.orange_password,10);
 
  
 await knex.transaction(async (trx)=>{

  await trx('users').del()
   await trx('users').insert([
   {user_name:'apple',key:apple_key},
   {user_name:'orange',key:orange_key},
   ]);
 
await trx('units').del()
 await trx('units').insert([
   {unit:'kg'},
   {unit:'pcs'},
   {unit:'mtr'},
   {unit:'gm'},
   {unit:'nos'},
 ]);

  await trx('brands').del()
 await trx('brands').insert([
   {brand:'milma'},
   {brand:'amul'},
 
 ]);
 
  await trx('gst').del()
 await trx('gst').insert([
   {gst_value:18,gst_category:"18%"},
   {gst_value:40,gst_category:"40%"},
   {gst_value:5,gst_category:"5%"},
   
 
 ]);
 
  await trx('product_types').del()
 await trx('product_types').insert([
   {product_type:'milk'},
   {product_type:'apple'},
 
 ]);
 
 await trx('product_sizes').del();
 await trx('product_sizes').insert([
   {product_size:'1L'},
   {product_size:'2L'},
 ]);
 
 await trx('product_categories').del();
 await trx('product_categories').insert([
   {product_category:'grocery'},
   {product_category:'stationary'},
 ]);
 
  await trx('products').del();
  await trx('products').insert([
       {product_code:"PD21",hsn_code:"80001",product_name:"Milk 1L Milma",unit_id:2,gst_id:1,isExpirable:true,type:1,size:1,brand:1,category:1}
         ,
             {product_code:"PD31",hsn_code:"80001",product_name:"Milk 2L Milma",unit_id:2,gst_id:1,isExpirable:true,type:1,size:2,brand:1,category:1}
         ,
             {product_code:"PD23",hsn_code:"80001",product_name:"Milk 1L Amul",unit_id:2,gst_id:1,isExpirable:true,type:1,size:1,brand:2,category:1}
         ,
             {product_code:"PD32",hsn_code:"80001",product_name:"Milk 1L Amul",unit_id:2,gst_id:1,isExpirable:true,type:1,size:1,brand:2,category:1}
 
   ])



 
 
 });
 
}
