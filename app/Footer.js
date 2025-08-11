import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function Navbar() {

    const dark = false;
  
    return (
    <div className = "flex flex-col items-stretch justify-center">
     <hr className="mt-4 border-gray-700 m-auto w-3/4 text-center" />
      <div className = "flex flex-row mt-4 lg:mt-0 mr-0">
        <footer className = "m-6 border-gray-200 flex flex-row justify-between items-center text-gray-300">

        <span className="text-lg font-matrix m-auto flex flex-col justify-center items-center text-center">
            
            {new Date().getFullYear()} © Suryateja Duvvuri
            <span className="m-auto flex flex-wrap text-center">
                Happy Coding 😊
            </span>
        </span>

        <div className="flex flex-wrap items-center space-x-8 mx-6 ">
          <a
            href="https://www.linkedin.com/in/suryateja-duvvuri-22b377162/"
            className= "hover:scale-150 duration-200 text-gray-400 hover:text-gray-300"
          >
            <FaLinkedin size="25" />
          </a>
          <a
            href="https://twitter.com/SuryatejaDuvvu1"
            className="hover:scale-150 duration-200 text-gray-400 hover:text-gray-300"
          >
            <FaTwitter size="25" />
          </a>
          <a
            href="https://github.com/SuryatejaDuvvuri"
            className="hover:scale-150 duration-200 text-gray-400 hover:text-gray-300"
          >
            <FaGithub size="25" />
          </a>
        </div>



        </footer>
      </div>
    </div>
     
    );
  }
  