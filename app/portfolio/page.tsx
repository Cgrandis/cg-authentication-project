import MainHeader from "@/app/components/landingpage/MainHeader";
import MainFooter from "@/app/components/landingpage/MainFooter";
import Introduction from "@/app/components/portfoliopage/sections/Introduction";
import PortfolioLinks from "../components/portfoliopage/sections/PortfolioLinks";
import ResponsiveHero from "../components/portfoliopage/sections/ResponsiveHero";
import FixerHero from "../components/portfoliopage/sections/CurrencyExchangeHero";

export default function HomePage() {
  return (
    <div className="w-full">
      <MainHeader />
      <Introduction />
      <PortfolioLinks />
      <ResponsiveHero />
      <FixerHero />
      <MainFooter />
    </div>
  );
}
