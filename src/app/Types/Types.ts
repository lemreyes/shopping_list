import { Themes } from "./Enums";

export type QueryProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export type TCategory = {
  id: number;
  category_name: string;
  items: Array<TItem>;
};

export type TItem = {
  id: number;
  item_name: string;
  quantity: number;
  is_purchased: boolean;
};

export type TShoppingListCategory = {
  id: number;
  category_name: string;
  items: Array<TShoppingListItem>;
};

export type TShoppingListItem = {
  id: number;
  quantity: number;
  is_purchased: boolean;
  listed_item_name: string;
  listId: number | null;
  categoryId: number | null;
  categoryName: string;
  masterItemId: number | null;
};

export type TUserData = {
  id: number;
  email: string;
  image?: string;
  name?: string;
  theme: Themes;
  isGuest: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type TList = {
  id: number;
  list_name: string;
  is_done: boolean;
  ownerId: number | null;
  updated_at: Date;
};
