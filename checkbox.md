Чекбокси
Якщо радіо-кнопки призначені для вибору одного з багатьох елементів, то чекбокси дозволяють обрати багато з багатьох. Чекбокс, так само, як і радіо-кнопка, може знаходитися в двох станах: обраний або ні.



Створимо інтерфейс, що складається з чекбокса та кнопки. Задача - зробити так, щоб кнопка була активною лише тоді, коли обраний чекбокс.



const App = () => {
  return (
    <div>
      <label>
        <input type="checkbox" name="terms" /> 
				I accept terms and conditions
      </label>
      <button type="button">Proceed</button>
    </div>
  );
};



Для цього робимо чекбокс контрольованим елементом, тобто оголошуємо стан і функцію його зміни. У кнопці використовуємо стан для атрибута disabled, так вона буде активною лише тоді, коли в стані буде true, тобто чекбокс обраний.



const App = () => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleChange = (evt) => {};

  return (
    <div>
      <label>
        <input type="checkbox" name="terms" /> 
				I accept terms and conditions
      </label>
      <button type="button" disabled={hasAccepted}>
        Proceed
      </button>
    </div>
  );
};



Передаємо чекбоксу значення стану і функцію оновлення як атрибути checked і onChange.



const App = () => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleChange = (evt) => {};

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="terms"
          checked={hasAccepted}
          onChange={handleChange}
        />
        I accept terms and conditions
      </label>
      <button type="button" disabled={hasAccepted}>
        Proceed
      </button>
    </div>
  );
};



Щоб дізнатися, обраний чекбокс чи ні при зміні, у функції-обробнику звертаємося до властивості DOM evt.target.checked, значення якої буде true або false, і записуємо його в стан.



const App = () => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleChange = (evt) => {
    setHasAccepted(evt.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="terms"
          checked={hasAccepted}
          onChange={handleChange}
        />
        I accept terms and conditions
      </label>
      <button type="button" disabled={hasAccepted}>
        Proceed
      </button>
    </div>
  );
};



Тепер кнопка буде активною лише тоді, коли чекбокс обраний, і користувач не зможе пройти далі, не прийнявши умови використання.



При роботі з групою чекбоксів їх значення зберігаються в властивості value, як і в разі з радіо-кнопками, а обрані значення зберігаються в стані як масив чи об'єкт. Це потрібно в більш складних формах, створення яких ми розглянемо пізніше.