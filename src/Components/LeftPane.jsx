export default function ({lheadcomps,lbillcomps}){
    return(
         <div className="leftPane">
            <div className="headerleftPane vertical">
                {
                    lheadcomps?.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }
            </div>

             {/* <div className="productLeftPane vertical">
                    {
                    lproductcomps?.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }
            </div> */}
            <div className="BillLeftPane vertical">
                {
                    lbillcomps?.map(({id,Component,...props})=>(
                        <Component key={id} {...props}/>
                    ))
                }

            </div>


        </div>
    );
}