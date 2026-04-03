
exports.up = function(knex) {
return knex.schema.createTable('purchase_returns',function(table){
    table.increments('id').primary();
    table.integer('purchase_id').references('purchase_id').inTable('purchases');
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('purchase_returns'); 
};
