import React from 'react'

const Button = ({title,id,leftIcon,rightIcon,containerClass}) => {
  return (
    <button id={id} className={`group flex relative z-10 w-fit cursor-pointer px-7 py-3 rounded-full bg-violet-50 overflow-hidden text-black ${containerClass}`}>
        {leftIcon}
        <span className='relative  overflow-hidden font-general text-xs uppercase'>
           
            <div>
                {title}
            </div>
        </span>
    </button>
  )
}

export default Button