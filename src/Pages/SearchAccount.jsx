import axios from "axios";
import CloseButton from "../Components/CloseButton";
import SearchBox from "../Components/SearchBox";
import { useContext, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
 

export default function({accountType,onClose,context ,newAccount,parent}){
    const [Name,setName] = useState("")
    const [accounts,setaccount] = useState(null)
    const [selected,setselected]=useState({type: 'include', ids:new Set()})
    const{setBill}=useContext(context)
     const [accountColumns,setColumns]=useState([]);
     
    useEffect(()=>{ if(accounts?.length) { 
        setColumns( Object.keys(accounts[0]).map((key)=>({
            field:key,
            headerName:key,
        minWidth: key === "Name" ? 150 : 100,
            flex:0,
        })))

    }else{
        setColumns([]);

    }

    },[accounts])

    useEffect(()=>{
    async function getCustomer(){
    const res= await axios.get(`/server/party/${accountType}/${Name}`)
    setaccount(res.data)
    }
    if(Name) getCustomer();

    },[Name])

    function selectHandle(){
        const accountMap = new Map(
            accounts.map((a)=>[a.partyCode,a])    
         );
    
        if(selected){
            const pCode =selected.ids.values().next().value;
            (accountType==="Customer")&& setBill(prev=>({
                ...prev,
                Customer:accountMap.get(pCode)
            }));
            (accountType==="Agent")&&setBill(prev=>({
                ...prev,
                Agent:accountMap.get(pCode)
            }));

        }
       
        onClose()
    }
    useEffect(()=>{
        console.log("account selected is ",selected);
    },[selected]);

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
         
            <Box sx={{height:'100%',width:'100%'}}>
            <DataGrid
                rows={accounts}
                columns={accountColumns}
                checkboxSelection
                disableMultipleRowSelection
                rowSelectionModel={selected}
                onRowSelectionModelChange={(rowSelection)=>{
                setselected(rowSelection);
                }}  
                getRowId={(row) =>row.partyCode}
            />
             </Box>
      
            <div className="horizontal"
            style={{gridArea:"3 / 1 / 4 / 2", justifyContent:"flex-end"}}
            ><button onClick={selectHandle}>Select</button></div>
        </div>
    </div>

    );
}