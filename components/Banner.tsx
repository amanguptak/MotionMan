"use client"
import React from 'react'
import BotButton from './BotButton'
const Banner = () => {
  return (
  <>
  <div className='shadow p-4 transition-shadow  hover:shadow-lg '>
  <div className='flex items-center justify-between'>
  <p className='text-[#a2c4c9]'><span className='text-[#0072b1]  font-semibold mr-2'> Your Motions:</span>Where Ideas Flow</p>

  <BotButton/>
  </div>
  </div>
  </>
  )
}

export default Banner