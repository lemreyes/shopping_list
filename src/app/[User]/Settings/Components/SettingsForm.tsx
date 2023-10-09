import profile_icon from "../../../../../public/assets/profile.svg";
import Image from "next/image";

export default function SettingsForm() {
  return (
    <>
      <form>
        <div className="flex flex-row items-baseline">
          <Image
            src={profile_icon}
            alt="profile picture"
            className="p-1 w-16 bg-gray-400 rounded-full mb-4 "
          />
          <button className="px-2 py-1 h-6 rounded-lg bg-gray-600 text-xs text-white hover:bg-white hover:text-gray-800 hover:border hover:border-gray-600">
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
          className="mb-4 w-full border border-gray-400 rounded-md bg-gray-200"
          disabled
        />
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full border border-gray-400 rounded-md"
        />
      </form>
      <button className="mt-6 px-2 py-1 rounded-lg bg-gray-600 text-white font-bold hover:bg-white hover:text-gray-800 hover:border hover:border-gray-600">
        Update
      </button>
    </>
  );
}
