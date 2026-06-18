export default function({onInputChange,row,field,defaultValue}){
    return (
        <div style={{ display: "flex", alignItems: "center", height:"100%" }}>
            <input type="text" placeholder="0.00"
            style={{background:"none",width:"4rem"}}
            onChange={(e)=>onInputChange(e,row,field)}  value={row[field]||defaultValue}/>
        </div>
    );
}