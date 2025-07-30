import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'

const AddToWatchlistNodge = () => {
    return (
        <div className='w-full flex'>
            <div className='w-9/10'>
                {
                    `Add the calculation to a watchlist for future review`
                }
            </div>
            <div className='w-1/10 flex items-center justify-center'>
                <IoIosArrowForward />
            </div>
        </div>
    )
}

export default AddToWatchlistNodge