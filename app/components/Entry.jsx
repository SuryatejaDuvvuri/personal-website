'use client';
import React, { useEffect, useState } from 'react';
import Code from "./Code"
import Computer from "./Computer"
import dynamic from 'next/dynamic';
import FilmRoll from "./FilmRoll";
import Footer from "../Footer";
import Image from 'next/image';
import { IconName } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaGithub, FaAward } from 'react-icons/fa';

const Sunrise = dynamic(() => import('./Sunrise'), {
    ssr: false,
    loading: () => <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl font-medium text-gray-600">Loading...</p>
    </div>
});

const experiences = [
    {
        year:2022,
        items: [
            {
                title: "Member of ACM@UCR",
                date: "September 2022 - December 2022",
                description: ["Attended general meetings and career development workshops",
                    "Participated in Cutie Hack to make a terminal-based game on history trivia.",],
            },
            {
                title: "Member of RoseHack Committee",
                date: "September 2022 - December 2022",
                description: ["Worked on the outreach team to email companies for sponsorship.","Used tools like Hunter.io to improve outreach."]
            }
        ],
    },
    {
        year:2023,
        items: [
            {
                title: "Member of IEEE Robosub @UCR",
                date: "April 2023 - February 2024",
                description: [
                    `Collaborated with a team to enhance an image processing algorithm for robotic navigation through the use of computer vision 
                    for a submarine robot`,
                    `Learned OpenCV to help identify corners around the gates through morphological operations and canny detection, improving object detection by 15%.`
                ],
            },
        ]
    },
    {
        year:2024,
        items: [
             {
                title: "Rose Hack Mentor",
                date: "January 2024",
                description: [
                    `Helped 20+ people to navigate their solutions on particular obstacles from their project, and offered guidance to 
                    develop innovative solutions, enhancing their hackathon experience`,
                    `Collaborated with the organizers to ensure a smooth, positive experience for the hackers`
                ]
            },
            {
                title: "Professional Development Chair for ACM@UCR",
                date: "February 2024 - June 2025",
                description: [
                    `Revamped ACM's Bit Byte mentorship program, pairing 10+ mentors with incoming students for guidance.`,
                    `Coordinated and supported the planning of 10+ ACM events to provide career guidance among members.`,
                    `Judged a 200+ participant hackathon and supported beginner teams with technical mentorship.`
                ]
            },
            {
                title: "N&W S5 Builder",
                date: "June 2024 - July 2024",
                description: [
                    `Got accepted into an unpaid 6-week program developed by YCombinator to build a software project.`,
                    `Attended lectures and labs to learn the basics of project planning and product marketing.`,
                    `Submitted weekly updates on the project's progress to stick to the project cycle.`
                ]
            },
            {
                title: "Software Engineering Fellow",
                date: "July 2024 - September 2024",
                description: [
                    `Got accepted into a 7-week, unpaid fellowship program to learn about software development and the applications of AI.`,
                    `Built and deployed 5 AI projects in 5 weeks using OpenAI, Stripe, Clerk, and AWS EC2, following agile methodologies with weekly sprints.`,
                    `Collaborated with 3 Fellows to build and deploy a SaaS product that generates flashcards based on any topic using the Llama 3.1 LLM.`,
                    `Participated in weekly sessions with engineers from Google, Y Combinator, Stanford, Amazon and venture-backed startups.`,
                    `Designed an embedded AI version of Rate my Professor through HuggingFace's Sentence Transformers 
                    to extract data and upsert to a Pinecone index to improve feedback by 15%`
                ]
            },
            {
                title: "iOS Volunteer @ SeeMe",
                date: "August 2024 - March 2025",
                description: [
                    `Developed a voice interaction feature in SwiftUI for a digital life coach app to provide real-time feedback and enhance users' wellness experience.`,
                    `Implemented local storage using SwiftData to provide offline journaling access, reducing cloud storage cost by 25%.`,
                    `Assisted in creating 3+ Figma mockups to clarify the UX flow for users, decreasing the development time by 30%.`,
                ]
            },
        ]
    },
    {
        year:2025,
        items: [
            {
                title: "Undergraduate Reader @ UC Riverside",
                date: "January 2025 - Present",
                description: [
                    `Guided 100+ students in C++ labs and office hours, covering concepts like OOP and data structures.`,
                    `Graded 30+ assignments and quizzes biweekly to deliver suggestions that elevated code quality by 40% and 
                    addressed standard code structure and functionality errors.`,
                    `Assisted in debugging for common lab exercises, improving assignment completion rates by 35%.`,
                    `Collaborated with course instructors and TA's on grading strategies, reducing grading abnormalities by 25%.`
                ]
            }, 
            {
                title: "Undergraduate Research Assistant @ UC Riverside",
                date: "April 2025 - Present",
                description: [
                    `Working with a Ph.D. student under Professor Manu Sridharan to verify neural network properties.`,
                    `Enhanced model robustness through adversarial machine learning techniques.`,
                    `Conducted static analysis to optimize runtime performance, significantly improving efficiency.`
                ]
            },
            {
                title: "Student @ CodePath",
                date: "May 2025 - August 2025",
                description: [
                    "Participated in problem solving sessions for classes.",
                    "Performed well on 6 advanced assessments out of 10.",
                    "Learned alot from people working in big tech and those coming from ivy leagues."
                ]
            }
        ]
    }
]

const awards = [
    {
        year:2023,
        items: [
            {
                title: "Best Sustainability Track - Team Award Rose Hack 2023",
                date: "January 2023",
                description: ["In a 24 hour MLH hackathon, I worked with two other people to make Mindsight, healthcare app resonating around mental health.",
                    "I worked the UI design with another teammate using figma while my third teammate integrated the design into a functional program."
                ],
            },
            {
                title: "Deans Honor List",
                date: "January 2023 - March 2023",
                description: ["Got an additional standing as Dean's Honors list in winter 2023"]
            },
            {
                title: "AWS Cloud Practionier",
                date: "July 2023 - July 2026",
                description: ["Decided to explore cloud computing by studying for AWS exam."]
            }
        ],
    },
]

const projects = [
    {
        year:2021,
        items: [
            {
                title: "Personal Website",
                date: "June 2021 - September 2021",
                description: [
                    "Interest to showcase myself and give a place for anyone with information about myself or contact information for inquires. ",   
                    "Used Bootstrap CSS to create the navigation columns and align the text and image next to each other",
                    "Implemented linear-gradient attribute to include two colors as the website's background.",
                    "Created button and mouse animations through CSS Keyframes and displayed contact information through Javascript DOM."
                ],
                skills:["HTML","CSS","Javascript","Github Pages"],
                link: "https://github.com/SuryatejaDuvvuri/suryatejaDuvvuri.github.io"
            },
            {
                title: "Java Final Game Project - PoetHunt",
                date: "April 2021 - May 2021",
                description: [
                    
                    "Worked on my first educational project with a team of two to gamify concepts of literature by creating a shotgun ui with mcq questions.",
                    "Developed a point system, question bank along with explanations based on difficulty to challenge users to practice and gain maximum points.",
                    "Built other pages like instructions to make the game intuitive along with icons to make it visually appealing."
                ],
                skills:["Java","Linux", "Java Graphics/Swing"],
                link: ""
            },
        ],
    },
     {
        year:2023,
        items: [
            {
                title: "ACM-Membership Portal",
                date: "January 2023 - April 2023",
                description:[
                    "Used Tailwind to work with the UI of the website for the user to see club announcements, meetings, resources etc.",
                    "Worked with other developers to create a full-stack web application for the club."
                ],
                skills:["NextJS","TailwindCSS"],
                link: "https://github.com/acm-ucr/membership-portal"
            },
            {
                title: "Skytrack Weather App",
                date: "April 2023 - June 2023",
                description:[
                    `Led a 4-person team and coordinated with my professor and Teacher assistant over a 1 and a 1/2 month process 
                    to develop a multi-productivity app and display geographical-based weather info in real-time.`,
                    `Integrated the app with real-time database to fetch and store user data for 
                    displaying their weather info and tasks list through JSON`,
                    `Connected Firebase Auth with QT Network to ensure proper authentication through user login 
                    for accessing features`,
                    `Developed test cases using Google test and Valgrind to ensure scalability by 15%`
                ],
                skills:["C++", "QT Creator", "Firebase", "Google Test"],
                link: "https://github.com/SuryatejaDuvvuri/CS-100-Final-Project-2023"
            },
             {
                title: "Blog Project",
                date: "April 2023 - February 2024",
                description: ["Purpose is to share information and advice about college and life.",
                    "Utilized Sanity, a headless CMS tool, to test out the text changes from a text-like editor.",
                    "Customized other content formats such as Images which was the challenging part."
                ],
                skills:["React.js","Sanity","TailwindCSS","Vercel"],
                link:"https://github.com/SuryatejaDuvvuri/blogproject"
            }
        ]
    },
    {
        year: 2024,
        items: [
            {
                title: "Shelfie Watcher",
                date: "May 2024 - June 2024",
                description: [`Devised an edge computing-based retail inventory management system using GCP, 
                    leveraging two NVIDIA Jetson Nanos for inventory tracking and object-detection via OpenCV`,
                    `Implemented real-time inventory updates and email alerts using GCP Pub/Sub and Integration API, reducing
                    manual labor and improving stock accuracy by 25%`,
                    `Designed the cloud architecture on GCP, including Firebase Real-time DB and 
                    Cloud Storage for images and text, and Vision Cloud API for text detection, improving the solution's scalability and efficiency by 15%.`
                ],
                skills:["Python", "Google Cloud Platform", "Firebase"],
                link:"https://www.youtube.com/watch?v=KuhSwgRCzFw"
            },
            {
                title: "FeelSpace",
                date: "June 2024 - July 2024",
                description: [`Created a conversational, emotional AI using WebSockets and HumeAI's SDK to detect emotions by 90%.`,
                    `Integrated Firestore to process and store real-time data for 100+ users and provide better scalability by 20%.`,
                    `Designed a prototype of a community feed to share users' sessions with AI, enhancing their experience by 35%.`,
                    `Implemented a feedback session on AI offering personal help to shift users' mindset, enhancing emotional support`

                ],
                skills:["SwiftUI", "Firestore", "HumeAI", "WebSockets"],
                link:"https://github.com/SuryatejaDuvvuri/FeelSpace"
            },
            {
                title: "DBMS Pizza Project",
                date: "November 2024 - December 2024",
                description: [`To create a Pizza Store management system for orders and deliveries using SQL and Java JDBC.`],
                skills: ["Postgres SQL", "Java"],
                link: "https://github.com/SuryatejaDuvvuri/CS166-Final-Project"
            }

        ]
    },
    {
        year: 2025,
        items: [
            {
                title: "Podnexus",
                date: "January 2025 - April 2025",
                description: [`Developed a full-stack app enabling real-time AI Q&A on podcasts, 
                    increasing user interaction by 60%`,
                    `Built a Spring Boot backend that processes 90% of the audio files 
                    into texts to assist AI with producing responses.`,
                    `Integrated Ollama for local LLM responses, reducing API costs by 30% to seamlessly deliver AI responses.`
                ],
                skills:["React.js", "Java", "Spring Boot", "Ollama"],
                link: "https://github.com/SuryatejaDuvvuri/PodNexus"
            },
            {
                title: "TechNexus",
                date: "January 2025 - April 2025",
                description: [`Led a team of 4 to build a student-project matcher based on their skills and interests.`,
                    `Developed a recommendation system using Ollama LLM, upgrading the project matching algorithm by 30%.`,
                    `Designed RESTful APIs to support project management, and live tracking applications for 50+ users.`,
                    `Deployed a scalable backend on Render, enabling real-time project matching for 75+ users.`
                ],
                skills:["React.js", "Python", "Django", "Render"],
                link: "https://github.com/SuryatejaDuvvuri/CS180-Project"
            },
            {
                title: "Lie Detection - Group Project",
                date: "November 2024 - December 2024",
                description: [`Purpose is to detect and categorize sudden changes to determine whether someone is lying or telling the truth.`
                    ,`Used different encoding technique and preprocessing techniques through Spark Pipelines 
                    to reduce the image size without sacrificing the accuracy`,
                    `Implemented Pertubation by removing features and testing it on a CNN to determine the importance of certain feature(s) to classify truth or lie.`
                ],
                skills: ["Apache Spark", "Python", "Pytorch", "SQlite"],
                link: "https://github.com/SuryatejaDuvvuri/CS179G-Project"
            },
            {
                title: "CS010B Practice Portal",
                date: "May 2025 - Present",
                description: [
                    `Goal is to help students rely less on AI to fill in the foundational gap`,
                    `Instructors can assign problems to students for them to practice and solve problems before taking a retake`,
                    `shortcuts like screenshots are detected, which discourages students to use AI`
                ],
                skills: ["Java", "Spring Boot", "NextJS", "Azure"],
                link: "https://github.com/SuryatejaDuvvuri/CS-CodingLab"
            }

        ]
    }
]

function Timeline()
{
    const [selectYear, setSelectedYear] = useState(experiences[0].year);
    const selected = experiences.find((exp) => exp.year === selectYear);

    return (
        <section className = "mb-16">
           <div className = "flex gap-4 mb-8">
                {experiences.map((exp) => (
                <button key={exp.year} onClick = {() => setSelectedYear(exp.year)} className = {`px-4 py-2 rounded-full font-semibold transition-colors
                    ${selectYear === exp.year ? "font-matrix bg-blue-600 text-white text-xl" : "bg-gray-200 text-gray-700 font-matrix text-xl hover:bg-blue-100"}`}>
                        {exp.year}
                    </button>
            ))}
           </div>
           <div className = "space-y-8 border-l-4 border-blue-600 pl-6">
            {selected.items.map((item,index) => (
                <div key = {index} className = "relative">
                    <div className = "absolute -left-8 top-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
                    <h3 className="text-3xl mb-1 font-matrix text-white">{item.title}</h3>
                    <span className="text-xl text-white font-matrix mt-2">{item.date}</span>
                    <div className="text-gray-300 mt-2 font-matrix text-2xl flex flex-col gap-2 pl-2">
                        {item.description.map((desc,indexOne) => (
                            <li key = {indexOne} className = "flex items-start gap-2">
                                <span  className="text-blue-400 pt-1">
                                    <FaAngleRight size={24} />
                                </span>
                                <span>{desc}</span>
                            </li>
                        ))}
                    </div>
                </div>
            ))}
           </div>
           
        </section>
    )
}

const skillColor = (skill) => {
    if (/python|django|pytorch/i.test(skill)) return "bg-yellow-100 text-yellow-800";
    if (/java|spring/i.test(skill)) return "bg-orange-100 text-orange-800";
    if (/react|next/i.test(skill)) return "bg-blue-100 text-blue-800";
    if (/c\+\+|qt/i.test(skill)) return "bg-purple-100 text-purple-800";
    if (/firebase|gcp|cloud/i.test(skill)) return "bg-amber-100 text-amber-800";
    if (/tailwind|css/i.test(skill)) return "bg-cyan-100 text-cyan-800";
    if (/sql|sqlite|postgres/i.test(skill)) return "bg-green-100 text-green-800";
    if (/swift|ios/i.test(skill)) return "bg-pink-100 text-pink-800";
    if (/linux/i.test(skill)) return "bg-gray-200 text-gray-800";
    if (/vercel|render|azure|aws/i.test(skill)) return "bg-indigo-100 text-indigo-800";
    if (/html|javascript/i.test(skill)) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
};

function ProjectsSection()
{
    const [selectedYear, setSelectedYear] = useState(projects[0].year);
    const selected = projects.find((p) => p.year === selectedYear);

    return (
        <section className = "mb-16">
            <h2 className = "text-4xl font-bold font-matrix mb-6 text-white">Projects</h2>
            <div className = "flex gap-4 mb-8">
                {projects.map((p) => (
                    <button key = {p.year} 
                    onClick = {() => setSelectedYear(p.year)}
                    className = {`px-4 py-2 rounded-full font-semibold font-matrix text-3xl transition-colors
                    ${selectedYear === p.year ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}>

                        {p.year}
                    </button>
                ))}
            </div>

            <div className = "grid grid-cols-1 lg:grid-cols-3 gap-8">
                {selected.items.map((item,index) => (
                    <a key = {index} href = {item.link || "#"} className = "group rounded-xl border border-gray-700 hover:shadow-xl transition-all p-6 flex flex-col h-full cursor-pointer">
                        <div className = "flex items-center gap-2 mb-2">
                            <FaGithub className = "text-xl text-gray-400" />
                            <h3 className="text-3xl font-bold text-white font-matrix">{item.title}</h3>
                        </div>
                        <span className="text-xl text-gray-400 mb-2 font-matrix">{item.date}</span>
                        <ul className = "text-gray-300 font-matrix text-2xl mb-4 space-y-1 list-disc list-inside">
                            {item.description.map((desc,i) => (
                                <li key = {i}>{desc}</li>
                            ))}
                        </ul>
                        <div className = "flex flex-wrap gap-2 mt-auto">
                            {item.skills?.map((skill,i) => (
                                <span key = {i} className = {`text-md px-2 py-1 rounded-full font-semibold ${skillColor(skill)}`}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}

function Awards()
{
    const [selectedYear, setSelectedYear] = useState(awards[0].year);
    const selected = awards.find((p) => p.year === selectedYear);

    return (
        <section className = "mb-16">
            <h2 className = "text-4xl font-bold font-matrix mb-6 text-white">Awards</h2>
            <div className = "flex gap-4 mb-8">
                {awards.map((p) => (
                    <button key = {p.year} 
                    onClick = {() => setSelectedYear(p.year)}
                    className = {`px-4 py-2 rounded-full font-semibold font-matrix text-xl transition-colors
                    ${selectedYear === p.year ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}>

                        {p.year}
                    </button>
                ))}
            </div>

            <div className = "grid grid-cols-1 lg:grid-cols-3 gap-8">
                {selected.items.map((item,index) => (
                    <a key = {index} href = {item.link || "#"} className = "group rounded-xl border border-gray-700 hover:shadow-xl transition-all p-6 flex flex-col h-full cursor-pointer">
                        <div className = "flex items-center gap-2 mb-2">
                            <FaAward className = "text-xl text-yellow-400" />
                            <h3 className="text-3xl font-bold text-white font-matrix">{item.title}</h3>
                        </div>
                        <span className="text-xl text-gray-300 mb-2 font-matrix">{item.date}</span>
                        <ul className = "text-gray-300 font-matrix text-3xl mb-4 space-y-1 list-disc list-inside">
                            {item.description.map((desc,i) => (
                                <li key = {i}>{desc}</li>
                            ))}
                        </ul>
                    </a>
                ))}
            </div>
        </section>
    )
}

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
            <div className="fixed inset-0 z-0 pointer-events-none select-none">
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
                    <h2 className = "text-3xl font-bold mb-6 font-matrix text-white">Experience</h2>
                    <Timeline/>
                    {/* <div className = "pt-4">
                        <h3 className = "text-xl font-semibold mb-4">Certificates and Awards</h3>
                        <ul className = "list-disc list-inside">
                            <li>Certificate in Web Development from ABC Institute</li>
                            <li>Award for Best Project at XYZ Hackathon</li>
                        </ul>
                    </div>  */}
                    <ProjectsSection />
                    <Awards/>
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
                    <div className="w-full mx-auto rounded-2xl shadow-2xl p-10">
                        <h2 className="font-matrix text-8xl font-black tracking-tighter mb-12 dark:text-white">
                            Contact
                        </h2>

                        <form className="font-matrix space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-xl font-matrix text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-matrix text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-lg font-matrix text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-lg font-matrix text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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