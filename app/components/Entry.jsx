'use client';
import React, { useEffect, useState } from 'react';
import Code from "./Code"
import Computer from "./Computer"
import dynamic from 'next/dynamic';
import FilmRoll from "./FilmRoll";
import Footer from "../Footer";
import Image from 'next/image';

const Sunrise = dynamic(() => import('./Sunrise'), {
    ssr: false,
    loading: () => <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl font-medium text-gray-600">Loading...</p>
    </div>
});

function Timeline()
{
    const [selectYear, setSelectedYear] = useState(experiences[0].year);
    const selected = experiences.find((exp) => exp.year === selectYear);

    return (
        <section className = "mb-16">
           <div className = "flex gap-4 mb-8">
                {experiences.map((exp) => (
                <button key={exp.year} onClick = {() => setSelectedYear(exp.year)} className = {`px-4 py-2 rounded-full font-semibold transition-colors
                    ${selectYear === exp.year ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 font-matrix hover:bg-blue-100"}`}>
                        {exp.year}
                    </button>
            ))}
           </div>
           <div className = "space-y-8 border-l-4 border-blue-600 pl-6">
            {selected.items.map((item,index) => (
                <div key = {index} className = "relative">
                    <div className = "absolute -left-7 top-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
                    <h3 className="text-xl mb-1 font-matrix">{item.title}</h3>
                    <span className="text-sm text-gray-500 font-matrix">{item.date}</span>
                    <p className="text-gray-300 mt-2 font-matrix">{item.description}</p>
                </div>
            ))}
           </div>
           
        </section>
    )
}

const experiences = [
    {
        year:2022,
        items: [
            {
                title: "Member of ACM@UCR",
                date: "September 2022 - December 2022",
                description: "Attended general meetings and career development workshops. Participated in Cutie Hack to make a terminal-based game on history trivia."
            },
            {
                title: "Member of RoseHack Committee",
                date: "September 2022 - December 2022",
                description: "Worked on the outreach team to email companies for sponsorship."
            }
        ],
    },
    {
        year:2023,
        items: [
            {
                title: "Member of IEEE Robosub @UCR",
                date: "April 2023 - February 2024",
                description: "I was focused on enhancing robotic navigation using OpenCV for edge detection. I had to learn morphological operations and Canny edge detection to identify corners around gates, improving obstacle navigation through various environments. "
            }
        ]
    }
]

const projects = [
    {
        year:2021,
        items: [
            {
                title: "Personal Website",
                date: "September 2022 - December 2022",
                description: "Attended general meetings and career development workshops. Participated in Cutie Hack to make a terminal-based game on history trivia."
            },
            {
                title: "Member of RoseHack Committee",
                date: "September 2022 - December 2022",
                description: "Worked on the outreach team to email companies for sponsorship."
            }
        ],
    },
    {
        year:2022,
        items: [
            {
                title: "Blog Project",
                date: "April 2023 - February 2024",
                description: "I was focused on enhancing robotic navigation using OpenCV for edge detection. I had to learn morphological operations and Canny edge detection to identify corners around gates, improving obstacle navigation through various environments. "
            }
        ]
    }
]

function Entry() {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const progress = window.scrollY / (window.innerHeight * 0.5);
            setScrollProgress(Math.min(1, progress));
            setScrolled(progress > 0.1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="relative w-full">
            <div className="fixed inset-0 z-0">
                <Sunrise />
                <FilmRoll />
            </div>

            <section className="relative min-h-[200vh]">
                <div 
                    className="sticky top-0 min-h-[400px] w-full"
                    style={{
                        transform: scrolled ? `translate3d(0, ${scrollProgress * 10}vh, ${scrollProgress * 300}px) scale(${1 - scrollProgress * 0.4})` : 'none',
                        opacity: 1 - scrollProgress,
                        transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 1s ease-in-out',
                        transformOrigin: 'center center',
                    }}
                >
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <Computer />
                        <div className="absolute w-[790px] h-[318px] bottom-[130px] left-[565px] overflow-hidden">
                            <Code />
                        </div>
                    </div>
                </div>
                    
                <div 
                    className="relative z-20 max-w-6xl mx-auto px-4 py-16"
                    style={{
                        opacity: scrollProgress,
                        transform: `scale(${0.9 + scrollProgress * 0.1})`,
                        transition: 'opacity 0.3s ease-in-out, transform 1s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}>
                        <h1 className="font-matrix text-7xl text-white font-black tracking-tighter pb-4 mb-12">
                            About me & Interests
                        </h1>
                <section className = "mb-16">
                    <h2 className = "font-matrix text-4xl font-bold mb-6 text-white"> Overview</h2>
                    <div className = "flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
                        <div className = "flex-shrink-0">
                            <Image src = "/Surya.png" alt = "image" width = {340} height = {340} className = "rounded-xl shadow-lg object-cover w-[340px] h-[340px] border-4 border-white"/>
                        </div>
                        <div className = "font-matrix text-2xl space-y-6 dark: text-gray-300 p-4 leading-relaxed">
                            <p>
                            I am Suryateja! a developer, student, and lifelong learner. I am studying at <span className="text-green-400">University of California, Riverside </span> and pursuing a bachelors degree in Computer Science.
                            </p>
                            <p>
                                 My passion for building stuff started when I was building Legos as a child and I also saw this interest 
                                 through my high school programming classes in assignments and projects. 
                            </p> 
                            <p> When I started doing personal projects, I always focused on either showing things differently, or tweaking tools that others could not think of or just trying to solve a problem whether that is a small or big scale. </p>
                           
                           <p>
                             Since the start of my undergraduate career, I have been exploring areas 
                             like full stack development, mobile development and integrating tools like AI to enhance my applications. 
                             I am always looking for opportunities to learn and grow, both personally and professionally.
                           </p>
                        </div>
                    </div>
                </section>

                <section className = "mb-16">
                    <h2 className = "text-3xl font-bold mb-6">Experience</h2>
                    <Timeline/>
                    {/* <div className = "space-y-8">
                        <div className = "rounded-lg border border-gray-200 pb-6">
                            <h3 className = "text-xl font-semibold mb-4">Internship at XYZ Company</h3>
                            <span className = "text-sm text-gray-500">June  2022 - August 2022</span>
                        </div>
                        <p className = "text-gray-700">
                            Worked on various projects involving web development and software engineering.
                        </p>
                    </div>

                    <div className = "pt-4">
                        <h3 className = "text-xl font-semibold mb-4">Certificates and Awards</h3>
                        <ul className = "list-disc list-inside">
                            <li>Certificate in Web Development from ABC Institute</li>
                            <li>Award for Best Project at XYZ Hackathon</li>
                        </ul>
                    </div> */}
                    {/* <h2 className = "text-3xl font-bold mb-6"> Skills & Interests</h2>
                    <div className = "grid grid-cols-3 gap-8">
                        <div className = "rounded-lg border border-gray-200 p-6">
                            <h3 className = "text-xl font-semibold mb-4">Programming Languages</h3>
                            <ul className = "list-disc list-inside">
                                <li>Python</li>
                                <li>JavaScript</li>
                                <li>C++</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-6">
                                <h3 className="text-xl font-semibold mb-4">Technologies and Frameworks</h3>
                                <ul className="list-disc list-inside">
                                    <li>React</li>
                                    <li>Node.js</li>
                                    <li>Next.js</li>
                                </ul>
                        </div>
                    </div> */}
                </section>

                {/* <section>
                    <h2 className = "text-3xl font-bold mb-6">Projects</h2> 
                    <div className = "grid grid-cols-3 gap-8">
                        {[1,2,3,4].map((project) => (
                            <div key={project} className="rounded-lg border border-gray-200 p-6 flex flex-col">
                                <h3 className="text-xl font-semibold mb-4">Project {project}</h3>
                                <p className="text-gray-700">Description of project {project}.</p>
                                <a href="#" className="mt-auto text-blue-500 hover:underline">View Project</a>
                                <div className = "flex gap-2 mt-4">
                                    <span className = "text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">React</span>
                                    <span className = "text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Node.js</span>
                                    <span className = "text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Next.js</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section> */}

                <section className = "mb-16">
                    <div className = "pt-8">
                        <h3 className = "font-matrix text-2xl font-semibold mb-4 dark:text-white">What am I doing now?</h3>
                        <div className="grid grid-cols-3 gap-6">
                        <div className = "relative-group">
                            <div className="aspect-square rounded-full border-2 border-gray-200 flex items-center justify-center bg-white hover:border-gray-400 transition-colors overflow-hidden">
                                <Image src="/coding.gif" alt="gif" width={500} height={500} className="object-cover w-full h-full" unoptimized />  
                                
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="aspect-square rounded-full border-2 border-gray-200 flex items-center justify-center bg-white hover:border-gray-400 transition-colors overflow-hidden">
                                <Image src="/eating.gif" alt="gif" width={500} height={500} className="object-cover w-full h-full" unoptimized />  
                            </div>
                        </div>
                            <div className="relative group">
                                <div className="aspect-square rounded-full border-2 border-gray-200 flex items-center justify-center bg-white hover:border-gray-400 transition-colors overflow-hidden">
                                    <Image src="/shannonandrew.gif" alt="gif" width={500} height={500} className="object-cover w-full h-full" unoptimized />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div className="min-h-screen flex items-center bg-gray-100">
                    <div className="max-w-7xl mx-auto px-8 py-24 w-full">
                        <h2 className="text-8xl font-black tracking-tighter mb-12">
                            Experience
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-4xl font-bold">Internship at XYZ Company</h3>
                                    <p className="text-lg text-gray-700">
                                        Worked on various projects involving web development and software engineering.
                                    </p>
                                </div>
                            </div>
                    </div>
                </div>

                 <section className="min-h-screen flex items-center bg-gray-100">
                    <div className="max-w-7xl mx-auto px-8 py-24 w-full">
                        <h2 className="text-8xl font-black tracking-tighter mb-12">
                            Projects
                        </h2>

                    </div>
                </section>

                 <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-8xl font-black tracking-tighter mb-12">
                            Skills
                        </h2>

                    </div>
                </div> */}

                <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-matrix text-8xl font-black tracking-tighter mb-12 dark:text-white">
                            Contact
                        </h2>

                        <form className="font-matrix space-y-6 max-w-2xl">
                            <div>
                                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Send Message
                            </button>
                        </form>
               
                    </div>
                </div>

                    
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default Entry;