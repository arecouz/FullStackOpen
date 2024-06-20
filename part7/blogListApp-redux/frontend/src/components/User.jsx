import { useParams, Link } from 'react-router-dom';

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  if (user.blogs === 0) {
    return (
      <>
        <h1>{user.username} has no blogs</h1>
      </>
    );
  }
  return (
    <>
      <h1>{user.username}'s blogs</h1>
      {user.blogs.map((blog) => (
        <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
      ))}
    </>
  );
};

export default User;
