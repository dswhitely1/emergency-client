import { useState } from 'react';
// A Git Push
export const useForm = (initialState, cbFunc) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    e.persist();
    if (e.target.type === 'checkbox') {
      switch (e.target.name) {
        case 'authYes':
          setValues((value) => ({
            ...value,
            authYes: e.target.checked,
            authNo: value.authYes,
          }));
          break;
        case 'authNo':
          setValues((value) => ({
            ...value,
            authNo: e.target.checked,
            authYes: value.authNo,
          }));
          break;
        case 'under18Yes':
          setValues((value) => ({
            ...value,
            under18Yes: e.target.checked,
            under18No: value.under18Yes,
            permitYes: e.target.checked,
            permitNA: !e.target.checked,
          }));
          break;
        case 'under18No':
          setValues((value) => ({
            ...value,
            under18No: e.target.checked,
            under18Yes: value.under18No,
            permitYes: !e.target.checked,
            permitNo: value.permitNo && !e.target.checked,
            permitNA: e.target.checked,
          }));
          break;
        case 'permitYes':
          setValues((value) => ({
            ...value,
            permitYes: e.target.checked,
            permitNo: value.permitYes,
          }));
          break;
        case 'permitNo':
          setValues((value) => ({
            ...value,
            permitNo: e.target.checked,
            permitYes: value.permitNo,
          }));
          break;
        case 'contactYes':
          setValues((value) => ({
            ...value,
            contactYes: e.target.checked,
            contactNo: value.contactYes,
          }));
          break;
        case 'contactNo':
          setValues((value) => ({
            ...value,
            contactNo: e.target.checked,
            contactYes: value.contactNo,
          }));
          break;
        default:
          setValues((value) => ({
            ...value,
            [e.target.name]: e.target.checked,
          }));
      }
    } else {
      setValues((value) => ({ ...value, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cbFunc();
  };

  const handleReset = () => {
    setValues(initialState);
  };

  return [values, handleChange, handleSubmit, handleReset, setValues];
};
