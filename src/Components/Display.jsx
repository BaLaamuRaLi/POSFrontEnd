export default function({label,text}){
    return(
       <div className="dataContainer horizontal"> 
       <span className="label" >{label}</span> 
       <span className="data">{text}</span>
        </div>
    );
}