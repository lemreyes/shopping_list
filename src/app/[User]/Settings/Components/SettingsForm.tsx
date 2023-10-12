"use client";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import profile_icon from "../../../../../public/assets/profile.svg";
import Image from "next/image";
import { useSnackbarStore } from "@/app/Store/snackbar_store";
import { updateSetting } from "@/app/Services/fetchWrapper";

export default function SettingsForm({ userData }: { userData: IUserData }) {
  const profileFileRef = useRef<HTMLInputElement | null>(null);
  const [srcPreview, setSrcPreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState(userData.name);

  const setSnackbarMessage = useSnackbarStore((state: any) => state.setMessage);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  useEffect(() => {
    setSrcPreview(userData.image as string);
  }, [userData.image]);

  const hdlNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const hdlChangePicture = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (profileFileRef.current) {
      profileFileRef.current.click();
    }
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

  const hdlUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const responseData = await updateSetting(userData.id, imageFile, name);
      console.log("Response data: ", responseData);

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
      </form>
      <button
        className="mt-6 px-2 py-1 rounded-lg bg-gray-600 text-white font-bold hover:bg-white hover:text-gray-800 hover:border hover:border-gray-600"
        onClick={hdlUpdate}
      >
        Update
      </button>
    </>
  );
}
