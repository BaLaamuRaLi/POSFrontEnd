
exports.up = function(knex) {
return knex.schema.createTable('sales_returns',function(table){
    table.increments('id').primary();
    table.integer('sales_id').references('sales_id').inTable('sales_orders');
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('sales_returns'); 
};
