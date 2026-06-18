export default function({message,items,name,dvalue,label,setClick,setValue}){
    return(

    <label className="vertical">
        {label}
        <select name={name} defaultValue={dvalue} onChange={(e)=>setClick&&setClick(e)} value={setValue}>
           {message&&<option key="#firstOption" value="">{message}</option>}
            {items?.map((item)=>(
                <option key={item} value={item} >{item}</option>
            ))
            }
        </select>
    </label>
    );
}