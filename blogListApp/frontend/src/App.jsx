import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const baseUrl = '/api/blogs';
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setBlogs(response.data);
    });
  }, []);
  console.log(blogs);

  return (
    <>
      <h1>Blogs List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            {blog.title}: {blog.url}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
