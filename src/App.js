import "./App.css";
import Chatbox from "./components/Chatbox";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Chatbox userName="Me" operatorName="Sascia" />
            </header>
        </div>
    );
}

export default App;
