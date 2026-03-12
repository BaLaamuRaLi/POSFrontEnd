

export default function({list,setClick ,openWindow}){
    
   const headers = Object.keys(list[0]);
  
   
    
    return(

    <div className="tableContainer">
      <div className="tableWrapper">
          <table className="resultTable">
            <thead>
              <tr>
                {headers.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id} 
                onClick={()=>{
                setClick&&setClick(item);
                openWindow&&openWindow();
                 
              }} 
                >

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