import authenticate from "../db/models/userModel.js";
import bcrypt from "bcrypt"
export function createAuthService(db){
    
return {
        verifyUser : async (data)=>{ 
       
        const {name,password}=data;
        const user =await authenticate(db,name);
        if (!user) {
        return;
        }

        const isMatch = await bcrypt.compare(password, user.key);


        if (!isMatch) {
        return 
        
        }

            if(user.user_name=='orange')
        {
        return {islogged:true,role:"Staff",page:"Sales"};
            }
            else{
            return({islogged:true,role:"Admin",page:"Dashboard"});
            }
        }
    }
}