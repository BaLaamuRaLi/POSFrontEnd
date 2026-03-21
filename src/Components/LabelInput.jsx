export default function({label,...props}){
    return(
        <div>
            <label className="vertical" style={{fontWeight:"500"}}>
            {label}
            <input {...props}/>
            </label>
        </div>
    )
}