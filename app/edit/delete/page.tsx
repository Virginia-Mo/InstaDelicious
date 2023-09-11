"use client";

import { getConnectedUser } from "@/async_calls/user/getUser";
import SettingForm from "@/components/forms/settingForm";
import Navbar from "@/components/navBar/Navbar";
import SettingsMenu from "@/components/settingsMenu/settingsMenu";
import React, { ReactEventHandler, useEffect } from "react";
import { useAppSelector } from "@/types/reduxTypes";
import { useSession } from "next-auth/react";
import { Alert, AlertTitle } from "@mui/material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteAccount } from "@/async_calls/edit";
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const Settings = () => {
  const { data : session, status } = useSession();

  const message: string = useAppSelector(
    (state) => state.persistedReducer.message.message
    );

  const user = useAppSelector(
    (state) => state.persistedReducer.user.onlineUser
  );

  const [open, setOpen] = React.useState(false);
  const [userPassword, setUserPassword] = React.useState<string>("");

  const handleDelete = () => {
    setOpen(true);
  };
  const handlePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value)
  }

const handleConfirmation = () => {
    const options = {
        id : user.id,
        password: userPassword,
        token: session?.user.accessToken as string,
    }
    deleteAccount(options, session?.user)
}
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
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
      >
          { message &&
                <><DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {message}
                </DialogContentText>
              </DialogContent></>
        
          }
          { !message &&
          
        <><DialogTitle id="alert-dialog-title">Delete your account</DialogTitle><DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Enter your password to confirm the deletion of your account.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={handlePassword} />
                </DialogContent><DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmation} autoFocus>
                      Confirm
                    </Button>
                  </DialogActions></>
          }
      </Dialog>
          
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
