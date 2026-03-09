

export default function({left,right}){
    const {Component:Left,...lprops} = left;
    const {Component:Right,...rprops} = right;
    
    return(
        <div className="horizontal"
        style={{flexWrap:"nowrap",gap:"10px"}}>
            <Left {...lprops}/>
            <Right {...rprops} />
        </div>
    )
}