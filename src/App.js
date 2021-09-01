import './App.css';
import { useState } from 'react';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { ReviewsList } from './components/ReviewsList';
import { Switch, Route } from 'react-router-dom';
import { CategoriesList } from './components/CategoriesList';
import { Review } from './components/Review';
import { User } from './components/User';
import { WriteReview } from './components/WriteReview';

function App() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // TODO: extract into separate custom hooks for each GET request

  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <ReviewsList isLoading={isLoading} setIsLoading={setIsLoading} />
        </Route>
        <Route exact path="/reviews/write-review">
          <WriteReview />
        </Route>
        <Route exact path="/reviews/:review_id">
          <Review isLoading={isLoading} setIsLoading={setIsLoading} />
        </Route>
        <Route exact path="/categories">
          <CategoriesList
            categories={categories}
            setCategories={setCategories}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Route>
        <Route exact path="/reviews/categories/:category">
          <ReviewsList isLoading={isLoading} setIsLoading={setIsLoading} />
        </Route>
        <Route exact path="/users/:username">
          <User isLoading={isLoading} setIsLoading={setIsLoading} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
