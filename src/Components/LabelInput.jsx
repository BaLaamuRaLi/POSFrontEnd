export default function({label,...props}){
    return(
        <div className="vertical">
            <label>{label}
            <input {...props}/>
            </label>
        </div>
    )
}