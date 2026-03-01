export default function({buttons}){
    

    return(
        <div className="filterSection horizontal">
            {buttons.map(({name,clickHandler}) => 
                (
                <button key={name} onClick={clickHandler} >{name}</button>
                ))}
        </div>
    );
}