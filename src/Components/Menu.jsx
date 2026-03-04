export default function({onExpand}){
    return (
        <img
          src="src\assets\menu.svg"
          alt="menu"
          className="floating-menu logo"
          onClick={onExpand}
        //   style={{width:'3%',maxWidth:'45px'}}
        
        />

    );
}