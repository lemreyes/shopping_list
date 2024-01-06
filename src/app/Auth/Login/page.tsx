import LoginPanel from "./Components/LoginPanel";
import Image from "next/image";
import firstImage from "../../../../public/assets/one.jpg";
import secondImage from "../../../../public/assets/two.jpg";
import thirdImage from "../../../../public/assets/three.jpg";

export default function Login() {
  return (
    <div className="desktop:grid desktop:grid-cols-3 desktop:w-full desktop:h-screen p-4 desktop:p-0">
      <div id="landing" className="col-span-2 px-8 py-4 block">
        <h1 className="text-6xl mb-8">
          Welcome to List
          <span className="text-green-600 font-bold">Easy</span>
        </h1>
        <section>
          <picture>
            <source srcSet="/assets/hero.jpg" media={`(min-width: 480px)`} />

            <img src="/assets/hero_mobile.jpg" alt="hero" />
          </picture>
          <h2 className="font-bold text-5xl mb-8">
            Your Ultimate Shopping Companion!
          </h2>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-y-4 tablet:flex-row tablet:gap-x-4 tablet:gap-y-0 mb-8 p-8 border border-green-900 rounded-2xl">
            <Image
              src={firstImage}
              alt="shopping with mobile phone"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={300}
              height={300}
            />
            <div className="flex flex-col gap-y-8">
              <h3 className="font-bold text-3xl">
                Your Shopping List Always With You
              </h3>
              <p className="mb-4 tablet:leading-6 tablet:tracking-wider">
                Never miss an item at the grocery store again! With ListEasy,
                your shopping experience is about to get a whole lot smoother.
                Say goodbye to those last-minute frantic runs to the store and
                embrace the convenience of organized shopping at your
                fingertips.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 tablet:flex-row tablet:gap-x-4 tablet:gap-y-0 mb-8 p-8 border border-green-900 rounded-2xl">
            <Image
              src={secondImage}
              alt="mom planning shopping"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={300}
              height={300}
            />
            <div className="flex flex-col gap-y-8">
              <h3 className="font-bold text-3xl">Easy Planning</h3>
              <p className="mb-4">
                Effortlessly plan your shopping with your master list of grocery
                items. You have the ability to add new items and categories to
                the master list, you have the power to customize your shopping
                experience according to your unique preferences and needs.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 tablet:flex-row tablet:gap-x-4 tablet:gap-y-0 mb-8 p-8 border border-green-900 rounded-2xl">
            <Image
              src={thirdImage}
              alt="occassion icons"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={300}
              height={300}
            />
            <div className="flex flex-col gap-y-8">
              <h3 className="font-bold text-3xl">A List For Every Occassion</h3>
              <p className="mb-4">
                But that is not all! ListEasy offers the flexibility to create
                multiple lists, empowering you to stay on top of various
                shopping needs, whether it is for your weekly groceries, special
                occasions, or upcoming events. Seamlessly switch between lists
                and keep track of everything you need with just a few taps.
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-5xl text-green-600 mb-8">
              Sign up now!
            </h2>
            <p className="mb-4">
              Embrace the convenience, simplicity, and organization that
              ListEasy brings to your shopping routine. Let us take the hassle
              out of your shopping trips so you can focus on the things that
              truly matter. Sign in to ListEasy now and unlock a smarter, more
              efficient way to shop!
            </p>
          </div>
        </section>
      </div>
      <LoginPanel />
    </div>
  );
}
