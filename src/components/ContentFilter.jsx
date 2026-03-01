export default function({buttons}){
    

    return(
        <div className="filterSection horizontal">
            {buttons.map((name) => 
                (
                <button key={name} >{name}</button>
                ))}
        </div>
    );
}