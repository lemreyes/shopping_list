import { ChangeEvent, MouseEventHandler, useState } from "react";
import { useMasterlistStore } from "../Store/masterlist_store";

export default function NewItemFormActiveList({
  cancelHandler,
}: {
  cancelHandler: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const NEW_CATEGORY_ID = 0;

  const categories: Array<Category> = useMasterlistStore(
    (state: any) => state.categories
  );

  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [itemName, setItemName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const masterlist = useMasterlistStore((state: any) => state.categories);
  const updateMaterList = useMasterlistStore(
    (state: any) => state.updateCategories
  );

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
    const newMasterList: Array<Category> = [...masterlist];
    try {
      if (selectedCategory === 0) {
        // add category
        const response = await fetch("/api/categoryItem", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            categoryName: newCategoryName,
            itemName: itemName,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.errorMessage);
        }
        console.log("Response", response);

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

        // notify success
        console.log("success add category and item");

        return;
      } else {
        const response = await fetch("/api/item", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            itemName: itemName,
            categoryId: selectedCategory,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.errorMessage);
        }

        const categoryIndex: number = newMasterList.findIndex(
          (categoryInList: Category) => categoryInList.id === selectedCategory
        );

        // update masterlist store
        newMasterList[categoryIndex].items.push(responseData);
        updateMaterList(newMasterList);

        console.log("success add item");

        return;
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

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
          onChange={hdlItemNameChange}
          required
        />
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
              placeholder="Enter name of new category"
              className="text-sm px-2 py-2 rounded-2xl w-full mt-1 mb-8"
              onChange={hdlNewCategoryInputChange}
              required
            />
          </section>
        )}
      </form>
      <div className="flex flex-row justify-evenly">
        <button
          onClick={cancelHandler}
          className="px-4 py-2 border rounded-2xl border-gray-600"
        >
          cancel
        </button>
        <button
          onClick={hdlAddItem}
          className="px-4 py-2 border rounded-2xl border-gray-600 bg-gray-600 text-white"
        >
          Add to list
        </button>
      </div>
    </div>
  );
}
