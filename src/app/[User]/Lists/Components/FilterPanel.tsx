import { updateFilterOptions } from "@/app/Services/fetchWrapper";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React from "react";
import {
  convFilterOptionObjectToNumber,
  convNumberToFilterOptionObject,
} from "@/app/Utilities/clientUtils/listFilterOptionUtils";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface FilterOptions {
  open: boolean;
  archived: boolean;
}

export default function FilterPanel({
  theme,
  filterOptionsFromDb,
}: {
  theme: string;
  filterOptionsFromDb: number;
}) {
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    open: false,
    archived: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("Success");
  const [isSnackbarClosed, setIsSnackbarClosed] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const filterOptionObj: FilterOptions =
      convNumberToFilterOptionObject(filterOptionsFromDb);

    setFilterOptions({
      open: filterOptionObj.open,
      archived: filterOptionObj.archived,
    });
  }, [filterOptionsFromDb]);

  useEffect(() => {
    if (isSnackbarClosed === true) {
      window.location.reload();
    }
  });

  const hdlCheckboxFilterOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "open") {
      setFilterOptions((prev) => ({
        ...prev,
        open: event.target.checked,
      }));
    } else {
      setFilterOptions((prev) => ({
        ...prev,
        archived: event.target.checked,
      }));
    }
  };

  // update button disabled status when checkbox status is changed
  useEffect(() => {
    if (
      filterOptions["open"] === false &&
      filterOptions["archived"] === false
    ) {
      setIsUpdateButtonDisabled(true);
    } else {
      setIsUpdateButtonDisabled(false);
    }
  }, [filterOptions]);

  const hdlFilterUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const filterNum = convFilterOptionObjectToNumber(filterOptions);
      await updateFilterOptions(filterNum);

      setSnackbarMessage(`Filter options was successfully updated.`);
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

  return (
    <div
      className={`${theme} mt-2 px-2 py-1 border border-gray-200 flex flex-column align-middle`}
    >
      <h2 className={`${theme} text-defaultColor`}>Filter lists: </h2>
      <form className={`${theme} ml-2`}>
        <div>
          <input
            type="checkbox"
            id="openCheckbox"
            name="listFilter"
            value="open"
            className="mr-2 accent-colorBrand w-4 h-4"
            checked={filterOptions["open"]}
            onChange={hdlCheckboxFilterOnChange}
          />
          <label
            htmlFor="openCheckbox"
            className={`${theme} text-defaultColor text-sm`}
          >
            Show open lists
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="archiveCheckbox"
            name="listFilter"
            value="archived"
            className="mr-2 accent-colorBrand w-4 h-4"
            checked={filterOptions["archived"]}
            onChange={hdlCheckboxFilterOnChange}
          />
          <label
            htmlFor="archiveCheckbox"
            className={`${theme} text-defaultColor text-sm`}
          >
            Show archived lists
          </label>
        </div>
        <button
          className={`${theme} py-1 px-2 rounded-md bg-formButtonBg text-formButtonText text-sm
                        hover:bg-formButtonBgHover hover:text-formButtonTextHover
                        disabled:bg-formButtonBgDisabled disabled:text-formButtonTextDisabled`}
          onClick={hdlFilterUpdate}
          disabled={isUpdateButtonDisabled}
        >
          Update
        </button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
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
    </div>
  );
}
