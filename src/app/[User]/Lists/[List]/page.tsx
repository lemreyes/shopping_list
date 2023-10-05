import Navbar from "@/app/Components/Navbar";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function List(props: Props) {
  console.log("searchParams", props);
  console.log(typeof props);
  return (
    <>
      <Navbar />
      <h1>{props.searchParams.id}</h1>
    </>
  );
}
