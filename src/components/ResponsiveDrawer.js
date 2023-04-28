import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "../static/drawer.css"
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Groups3Icon from '@mui/icons-material/Groups3';
import AssistantIcon from '@mui/icons-material/Assistant';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import {Link} from 'react-router-dom'

const drawerWidth = 240;


export default function ResponsiveDrawer(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const things = [{text : 'Individuals', link : '/individuals'} , {text : 'Teams', link : '/teams'} , {text : ' Assistance', link : '/assistance'}]


  const things2 = [{text : 'SendMessage', link : '/message'} , {text : 'Logout', link : '/credits'}]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="drawer">
      <Toolbar />
      <Divider />
      <List>
        {things.map((thing, index) => (
          <ListItem key={thing.text} disablePadding>






            {/* <ListItemButton href={thing.link}> 
              <ListItemIcon>

                {(() => {
              if (index == 0){
                  return (
                    <EmojiPeopleIcon className="white"/>
                  )
              }
              else if(index == 1){
                return (
                  <Groups3Icon className="white"/> 
                )
              }
              else if(index == 2){
                return (
                  <MailIcon  className="white"/>
                ) 
              }
            })()}


              </ListItemIcon>
              <ListItemText primary={thing.text} />
            </ListItemButton> */}



           {/* Construction starts here */}




            <Link to={thing.link} className="bot">
                         <ListItemIcon>
                {/* {index % 3 !== 0 ? <EscalatorWarningIcon className="white"/> : <MailIcon  className="white"/>} */}

                {(() => {
              if (index == 0){
                  return (
                    <EmojiPeopleIcon className="white"/>
                  )
              }
              else if(index == 1){
                return (
                  <Groups3Icon className="white"/> 
                )
              }
              else if(index == 2){
                return (
                  
                  <AssistantIcon className="white"/>


                ) 
              }
            })()}


              </ListItemIcon>
              <ListItemText primary={thing.text} className="listtext"/>
            </Link>





























          {/* Construction ends here */}


          </ListItem>
        ))}
      </List>

      <hr></hr>

      <List>
        {things2.map((thing, index) => (
          <ListItem key={thing.text} disablePadding>
            {/* <ListItemButton>
              <ListItemIcon>
                {index % 2 !== 0 ? <LoyaltyIcon className="white"/> : <AssistantIcon className="white"/>}
              </ListItemIcon>
              <ListItemText primary={thing.text} />
            </ListItemButton> */}




            <Link to={thing.link} className="bot">

             <ListItemIcon>
                {index % 2 !== 0 ? <LoyaltyIcon className="white"/> : <MailIcon  className="white"/>}
              </ListItemIcon>
              <ListItemText primary={thing.text} className="listtext"/>

            </Link>







          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        className="appbaring"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="title">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap component="div" >
             V-ECS
          </Typography>




        







        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        
      </Box>
    </Box>
  );
}