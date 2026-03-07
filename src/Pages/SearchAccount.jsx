import CloseButton from "../Components/CloseButton";
import ResultTable from "../Components/ResultTable";
import SearchBox from "../Components/SearchBox";

export default function({accountType,onClose,accounts,newAccount}){
    return(
    <div className="modal center">
        <div className="popup SearchAccount">
            <CloseButton onClick={onClose} />
            <div className="horizontal"
            style={{justifyContent:"space-between",paddingRight:"30px"}}
            >
                <SearchBox placeholder={accountType+" "+"Name"}/>
                <button onClick={()=>newAccount(["SalesInvoice",`Search${accountType}`,"AddAccount"])}>New {accountType}</button>
                
            </div>
            <ResultTable list={accounts}/>
            <div className="horizontal"
            style={{justifyContent:"flex-end"}}
            ><button>Select</button></div>
        </div>
    </div>

    );
}