
exports.up = function(knex) {
return knex.schema.createTable('sales_return_items',function(table){
    table.increments('id').primary();
    table.integer('return_id').references('id').inTable('sales_returns');
    table.integer('product_id').references('p_id').inTable('products');
    table.integer('quantity').notNullable();
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('sales_return_items'); 
};
