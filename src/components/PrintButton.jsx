export default function({...props}){
    return (

    <button className="Print button horizontal">
        <img className="Print"
        src="src\assets\printer.svg"
        alt="Print"
        {...props}
        />
       <p>Print</p>

    </button>
              
    );

}