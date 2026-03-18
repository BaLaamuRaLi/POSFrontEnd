import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

export default function({list,setClick ,openWindow,setIndex}){
    const [selected,setSelect]=useState(null);
    const ref = useRef(null);
  useOutsideClick(ref,()=>setSelect(null));

  if(!list||!(list.length)){ return(
  <div className="tableContainer">
    <div className="tableWrapper">
      <table className="resultTable" >
        <thead>
          <tr>
            <th style={{color:"transparent"}}>Table</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{color:"transparent"}}>Table</td></tr>
        </tbody>
      </table>
    </div>
  </div>);}
   const headers = Object.keys(list[0]);
  
    
    return(

    <div className="tableContainer">
      <div className="tableWrapper">
          <table className="resultTable">
            <thead>
              <tr> 
                <th>SNo</th>
                {headers.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((item,index) => (
                <tr key={index} 
                onClick={()=>{
                setClick&&setClick(item);
                openWindow&&openWindow();
                setIndex&&setIndex(index)
                setSelect(index);
  
                 
              }}
                style={{backgroundColor:(selected===index)?"#ff944d":""}}
                ref={ref}
                ><td>{index}</td>

                  {headers.map((key) => (
                   key==="Qty" || key==="Profit"
                   ?
                   (
                   <td key={key} >
                     <input type="text" placeholder="0.00"
                     style={{background:"none",width:"4rem"}}/>                
                   </td>
                  )
                   :
                   (<td key={key}>{item[key]}</td>)
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>

    );
}