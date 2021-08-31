import './App.css';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { ReviewsList } from './components/ReviewsList';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <ReviewsList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
