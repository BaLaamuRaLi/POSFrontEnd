import image from "../assets/image.png"

export default function(){
    return(
        <div style={{display:'grid',placeItems:'center'}} >
    
        <img className="user logo" src={image} alt="Logo"/>
        </div>
    );
}