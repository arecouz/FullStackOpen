import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogPage = () => {
  const blogs = useSelector((state) => state.blogs);

  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  console.log(blog);

  if (!blogs) {
    return null;
  }

  return (
    <>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>Likes: {blog.likes}</p>
      <p>create by {blog.user.username}</p>
    </>
  );
};

export default BlogPage;
