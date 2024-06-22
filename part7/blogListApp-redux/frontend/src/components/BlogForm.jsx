import { useState } from 'react';

const BlogForm = ({ handleAddNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    handleAddNewBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={addBlog} className="space-y-4 text-white">
      <div className="form-field">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="title"
          onChange={(event) => setTitle(event.target.value)}
          className="flex-grow p-2 border rounded-md bg-black"
        />
      </div>
      <div className="form-field">
        <input
          type="text"
          value={author}
          name="author"
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
          className="flex-grow p-2 border rounded-md bg-black"
        />
      </div>
      <div className="form-field">
        <input
          type="text"
          value={url}
          name="url"
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
          className="flex-grow p-2 border rounded-md bg-black"
        />
      </div>
      <br></br>
      <button className="p-2 bg-gray-900 text-white w-40">Post</button>
    </form>
  );
};

export default BlogForm;
