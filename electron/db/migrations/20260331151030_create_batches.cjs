
exports.up = function(knex) {
return knex.schema.createTable('batches',function(table){
    table.increments('batch_id').primary();
    table.integer('product_id').references('p_id').inTable('products');
    table.integer('purchase_id').references('purchase_id').inTable('purchases');
    table.integer('batch_no').notNullable().defaultTo(1);
    table.date('expiry_date');
    table.integer('cost').notNullable().defaultTo(0);
    table.integer('rate').notNullable().defaultTo(0);
    table.integer('stock').notNullable().defaultTo(0);
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('batches'); 
};
