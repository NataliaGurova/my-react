Неконтрольована форма
Якщо значення полів форми потрібні лише в момент її відправки, то така форма називається неконтрольованою. Доступ до значень елементів отримуємо через властивість elements, яка зберігає посилання на інтерактивні елементи форми.



const LoginForm = () => {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const { login, password } = form.elements;

		// Посилання на DOM-елементи
    console.log(login, password);

		// Значення полів
		console.log(login.value, password.value)

		// Скидаємо значення полів після відправки
		form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};



Властивість elements зберігає об'єкт із властивостями, імена яких збігаються зі значеннями атрибутів name елементів форми.
Значенням кожної властивості буде посилання на DOM-елемент поля.
Щоб отримати доступ до значень полів, звертаємося до властивості value.
Щоб скинути значення полів форми в початкові, використовується вбудований DOM-метод reset елемента form.

==============================================================

Контрольована форма
Якщо значення полів форми є не лише необхідними у момент її відправлення, а й кожного разу при зміні значень, наприклад, для додавання валідації полів, то таку форму називають контрольованою.



Складні контрольовані форми, особливо з валідацією, зазвичай створюються не вручну, а за допомогою бібліотек, про які ми розглянемо в наступних уроках. Зараз для нас важливо розібратися, як це працює, щоб при використанні бібліотек це не виглядало як чорна магія.


Дані всіх елементів контрольованої форми зберігаються у стані та передаються як значення їх атрибута value.



const LoginForm = () => {
  const [values, setValues] = useState({
    login: "",
    password: ""
  });

  return (
    <form>
      <input type="text" name="login" value={values.login} />
      <input type="password" name="password" value={values.password} />
      <button type="submit">Login</button>
    </form>
  );
};



Зверніть увагу, що імена властивостей об'єкта стану (login та password) збігаються зі значеннями атрибутів name елементів форми. Ми використовуємо це пізніше для оптимізації обробки значень.


Далі для кожного поля об'являємо функцію оновлення стану і передаємо їх як значення атрибута onChange. Колбек-функція отримає один аргумент - об'єкт події.



const LoginForm = () => {
  const [values, setValues] = useState({
    login: "",
    password: "",
  });

  const handleLoginChange = (evt) => {
    setValues({
      ...values,
      login: evt.target.value,
    });
  };

  const handlePwdChange = (evt) => {
    setValues({
      ...values,
      password: evt.target.value,
    });
  };

  return (
    <form>
      <input
        type="text"
        name="login"
        value={values.login}
        onChange={handleLoginChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handlePwdChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};



Якщо уважно погляднути на функції оновлення стану, можна помітити, що вони практично ідентичні:

Отримують об'єкт події
Викликають функцію зміни стану setValues
Використовують evt.target.value, щоб отримати значення поля
Різниця лише в властивості об'єкта, яка оновлюється.


Загальний обробник



Згадуючи на початку, що значення атрибута name полів і імена властивостей об'єкта стану збігаються, і це не випадково. Давайте оголосимо один обробник handleChange для всіх полів форми.



const handleChange = evt => {
  console.log(evt.target.value);
  console.log(evt.target.name);
}



Використовуючи об'єкт події, ми маємо доступ до:

evt.target.value - значення поля
evt.target.name - значення атрибута name
Використовуючи синтаксис обчислюваних властивостей об'єкта, ми можемо записати handleChange так, щоб значення оновлюваної властивості стану було значенням атрибута name.



const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };



Це дозволяє обробляти зміну всіх полів однією функцією, замінивши дві раніше оголошені.

const LoginForm = () => {
  const [values, setValues] = useState({
    login: "",
    password: "",
  });

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <form>
      <input
        type="text"
        name="login"
        value={values.login}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};



Відправка форми



Щоб отримати значення полів контрольованої форми під час відправлення, створюємо функцію, наприклад handleSubmit, в якій ми звертаємося до її стану.



const handleSumit = (evt) => {
  evt.preventDefault();

	// Значення полів
  console.log(values);
};



Функцію передаємо як значення атрибута onSubmit елемента form.



<form onSubmit={handleSumit}>



Щоб очистити форму після відправлення, необхідно скинути стан на початкове значення, що призведе до оновлення компонента і повторного рендерингу.



const handleSumit = (evt) => {
  evt.preventDefault();
  console.log(values);

	// Очищаємо форму
  setValues({
    login: "",
    password: "",
  });
};



Ось повний код прикладу форми для входу.



const LoginForm = () => {
  const [values, setValues] = useState({
    login: "",
    password: "",
  });

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSumit = (evt) => {
    evt.preventDefault();

    console.log(values);

    setValues({
      login: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSumit}>
      <input
        type="text"
        name="login"
        value={values.login}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};