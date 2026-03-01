import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";

export default function(){
    return(
        <div className="SearchBarLayout">
           <div className="searchBar">
               
            </div> 
            <div className="content">
                 <ContentHeader/>
                 <ContentFilter/>
            </div>
            
        </div>
    );
}