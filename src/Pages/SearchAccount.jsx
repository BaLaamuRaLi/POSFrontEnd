import axios from "axios";
import CloseButton from "../Components/CloseButton";
import ResultTable from "../Components/ResultTable";
import SearchBox from "../Components/SearchBox";
import { useEffect, useState } from "react";

export default function({accountType,onClose,newAccount,parent}){
    const [Name,setName] = useState("")
    const [accounts,setaccount] = useState(null)
    
    useEffect(()=>{
    async function getCustomer(){
    const res= await axios.get(`/server/party/${accountType}/${Name}`)
    setaccount(res.data)
    }
    if(Name) getCustomer();

    },[Name])

    function selectHandle(){
        
        onClose()
    }

    return(
    <div className="modal center">
        <div className="popup SearchAccount">
            <CloseButton onClick={onClose} />
            <div className="horizontal"
            style={{justifyContent:"space-between",paddingRight:"30px",gridArea:"1 / 1 / 2 / 2"}}
            >
                <SearchBox placeholder={accountType+" "+"Name"} onChange={(e)=>setName(e.target.value)}  value={Name}/>
                <button onClick={()=>newAccount([parent,`Search${accountType}`,"AddAccount"])}>New {accountType}</button>
                
            </div>
         
            <ResultTable list={accounts}/>
      
            <div className="horizontal"
            style={{gridArea:"3 / 1 / 4 / 2", justifyContent:"flex-end"}}
            ><button onClick={onClose}>Select</button></div>
        </div>
    </div>

    );
}