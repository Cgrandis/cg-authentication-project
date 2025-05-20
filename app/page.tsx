import MainHeader from "@/app/components/MainHeader";
import Hero from "@/app/components/Hero";
import Description from "@/app/components/Description";
import MainFooter from "@/app/components/MainFooter";

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
