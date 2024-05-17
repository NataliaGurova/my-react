
import { useState } from 'react';
import './App.css'
import LangSwitcher from './components/LangSwitcher/LangSwitcher';
import LoginForm from './components/LoginForm/LoginForm'
import SearchBar from './components/SearchBar/SearchBar';
import RadioButton from './components/RadioButton/RadioButton';

function App() {
  const [lang, setLang] = useState("uk");
  // Контрольована форма
  const [values, setValues] = useState({
    login: "",
    password: "",
  });
  // radioButton======
  const [coffeeSize, setCoffeeSize] = useState("sm");
  
  const handleSizeChange = (evt) => {
    setCoffeeSize(evt.target.value);
  };
  // ================
  
  const handleLogin = (userData) => {
    console.log(userData);    
  }

  // Контрольована форма====

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    console.log(values);
    
    setValues({
      login: "",
      password: "",
    });
  };
  // =========
  return (
    <>
      <SearchBar/>
      <p>=========================</p>
      <div>
        {/* <LoginForm onLoginMy={handleLogin} /> */}
        <LoginForm onSubmit={handleSubmit} onChange={handleChange} values={values} />
      </div>
      <p>=========================</p>
      <p>Selected language: {lang}</p>
      <LangSwitcher value={lang} onSelect={setLang} />
      <RadioButton coffeeSize={coffeeSize} onChange={handleSizeChange} />
    </>
  )
}

export default App
