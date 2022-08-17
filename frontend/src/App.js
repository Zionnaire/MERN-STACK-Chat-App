import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import "./App.css";
import ChatsPage from "./Pages/ChatsPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatsPage} />
    </div>
  );
}

export default App;
