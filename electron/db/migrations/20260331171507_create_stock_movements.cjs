
exports.up = function(knex) {
return knex.schema.createTable('stock_movements',function(table){
    table.increments('id').primary();
    table.integer('product_id').references('p_id').inTable('products');
    table.integer('change').notNullable();
    table.string('cause').notNullable();
    table.integer('reference_id').notNullable();
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('stock_movements'); 
};
