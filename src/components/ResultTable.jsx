export default function(){
    
    const invoices = [
    { id: 1, client: "Client A", amount: 2000 },
    { id: 2, client: "Client B", amount: 3500 },
    { id: 3, client: "Client A", amount: 2000 },
    { id: 4, client: "Client B", amount: 3500 },
    { id: 5, client: "Client B", amount: 3500 },
    { id: 6, client: "Client A", amount: 2000 },
    { id: 7, client: "Client B", amount: 3500 },
    { id: 8, client: "Client B", amount: 3500 },
    { id: 9, client: "Client A", amount: 2000 },
    { id: 10, client: "Client B", amount: 3500 },
    { id: 11, client: "Client B", amount: 3500 },
    { id: 12, client: "Client A", amount: 2000 },
    { id: 13, client: "Client B", amount: 3500 },
    { id: 2, client: "Client B", amount: 3500 },
    { id: 1, client: "Client A", amount: 2000 },
    { id: 2, client: "Client B", amount: 3500 },
    { id: 2, client: "Client B", amount: 3500 },
    { id: 1, client: "Client A", amount: 2000 },
    { id: 2, client: "Client B", amount: 3500 },
    ];
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