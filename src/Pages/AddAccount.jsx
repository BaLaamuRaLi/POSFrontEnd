
import { useState } from "react";
import CloseButton from "../Components/CloseButton";
import DropBox from "../Components/DropBox";
import SearchBox from "../Components/SearchBox";
import axios from "axios";

export default function({accountType ,onClose}){
    const[partyCode,setPartyCode]=useState("")
    const[partyName,setpartyName]=useState("")
    const[gst,setGST]=useState("")
    const[address,setAddress]=useState("")
    const[phone,setPhone]=useState("")

  function  handleClick(){
    async function addParty () {
     try{const res= await axios.post('/server/party/add',{
            type:accountType,
            party:{partyCode:partyCode,
            Name:partyName,
            gst:gst,
            address:address,
            phone:phone}
        })
        if(res?.data?.sucess){
        onClose()
        console.log(res.data.message)
        }else{
        console.log(res?.data?.message)
        }
    }
    catch (error) {
     console.log(error)   
    }


    }
        addParty()
        
    }
    
    const parties =[
        "Customer","Agent","Supplier"
    ]
 
    return(
    <div className="modal center">
        <div className="popup addAccount">
            <CloseButton onClick={onClose} />
            <SearchBox placeholder="Party Code" title="Party Code" onChange={(e)=>setPartyCode(e.target.value)}  value={partyCode} required={true}/>
            <SearchBox placeholder="Name" title="Name"  onChange={(e)=>setpartyName(e.target.value)}  value={partyName} required={true}/>
            <SearchBox placeholder="GSTIN (if applicable)" title= "GST number"  onChange={(e)=>setGST(e.target.value)}  value={gst} required={true}/>
            <SearchBox placeholder="Address" title="Address"  onChange={(e)=>setAddress(e.target.value)}  value={address} required={true}/>
            <SearchBox placeholder="Phone" title="Phone number"  onChange={(e)=>setPhone(e.target.value)}  value={phone} required={true}/>
            {!accountType&&(<DropBox message={"Select Category"} items={parties} name={"category"}
            value={accountType}/>)}
            
            <button onClick={handleClick}
            style={{position:"absolute",bottom:"20px",right:"20px"}}
            >Add</button>
        </div>
    </div>
    );
}