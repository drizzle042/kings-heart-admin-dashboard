import { CirclesWithBar } from  'react-loader-spinner'

const Loader = () => {
    return ( 
        <div 
        style={{
            position: "fixed",
            zIndex: "100", 
            padding: "0",
            margin: "0",
            top: "0",
            left: "0",
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