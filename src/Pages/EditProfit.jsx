import CloseButton from "../Components/CloseButton";
import LabelInput from "../Components/LabelInput";

export default function({onClose}){
    return(
    <div className="modal center">
        <div className="popup EditProfit">
        <CloseButton onClick={onClose}/>
        <LabelInput label={"New profit"} type="text" />
        <button onClick={onClose}
        style={{position:"absolute",bottom:"20px",right:"20px"}}
            >Save</button>
        </div>
    </div>
    )
}