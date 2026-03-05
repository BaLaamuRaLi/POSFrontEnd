export default function ({lheadcomps, lproductcomps ,lbillcomps}){
    return(
         <div className="leftPane">
            <div className="headerleftPane">
                {
                    lheadcomps.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }
            </div>

             <div className="productLeftPane vertical">
                    {
                    lproductcomps.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }
            </div>
            <div className="BillLeftPane vertical">
                {
                    lbillcomps.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }

            </div>


        </div>
    );
}