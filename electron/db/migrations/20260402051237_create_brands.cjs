
exports.up = function(knex) {
return knex.schema.createTable('brands',function(table){
    table.increments('id').primary();
    table.string('brand');
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('brands'); 
};
