export default function({message,items,name,value,label,setClick,otherHandler}){
    return(

    <label className="vertical">
        {label}
        <select name={name} defaultValue={value} onChange={(e)=>setClick&&setClick(e)} >
           {message&&<option key="#firstOption" value="">{message}</option>}
            {items?.map((item)=>(
                <option key={item} value={item} >{item}</option>
            ))
            }
        </select>
    </label>
    );
}