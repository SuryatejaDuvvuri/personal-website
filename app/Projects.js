// import { Link, Outlet } from "react-router-dom";
import { FaGit, FaGithub } from 'react-icons/fa'; 
export default function Projects() 
{

    const projects = [["Project 1", "Description 1", "Link 1"], ["Project 2", "Description 2", "Link 2"], ["Project 3", "Description 3", "Link 3"], ["Project 4", "Description 4", "Link 4"], ["Project 5", "Description 5", "Link 5"], ["Project 6", "Description 6", "Link 6"], ["Project 7", "Description 7", "Link 7"], ["Project 8", "Description 8", "Link 8"], ["Project 9", "Description 9", "Link 9"], ["Project 10", "Description 10", "Link 10"]];
    return (
        <>
        <h1 className="text-white text-2xl font-semibold mb-6">
                 Projects
        </h1>
            <div className = "container p-6 rounded-lg shadow-lg ">
              <div className = "flex justify-between items-center">
                <a href = "" className='text-white text-lg font-semibold'><FaGithub/></a>
              </div>
              <div className='mt-4'>
                {projects.map((project,index) => 
                {
                    <span className='text-white '>{project[0]} </span>
                })}
              </div>
                    
            </div>

            
        </>
    );
}