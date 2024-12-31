import React from 'react'
import { reload } from '../assets/Index'
import { useNavigate } from 'react-router-dom'




function Bottom() {
    const restartTest = () => {
        window.location.reload();
    }

    return (
        <div>
            <img src={reload} alt="" className='w-4 cursor-pointer' onClick={restartTest}/>
        </div>
    )
}

export default Bottom