
exports.up = function(knex) {
return knex.schema.createTable('purchase_items',function(table){
    table.increments('pur_item_id').primary();
    table.integer('invoice_id').references('purchase_id').inTable('purchases');
    table.integer('product_id').references('p_id').inTable('products');
    table.integer('quantity').notNullable();
    table.integer('rate').notNullable();
    table.integer('discount').notNullable();
    table.integer('discount2').notNullable();
    table.integer('discount3').notNullable();
    table.integer('discount4').notNullable();
    table.integer('taxable').notNullable();
    table.integer('cgst').notNullable();
    table.integer('sgst').notNullable();
    table.integer('igst').notNullable();
    table.integer('total').notNullable();
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('purchase_items'); 
};
