
exports.up = function(knex) {
return knex.schema.createTable('party_types',function(table){
    table.increments('type_id').primary();
    table.string('party_type').notNullable();
    table.timestamps(true,true);
    
});  
};

exports.down = function(knex) {
return knex.schema.dropTable('party_types');
};
