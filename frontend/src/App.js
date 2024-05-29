import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import {useColorModeValue } from "@chakra-ui/react";

function App() {
  //setting the dark mode as default
  if (!localStorage.getItem("chakra-ui-color-mode")) {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }
  const bgColor = useColorModeValue("rgb(77,151,196)", "rgb(27,32,43");
  return (
    <div className="App"  style={{backgroundColor : bgColor}} >
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
