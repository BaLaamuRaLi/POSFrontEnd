
exports.up = function(knex) {
return knex.schema.createTable('purchases',function(table){
    table.increments('purchase_id').primary();
    table.integer('supplier_id').notNullable().references('party_id').inTable('parties');
    table.dateTime('invoice_date').notNullable();
    table.integer('discount').notNullable().defaultTo(0);
    table.integer('taxable').notNullable().defaultTo(0);
    table.integer('tax_amount').notNullable().defaultTo(0);
    table.boolean('is_igst').notNullable().defaultTo(false);
    table.integer('amount').notNullable().defaultTo(0);
    table.timestamps(true,true);
});
};

exports.down = function(knex) {
return knex.schema.dropTable('purchases');
};
