import LoginPanel from "./Components/LoginPanel";

export default function Login() {
  return (
    <div className="desktop:grid desktop:grid-cols-3 desktop:w-full desktop:h-screen p-4 desktop:p-0">
      <div id="landing" className="col-span-2 px-8 py-4 block">
        <h1 className="text-5xl mb-8">
          Welcome to List
          <span className="text-green-600 font-bold">Easy</span>
        </h1>
        <h2 className="font-bold text-xl">Your Ultimate Shopping Companion!</h2>
        <section className="mt-8">
          <p className="mb-4">
            Never miss an item at the grocery store again! With ListEasy, your
            shopping experience is about to get a whole lot smoother. Say
            goodbye to those last-minute frantic runs to the store and embrace
            the convenience of organized shopping at your fingertips.
          </p>
          <p className="mb-4">
            Effortlessly plan your shopping with your master list of grocery
            items. You have the ability to add new items and categories to the
            master list, you have the power to customize your shopping
            experience according to your unique preferences and needs.
          </p>
          <p className="mb-4">
            But that is not all! ListEasy offers the flexibility to create
            multiple lists, empowering you to stay on top of various shopping
            needs, whether it is for your weekly groceries, special occasions,
            or upcoming events. Seamlessly switch between lists and keep track
            of everything you need with just a few taps.
          </p>
          <p className="mb-4">
            Embrace the convenience, simplicity, and organization that ListEasy
            brings to your shopping routine. Let us take the hassle out of your
            shopping trips so you can focus on the things that truly matter.
            Sign in to ListEasy now and unlock a smarter, more efficient way to
            shop!
          </p>
        </section>
      </div>
      <LoginPanel />
    </div>
  );
}
