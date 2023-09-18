"use client";

import Navbar from "./Components/Navbar";
import Masterlist from "./Components/Masterlist";
import ActiveListPanel from "./Components/ActiveListPanel";

import { useMasterlistStore } from "./Store/masterlist_store";
import { useSession } from "next-auth/react";
import { redirect } from "Next/navigation";

/////////////////////////////////////////////////
// TEST DATA
const MASTER_LIST = [
  {
    category_name: "Fruits and Vegetables",
    items: [
      { name: "Apples", id: "1" },
      { name: "Bananas", id: "2" },
    ],
    id: "1",
  },
  {
    category_name: "Beverages",
    items: [
      { name: "Orange Juice", id: "1" },
      { name: "Milk", id: "2" },
    ],
    id: "2",
  },
  { category_name: "Kitchen", items: [{ name: "Noodles", id: "1" }], id: "3" },
  {
    category_name: "Grains",
    items: [
      { name: "Ganador", id: "1" },
      { name: "Cornflakes", id: "2" },
    ],
    id: "4",
  },
  {
    category_name: "Bread",
    items: [{ name: "Ichipan Slice Bread", id: "1" }],
    id: "5",
  },
  {
    category_name: "Canned Food",
    items: [
      { name: "Spam", id: "1" },
      { name: "Century Tuna", id: "2" },
      { name: "Vienna Sausage", id: "3" },
      { name: "Hereford Corned Beef", id: "4" },
    ],
    id: "6",
  },
  {
    category_name: "Cleaning",
    items: [
      { name: "Domex Blue Toilet Bowl Cleaner", id: "1" },
      { name: "Domex Yellow Stain and Limescale Cleaner", id: "2" },
      { name: "Cif All Around Cleaner", id: "3" },
      { name: "Ariel Liquid Detergent", id: "4" },
      { name: "Ajax Dishwashing Liquid", id: "5" },
      { name: "Scotchbrite", id: "6" },
    ],
    id: "7",
  },
  {
    category_name: "Condiments",
    items: [
      { name: "Golden Fiesta Palm Cooking Oil", id: "1" },
      { name: "Iodized Salt", id: "2" },
      { name: "Del Monte Ketchup", id: "3" },
    ],
    id: "8",
  },
  {
    category_name: "Hygiene",
    items: [
      { name: "Old Spice High Endurance Deo", id: "1" },
      { name: "Dove Body Soap Mens", id: "2" },
      { name: "Modess with wings", id: "3" },
      { name: "Carefree Pantiliners", id: "4" },
      { name: "PH Care Feminine Wash", id: "5" },
      { name: "Cottonbuds", id: "6" },
      { name: "Hygienix Alcohol", id: "7" },
    ],
    id: "9",
  },
  {
    category_name: "Candies",
    items: [],
    id: "10",
  },
];

////////////////////////////////////////////////

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  // update masterlist store
  const updateCategories = useMasterlistStore(
    (state: any) => state.updateCategories
  );
  updateCategories(MASTER_LIST);
  console.log("HOME");

  if (session) {
    return (
      <div className="flex flex-col desktop:flex-row">
        <Navbar />
        <Masterlist />
        <ActiveListPanel />
      </div>
    );
  } else if (session === null) {
    redirect("/Auth/Login");
  } else {
    // should still be loading
  }
}
