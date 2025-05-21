"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useExchangeRates } from "@/app/hooks/portfoliohooks/useExchangeRates";
import { getFlagUrl } from "@/app/utils/getFlagUrl";
import { containerVariants, itemVariants } from "../shared/motionVariants";

export default function CurrencyExchangeHero() {
  const { rates, error, loading } = useExchangeRates(["USD", "BRL", "AUD"], "EUR");

  return (
    <motion.section
      id="exchange"
      className="w-full bg-black text-white py-16"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={containerVariants}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col items-center px-6 sm:px-10 lg:px-16 xl:px-20 gap-10">
        <motion.header
          className="w-full text-center"
          variants={containerVariants}
        >
          <motion.h2
            className="font-poppins font-semibold text-[34px] sm:text-[44px] leading-tight"
            variants={itemVariants}
          >
            Taxas de Câmbio em Tempo Real
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Conversões baseadas em EUR via API pública da ExchangeRate
          </motion.p>
        </motion.header>

        {error && (
          <motion.p
            className="text-red-500 font-medium mt-4"
            variants={itemVariants}
          >
            Erro: {error}
          </motion.p>
        )}

        {loading && !rates && (
          <motion.p
            className="text-gray-400 mt-4"
            variants={itemVariants}
          >
            Carregando cotações...
          </motion.p>
        )}

        {rates && (
          <motion.div
            className="grid sm:grid-cols-3 gap-6 mt-6 w-full"
            variants={itemVariants}
          >
            {Object.entries(rates).map(([currency, value]) => {
              const flagInfo = getFlagUrl(currency);

              return (
                <motion.div
                  key={currency}
                  className="bg-[#051326] bg-opacity-80 rounded-lg p-6 flex flex-col items-center"
                  variants={itemVariants}
                >
                  {flagInfo && (
                    <div className="flex items-center gap-2 mb-4">
                      <Image
                        src={flagInfo.url}
                        alt={`${currency} flag`}
                        width={32}
                        height={24}
                        className="rounded shadow-md"
                      />
                      <span className="text-white text-sm font-medium">
                        {flagInfo.country}
                      </span>
                    </div>
                  )}

                  <p className="text-2xl font-bold text-white">
                    {value.toFixed(4)}{" "}
                    <span className="text-gray-300 font-medium">
                      {currency}
                    </span>
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
