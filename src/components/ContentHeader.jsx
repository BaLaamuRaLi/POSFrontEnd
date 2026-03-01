


export default function({Components}){
    return(
        <div className="header horizontal">

        {Components.map((Component,index)=>(
            <Component key={index}/>
            ))}

{/*             
            <AddButton/>
            <SearchBox/>
            <PrintButton/>             */}
        </div>
    );
}