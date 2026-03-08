export default function({label,...props}){
    return(
        <div>
            <label className="vertical">
            {label}
            <input {...props}/>
            </label>
        </div>
    )
}