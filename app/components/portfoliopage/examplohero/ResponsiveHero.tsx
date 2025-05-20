"use client";

import Image from "next/image";
import styles from "./style";
import GetStarted from "./GetStarted";

const ResponsiveHero = () => {
  const pinkGradient = "bg-gradient-to-r from-pink-300 to-pink-600 filter blur-[900px]";
  const whiteGradient = "bg-white bg-opacity-60 filter blur-[750px]";
  const blueGradient = "bg-gradient-to-t from-transparent via-blue-800 to-transparent filter blur-[123px]";
  const bgDiscountGradient = "bg-gradient-to-tr from-gray-700 to-indigo-900";
  const textGradient = "bg-gradient-to-br from-teal-100 via-teal-200 to-teal-500 text-transparent bg-clip-text";

  return (
    <section id="home" className={`w-full bg-black text-white py-12`}>
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start px-6 sm:px-10 lg:px-16 xl:px-20 gap-10">
        
        <div className="flex-1 flex flex-col justify-start">
          <div className={`flex items-center justify-center py-2 px-4 ${bgDiscountGradient} rounded-[10px] mb-4`}>
            <Image
              src="https://i.imgur.com/5BZrGDw.png"
              alt="discount"
              width={32}
              height={32}
              className="object-contain mr-2"
            />
            <p className={`${styles.paragraph} text-center w-full`}>
              Exemplo de <span className="text-white font-semibold">Hero Responsivo</span>
            </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-10">
              <div className="flex-1 text-center sm:text-left">
                <h1 className="font-poppins font-semibold text-[42px] sm:text-[56px] leading-tight sm:leading-[64px]">
                  The Next
                </h1>
                <h1 className={`font-poppins font-semibold text-[42px] sm:text-[56px] leading-tight sm:leading-[64px] mt-2 ${textGradient}`}>
                  Generation
                </h1>
              </div>

            <div className="mt-4 sm:mt-0 sm:ml-4 self-center sm:self-auto">
              <GetStarted />
            </div>
          </div>

          <h2 className="font-poppins font-semibold text-[38px] sm:text-[48px] leading-tight mt-4">
            Payment Method.
          </h2>
          <p className={`${styles.paragraph} max-w-xl mt-5`}>
            Our team of experts uses a methodology to identify the credit cards
            most likely to fit your needs. We examine annual percentage rates,
            annual fees.
          </p>
        </div>

        <div className="flex-1 relative min-h-[350px] md:min-h-[500px]">
          <Image
            src="/examples/ResponsiveHero.png"
            alt="billing"
            width={500}
            height={500}
            className="object-contain relative z-[5] w-full h-auto"
          />

          <div className={`absolute z-[0] w-[40%] h-[35%] top-0 ${pinkGradient}`} />
          <div className={`absolute z-[1] w-[80%] h-[80%] rounded-full ${whiteGradient} bottom-40`} />
          <div className={`absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 ${blueGradient}`} />
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHero;
