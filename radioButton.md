Радіо-кнопки

Радіо-кнопки є альтернативою select, оскільки в групі може бути обрано лише один варіант. Тобто радіо-кнопки працюють в групі і дозволяють вибрати один варіант із багатьох.



const App = () => {
  return (
    <>
      <h1>Select coffee size</h1>
      <label>
        <input type="radio" name="coffeeSize" value="sm" />
        Small
      </label>
      <label>
        <input type="radio" name="coffeeSize" value="md" />
        Meduim
      </label>
      <label>
        <input type="radio" name="coffeeSize" value="lg" />
        Large
      </label>
    </>
  );
};



Групування радіо-кнопок відбувається за допомогою однакового значення атрибута name.
Значення кожної опції зберігається у атрибуті value.


Обране значення зберігається в стані.



const App = () => {
  const [coffeeSize, setCoffeeSize] = useState("sm");
	
	// Решта коду
};



Щоб визначити, чи обрано опцію чи ні, атрибуту checked необхідно передати true чи false. Для цього атрибуту checked передається результат порівняння стану і значення атрибута value конкретної радіо-кнопки.



const App = () => {
  const [coffeeSize, setCoffeeSize] = useState("sm");
  
  return (
    <>
      <h1>Select coffee size</h1>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="sm"
          checked={coffeeSize === "sm"}
        />
        Small
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="md"
          checked={coffeeSize === "md"}
        />
        Meduim
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="lg"
          checked={coffeeSize === "lg"}
        />
        Large
      </label>
    </>
  );
};



Після цього в інструментах розробника ми бачимо знайоме попередження. Ми використовуємо патерн контрольований елемент, зберігши значення в стані, але не передали атрибут onChange, щоб при виборі опції змінювати стан.








Передамо кожній радіо-кнопці в групі атрибут onChange, значенням якого буде функція, всередині якої ми записуємо обране значення в стан компонента.



const App = () => {
  const [coffeeSize, setCoffeeSize] = useState("sm");

  const handleSizeChange = (evt) => {
    setCoffeeSize(evt.target.value);
  };

  return (
    <>
      <h1>Select coffee size</h1>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="sm"
          checked={coffeeSize === "sm"}
          onChange={handleSizeChange}
        />
        Small
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="md"
          checked={coffeeSize === "md"}
          onChange={handleSizeChange}
        />
        Meduim
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="lg"
          checked={coffeeSize === "lg"}
          onChange={handleSizeChange}
        />
        Large
      </label>
    </>
  );
};

