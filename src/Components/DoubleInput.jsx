import LabelInput from "./LabelInput";

export default function({label1,label2}){
    return(
        <div className="horizontal"
        style={{flexWrap:"nowrap",gap:"10px"}}>
           <LabelInput label={label1} type="text"/>
           <LabelInput label={label2} type="text"/>
        </div>
    )
}