    import { useState, useEffect } from 'react'
    import { motion } from 'framer-motion';
    import github from './assets/github.svg';
    import './App.css'

    function App() {
      const [word, setWord] = useState("");
      const [meaning, setMeaning] = useState([]);
      const [showCard, setShowCard] = useState(false);
      async function check() {
      if (word.trim()=="") return;
      try {
        const res = await fetch(`https://lexilog.onrender.com/word/${word}`);

        if (!res.ok) {
          setMeaning([{ definition: "Word not found!" }]);
          setShowCard(true);
          return;
        }
        
        const data = await res.json();
        setMeaning(data);
        console.log(data);
        setShowCard(true);
      } catch (err) {
        console.log("Error:", err);
        setMeaning([{ definition: "Server error!" }]);
        setShowCard(true);
      }
    }
    useEffect(() => {
        function handleKeyDown(e){
          if (e.key==="Enter"){
            check();
          }
          if (e.key==="Escape"){
            setShowCard(false);
          }
        }
        window.addEventListener("keydown",handleKeyDown);

        return () => {
          window.removeEventListener("keydown",handleKeyDown);
        };
      },[word,showCard]);
      return (
        <>
          <div className='m-5 md:m-0 xl:m-0 flex flex-col place-items-center'>
          <div className='flex flex-col place-items-center'>
            <h1 className='mt-[25vh] md:mt-[15vh] xl:mt-[22vh]  scale-200 text-[12vw] md:text-7xl xl:text-9xl font-bold text-transparent bg-linear-to-t from-black/90  to-white bg-clip-text'>LexiLog</h1>
            <p className='mt-[2vh] md:mt-[3vh] xl:mt-[5vh] text-4xl xl:text-5xl mb-10 font-["Inconsolata"]  text-gray-300 hover:scale-105 hover:text-white text-shadow-lg hover:cursor-none hover:text-shadow-white/10 transition-all duration-600 z-10'>A minimalistic <font className="font-['montserrat'] text-4xl xl:text-6xl bg-linear-to-t from-black-5 to-white bg-clip-text text-transparent"><strong>dictionary.</strong></font></p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" id='dictionary' placeholder="What are you looking for?" value={word} onChange={(e) => setWord(e.target.value)} className='outline text-center text-2xl xl:text-3xl h-10 xl:h-15 w-80 xl:w-200 bg-none text-white rounded-2xl focus:outline-yellow-500 focus:scale-110 transition-all duration-600'></input><br/>
              <input type="button" className='mt-10 outline text-xl xl:text-3xl px-2 text-gray-500 outline-white rounded-2xl hover:scale-110 hover:cursor-pointer hover:shadow-xl active:scale-90 active:bg-yellow-500 hover:shadow-white/10 hover:text-white hover:bg-gray-500 transition-scale duration-250' value="Look Up" onClick={check}></input>
            </form>
            {showCard && 
            <>
            <motion.div initial={{ scale:0.9,opacity:0 }} animate={{ scale:1,opacity:1}} className='m-10 overflow-auto fixed inset-0 flex-col xl:m-30 p-10 outline rounded-xl bg-gray-700/80 backdrop-blur-lg z-50' id="definition">
            <h1 className='text-left font-["Georgia"] text-5xl xl:text-9xl hover:text-gray-500 transition duration-500'>{word}</h1><br/>
            {meaning.map((item,index)=>(
              <p key={item._id} className='text-left text-xl'>
                <strong>{meaning.length>1 ? `${index+1}. ` : ""}</strong>
                {item.definition}
              </p>
            ))}
            <a className='text-3xl cursor-pointer' onClick={() => setShowCard(false)}><br/>Back to Dictionary</a>
            </motion.div>
            </>
            }
            <a href="https://github.com/piyushvarman/lexilog" target="_blank" ><img src={github} title="Github Repository" className='cursor-pointer drop-shadow-amber-900 w-10 h-10 mt-10 m-auto hover:scale-110 transition duration-75'></img></a>
          </div>
      </>
      )
      
    }

    export default App
