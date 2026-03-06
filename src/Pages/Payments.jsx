import SearchBox from "../Components/SearchBox";
import SearchComponents from "../Components/ComponentsExtractor";
import ContentHeader from "../Components/ContentHeader";
import AddButton from "../Components/AddButton";
import PrintButton from "../Components/PrintButton";
import ContentFilter from "../Components/ContentFilter";
import ResultTable from "../Components/ResultTable";
import Button from "../Components/Button";
import Input from "../Components/Input";



export default function(){


const party ={name:"shibu" ,category:"Customer"};

const searchConfigs =[
    {id: "Search",Component:Button ,text:"Search Party",onClick: () => console.log("clicked Search")},
    {id: "parytAdd",Component:Button,text:"Add party",onClick: () => console.log("clicked Add party")},
    {id: "Name",Component:SearchBox,placeholder:"filter 3",readOnly:true ,value:`Name: ${party.name}` },
    {id: "Category",Component:SearchBox,placeholder:"filter 3",readOnly:true ,value:`Category: ${party.category}` },
    {id: "Amount",Component:SearchBox,placeholder:"Amount"},
    {id: "Date",Component:Input,type:"date"},
    {id: "Save",Component:Button,text:"Save",onClick: () => console.log("clicked Save")}
];

const headerConfig =[
        {id: "add",component:AddButton},
        {id: "search",component:SearchBox, placeholder:"Party Code"},
        {id: "print",component:PrintButton}
    ];

    //#region filterButtons
 const filterButtons = [
        {name:"filter 1",clickHandler: fun1}, 
        {name:"filter 2",clickHandler:fun2}, 
        {name:"filter 3",clickHandler:fun3} 
         ];
  function fun1() {console.log("clicked filter 1");}
   function fun2() { console.log("clicked filter 2");}
   function fun3() { console.log("clicked filter 3");}
//#endregion


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
           <div className="searchBar vertical">
            <SearchComponents components={searchConfigs} />
            </div>
            <div className="content">
            <ContentHeader components={headerConfig} />
            <ContentFilter buttons = {filterButtons} />
            <ResultTable invoices={result}/>
            </div>
        </div>
    );
}