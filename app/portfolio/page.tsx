import MainHeader from "@/app/components/MainHeader";
import MainFooter from "@/app/components/MainFooter";
import Introduction from "@/app/components/portfoliopage/Introduction";
import PortfolioLinks from "../components/portfoliopage/PortfolioLinks";
import ResponsiveHero from "../components/portfoliopage/examplohero/ResponsiveHero";


export default function HomePage() {
  return (
    <div className="w-full">
      <MainHeader />
      <Introduction />
      <PortfolioLinks />
      <ResponsiveHero />
      <MainFooter />
    </div>
  );
}
