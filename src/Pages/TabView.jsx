import { useState } from "react";

function TabPanel({children,value,index}){
    return(
        <div
        role="Tabpanel"
        hidden={value!==index}
        >
            {value===index&&children}
        </div>
    );
}


export default function ({HomePage}){
    const [tabsOpen,setOpenTabs]=useState([
        {id:0,label:"home"},
        {id:1,label:"tab2"},
        {id:2,label:"tab3"},
    ]);
    const [activeTab,setActiveTab]=useState(0);
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
            <div hidden={activeTab!==0} style={{height:"100%",width:"100%"}} >
                <HomePage tabs={{tabsOpen,setOpenTabs}} />
            </div>
            {tabsOpen?.map(({id},index)=>(
                <TabPanel key={id} value={activeTab} index={index} >
                    <div>hi</div>
                </TabPanel>
            ))}
            

        </div>
        </div>
    );

}