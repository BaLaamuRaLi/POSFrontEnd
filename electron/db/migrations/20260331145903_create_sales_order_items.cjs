
exports.up = function(knex) {
return knex.schema.createTable('sales_order_items',function(table){
    table.increments('id').primary();
    table.integer('product_id').references('p_id').inTable('products');
    table.integer('sales_order_id').references('sales_id').inTable('sales_orders');
    table.integer('quantity').notNullable();
    table.integer('rate').notNullable();
    table.integer('charges').notNullable();
    table.integer('discount').notNullable();
    table.integer('taxable').notNullable();
    table.integer('tax_rate').notNullable();
    table.integer('tax_amount').notNullable();
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('sales_order_items'); 
};
