Елемент select
Селект складається з самого елемента select та вкладеного набору option, у яких необхідно вказати атрибут value.



const LangSwitcher = () => {
  const selectId = useId();

  return (
    <div>
      <label htmlFor={selectId}>Choose language</label>
      <select id={selectId}>
        <option value="en">English</option>
        <option value="uk">Ukrainian</option>
        <option value="pl">Polish</option>
      </select>
    </div>
  );
};



Якщо селект використовується поза формою, то ми працюємо з ним як з контрольованим елементом:

Зберігаємо поточне значення в стані.
Передаємо значення стану як атрибут value.
Змінюємо стан при події onChange.


const LangSwitcher = () => {
  const selectId = useId();
  const [lang, setLang] = useState("uk");

  return (
    <div>
      <label htmlFor={selectId}>Choose language</label>
      <select
        id={selectId}
        value={lang}
        onChange={(evt) => setLang(evt.target.value)}
      >
        <option value="uk">Ukrainian</option>
        <option value="en">English</option>
        <option value="pl">Polish</option>
      </select>
    </div>
  );
};



Якщо селект є частиною неконтрольованої форми, то спочатку ми задаємо йому атрибут name, а потім отримуємо значення селекта під час сабміту форми через її властивість evt.target.elements.selectName.value, де selectName - це значення атрибута name.


Використовуємо компонент LangSwitcher, щоб створити інтерфейс, в якому в компоненті App відображається перемикач мов та поточне значення обраної мови.



const App = () => {
  return (
    <>
      <p>Selected language: </p>
      <LangSwitcher />
    </>
  );
};



Проблема в тому, що стан зберігається всередині компонента LangSwitcher, тобто ми не можемо отримати його в батьківському компоненті App.

Потрібно використовувати вже знайомий патерн підйому стану і перемістити стан обраної мови в компонент App.



const App = () => {
  const [lang, setLang] = useState("uk");

  return (
    <>
      <p>Selected language: {lang}</p>
      <LangSwitcher />
    </>
  );
};



Тепер компонент LangSwitcher не працює, оскільки він нічого не знає про стан в App. Ми повинні передати йому значення стану та функцію його зміни як пропси.



const App = () => {
  const [lang, setLang] = useState("uk");

  return (
    <>
      <p>Selected language: {lang}</p>
      <LangSwitcher value={lang} onSelect={setLang} />
    </>
  );
};



Залишається виконати рефакторинг компонента LangSwitcher так, щоб він використовував отримані пропси value та onSelect.



const LangSwitcher = ({ value, onSelect }) => {
  const selectId = useId();

  return (
    <div>
      <label htmlFor={selectId}>Choose language</label>
      <select
        id={selectId}
        value={value}
        onChange={(evt) => onSelect(evt.target.value)}
      >
        <option value="uk">Ukrainian</option>
        <option value="en">English</option>
        <option value="pl">Polish</option>
      </select>
    </div>
  );
};

