import Item from "./Item";

export default function CategoryGroup({ category }: { category: Category }) {
  return (
    <div key={category.id}>
      <h3 className="text-lg font-medium mt-8">{category.category_name}</h3>
      {category.items.length > 0 ? (
        category.items.map((item: any) => {
          console.log("Item", item);
          return <Item key={item.id} label={item.name} />;
        })
      ) : (
        <p>No items listed.</p>
      )}
    </div>
  );
}