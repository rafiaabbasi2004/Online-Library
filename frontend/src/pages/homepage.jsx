import React from "react";
import { useNavigate } from "react-router-dom";
import mainimage from '../assets/bookshelf.jpeg';
import "./homepage.css"
import Navbar from "../components/navbar";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import TrendingBooks from "../components/trendingbooks";
import Blogs from "../components/blogs";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function OnlineLibrary() {
  const [bookname, setBookname] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // small delay ensures page is rendered before scroll
      }
    }
  }, [location]);

  function discover(){
   if(localStorage.getItem("token")){
   navigate(`/bookstore?search=${encodeURIComponent(bookname)}`);

   }
   else{
     alert("Please log in to discover books.");
   }
  }

  return (
    <div className=" font-sans overflow-hidden ">
    
      {/* Main Section */}
      <div className="flex pl-30 pb-4  justify-between relative">
        {/* Left Content */}
        <div className="w-[45%]">
         <Navbar />
          <h1 className="text-5xl font-bold text-[#1e3a3a] mt-40 mb-6">Online library</h1>
         <p className="text-[#1e3a3a] leading-relaxed mb-6 text-lg">
          Discover a world of knowledge, stories, and inspiration — all at your fingertips. Whether you’re a student, a casual reader, or a passionate bookworm, our library gives you instant access to thousands of titles anytime, anywhere.
        </p>
        <button className="home-button text-white border border-gray-300 font-semibold px-6 py-3 rounded-md shadow-sm" onClick={() => navigate("/bookstore")}>
          Explore Collection
        </button>

            <div className="searchbar flex flex-row mt-15">
              <input  className="home-input w-full bg-white"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
              placeholder="Discover Book" 
              />
              <button className="home-button h-10 rounded-md text-white px-4 mx-2" onClick={discover}>search</button>
            </div>
        </div>


        {/* Right Image with Shape */}
        <div className="w-[50%] relative  flex justify-end items-center">
          {/* Background White Curve */}
          <div className="absolute left-0 top-0 bottom-0 w-[40%]  z-10 rounded-r-[100px]">
            {/* Circle cuts */}
            <div className="absolute top-[60px] left-[-12px] w-6 h-6 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-[-10px] w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute bottom-[60px] left-[-10px] w-5 h-5 bg-white rounded-full"></div>
          </div>

          {/* Main Image */}
          <img
            src={mainimage}
            alt="Library Shelf"
            className="w-full h-full object-cover rounded-l-[100px] z-0"
          />
        </div>
      </div> 



{/* ABout */}
    <section id="About">
        <div className="about-section mb-15 mt-40 flex items-center justify-center">
            <h2 className="font-bold text-4xl text-center">
                Experience the most comfort process of <br/>book reading with read online
            </h2>
          </div>
           <div className="card-section flex flex-row px-6  justify-center gap-10 mx-40 mb-40">

              <div className="card-about bg-amber-100 flex flex-col justify-center items-center px-10 py-8 min-w-3/12 min-h-2/4 ">
                  <img src={about1} alt="cadr1" className="h-40 w-40 mb-5" />
                  <h2 className="font-bold cursor-pointer text-2xl mb-5">Unlimited Access</h2>
                 <p className="text-center mt-4 text-gray-700">
                  Gain unlimited access to a vast collection of books across genres. Whether it's fiction, non-fiction, or academic content, explore anytime with just a few clicks.
                </p>  
              </div>

             <div className="card-about bg-amber-100 flex flex-col justify-center items-center px-10 py-8 min-w-3/12 min-h-2/4 ">
                  <img src={about2} alt="cadr1" className="h-40 w-40 mb-5" />
                  <h2 className="font-bold cursor-pointer text-2xl mb-5">Curated for Every Reader</h2>
                  <p className="text-center mt-4 text-gray-700">
                  Discover recommendations tailored to your interests. Our smart platform helps you find what you love—fast, relevant, and always updated.
                </p>
            </div>

              <div className="card-about bg-amber-100 flex flex-col justify-center items-center px-10 py-8 min-w-3/12 min-h-2/4 ">
                  <img src={about3} alt="cadr1" className="h-40 w-40 mb-5" />
                  <h2 className="font-bold cursor-pointer text-2xl mb-5">Interactive & Engaging</h2>
                  <p className="text-center mt-4 text-gray-700">
                  Make the most of your reading time with interactive features like bookmarks, notes, and highlights. Perfect for both casual readers and students.
                  </p>
              </div>          
        </div>
    </section>




       {/* BestSeller Section */}

      <section id="bestseller flex flex-col justify-center items-center mb-10">
        <div className="items-center justify-center">
          <h2 className="text-4xl font-bold text-center mb-10">Top Literary trends this month</h2>
              <TrendingBooks />
        </div>
      </section>

      
      {/* blogs */}
      <section id="blogs" className="mt-30 mb-30">
        <div className="blog-section  items-center flex flex-col">
          <h2 className="text-4xl font-bold text-center mb-10 hover:underline hover:cursor-pointer">Top Literary Blogs</h2>
          <Blogs />
        </div>
      </section>


      <section id="footer">
        <Footer />
      </section>

    </div>
  );
}
