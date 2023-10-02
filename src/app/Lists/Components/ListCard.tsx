import calendar_icon from "../../../../public/assets/calendar_icon.svg";
import Image from "next/image";

export default function ListCard({
  id,
  list_name,
  updated_at,
  is_done,
  list_url,
}: {
  id: number;
  list_name: string;
  updated_at: Date;
  is_done: boolean;
  list_url: string;
}) {
  return (
    <article className="border border-gray-200 p-4">
      <h2 className="text-xl font-bold">{list_name}</h2>
      <div className="flex flex-row items-center">
        <Image src={calendar_icon} alt="calendar_icon" className="w-8 mr-2" />
        {updated_at.toDateString()}
      </div>
      <div className="p-2 border border-gray-600 bg-gray-200 rounded-3xl align-middle text-center">{is_done ? "Finished" : "Not finished"}</div>
      <div>
        <p>Preview is here...</p>
      </div>
    </article>
  );
}
