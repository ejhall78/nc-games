import './App.css';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { ReviewsList } from './components/ReviewsList';
import { Switch, Route } from 'react-router-dom';
import { CategoriesList } from './components/CategoriesList';
import { Review } from './components/Review';
import { User } from './components/User';
import { WriteReview } from './components/WriteReview';
import { useCategories } from './hooks/useCategories';
import { useCurrentUser } from './hooks/useCurrentUser';

function App() {
  // TODO:
  //    post a new review
  //    error handling for posting a comment/review
  //    pagination for reviews & comments
  //    be able to delete a comment/review owned by currentUser
  //    style

  const { categories, isLoading } = useCategories();
  const { currentUser } = useCurrentUser('jessjelly'); // default user

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <NavBar categories={categories} />
      <Switch>
        <Route exact path="/">
          <ReviewsList categories={categories} currentUser={currentUser} />
        </Route>
        <Route exact path="/reviews/write-review">
          <WriteReview categories={categories} currentUser={currentUser} />
        </Route>
        <Route exact path="/reviews/:review_id">
          <Review currentUser={currentUser} />
        </Route>
        <Route exact path="/categories">
          <CategoriesList categories={categories} isLoading={isLoading} />
        </Route>
        <Route exact path="/reviews/categories/:category">
          <ReviewsList currentUser={currentUser} />
        </Route>
        <Route exact path="/users/:username">
          <User />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
