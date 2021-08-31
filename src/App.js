import './App.css';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { ReviewsList } from './components/ReviewsList';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <ReviewsList />
    </div>
  );
}

export default App;
