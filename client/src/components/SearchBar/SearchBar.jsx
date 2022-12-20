import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../actions";
import '../SearchBar/SearchBar.css';



export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        
        e.preventDefault();
        setName(e.target.value);
        console.log(name);//lo que hace aca es todo lo que escriba en el search lo va a guardar en consola y despues lo manda directo al back
    }

    

    function handleSubmit(e){
        e.preventDefault();
        var found = getDogs(name);
        dispatch(found)
        setName('');
    }

    return (
        <>
            <input
                type='text'
                placeholder='Search by breed...' 
                onChange={e => handleInputChange(e)}
                value={name}
                className='input'
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
            <button
                type='submit'
                onClick={e => handleSubmit(e)}
                className='fetch'
            >
                <strong>Fetch!</strong>
            </button>
        </>
    )
}