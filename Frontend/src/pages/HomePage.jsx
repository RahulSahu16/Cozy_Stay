import HomePageSearchBar from "../components/Homepage/HomePageSearchBar";
import HomePageFeaturedHomes from "../components/Homepage/HomePageFeaturedHomes";
import HomePageFooter from "../components/Homepage/HomePageFooter";
import HomePageHeroSection from "../components/Homepage/HomePageHeroSection";
import HomePagePopularDestination from "../components/Homepage/HomePagePopularDestination";


function Homepage() {
  return (
    <div className="bg-[#d6d1c3] text-white min-h-screen">
      <HomePageHeroSection />
      <HomePageSearchBar />
      <HomePagePopularDestination />
      <HomePageFeaturedHomes />
      <HomePageFooter />
    </div>
  );
}

export default Homepage;
