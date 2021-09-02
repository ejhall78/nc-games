import { useState } from 'react';

export const WriteReview = ({ categories, currentUser: { username } }) => {
  // TODO: abstract into custom hook

  const [currentTitle, setCurrentTitle] = useState('');
  const [currentBody, setCurrentBody] = useState('');
  const [currentDesigner, setCurrentDesigner] = useState('');
  const [selectedCategory, setSelectCategory] = useState('');

  const categoriesOptions = categories.map(({ slug }) => {
    return (
      <option key={slug} value={slug}>
        {slug}
      </option>
    );
  });

  return (
    <form>
      <label>
        Title:
        <input
          type="text"
          required
          value={currentTitle}
          onChange={event => setCurrentTitle(event.target.value)}
        />
      </label>
      <label>
        Review Body:
        <textarea
          type="text"
          required
          value={currentBody}
          onChange={event => setCurrentBody(event.target.value)}
        ></textarea>
      </label>
      <label>
        Designer:
        <input
          type="text"
          required
          value={currentDesigner}
          onChange={event => setCurrentDesigner(event.target.value)}
        />
      </label>
      <label>
        Category:
        <select
          value={selectedCategory}
          onChange={event => setSelectCategory(event.target.value)}
        >
          <option value="" defaultValue>
            Select a Category
          </option>
          {categoriesOptions}
        </select>
      </label>
    </form>
  );
};
