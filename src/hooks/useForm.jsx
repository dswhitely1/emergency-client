import {useState} from 'react';

export const useForm = (initialState, cbFunc) => {
    const [values, setValues] = useState(initialState);

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        cbFunc();
    }

    const handleReset = () => setValues(initialState);

    return [values, handleChange, handleSubmit, handleReset]
}
