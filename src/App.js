import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Pages from "./pages/Pages"
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Pages />
      </Router>  
    </div>
  );
}

export default App;
