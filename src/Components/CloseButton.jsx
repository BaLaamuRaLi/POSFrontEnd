export default function ({...props}){
    return(
    <button className="closeButton" {...props} >
        
        <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M4 4L20 20M20 4L4 20" 
            stroke="currentColor" 
            strokeWidth="5" />
        </svg>
        </button>
    );
}