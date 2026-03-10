import printImage from "../assets/printer.svg"
export default function({...props}){
    return (

    <button className="Print button horizontal">
        <img className="Print"
        src={printImage}
        alt="Print"
        {...props}
        />
       <p>Print</p>

    </button>
              
    );

}