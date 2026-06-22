import type React from "react";
import InputField from "./components/InputField";

const App: React.FC = () => {
  return (
    <div className="App">
      <h2 className="heading">Taskify</h2>
      <InputField />
    </div>
  );
};

export default App;
