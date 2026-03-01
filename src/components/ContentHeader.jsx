import AddButton from "./AddButton";
import PrintButton from "./PrintButton";
import SearchBox from "./SearchBox";

export default function(){
    return(
        <div className="header horizontal">
            <AddButton/>
            <SearchBox/>
            <PrintButton/>            
        </div>
    );
}