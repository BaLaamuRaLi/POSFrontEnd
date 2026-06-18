export default function({...props}){
    return(
        <div>
            <input className="SearchBox" 
            type="text" 
            {...props}
            />
                        
        </div>

    );
}