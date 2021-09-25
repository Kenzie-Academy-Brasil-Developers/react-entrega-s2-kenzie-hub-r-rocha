import "./App.css";
import Routes from "./routes";
import Menu from "./components/Menu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu />
        <Routes />
      </header>
    </div>
  );
}

export default App;
