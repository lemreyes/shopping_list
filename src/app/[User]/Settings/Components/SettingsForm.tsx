"use client";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import profile_icon from "../../../../../public/assets/profile.svg";
import Image from "next/image";
import { updateSetting } from "@/app/Services/fetchWrapper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React from "react";
import { TUserData } from "@/app/Types/Types";
import { Themes } from "@/app/Types/Enums";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SettingsForm({ userData }: { userData: TUserData }) {
  const profileFileRef = useRef<HTMLInputElement | null>(null);
  const [srcPreview, setSrcPreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState(userData.name);
  const [theme, setTheme] = useState(userData.theme);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("Success");
  const [updateBtnDisable, setUpdateBtnDisable] = useState(true);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isThemeChanged, setIsThemeChanged] = useState(false);

  useEffect(() => {
    setSrcPreview(userData.image as string);
  }, [userData.image]);

  useEffect(() => {
    const evalUpdateBtnDisable = () => {
      if (isNameChanged || isProfileChanged || isThemeChanged) {
        setUpdateBtnDisable(false);
      } else {
        setUpdateBtnDisable(true);
      }
    };

    evalUpdateBtnDisable();
  }, [isThemeChanged, isNameChanged, isProfileChanged]);

  const hdlNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

    if (event.target.value === userData.name) {
      setIsNameChanged(false);
    } else {
      setIsNameChanged(true);
    }
  };

  const hdlChangePicture = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (profileFileRef.current) {
      profileFileRef.current.click();
    }
    setIsProfileChanged(true);
  };

  const hdlFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    // reset file input
    event.target.value = "";

    const src = URL.createObjectURL(fileObj);
    setSrcPreview(src);
    setImageFile(fileObj);
  };

  const hdlThemeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setTheme(parseInt(event.currentTarget.value));

    if (parseInt(event.currentTarget.value) === (userData.theme as number)) {
      setIsThemeChanged(false);
    } else {
      setIsThemeChanged(true);
    }
  };

  const handleCloseSnackber = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const hdlUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      const responseData = await updateSetting(
        userData.id,
        imageFile,
        name,
        theme
      );

      setSnackbarMessage(`Settings was successfully updated.`);
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <>
      <form>
        <div className="flex flex-row items-baseline">
          <Image
            src={
              srcPreview != null && srcPreview.length > 0
                ? srcPreview
                : profile_icon
            }
            alt="profile picture"
            className="w-16 h-16 overflow-hidden bg-gray-800 rounded-full mb-4 border border-gray-900"
            width={54}
            height={54}
          />
          <button
            className="px-2 py-1 h-6 rounded-lg bg-gray-600 text-xs text-white hover:bg-white hover:text-gray-800 hover:border hover:border-gray-600"
            onClick={hdlChangePicture}
          >
            Change picture
          </button>
        </div>
        <label htmlFor="account" className="text-sm">
          Account
        </label>
        <input
          type="email"
          id="account"
          name="account"
          className="mb-4 w-full border border-gray-400 rounded-md bg-gray-200 pl-2"
          value={userData.email}
          disabled
        />
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full border border-gray-400 rounded-md pl-2"
          value={name}
          onChange={hdlNameChange}
        />
        <input
          className="hidden"
          ref={profileFileRef}
          type="file"
          onChange={hdlFileChange}
          accept="jpg, jpeg"
        />
        <label htmlFor="color-theme" className="text-sm">
          Color Theme
        </label>
        <select
          id="color-theme"
          name="color-theme"
          className="w-full border border-gray-400 rounded-md pl-2"
          onChange={hdlThemeChange}
          value={theme}
        >
          <option value={Themes.ThemeLight}>Light</option>
          <option value={Themes.ThemeDark}>Dark</option>
        </select>
      </form>
      <button
        className="mt-6 px-2 py-1 rounded-lg bg-gray-600 text-white font-bold hover:bg-white hover:text-gray-800 hover:border hover:border-gray-600 disabled:bg-gray-200 disabled:text-gray-800"
        onClick={hdlUpdate}
        disabled={updateBtnDisable}
        type="submit"
      >
        Update
      </button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackber}
      >
        <Alert
          onClose={handleCloseSnackber}
          severity={severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
