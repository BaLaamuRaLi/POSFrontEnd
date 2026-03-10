import CloseButton from "../Components/CloseButton";
import DropBox from "../Components/DropBox";
import LabelInput from "../Components/LabelInput";
import SidebySide from "../Components/SidebySide";

export default function({onClose}){
//#region left
    const code= {Component:LabelInput,label:"Product Code",type:"text"};
    const name= {Component:LabelInput,label:"Product Name",type:"text"};
    const hsn= {Component:LabelInput,label:"HSN code",type:"text"};
    const batch= {Component:LabelInput,label:"Batch No",type:"text"};
    const taxCategory= {Component:DropBox,label:"Tax" ,items:["18%","5%","40%","New Tax"],message:"--select--" };
    const unit= {Component:DropBox,label:"Unit" ,items:["kg","gram","bag"],message:"--select--" };
    

 //#endregion


 //#region right
    const filter1={Component:LabelInput,label:"Type",type:"text",placeholder:"pipe, bulb"}; 
    const filter2={Component:LabelInput,label:"Size",type:"text",placeholder:'9W, 1"'}; 
    const filter3={Component:LabelInput,label:"Company",type:"text",placeholder:'Goldmedal,Supreme'}; 
    const filter4={Component:LabelInput,label:"filter 4",type:"text"}; 

//#endregion
    return(
    <div className="modal center">
        <div className="popup addProduct">
        <CloseButton onClick={onClose}/>

        <div className="vertical" style={{gridArea:"1 / 1 / 2 / 2", gap:"10px",padding:"20px 10px",alignItems:"self-start"}}>
            <SidebySide left={code} right={name}/>
            <SidebySide left={hsn} right={batch}/>
            <SidebySide left={taxCategory} right={unit}/>            
            <LabelInput label="Profit" type="text" />
            <DropBox label="Expirable" items={["Yes","No"]} message="--select--" />            

        </div>
        <div className="vertical"  style={{gridArea:"1 / 2 / 2 / 3", gap:"10px",padding:"20px 0"}}>
            <h3 style={{margin:"0"}}>Add Filters</h3>
            <SidebySide left={filter1} right={filter2}/>
            <SidebySide left={filter3} right={filter4}/>
        </div>
        <button onClick={onClose}
        style={{position:"absolute",bottom:"20px",right:"20px"}}
            >Add</button>
        </div>
    </div>
    )
}