import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";
import ResultTable from "../Components/ResultTable";
import AddButton from "../Components/AddButton";
import PrintButton from "../Components/PrintButton";
import SearchBox from "../Components/SearchBox";



export default function(){
    const filterButtons = ["All", "Pending", "Paid"];
    const headerComponents = [AddButton,SearchBox ,PrintButton];
    const result = [
    { id: 1, client: "Shibu", amount: 2000 },
    { id: 2, client: "Client B", amount: 3500 },
    { id: 3, client: "Client A", amount: 2000 },
    { id: 4, client: "Client B", amount: 3500 },
    { id: 5, client: "Client B", amount: 3500 },
    { id: 6, client: "Client A", amount: 2000 },
    { id: 7, client: "Client B", amount: 3500 },
    { id: 8, client: "Client B", amount: 3500 },
    { id: 9, client: "Client A", amount: 2000 },
    { id: 10, client: "Client B", amount: 3500 },
    { id: 11, client: "Client B", amount: 3500 },
    { id: 12, client: "Client A", amount: 2000 },
    { id: 13, client: "Client B", amount: 3500 },
    { id: 14, client: "Client B", amount: 3500 },
    { id: 15, client: "Client A", amount: 2000 },
    { id: 16, client: "Client B", amount: 3500 },
    { id: 17, client: "Client B", amount: 3500 },
    { id: 18, client: "Client A", amount: 2000 },
    { id: 19, client: "Client B", amount: 3500 },
    ];
    return(
        <div className="SearchBarLayout">
           <div className="searchBar">
               
            </div> 
            <div className="content">
                 <ContentHeader Components={headerComponents} />
                 <ContentFilter buttons = {filterButtons} />
                 <ResultTable invoices={result}/>
            
            </div>
            
        </div>
    );
}