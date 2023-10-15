type QueryProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

type TCategory = {
  id: number;
  category_name: string;
  items: Array<TItem>;
};

type TItem = {
  id: number;
  item_name: string;
  quantity: number;
  is_purchased: boolean;
};

type TShoppingListCategory = {
  id: number;
  category_name: string;
  items: Array<TShoppingListItem>;
};

type TShoppingListItem = {
  id: number;
  quantity: number;
  is_purchased: boolean;
  listed_item_name: string;
  listId: number;
  categoryId: number;
  masterItemId: number;
};

type TUserData = {
  id: number;
  email: string;
  image?: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;
};

type TList = {
  id: number;
  list_name: string;
  is_done: boolean;
  ownerId: number;
  updated_at: Date;
};
