
exports.up = function(knex) {
return  knex.schema.createTable('gst',function(table){
    table.increments('gst_id').primary();
    table.integer('gst_value').notNullable();
    table.string('gst_category').notNullable();
    table.timestamps(true,true);
});
};

exports.down = function(knex) {
return  knex.schema.dropTable('gst'); 
};
