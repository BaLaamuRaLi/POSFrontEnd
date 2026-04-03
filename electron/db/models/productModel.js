export default  function getProducts(db,userName) {

    
    if(!userName) {
        return;
    }
    return db('users').where({user_name:userName}).first();



}