import React, { useEffect, useState } from 'react'
import './TextInput.css'

// component TextInput takes "label" and "name" as props
const TextInput = ({label, name, setSpecificState, initialValue}) => {

    // useState to manage the input value state
    const [inputValue, setInputValue] = useState("");

    // function to handle input changes
    const handleInputChange = (event) => {
        // update the inputValue state as the input changes
        setInputValue(event.target.value);
        setSpecificState(event.target.value);
    }

    useEffect(() => {
        setInputValue(initialValue)
    }, [])

    useEffect(() => {
        setInputValue(initialValue)
    }, [initialValue])



    // useEffect to retrive the value from sessionStorage when the component mounts or 'name' prop changes
    useEffect(() => {
        
        // retrive the value from the local storage if it exists for the provided 'name' key
        const storedValue = sessionStorage.getItem(name);

        // set inputValue to the retrived value if it exists
        if(storedValue) {
            setInputValue(storedValue)
            setSpecificState(storedValue)
        }
    },[name])

    // useEffect to save input value to local session storage whenever it changes
    useEffect(() => {

        // store the input value in local storage with the 'name' as the key
        sessionStorage.setItem(name, inputValue);

    }, [inputValue, name]); // re-run this effect when 'inputValue' or 'name' changes

    return(
        <div className="text-input">
            <label>{label}</label>
            <input name={name} value={inputValue} onChange={handleInputChange} placeholder="empty..." type="text"></input>
        </div>
    )
}


export default TextInput