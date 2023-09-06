"use client";

import { getConnectedUser } from "@/async_calls/user/getUser";
import SettingForm from "@/components/forms/settingForm";
import Navbar from "@/components/navBar/Navbar";
import SettingsMenu from "@/components/settingsMenu/settingsMenu";
import React, { useEffect } from "react";
import { useAppSelector } from "@/types/reduxTypes";
import { useSession } from "next-auth/react";
import { Alert, AlertTitle } from "@mui/material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const Settings = () => {
  const { status } = useSession();
  const message: string = useAppSelector(
    (state) => state.persistedReducer.message.message
    );
  const user = useAppSelector(
    (state) => state.persistedReducer.user.onlineUser
  );
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    setOpen(true);
  };
const handleConfirmation = () => {
    console.log('delete')
    };
    
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getConnectedUser(user.id);
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <div className="flex h-full">
      <Navbar />
      <div>
        <h1 className="text-center pb-6 text-2xl">Edit your personal infos</h1>
        <section className="mx-auto my-0 h-full flex flex-col pt-8">
          <div className="flex">
            <SettingsMenu />
              <div className="border-gray-200 border-2 rounded-lg flex justify-center flex-col gap-8 items-end px-5 py-4">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CancelIcon />}
                  onClick={handleDelete}
                >
                  Delete your account
                </Button>
              </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
Are you sure you want to delete your account ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleConfirmation} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
          
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
