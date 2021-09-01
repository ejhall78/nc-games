// import { useState } from 'react';

export const WriteReview = ({ categories }) => {
  // const [newReview, setNewReview] = useState({
  //   owner: '',
  //   title: '',
  //   review_body: '',
  //   designer: '',
  //   category: '',
  // });

  // const categoriesOptions = categories.map(category => {
  //   return <option value={category.slug}>{category.slug}</option>;
  // });

  // console.log(categoriesOptions);
  // console.log(categories, 'categories');

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
        <select></select>
      </label>
    </form>
  );
};
