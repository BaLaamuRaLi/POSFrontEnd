

export default function({invoices}){
    
    const headers = Object.keys(invoices[0]);
  
   
    
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
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  {headers.map((key) => (
                   key==="Qty" || key==="Profit"
                   ?
                   (
                   <td key={key} >
                    {/* <svg className="button"
                     width="24" height="24" fill="none" viewBox="0 0 24 24" >
                      <path d="M3 6.25A3.25 3.25 0 0 1 6.25 3h11.5A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25Zm13.25 5h-8.5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5Z"
                    fill="#e61313"/></svg> */}
                    {/* <svg className="button"
                    width="20" height="20" fill="none" viewBox="0 0 24 24" >
                      <path d="M3.997 13H20a1 1 0 1 0 0-2H3.997a1 1 0 1 0 0 2Z"
                    fill="#e61313"/></svg> */}
                     <input type="text" placeholder="0.00"
                     style={{background:"none",width:"4rem"}}/>
                     {/* <svg className="button"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M3 6.25A3.25 3.25 0 0 1 6.25 3h11.5A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25Zm9.75 1.5a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
                      fill="#a00fe4"/>
                      </svg> */}
                      {/* <svg className="button"
                      width="20" height="20" fill="none" viewBox="0 0 24 24" >
                        <path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z"
                      fill="#e61313"/>
                      </svg> */}
                   </td>
                  )
                   :
                   (<td key={key}>{invoice[key]}</td>)
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>

    );
}