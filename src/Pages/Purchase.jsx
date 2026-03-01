import AddButton from "../Components/AddButton";
import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";
import PrintButton from "../Components/PrintButton";
import ResultTable from "../Components/ResultTable";
import SearchBox from "../Components/SearchBox";
import DropBox from "../Components/DropBox";
import SearchComponents from "../Components/SearchComponents";

export default function(){

    const filterButtons = [
        {name:"settled",clickHandler: fun1}, 
        {name:"pending",clickHandler:fun2} 
         ];

    function fun1() {console.log("clicked settled");}
   function fun2() { console.log("clicked pending");}
 

    const result = [
    { id: 1, client: "JRK", amount: 2000 },
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

    const items =["last week","last one month" ,"last one year" ,
        "last 5 years", "last 10 years" ,"custom"
    ];

    return(
        <div className="SearchBarLayout">
                <div className="searchBar vertical">
        
                <SearchComponents>
                    <SearchBox searchPretext="Supplier Code"/>
                    <SearchBox searchPretext="Supplier Name"/>
                    <SearchBox searchPretext="Address"/>
                    <DropBox message={"Duration"} items={items} name={"Duration"} />
                </SearchComponents>
            
                
                
                

                </div> 
                <div className="content">
                    <ContentHeader>
                        <AddButton/>
                        <SearchBox searchPretext ="Invoice no"/>
                        <PrintButton/>
                    </ContentHeader>

                    <ContentFilter buttons = {filterButtons} />
                    <ResultTable invoices={result}/>

               
                    
                </div>
                    
        </div>
    );
}