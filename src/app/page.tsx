import Navbar from "./Components/Navbar";
import Masterlist from "./Components/Masterlist";

export default function Home() {
  return (
    <div className="flex flex-row">
      <Navbar />
      <Masterlist />
    </div>
  );
}
