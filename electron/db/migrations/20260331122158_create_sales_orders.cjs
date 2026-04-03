
exports.up = function(knex) {
return knex.schema.createTable('sales_orders',function(table){
    table.increments('sales_id').primary();
    table.string('order_no').notNullable();
    table.string('invoice_no');
    table.integer('customer_id').references('party_id').inTable('parties');
    table.integer('agent_id').references('party_id').inTable('parties');
    table.integer('discount').notNullable().defaultTo(0);
    table.integer('amount').notNullable().defaultTo(0);
    table.string('payment_status').notNullable().defaultTo("");
    table.string('shipping_address').notNullable().defaultTo("");
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('sales_orders'); 
};
