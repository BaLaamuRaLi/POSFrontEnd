
exports.up = function(knex) {
return knex.schema.createTable('products',function(table){
    table.increments('p_id').primary();
    table.string('product_code').notNullable();
    table.string('product_name').notNullable();
    table.string('hsn_code').notNullable().defaultTo("");
    table.integer('unit_id').references('u_id').inTable('units').onDelete('CASCADE');
    table.integer('gst_id').references('gst_id').inTable('gst').onDelete('CASCADE');
    table.integer('category').references('cat_id').inTable('product_categories').onDelete('CASCADE');
    table.integer('type').references('type_id').inTable('product_types').onDelete('CASCADE');
    table.integer('size').references('size_id').inTable('product_sizes').onDelete('CASCADE');
    table.integer('brand').references('id').inTable('brands').onDelete('CASCADE');
    table.boolean('isExpirable');
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('products'); 
};
