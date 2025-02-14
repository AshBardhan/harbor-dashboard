import Header from "./components/header";
import Container from "./components/container";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="page-layout">
        <Header />
        <Container />
      </div>
    </BrowserRouter>
  );
}

export default App;
