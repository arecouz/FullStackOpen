import { Link } from "react-router-dom";

const BlogsList = ({ blogs, incrementLikes, handleBlogDelete, user }) => {
  const blogStyle = {
    padding: "5px 5px",
    backgroundColor: "black",
    borderRadius: "8px",
    border: "1px solid",
    width: "350px",
  };

  const buttonStyle = {
    width: "40px",
    borderRadius: "4px",
    fontSize: "0.55em",
    cursor: "pointer",
    transition: "border-color 0.25s",
    marginLeft: "307px",
    backgroundColor: "#a83232"
  };

  const tittleStyle = {
    border: "1px solid transparent",
    color: "#fcba03",
    padding: "0.1em 0.9em",
    fontWeight: "80",
    fontSize: "1.3em",
    fontWeight: "bold",
  };

  // todo:
  // remove the togglable
  // just a list of react router links to the blogs
  // the blogs take the style defined here
  // finalize routing by adding home
  // add navigation bar

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);
  return (
    <ul className="blogsList">
      {sortedBlogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <li style={blogStyle}>
            {user.username === blog.user.username ? (
              <button
                style={buttonStyle}
                onClick={() => handleBlogDelete(blog.id)}
              >
                X
              </button>
            ) : null}
            <h3 style={tittleStyle} data-testid="blogTitle">
              {blog.title}
            </h3>
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default BlogsList;
