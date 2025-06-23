import { useState } from 'react';
export default function Nav() {
    const [index, setIndex] = useState(0);
    function handleClick() {
        index < 11 ? setIndex(index + 1) : setIndex(0);
    }
    return (
        <div className='flex item-center p-4'>
            <h3 className='p-2'> {index} </h3>
            <button className='border bg-gray-200 rounded p-2' 
                onClick={handleClick}>
                    Increase
            </button>
        </div>
    )
}