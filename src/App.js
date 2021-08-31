import './App.css';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { ReviewsList } from './components/ReviewsList';
import { Switch, Route } from 'react-router-dom';
import { CategoriesList } from './components/CategoriesList';
import { Review } from './components/Review';
import { User } from './components/User';
import { WriteReview } from './components/WriteReview';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <ReviewsList />
        </Route>
        <Route exact path="/reviews/write-review">
          <WriteReview />
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
        <Route exact path="/users/:username">
          <User />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
