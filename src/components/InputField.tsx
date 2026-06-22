import "./styles.css";

function InputField() {
  return (
    <form className="input">
      <input type="text" placeholder="Enter a task" className="input__box" />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
}

export default InputField;
