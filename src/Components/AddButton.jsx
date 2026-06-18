import AddImage from "../assets/AddButton.svg"

export default function({...props}){
    return (
    <img className="Add button" 
    src={AddImage} 
    alt="Add" 
    {...props}/>
              
    );

}