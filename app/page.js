
import Navbar from "./Navbar"
import Image from 'next/image'
import Footer from "./Footer";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects"
export default function Home() {

  const dark = false;
  const words = ["Developer", "Student", "Learner"];
  return (
  <>
  
  <Navbar/>
   <div className = "flex flex-row w-full items-center justify-between text-center px-20 prose-xl mb-5 mt-3 space-x-40">
     <div className = "flex flex-col">
     <h3 className = "text-5xl font-bold text-white">Hello, 
        Meet
        </h3>

      <h1 className = "text-6xl text-blue-500 font-bold">Suryateja Duvvuri</h1>
      <h4 className = "text-2xl text-gray-300">I am a Developer, Student, Learner</h4>
      </div>

      
      <Image src = "/Portrait.png" width={400} height={400} alt="Profile" className = "border-4 border-sky-500 py-1.5 px-1.5"/>
      
   </div>
   <About/>
   <Skills/>
   <Projects/>
   <Footer/>
  
   
  </>
   
  );
}
