interface Category {
  id: number;
  category_name: string;
  items: Array<Item>;
}

interface Item {
  id: number;
  item_name: string;
  quantity: number;
  is_purchased: boolean;
}

interface ShoppingListCategory {
  id: number;
  category_name: string;
  items: Array<ShoppingListItem>;
}

interface ShoppingListItem {
  id: number;
  quantity: number;
  is_purchased: boolean;
  listed_item_name: string;
  listId: number;
  categoryId: number;
  masterItemId: number;
}

interface IUserData {
  id: number;
  email: string;
  image?: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface IList {
  id: number;
  list_name: string;
  is_done: boolean;
  ownerId: number;
  updated_at: Date;
}
