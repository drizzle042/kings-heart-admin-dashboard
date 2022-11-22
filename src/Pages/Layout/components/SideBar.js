import { useState, useCallback } from "react"; 
import { Link } from "react-router-dom";
import styles from "../styles/styles.module.css";
import logo from "../../../Lib/assets/king_s_heart_crown.png"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CampaignIcon from '@mui/icons-material/Campaign';
import MessageIcon from '@mui/icons-material/Message';
import GridViewIcon from '@mui/icons-material/GridView';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Header from "./Header";


const SideBar = ({ children }) => {

    const defaultDrawerWidth = 240;
    const minDrawerWidth = 190;
    const maxDrawerWidth = 600;

    const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);

    const handleMouseDown = e => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseMove = useCallback(e => {
      const newWidth = e.clientX - document.body.offsetLeft;
      if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
          setDrawerWidth(newWidth);
      }
    }, []);

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        }),
    }),
    );


    const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: "0.8rem",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    }));

    const [open, setOpen] = useState(false);
    
    const handleDrawerClose = () => {
      setOpen(!open);
    };
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
        <Drawer
          sx={{
            width: drawerWidth,
            position: "fixed",
            zIndex: "100",
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box'
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
        <div style={{display: "flex", flex: 2}}>
          <div className={styles.sideBarPaper}>
            <DrawerHeader>
                <IconButton 
                onClick={handleDrawerClose} 
                sx={{backgroundColor: "var(--lightgray)"}}>
                  <KeyboardBackspaceIcon fontSize={"large"} />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <div className={styles.logoContainer}>
              <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.sideBarDiv}>
              <List>
                <ListItem disablePadding>
                    <ListItemButton>
                      <Link to="/">
                        <ListItemIcon>
                          <GridViewIcon fontSize={"large"} />
                        </ListItemIcon>
                        <ListItemText primary={"Overview"} />
                      </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                      <Link to="/scoresheets">
                        <ListItemIcon>
                          <ReceiptLongIcon fontSize={"large"} />
                        </ListItemIcon>
                        <ListItemText primary={"Scoresheets"} />
                      </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                      <Link to="/exams">
                        <ListItemIcon>
                          <BorderColorIcon fontSize={"large"} />
                        </ListItemIcon>
                        <ListItemText primary={"Exams"} />
                      </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AssignmentIcon fontSize={"large"} />
                      </ListItemIcon>
                      <ListItemText primary={"Assignments"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CampaignIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText primary={"Anouncements"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MessageIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText primary={"Messages"} />
                  </ListItemButton>
                </ListItem>
              </List>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText primary={"Settings"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText sx={{color: "var(--red)"}} primary={"Log out"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </div>
          <div className={styles.dragger} onMouseDown={e => handleMouseDown(e)} />
        </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <div style={{marginLeft: drawerWidth}}>{ children }</div>
        </Main>
      </Box>
    );
}
 
export default SideBar;