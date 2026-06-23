import type React from "react";
import InputField from "./components/InputField";
import { useState } from "react";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  return (
    <div className="App">
      <div className="App__wrapper">
        <h2 className="heading">Taskify</h2>
        <InputField todo={todo} setTodo={setTodo} />
      </div>
    </div>
  );
};

export default App;
