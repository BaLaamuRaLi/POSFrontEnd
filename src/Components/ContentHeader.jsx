

export default function({components}){
    return(
        <div className="header horizontal">
            
        {/*react jsx elements should start with uppercase 
        that is why we are renaming the component to Component  */}
            {components.map(({id, component: Component ,...props})=>(
                <Component key={id} {...props}/>
            ) )

            }
        

        </div>
    );
}