
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
            <SearchBox placeholder="Party Code"/>
            <SearchBox placeholder="Name"/>
            <SearchBox placeholder="GSTIN (if applicable)"/>
            <SearchBox placeholder="Address"/>
            <SearchBox placeholder="Phone"/>
            <DropBox message={"Select Category"} items={parties} name={"category"}
            value={accountType}/>
        </div>
    </div>
    );
}