import React from 'react'
import codingimage from '../assets/introduction-to-coding.jpg'

const Home = () => {
  return (
    <div className='px-40 py-10 flex gap-20'>
        <div className='w-1/2 space-y-5 py-20'>
            <h2 className='text-4xl font-bold'>Intro to Coding?</h2>
            <p className='text-lg'>Coding, also known as computer programming, is the process of writing instructions that tell a computer how to perform a specific task. These instructions are written in a special language, called a programming language, that both humans can understand and a computer can interpret.</p>
        </div>
        <div className='w-1/2'>
             <img src={codingimage} />
        </div>
    </div>
  )
}

export default Home