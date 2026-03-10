import menuImage from "../assets/menu.svg"

export default function({onExpand}){
    return (
        <img
          src={menuImage}
          alt="menu"
          className="logo"
          onClick={onExpand}
        //   style={{width:'3%',maxWidth:'45px'}}
        
        />

    );
}