
exports.up = function(knex) {
return knex.schema.createTable('barcodes',function(table){
    table.increments('id').primary();
    table.integer('product_id').references('p_id').inTable('products');
     table.string('barcode').notNullable();
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('barcodes'); 
};
