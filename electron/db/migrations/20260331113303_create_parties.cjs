exports.up = function(knex) {
return  knex.schema.createTable('parties',function(table){
    table.increments('party_id').primary();
    table.string('code').notNullable();
    table.string('name').notNullable();
    table.string('gst_no').notNullable().defaultTo("");
    table.string('address').notNullable().defaultTo("");
    table.string('phone').notNullable().defaultTo("");
    table.timestamps(true,true);
});
};

exports.down = function(knex) {
return knex.schema.dropTable('parties');
};
