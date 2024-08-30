import logo from "./logo.svg";
import "./App.css";
import DoorSensor from "./DoorSensor";
import RelayButton from "./RelayButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <DoorSensor sensor="sensor_top"></DoorSensor>
        <DoorSensor sensor="sensor_bottom"></DoorSensor>
        <RelayButton />
      </header>
    </div>
  );
}

export default App;
