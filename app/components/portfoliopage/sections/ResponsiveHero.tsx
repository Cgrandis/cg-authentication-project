"use client";

import Image from "next/image";
import styles from "../styles/style";
import GetStarted from "../shared/GetStarted";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../shared/motionVariants";

const ResponsiveHero = () => {
  return (
    <motion.section
      id="home"
      className="w-full bg-black text-white py-16"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={containerVariants}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start px-6 sm:px-10 lg:px-16 xl:px-20 gap-10">

        <motion.header
          className="flex-1 flex flex-col justify-start"
          variants={containerVariants}
        >
          <motion.div
            className={`flex items-center justify-center py-2 px-4 ${styles.gradients.discount} rounded-[10px] mb-4`}
            variants={itemVariants}
          >
            <Image
              src="/examples/ResponsiveHero.png"
              alt="Ícone ilustrativo"
              width={28}
              height={28}
              className="object-contain mr-2"
            />
            <p className={`${styles.paragraph} text-center w-full`}>
              Exemplo de <span className="text-white font-semibold">Hero Responsivo</span>
            </p>
          </motion.div>

          <motion.div
            className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 sm:mt-10"
            variants={itemVariants}
          >
            <div className="flex-1 text-center sm:text-left">
              <motion.h1
                className="font-poppins font-semibold text-[42px] sm:text-[56px] leading-tight sm:leading-[64px]"
                variants={itemVariants}
              >
                The Next
              </motion.h1>
              <motion.h1
                className={`font-poppins font-semibold text-[42px] sm:text-[56px] leading-tight sm:leading-[64px] mt-2 ${styles.gradients.text}`}
                variants={itemVariants}
              >
                Generation
              </motion.h1>
            </div>

            <motion.div
              className="mt-6 sm:mt-0 sm:ml-4 self-center sm:self-auto"
              variants={itemVariants}
            >
              <GetStarted />
            </motion.div>
          </motion.div>

          <motion.h2
            className="font-poppins font-semibold text-[34px] sm:text-[44px] leading-tight mt-8"
            variants={itemVariants}
          >
            Payment Method.
          </motion.h2>

          <motion.p
            className={`${styles.paragraph} max-w-xl mt-4`}
            variants={itemVariants}
          >
            Our team of experts uses a methodology to identify the credit cards
            most likely to fit your needs. We examine annual percentage rates,
            annual fees.
          </motion.p>
        </motion.header>

        <motion.div
          className="flex-1 relative min-h-[320px] md:min-h-[500px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <Image
            src="/examples/ResponsiveHero.png"
            alt="Billing illustration"
            width={500}
            height={500}
            className="object-contain relative z-[5] w-full h-auto"
          />
          <div className={`absolute z-[0] w-[40%] h-[35%] top-0 ${styles.gradients.pink}`} />
          <div className={`absolute z-[1] w-[80%] h-[80%] rounded-full ${styles.gradients.white} bottom-40`} />
          <div className={`absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 ${styles.gradients.blue}`} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ResponsiveHero;
