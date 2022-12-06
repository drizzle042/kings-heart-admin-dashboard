import styles from "../styles/styles.module.css";
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import useFetch from "../../../Lib/Hooks/Requests/useFetch";
import Loader from "../../../Lib/Loader/Loader";
import { Account } from "../../../Lib/Endpoints/Endpoints";

const Header = ({ setOpen, open, drawerWidth }) => {
    
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        }),
    }));

    const { data, isLoading } = useFetch(Account.getAccount);
    console.log(data);
    
    return (
      <Box>
        { isLoading && <Loader /> }
        <AppBar 
        position="fixed" 
        open={open} 
        elevation={2} 
        sx={{ 
          bgcolor: "#fff", 
          color: "#000" 
        }}>
          <div className={styles.flexHeader}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MenuIcon 
                fontSize={"large"} 
                onClick={() => {
                    setOpen(!open)
                }}
                sx={{ 
                  ...(open && { display: 'none' }),
                  mr: 2, 
                  cursor: "pointer" 
                }}/>
            </Box>
            <div className={styles.clickableDiv}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar 
                src={data?.data?.image} 
                sx={{ width: 50, height: 50 }} />
              </IconButton>
              <Typography 
              sx={{ 
                paddingLeft: "0.6rem", 
                paddingRight: "0.3rem", 
                marginTop: "auto", 
                marginBottom: "auto",
                display: { xs: "none", md: "flex" }
              }}>{data?.data?.first_name} {data?.data?.last_name}</Typography>
              <ExpandMoreSharpIcon
              fontSize={"large"} />
            </div>
          </div>
        </AppBar>
      </Box>
    );
}
 
export default Header;