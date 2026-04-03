
exports.up = function(knex) {
return knex.schema.createTable('customer_transactions',function(table){
    table.increments('id').primary();
    table.integer('party_id').references('party_id').inTable('parties');
    table.integer('debit').notNullable().defaultTo(0);
    table.integer('credit').notNullable().defaultTo(0);
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('customer_transactions'); 
};
