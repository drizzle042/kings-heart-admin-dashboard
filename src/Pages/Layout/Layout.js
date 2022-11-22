import SideBar from "./components/SideBar";

const Layout = ({ children }) => {
    return ( 
        <SideBar>
            { children }
        </SideBar>
     );
}
 
export default Layout;