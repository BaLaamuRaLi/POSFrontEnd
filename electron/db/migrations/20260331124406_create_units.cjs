
exports.up = function(knex) {
return knex.schema.createTable('units',function(table){
    table.increments('u_id').primary();
    table.string('unit').notNullable();
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('units'); 
};
