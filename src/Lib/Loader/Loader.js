import { CirclesWithBar } from  'react-loader-spinner'

const Loader = () => {
    return ( 
        <div 
        style={{
            position: "fixed",
            zIndex: "100", 
            height: "100%",
            width: "100%",
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--white-transparent)"
        }}>
            <CirclesWithBar
            height="100"
            width="100"
            color="var(--blue)"/>
        </div>
     );
}
 
export default Loader;