
exports.up = function(knex) {
return knex.schema.createTable('product_categories',function(table){
    table.increments('cat_id').primary();
    table.string('product_category').notNullable();
    table.timestamps(true,true);
});
};

exports.down = function(knex) {
return knex.schema.dropTable('product_categories');
};
