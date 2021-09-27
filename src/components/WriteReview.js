import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postReview } from '../api';

export const WriteReview = ({ categories, currentUser: { username } }) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentBody, setCurrentBody] = useState('');
  const [currentDesigner, setCurrentDesigner] = useState('');
  const [selectedCategory, setSelectCategory] = useState('');

  const history = useHistory();

  const categoriesOptions = categories.map(({ slug }) => {
    return (
      <option key={slug} value={slug}>
        {slug}
      </option>
    );
  });

  const handleSubmit = e => {
    e.preventDefault();

    postReview(
      currentTitle,
      currentBody,
      currentDesigner,
      selectedCategory,
      username
    ).then(newReview => {
      history.push(`/reviews/${newReview.review_id}`);
    });
  };

  const handleCancel = e => {
    e.preventDefault();

    setCurrentTitle('');
    setCurrentBody('');
    setCurrentDesigner('');
    setSelectCategory('');
  };

  return (
    <form className="WriteReview" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">
          Title:
          <div className="control">
            <input
              type="text"
              required
              placeholder="eg. Monopoly"
              value={currentTitle}
              onChange={event => setCurrentTitle(event.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="field">
        <label className="label">
          Review Body:
          <div className="control">
            <textarea
              className="textarea"
              type="text"
              required
              placeholder="Write your review here"
              value={currentBody}
              onChange={event => setCurrentBody(event.target.value)}
            ></textarea>
          </div>
        </label>
      </div>
      <div className="field">
        <label className="label">
          Designer:
          <div className="control">
            <input
              type="text"
              placeholder="eg. Chuck Foley"
              required
              value={currentDesigner}
              onChange={event => setCurrentDesigner(event.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="field">
        <label className="label">
          Category:
          <div className="control">
            <select
              className="select"
              value={selectedCategory}
              onChange={event => setSelectCategory(event.target.value)}
            >
              <option value="" defaultValue>
                Select a Category
              </option>
              {categoriesOptions}
            </select>
          </div>
        </label>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
        <div className="control">
          <button onClick={handleCancel} className="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
