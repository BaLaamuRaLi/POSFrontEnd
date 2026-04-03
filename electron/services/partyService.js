import {insertParty, getParty } from "../db/models/partyModel.js"


export function createPartyService(db){
    
return {
    newParty:async (partyData)=>{
        const {party}=partyData;
         if(!Object.values(party).every(item =>item!==null && item!=="")){
            throw new Error("invalid party");
        }
        console.log('party received is of type ',partyData.type,'paryt is',party);
    return insertParty(db,partyData);
    },
    findParty:async(party)=>{
           if(!Object.values(party).every(item =>item!==null && item!=="")){
            throw new Error("invalid party");
        }
    return getParty(db,party);
 
    }
}
}