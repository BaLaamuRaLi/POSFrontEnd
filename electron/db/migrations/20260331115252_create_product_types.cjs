
exports.up = function(knex) {
return knex.schema.createTable('product_types',function(table){
    table.increments('type_id').primary();
    table.string('product_type').notNullable();
    table.timestamps(true,true);

});
};

exports.down = function(knex) {
return knex.schema.dropTable('product_types');
};
