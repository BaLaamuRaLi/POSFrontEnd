import { useEffect, useRef } from "react";

export default function({text,items ,show,isOpen}){
    const ref=useRef();
    useEffect(()=>{
        function handleClick(e){
            if(ref.current&&!ref.current.contains(e.target)){
                show(false);
            }
            
        }
        document.addEventListener("mousedown",handleClick);

        return()=>{
            document.removeEventListener("mousedown",handleClick)
        }

    },[])
    return(
<div className="listButton" ref={ref}>
    <button onClick={()=>show(!isOpen)} >{text}</button>

    {isOpen&&(<ul className="menu"> 

            {items.map((item)=>(
                <li key={item}>{item}</li>
            ))
            }
        </ul>)}
    
</div>
    );
}