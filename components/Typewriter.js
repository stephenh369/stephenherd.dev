import React, {useState, useEffect} from 'react'

export default function Typewriter() {
  const [typing, setTyping] = useState('')
  const [words, setWords] = useState(['using custom code.', 'with WordPress.', 'for E-Commerce.'])
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
    <div className="h-20 xs:h-8 md:h-full mb-2 xs:mb-4">
      <h3>I can build websites <span className="text-blue-400">{typing}</span><span className="animate-cursor text-blue-400">|</span></h3>
    </div>
  )
}