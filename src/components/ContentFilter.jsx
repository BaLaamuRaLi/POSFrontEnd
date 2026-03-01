export default function(){
    const buttons = ["All", "Pending", "Paid"];


    return(
        <div className="filterSection horizontal">
            {buttons.map((name) => (<button>{name}</button>))}
        </div>
    );
}