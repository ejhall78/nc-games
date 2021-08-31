import { useState } from 'react';

export const WriteReview = () => {
  const [newReview, setNewReview] = useState({
    owner: '',
    title: '',
    review_body: '',
    designer: '',
    category: '',
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
        <select>
          <option value="category1">category1</option>
          <option value="category2">category2</option>
        </select>
      </label>
    </form>
  );
};
