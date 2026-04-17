import CloseButton from "../Components/CloseButton";
import SearchBox from "../Components/SearchBox";
import { useContext, useEffect,  useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { api } from "../services/api";
 

export default function({accountType,onClose,context ,newAccount,parent}){
    const [Name,setName] = useState("")
    const [accounts,setaccount] = useState(null)
    const [selected,setselected]=useState({type: 'include', ids:new Set()})
    const{setBill}=useContext(context)
     const [accountColumns,setColumns]=useState([]);
     
    useEffect(()=>{ 
        if(accounts?.length) { 
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
    async function getParty(){
    const res= await api.searchParty ({Name:Name,type:accountType})
    setaccount(res)
    }
    if(Name) getParty();

    },[Name])

    function selectHandle(){
        const accountMap = new Map(
            accounts.map((a)=>[a.party_id,a])    
         );
    
        if(selected.ids.size){
            const pCode =selected.ids.values().next().value;
            setBill(prev=>{
                switch (accountType) {
                    case "Customer":
                    return {...prev,Customer:accountMap.get(pCode)}
                    case "Agent":
                    return {...prev,Agent:accountMap.get(pCode)}
                    case "Supplier":
                    return {...prev,supplier:accountMap.get(pCode)}
                    default:
                    return {...prev}
                }
            })
     
            onClose()
            
        }
       
        
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
         
            <Box sx={{height:'100%',width:'100%'}}>
            <DataGrid
                rows={accounts}
                columns={accountColumns}
                checkboxSelection
                disableRowSelectionOnClick
                disableMultipleRowSelection
                rowSelectionModel={selected}
                onRowSelectionModelChange={(rowSelection)=>{
                setselected(rowSelection);
                }}  
                getRowId={(row) =>row.party_id}
            />
             </Box>
      
            <div className="horizontal"
            style={{gridArea:"3 / 1 / 4 / 2", justifyContent:"flex-end"}}
            ><button onClick={selectHandle}>Select</button></div>
        </div>
    </div>

    );
}