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
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";

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
  const [isSnackbarClosed, setIsSnackbarClosed] = useState<boolean | undefined>(
    undefined
  );
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

  useEffect(() => {
    if (isSnackbarClosed === true) {
      window.location.reload();
    }
  });

  const themeClassName = getThemeClassName(userData.theme);

  useEffect(() => {
    document.body.classList.add(`${themeClassName}`);
    document.body.classList.add(`bg-bodyBg`);
  }, [themeClassName]);

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
    setIsSnackbarClosed(true);
  };

  const hdlUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
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
      setIsSnackbarClosed(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSeverity("error");
        setOpenSnackbar(true);
        setIsSnackbarClosed(false);
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
            className={`${themeClassName} w-16 h-16 overflow-hidden bg-formBg rounded-full mb-4 border border-formBorderColor`}
            width={54}
            height={54}
          />
          <button
            className={`${themeClassName} px-2 py-1 h-6 rounded-lg bg-formButtonBg text-xs text-formButtonText hover:bg-formButtonBgHover 
                        hover:text-formButtonTextHover hover:border hover:border-formButtonBorder
                        disabled:bg-formButtonBgDisabled disabled:pointer-events-none`}
            onClick={hdlChangePicture}
            disabled={userData.isGuest}
          >
            Change picture
          </button>
        </div>
        <label
          htmlFor="account"
          className={`${themeClassName} text-sm text-defaultColor`}
        >
          Account
        </label>
        <input
          type="email"
          id="account"
          name="account"
          className={`${themeClassName} mb-4 w-full border border-formBorderColor rounded-md bg-formBgDisabled pl-2`}
          value={userData.email}
          disabled
        />
        <label
          htmlFor="name"
          className={`${themeClassName} text-sm text-defaultColor`}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`${themeClassName} mb-4 w-full border border-formBorderColor rounded-md pl-2 disabled:bg-formBgDisabled`}
          value={name}
          onChange={hdlNameChange}
          disabled={userData.isGuest}
        />
        <input
          className="hidden"
          ref={profileFileRef}
          type="file"
          onChange={hdlFileChange}
          accept="jpg, jpeg"
        />
        <label
          htmlFor="color-theme"
          className={`${themeClassName} text-sm text-defaultColor`}
        >
          Color Theme
        </label>
        <select
          id="color-theme"
          name="color-theme"
          className={`${themeClassName} w-full border border-formBorderColor rounded-md pl-2`}
          onChange={hdlThemeChange}
          value={theme}
        >
          <option value={Themes.ThemeLight}>Light</option>
          <option value={Themes.ThemeDark}>Dark</option>
        </select>
        <button
          className={`${themeClassName} mt-6 px-2 py-1 rounded-lg bg-formButtonBg text-formButtonText font-bold 
                      hover:bg-formButtonBgHover hover:text-formButtonTextHover hover:border hover:border-formButtonBorder 
                      disabled:bg-formButtonBgDisabled disabled:text-formButtonTextDisabled`}
          onClick={hdlUpdate}
          disabled={updateBtnDisable}
          type="submit"
        >
          Update
        </button>
      </form>

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
