

export default function Skills()
{
    return (
        <div className = "container px-4 flex flex-col w-full items-center justify-between text-center prose-xl mb-5 mt-3 space-x-40">

        <h1 className="text-white text-2xl font-semibold mb-6">
             Technologies
        </h1>

        <h3 className = "text-white text-lg mb-4">Here are few technologies I learned recently</h3>
        <ul className = "text-white grid grid-cols-2 gap-4 mt-4 text-sm">
            <li className="flex items-center">Java</li>
            <li className="flex items-center">C++</li>
            <li className="flex items-center">ReactJS</li>
            <li className="flex items-center">NextJS</li>
            <li className="flex items-center">Python</li>
            <li className="flex items-center">SwiftUI</li>
            <li className="flex items-center">AWS</li>
            <li className="flex items-center">Google Cloud</li>
            <li className="flex items-center">HTML</li>
            <li className="flex items-center">CSS</li>
            <li className="flex items-center">Firebase</li>
            <li className="flex items-center">Git</li>
            <li className="flex items-center">Linux</li>
            <li className="flex items-center">Docker</li>
        </ul>

        <h1 className="text-white text-2xl font-semibold mb-6">
             Experience
        </h1>

        <div className = "mb-12">
            <h2 className = "text-xl font-semibold text-white">
                Software Engineering Fellow at <span className = "text-blue-500">Headstarter</span>
                </h2>
                <p className = "text-gray-300 text-sm">July 2024 - September 2024</p>
                <ul className = "list-disc list-inside mt-4 space-y-2 text-white text-sm">
                    <li>
                    Built and deployed 5 AI projects in 5 weeks using OpenAI, Stripe, Clerk, and AWS EC2, following agile methodologies with weekly sprints.
                    </li>
                    <li>
                    Collaborated with 3 Fellows to build and deploy a SaaS product that generates flashcards based on any topic using the Llama 3.1 LLM. 
                    </li>
                    <li>
                        Implemented an embedded AI version of Rate my Professor through HuggingFace's Sentence Transformers to extract data and upsert to a Pinecone index to improve feedback by 15%.
                    </li>
                </ul>
           
        </div>

        <div className = "mb-12">
            <h2 className = "text-xl font-semibold text-white">
                iOS Developer at <span className = "text-blue-500">buildspace</span>
                </h2>
                <p className = "text-gray-300 text-sm">July 2024 - September 2024</p>
                <ul className = "list-disc list-inside mt-4 space-y-2 text-white text-sm">
                    <li>
                    Developed an iOS mobile app in SwiftUI and XCode that achieves emotional interaction with the user through conversational AI within six weeks.
                    </li>
                    <li>
                        Participated in weekly lectures and labs with the Founder, collaborating with a network of 50+ developers to enhance iOS development skills and AI implementation.
                    </li>
                    <li>
                    Submitted detailed project updates weekly, showcasing continuous    
                    improvement and iteration, contributing to the overall project's success.
                    </li>
                </ul>
           
        </div>

        </div>
        

    );
}