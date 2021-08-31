import './App.css';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { ReviewsList } from './components/ReviewsList';
import { Switch, Route } from 'react-router-dom';
import { CategoriesList } from './components/CategoriesList';
import { Review } from './components/Review';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <ReviewsList />
        </Route>
        <Route exact path="/reviews/:review_id">
          <Review />
        </Route>
        <Route exact path="/categories">
          <CategoriesList />
        </Route>
        <Route exact path="/reviews/categories/:category">
          <ReviewsList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
