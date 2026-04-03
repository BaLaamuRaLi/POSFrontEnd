
exports.up = function(knex) {
return knex.schema.createTable('users',function(table){
    table.increments('user_id').primary();
    table.string('user_name').notNullable();
    table.string('key').notNullable();
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('users'); 
};
