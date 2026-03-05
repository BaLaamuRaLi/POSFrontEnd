export default function({message,items,name ,id,value}){
    return(
    <select name={name} id={id} defaultValue={value}>
   
        <option value="">{message}</option>
        {items.map((item)=>(
            <option key={item} value={item}>{item}</option>
        ))        
        }

    </select>
    );
}