import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";
import ResultTable from "../Components/ResultTable";
import AddButton from "../Components/AddButton";
import PrintButton from "../Components/PrintButton";
import SearchBox from "../Components/SearchBox";



export default function(){
    return(
        <div className="SearchBarLayout">
           <div className="searchBar">
               
            </div> 
            <div className="content">
                 <ContentHeader Components={[AddButton,SearchBox ,PrintButton]} />
                 <ContentFilter/>
                 <ResultTable/>
            
            </div>
            
        </div>
    );
}