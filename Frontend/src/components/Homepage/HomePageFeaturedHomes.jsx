import HomeCard from "./HomepageCard";

function FeaturedHomes() {

  const homes = [
    {
      id: 1,
      title: "Luxury Villa in Goa",
      price: "₹4,500/night",
      image: "https://lh3.googleusercontent.com/proxy/KuDYH7yg_VUuhkIg1uQSBkTGXKpioykd3iw9yVkysAPMYD-1u8ea07Uc8MQ0681RBUnG7e4YCOzYGSS1l2qCAmk-hemOWIYdZTK78IasSjPTPQhgH2Lu0IqcVPrAZ-2lTtNt89Zw57p_YM6964jzB-GXQLF_qOQ=w287-h192-n-k-rw-no-v1",
    },
    {
      id: 2,
      title: "Cozy Cabin in Manali",
      price: "₹2,000/night",
      image: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIyMTQ1MTA3Njk1ODU0MDA3OQ%3D%3D/original/e93b7582-87bb-42f3-aeb7-604594788e4a.jpeg?im_w=720",
    },
    {
      id: 3,
      title: "Modern Apartment in Mumbai",
      price: "₹3,000/night",
      image: "https://www.piramalrealty.com/_next/image?url=%2Fimages%2FSea-facing-Mumbai-luxury-apartments.jpg&w=3840&q=75",
    },
    {
      id: 4,
      title: "Lake View Stay in Udaipur",
      price: "₹3,500/night",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/246067039.jpg?k=3b8eaf280c1a1e7e80b4a439941c7bc60807ace9f902d4d4af073f3f0207da4e&o=",
    },
    {
    id: 5,
    title: "Beachside Cottage in Kerala",
    price: "₹2,800/night",
    image: "https://b3681537.smushcdn.com/3681537/wp-content/uploads/2016/05/niraamaya-retreat-surya-samudra-kovalam-1024x600.jpg?lossy=2&strip=1&webp=1"
    },
    {
    id: 6,
    title: "Riverside Camp in Rishikesh",
    price: "₹1,500/night",
    image: "https://rishikeshcamp.in/img/rst/rishikeshcamp1.jpg"
    },
    {
    id: 7,
    title: "Heritage Haveli in Jaipur",
    price: "₹3,200/night",
    image: "https://r1imghtlak.mmtcdn.com/b17e5094151b11eb88730242ac110003.jpg"
    }
  ];

  return (
    <>
    
    <div className="px-10 mt-20">
  <h2 className="text-2xl font-bold mb-6 text-black">
    Featured Homes
  </h2>

  <div className="flex gap-6 overflow-x-auto scrollbar-hide">
    {homes.map((home) => (
      <HomeCard key={home.id} home={home} />
    ))}
  </div>
</div>
    </>
  );
}

export default FeaturedHomes;