
import { useState } from 'react';
import './App.css'
import LangSwitcher from './components/LangSwitcher/LangSwitcher';
import LoginForm from './components/LoginForm/LoginForm'
import SearchBar from './components/SearchBar/SearchBar';
import RadioButton from './components/RadioButton/RadioButton';
import { SearchForm } from './components/SearchForm/SearchForm';

function App() {
  // HTTP запит
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // Select
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
  
  // HTTP запит
  
	const handleSearch = async (topic) => {
    try {
      setArticles([]); //за допомогою якого ми спеціально очищаємо стан articles перед новим запитом,
                      // щоб припинити відображення "старого" списку посилань
	  setError(false); //щоб скинути помилку перед наступним запитом, на випадок, якщо вона була у попередньому запиті.
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
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
      <p>===========HTTP запит==============</p>
    <div>
      <SearchForm onSearch={handleSearch} />
      {/* {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />} */}
    </div>
    </>
  )
}

export default App
