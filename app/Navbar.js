

export default function Navbar() {

  const dark = false;

  return (
  <>
    <nav className ="mt-3 dark:text-white text-black py-5 px-5 flex flex-row items-center justify-between flex-wrap space-x-4 ">
        <div className="w-full block lg:w-auto text-3xl tracking-wider">
            <span className="mr-3 p-3 text-3xl rounded-lg text-white hover:text-4xl hover:text-white-400 duration-200">About </span>
            <span className="mr-3 p-3 text-3xl rounded-lg text-white hover:text-4xl hover:text-white-400 duration-200">Blog </span>
            <span className="mr-3 p-3 text-3xl rounded-lg text-white hover:text-4xl hover:text-white-400 duration-200">Experiences</span>
            <span className="mr-3 p-3 text-3xl rounded-lg text-white hover:text-4xl hover:text-white-400 duration-200">Projects </span>
            <span className="mr-3 p-3 text-3xl rounded-lg text-white hover:text-4xl hover:text-white-400 duration-200">Blog </span>
        </div>
        <div class="flex flex-row mt-4 lg:mt-0 mr-0">
            <a href= "" target="_blank" className="mr-3 p-3 rounded-lg text-white text-3xl hover:text-4xl duration-200">
                Resume
            </a>
  
        </div>
    </nav>
  </>
   
  );
}
