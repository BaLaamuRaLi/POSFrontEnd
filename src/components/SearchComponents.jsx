export default function({components}){
    return(
    <>
        {components.map(({id ,Component,...props})=>(

        <Component key={id} {...props} />
       
       ))}
    </>
    );
}