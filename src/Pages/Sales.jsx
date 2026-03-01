import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";
import ResultTable from "../Components/ResultTable";
import AddButton from "../Components/AddButton";
import PrintButton from "../Components/PrintButton";
import SearchBox from "../Components/SearchBox";



export default function(){
    const filterButtons = ["All", "Pending", "Paid"];
    return(
        <div className="SearchBarLayout">
           <div className="searchBar">
               
            </div> 
            <div className="content">
                 <ContentHeader Components={[AddButton,SearchBox ,PrintButton]} />
                 <ContentFilter buttons = {filterButtons} />
                 <ResultTable/>
            
            </div>
            
        </div>
    );
}