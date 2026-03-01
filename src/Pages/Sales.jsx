import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";
import ResultTable from "../Components/ResultTable";

export default function(){
    return(
        <div className="SearchBarLayout">
           <div className="searchBar">
               
            </div> 
            <div className="content">
                 <ContentHeader/>
                 <ContentFilter/>
                 <ResultTable/>
            </div>
            
        </div>
    );
}