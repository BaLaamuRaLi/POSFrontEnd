
exports.up = function(knex) {
return knex.schema.createTable('user_logs',function(table){
    table.increments('log_id').primary();
    table.integer('user_id').references('user_id').inTable('users');
    table.string('action').notNullable();
    table.timestamps(true,true);
   
}); 
};

exports.down = function(knex) {
return knex.schema.dropTable('user_logs'); 
};
