
export default function ({rheadcomps,rbuttons, rcontentcomps ,rfootcomps}){
    return(
         <div className="rightPane">
            
            <div className="headerRightPane horizontal">
                {
                    rheadcomps.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }
            </div>
            <div className="buttonsRightPane horizontal" >
                {
                    rbuttons.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }
            </div>
            <div className="ContentRightPane">
                    {
                    rcontentcomps.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }
            </div>
            <div className="footerRightPane horizontal">
                {
                    rfootcomps.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }

            </div>
            </div>
    );
}