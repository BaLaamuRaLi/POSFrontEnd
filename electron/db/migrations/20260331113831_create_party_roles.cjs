
exports.up = function(knex) {
return knex.schema.createTable('party_roles',function(table){
    table.increments('role_id').primary();
    table.integer('party_id').notNullable().references('party_id').inTable('parties').onDelete('CASCADE');
    table.integer('type_id').notNullable().references('type_id').inTable('party_types').onDelete('CASCADE');
    table.timestamps(true,true);
    
});
};

exports.down = function(knex) {
return  knex.schema.dropTable('party_roles');
};
