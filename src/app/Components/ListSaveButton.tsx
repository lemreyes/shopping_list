import React from "react";

export default function ListSaveButton() {
    return <div className="flex flex-row">
        <input type="text" placeholder="Name of list" className="py-2 pl-2 pr-8 rounded-lg border border-gray-700" />
        <input type="submit" value="Save" className="p-2 bg-gray-700 border border-gray-700 text-white rounded-lg -ml-8" />
    </div>
}
