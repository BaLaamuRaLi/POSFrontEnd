export default function({message,items,name,value}){
    return(
    <select name={name} defaultValue={value}>
   
       {message&&<option value="">{message}</option>}
        {items.map((item)=>(
            <option key={item} value={item}>{item}</option>
        ))        
        }

    </select>
    );
}