export default function({invoices}){
    
    const headers = Object.keys(invoices[0]);
   
    
    return(
<div className="resultSection">

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
                  <td key={key}>{invoice[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
</div>
    );
}