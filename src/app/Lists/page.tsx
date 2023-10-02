import Navbar from "../Components/Navbar";
import ListCard from "./Components/ListCard";

export default function Lists() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
      <div className="w-4/5">
        <h1 className="text-3xl font-bold mt-2 mb-4">Lists</h1>
        <ListCard
          key={1}
          id={1}
          list_name={"List Sample"}
          updated_at={new Date()}
          is_done={false}
          list_url={"localhost:3000/Lists/List1"}
        />
      </div>
      </div>
    </>
  );
}
