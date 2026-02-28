import AddButton from "../Components/AddButton";
import PrintButton from "../Components/PrintButton";
import SearchBox from "../Components/SearchBox";

export default function(){
    return(
        <div className="SearchBarLayout">
           <div className="searchBar">
               
            </div> 
            <div className="content">
                <div className="header horizontal">
                    <AddButton/>
                    <SearchBox/>
                    <PrintButton/>
                    
                </div>
            </div>
            
        </div>
    );
}