export default function({message,items,name ,id}){
    return(
    <select name={name} id={id}>
   
        <option value="">{message}</option>
        {items.map((item)=>(
            <option key={item} value={item}>{item}</option>
        ))        
        }

    </select>
    );
}