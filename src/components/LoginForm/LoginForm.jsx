// Неконтрольована форма
// const LoginForm = ({onLoginMy}) => {

//   const handleSubmit = (evt) => {
//     evt.preventDefault();

//     const form = evt.target;
//     const { login, password } = form.elements;

// 		// Посилання на DOM-елементи
//     console.log(login, password);

// 		// Значення полів
//     console.log(login.value, password.value)
//     onLoginMy({
//       login: login.value,
//       password: password.value,
//     });

// 		// Скидаємо значення полів після відправки
// 		form.reset();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="login" />
//       <input type="password" name="password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm
// =============================================================




const LoginForm = ({ onSubmit, onChange, values }) => {
  // const [values, setValues] = useState({
  //   login: "",
  //   password: "",
  // });
  
  // const handleChange = (evt) => {
  //   setValues({
  //     ...values,
  //     [evt.target.name]: evt.target.value,
  //   });
  // };
  
  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
    
  //   console.log(values);
    
  //   setValues({
  //     login: "",
  //     password: "",
  //   });
  // };
  
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="login"
        value={values.login}
        onChange={onChange}
        />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={onChange}
        />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm