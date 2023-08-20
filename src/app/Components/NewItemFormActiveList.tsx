import { MouseEventHandler } from "react";

export default function NewItemFormActiveList({
  cancelHandler,
  addHandler,
}: {
  cancelHandler: MouseEventHandler<HTMLButtonElement> | undefined;
  addHandler: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Add a new item</h2>
      <form>
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter a name"
          className="text-sm px-2 py-2 rounded-2xl w-full mt-1 mb-8"
          required
        />
        <label htmlFor="note" className="text-sm">
          Note (optional)
        </label>
        <textarea
          id="note"
          name="note"
          rows={5}
          className="text-sm px-2 py-2 rounded-2xl w-full mt-1 mb-8"
        />
        <label htmlFor="image" className="text-sm">
          Image (Optional)
        </label>
        <input
          type="text"
          id="image"
          name="image"
          className="text-sm px-2 py-2 rounded-2xl w-full mt-1 mb-8"
        />
        <label htmlFor="category" className="text-sm">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="text-sm px-2 py-2 rounded-2xl w-full mt-1 mb-8"
        ></select>
      </form>
      <div className="flex flex-row justify-evenly">
        <button
          onClick={cancelHandler}
          className="px-4 py-2 border rounded-2xl border-gray-600"
        >
          cancel
        </button>
        <button
          onClick={addHandler}
          className="px-4 py-2 border rounded-2xl border-gray-600 bg-gray-600 text-white"
        >
          Add to list
        </button>
      </div>
    </div>
  );
}
