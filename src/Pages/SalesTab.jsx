import { useState } from "react";
import Sales from "./Sales";

function TabPanel({children,value,index}){
    return(
        <div
        role="Tabpanel"
        hidden={value!==index}
        style={{height:"100%",width:"100%"}}
        >
            {children}
        </div>
    );
}


export default function (){
      const [activeTab,setActiveTab]=useState(0);
    const [tabsOpen,setOpenTabs]=useState([
        {id:0,label:"Sales",Page:()=>Sales(setOpenTabs,tabsOpen,setActiveTab)},
    ]);
    function handleTabChange(newTab){
        setActiveTab(newTab);
    }

    return(
        <div className="tabView">
        
        <div className="tabHeader">

            {tabsOpen?.map((tab)=>(
                <button key={tab.id} onClick={()=>handleTabChange(tab.id)}
                className={tab.id===activeTab?"Active":""}
                >{tab.label}</button>
            ))}
        </div>
        <div style={{gridArea:"2 / 1 / 3 / 2"}}>
           {tabsOpen.map(({id,Page}) => (
            <TabPanel key={id} value={activeTab} index={id}>
                <Page/>
           
            </TabPanel>
            ))}
            

        </div>
        </div>
    );

}