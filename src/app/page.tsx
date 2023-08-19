import Navbar from "./Components/Navbar";
import Masterlist from "./Components/Masterlist";
import ActiveListPanel from "./Components/ActiveListPanel";

export default function Home() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <Navbar />
        <Masterlist />
      </div>
      <ActiveListPanel />
    </div>
  );
}
