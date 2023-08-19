import React from "react";
import Item from "./Item";

export default function Masterlist() {
  return (
    <main className="ml-16 mt-8">
      <h1 className="text-4xl ">
        <span className="text-orange-600 font-bold">SyncShop</span> seamlessly
        share and shop together with real-time list updates
      </h1>
      <h2 className="text-lg">Fruit and vegetables</h2>
      <Item label="Avocado" />
    </main>
  );
}
