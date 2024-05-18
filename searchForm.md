Пошук через форму
Пошук через форму

Для того, щоб користувач міг самостійно вводити ключове слово для пошуку статей, в додаток необхідно додати форму пошуку.



Структура компонентів додатка для пошуку статей:

App - кореневий компонент додатка
ArticleList - список посилань на статті
Article - компонент карточки списку, по суті, це просто посилання
Loader - індикатор завантаження, який можна виділити в окремий компонент
Error - повідомлення про помилку, яке можна виділити в окремий компонент
SearchForm - форма пошуку з одним текстовим полем






Створимо компонент форми пошуку:



// src/components/SearchForm.jsx

export const SearchForm = ({ onSearch }) => {
  
	const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
	const topic = form.elements.topic.value;
    onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="topic" placeholder="Search articles..." />
      <button>Search</button>
    </form>
  );
};



Це неконтрольована форма з одним текстовим полем, значення якого потрібно лише при поданні форми.
Форма очікує один пропс onSearch - колбек-функцію, якій передасть значення поля при сабміті форми.


Якщо користувач нічого не ввів у текстове поле і намагається відправити форму, потрібно повідомити його про це, оскільки виконувати HTTP-запит без слова для пошуку не потрібно. Для цього в компоненті форми, в момент її відправлення, перевірте вміст текстового поля, і тільки в тому випадку, якщо введено щось, викличте пропс onSearch.



// src/components/SearchForm.jsx

export const SearchForm = ({ onSearch }) => {
  
	const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
		const topic = form.elements.topic.value;
    
		// Якщо текстове поле порожнє, виводимо повідомлення 
		// і припиняємо виконання функції.
		if(form.elements.topic.value.trim() === "") {
			alert("Please enter search term!")
			return;
		}

		// У протилежному випадку викликаємо пропс 
		// і передаємо йому значення поля
		onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="topic" placeholder="Пошук статей..." />
      <button>Пошук</button>
    </form>
  );
};



Форма пошуку рендериться в компоненті App, а функція handleSearch буде відповідати за код, який необхідно виконати при сабміті форми.



// src/components/App.jsx

import { SearchForm } from "./SearchForm";

const App = () => {

  const handleSearch = topic => {
	// ...
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};



Оскільки тепер користувач сам вводить рядок для пошуку статей, нам не потрібний ефект. Таким чином, будемо писати код всередині функції handleSearch, яка виконується при сабміті форми. Робимо її асинхронною і додаємо всередину код, пов'язаний з HTTP-запитом.



// src/components/App.jsx

const App = () => {
	const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

	const handleSearch = async (topic) => {
    try {
	  setArticles([]);
	  setError(false);
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
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};



Зверніть увагу на дві речі перед кодом HTTP-запиту в функції handleSearch:

Перше - це setArticles([]), за допомогою якого ми спеціально очищаємо стан articles перед новим запитом, щоб припинити відображення "старого" списку посилань.
Друге - це setError(false), щоб скинути помилку перед наступним запитом, на випадок, якщо вона була у попередньому запиті.

