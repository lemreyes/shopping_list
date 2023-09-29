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

interface ShoppingListItem extends Item {
  list_id: number;
  category_id: number;
  master_item_id: number;
}
