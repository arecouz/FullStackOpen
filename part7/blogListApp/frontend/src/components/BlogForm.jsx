import { useState } from 'react';
import blogServices from '../services/blogs'
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch()

  const addBlog = () => {
    event.preventDefault()
    blogServices.create({title, author, url})
    dispatch(createBlog({title, author, url}))
  }

  return (
    <form onSubmit={() => addBlog()}>
      <div className="form-field">
        <label>New Blog</label>
        <input
          type="text"
          value={title}
          name="title"
          placeholder="title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Author</label>
        <input
          type="text"
          value={author}
          name="author"
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className="form-field">
        <label>url</label>
        <input
          type="text"
          value={url}
          name="url"
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button>post</button>
    </form>
  );
};

export default BlogForm;
