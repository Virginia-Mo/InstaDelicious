
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
import Link from 'next/link';
import SettingForm from '../forms/settingForm';
import settingsInfosForm from '../forms/settingInfosForm';
import SettingsInfosForm from '../forms/settingInfosForm';
import CancelIcon from '@mui/icons-material/Cancel';


export default function SettingsMenu() {
    const [openSetting, setOpenSetting] =  React.useState(false)
    const [openSettingProfile, setOpenSettingProfile] =  React.useState(true)
    const handleOpenSetting =  () => {
        setOpenSetting(false)
        setOpenSettingProfile(true)
        console.log(openSetting)
    }
    const handleCloseSetting = () => {
        setOpenSetting(true)
        setOpenSettingProfile(false)
        console.log(openSetting)
    }
  return (

    <div className='flex border-gray-200 border-2 rounded-lg'>
    <Box className="bg-red-50">
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <Link href={`/edit/profile`}>
              <ListItemText primary="Profile" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <Link href={`/edit/settings`}>
              <ListItemText primary="Settings" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
              <Link href={`/edit/delete`}>
              <ListItemText primary="Delete Profile" />
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
   
    {/* { openSettingProfile && <SettingForm />}
    {openSetting &&   <SettingsInfosForm />} */}
    
  
    </div>

  )
}