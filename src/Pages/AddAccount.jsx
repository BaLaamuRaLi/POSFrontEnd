
import CloseButton from "../Components/CloseButton";
import DropBox from "../Components/DropBox";
import SearchBox from "../Components/SearchBox";

export default function({accountType ,onClose}){
    const parties =[
        "Customer","Agent","Supplier"
    ]
 
    return(
    <div className="modal center">
        <div className="popup addAccount">
            <CloseButton onClick={onClose} />
            <SearchBox placeholder="Party Code" title="Party Code"/>
            <SearchBox placeholder="Name" title="Name" />
            <SearchBox placeholder="GSTIN (if applicable)" title= "GST number"/>
            <SearchBox placeholder="Address" title="Address" />
            <SearchBox placeholder="Phone" title="Phone number" />
            <DropBox message={"Select Category"} items={parties} name={"category"}
            value={accountType}/>
            
            <button onClick={onClose}
            style={{position:"absolute",bottom:"20px",right:"20px"}}
            >Add</button>
        </div>
    </div>
    );
}