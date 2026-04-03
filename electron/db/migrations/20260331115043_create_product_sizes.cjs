
exports.up = function(knex) {
return knex.schema.createTable('product_sizes',function(table){
    table.increments('size_id').primary();
    table.string('product_size').notNullable();
    table.timestamps(true,true);

});
};

exports.down = function(knex) {
return knex.schema.dropTable('product_sizes');
};
