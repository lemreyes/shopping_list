import { Themes } from "@/app/Types/Enums";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";
import Image from "next/image";
import reopen_icon from "@/../public/assets/reopen_icon.svg";
import copy_icon from "@/../public/assets/duplicate_icon.svg";
import archive_icon from "@/../public/assets/archive_icon.svg";

export default function ListPanel({
  isArchived,
  theme,
}: {
  isArchived: boolean;
  theme: Themes;
}) {
  const themeClassName = getThemeClassName(theme);

  return (
    <div className={`${themeClassName} flex flex-row justify-between mt-8`}>
      {isArchived ? (
        <button
          className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                        hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
        >
          <Image src={reopen_icon} className={`w-8 mr-2`} alt="reopen icon" />
          Reopen this list
        </button>
      ) : (
        <button
          className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                        hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
        >
          <Image src={archive_icon} className={`w-8 mr-2`} alt="archive icon" />
          Archive this list
        </button>
      )}
      <button
        className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                    hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
      >
        <Image src={copy_icon} className={`w-8 mr-2`} alt="copy icon" />
        Copy this List
      </button>
    </div>
  );
}
