
'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts'
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingForm from '../forms/settingForm';
import settingsInfosForm from '../forms/settingInfosForm';
import SettingsInfosForm from '../forms/settingInfosForm';


export default function SettingsMenu() {
    const [openSetting, setOpenSetting] =  React.useState(true)
    const handleOpenSetting =  () => {
        setOpenSetting(true)
    }
    const handleCloseSetting = () => {
        setOpenSetting(false)
    }
  return (
    <div className='flex border-gray-200 border-2 rounded-lg'>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <p onClick={handleOpenSetting}> <ListItemText primary="Profile"  /></p>
             
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <p onClick={handleCloseSetting}>  <ListItemText primary="Settings" /></p>
            
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    { openSetting && <SettingForm />}
    {!openSetting &&   <SettingsInfosForm />}
    
  
    </div>
  )
}