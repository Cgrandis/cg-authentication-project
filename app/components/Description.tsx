"use client";

import AboutMe from "@/app/components/ui/AboutMe";

export default function Description() {
  return (
    <section className="w-full bg-[#F9FAFB] py-3 px-6 md:px-0">
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-5 md:p-2 border border-gray-200">
          <AboutMe />
        </div>
      </div>
    </section>
  );
}
