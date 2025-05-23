import MainHeader from "@/app/components/landingpage/MainHeader";
import Hero from "@/app/components/landingpage/Hero";
import Description from "@/app/components/landingpage/Description";
import MainFooter from "@/app/components/landingpage/MainFooter";

export default function HomePage() {
  return (
    <div className="w-full">
      <MainHeader />
      <Hero />
      <Description />
      <MainFooter />
    </div>
  );
}
