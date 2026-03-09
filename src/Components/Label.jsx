export default function({label,child:Child,...props}){
    return(
            <label className="vertical" style={{gap:"4px"}}>
            <span>{label}</span>
                <Child {...props} />
            </label>
    )
}