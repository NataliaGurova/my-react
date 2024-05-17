const RadioButton = ({coffeeSize, onChange}) => {
  // const [coffeeSize, setCoffeeSize] = useState("sm");

  // const handleSizeChange = (evt) => {
  //   setCoffeeSize(evt.target.value);
  // };

  return (
    <>
      <h1>Select coffee size</h1>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="sm"
          checked={coffeeSize === "sm"}
          onChange={onChange}
        />
        Small
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="md"
          checked={coffeeSize === "md"}
          onChange={onChange}
        />
        Meduim
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="lg"
          checked={coffeeSize === "lg"}
          onChange={onChange}
        />
        Large
      </label>
      <p>
        <b>Selected size:</b> {coffeeSize}
      </p>
    </>
  );
};

export default RadioButton