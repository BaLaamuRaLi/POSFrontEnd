export default  function authenticate(db,userName) {

    
    if(!userName) {
        return;
    }
    return db('users').where({user_name:userName}).first();



}