export default function({message,items,name,value,label,setClick}){
    return(

    <label className="vertical">
        {label}
        <select name={name} defaultValue={value} onChange={(e)=>setClick&&setClick(e.target.value)}>
           {message&&<option value="">{message}</option>}
            {items?.map((item)=>(
                <option key={item} value={item} >{item}</option>
            ))
            }
        </select>
    </label>
    );
}