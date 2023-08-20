import { MouseEventHandler } from "react";

export default function NewItemFormActiveList({
  cancelHandler,
}: {
  cancelHandler: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <aside>
      <h2>Add a new item</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="note">Note (Optional)</label>
        <input type="text" id="note" name="note" />
        <label htmlFor="image">Image (Optional)</label>
        <input type="text" id="image" name="image" />
        <label htmlFor="image">Category</label>
        <input type="text" id="category" name="category" required />
      </form>
      <div className="flex flex-row">
        <button onClick={cancelHandler}>cancel</button>
        <button>Add to list</button>
      </div>
    </aside>
  );
}
