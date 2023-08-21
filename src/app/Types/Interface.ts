interface Category {
  id: string;
  category_name: string;
  items: Array<Item>;
}

interface Item {
  id: string;
  name: string;
  quantity: string;
}
