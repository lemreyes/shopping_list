import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { useMasterlistStore } from "../Store/masterlist_store";
import {
  createItemWithNewCategory,
  createNewItem,
} from "../Services/fetchWrapper";
import { useSnackbarStore } from "../Store/snackbar_store";
import { TCategory } from "../Types/Types";

export default function NewItemFormActiveList({
  cancelHandler,
}: {
  cancelHandler: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const NEW_CATEGORY_ID = 0;

  const categories: Array<TCategory> = useMasterlistStore(
    (state: any) => state.categories
  );

  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [itemName, setItemName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isAddButtonDisable, setIsAddButtonDisable] = useState(true);
  const masterlist = useMasterlistStore((state: any) => state.categories);
  const updateMaterList = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  const setSnackbarMessage = useSnackbarStore((state: any) => state.setMessage);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  useEffect(() => {
    if (
      showNewCategoryInput === true &&
      newCategoryName.length > 0 &&
      itemName.length > 0
    ) {
      setIsAddButtonDisable(false);
    } else if (showNewCategoryInput === false && itemName.length > 0) {
      setIsAddButtonDisable(false);
    } else {
      setIsAddButtonDisable(true);
    }
  }, [showNewCategoryInput, newCategoryName, itemName]);

  const hdlSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    if (parseInt(event.currentTarget.value) === NEW_CATEGORY_ID) {
      setShowNewCategoryInput(true);
    } else {
      setShowNewCategoryInput(false);
    }

    setSelectedCategory(parseInt(event.currentTarget.value));
  };

  const hdlItemNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const hdlNewCategoryInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const hdlAddItem = async () => {
    const newMasterList: Array<TCategory> = [...masterlist];
    try {
      if (selectedCategory === 0) {
        // add category
        const responseData = await createItemWithNewCategory(
          newCategoryName,
          itemName
        );

        const { categoryId, itemId } = responseData;

        // update masterlist store
        const newItem = {
          id: itemId,
          item_name: itemName,
          quantity: 0,
          is_purchased: false,
        };

        newMasterList.push({
          id: categoryId,
          category_name: newCategoryName,
          items: [newItem],
        });
        updateMaterList(newMasterList);

        setSnackbarMessage(
          `${newCategoryName} category and ${itemName} item was successfully added.`
        );
        setSeverity("success");
        setOpenSnackbar(true);

        return;
      } else {
        const responseData = await createNewItem(itemName, selectedCategory);

        const categoryIndex: number = newMasterList.findIndex(
          (categoryInList: TCategory) => categoryInList.id === selectedCategory
        );

        // update masterlist store
        newMasterList[categoryIndex].items.push(responseData);
        updateMaterList(newMasterList);

        setSnackbarMessage(
          `${responseData.item_name} item was successfully added.`
        );
        setSeverity("success");
        setOpenSnackbar(true);

        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Add a new item</h2>
      <form>
        <label htmlFor="category" className="text-sm">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="text-sm px-2 py-2 rounded-2xl w-full mt-1 mb-8"
          onChange={hdlSelectChange}
        >
          <option value="Select a category">-- Select a Category --</option>
          <option key={NEW_CATEGORY_ID} value={NEW_CATEGORY_ID}>
            New category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        {showNewCategoryInput && (
          <section>
            <label htmlFor="newCategory" className="text-sm">
              New category
            </label>
            <br />
            <input
              type="text"
              id="newCategory"
              name="newCategory"
              placeholder="Enter new category name"
              className="text-sm px-2 py-2 rounded-2xl w-full mt-1 mb-8"
              onChange={hdlNewCategoryInputChange}
              required
            />
          </section>
        )}
        <label htmlFor="name" className="text-sm">
          Item Name
        </label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter the item name"
          className="text-sm px-2 py-2 rounded-2xl w-full mt-1 mb-8"
          onChange={hdlItemNameChange}
          required
        />
      </form>
      <div className="flex flex-row justify-evenly">
        <button
          onClick={cancelHandler}
          className="px-4 py-2 border rounded-2xl border-gray-600 hover:text-white hover:bg-gray-600"
        >
          cancel
        </button>
        <button
          onClick={hdlAddItem}
          className={`px-4 py-2 border rounded-2xl bg-green-700 text-white
                      ${
                        isAddButtonDisable === false
                          ? "hover:text-green-700 hover:bg-white hover:border-green-700"
                          : "disabled:border-gray-600 disabled:bg-gray-600 disabled:text-white"
                      }`}
          disabled={isAddButtonDisable}
        >
          Add to list
        </button>
      </div>
    </div>
  );
}
