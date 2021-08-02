import React, {useState, useEffect} from 'react'

export default function Hero() {
 const [typing, setTyping] = useState('')
 const [words, setWords] = useState(['using custom code.', 'with WordPress.', 'that provide E-Commerce solutions.'])
 const [index, setIndex] = useState(0)
 const [letterIndex, setLetterIndex] = useState(0)

 const handleClear = () => {
    setLetterIndex(0)
    if(index === words.length -1) {
      setIndex(0)
      setTyping(typing => typing = '')
    } else setIndex(index + 1)
 }

 const handleTyping = () => {
  if(letterIndex < words[index].length) {
    setTimeout(() => {
      if (letterIndex === 0) {
        setTyping(prevState => words[index].charAt(letterIndex))
      } else {
        setTyping(prevState => [...prevState, words[index].charAt(letterIndex)])
      }
      setLetterIndex(letterIndex + 1)
    }, 200)
  } else {
    setTimeout(() => {
      handleClear()
    }, 2000)
  } 
}

 useEffect(() => {
   handleTyping()
}, [index, letterIndex]);


  return (
    <div className="bg-hero bg-cover bg-center bg-no-repeat bg-blue-900 bg-opacity-50 bg-blend-overlay h-screen w-full flex items-center">
      <div className="mx-16 p-4 rounded shadow-lg bg-gray-900 bg-opacity-50">
        <h1 className="pt-2 pb-4">Stephen Herd - Web Developer</h1>
        <h3 className="pb-4">I can build websites <span className="text-blue-400">{typing}</span><span className="animate-cursor text-blue-400">|</span></h3>
      </div>
    </div>
  )
}
