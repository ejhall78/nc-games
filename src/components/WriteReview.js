import { useState } from 'react';

export const WriteReview = ({ categories }) => {
  // const [newReview, setNewReview] = useState({
  //   owner: '',
  //   title: '',
  //   review_body: '',
  //   designer: '',
  //   category: '',
  // });

  // add states for other fields
  // abstract into custom hook

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
        <input type="text" required />
      </label>
      <label>
        Review Body:
        <textarea type="text" required></textarea>
      </label>
      <label>
        Designer:
        <input type="text" required />
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
