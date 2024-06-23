import { useState } from "react";
import { Link } from "react-router-dom";

const BlogsList = ({ blogs, incrementLikes, handleBlogDelete, user }) => {
  const [hoveredBlogId, setHoveredBlogId] = useState(null);

  const blogStyle = {
    padding: "5px 5px",
    backgroundColor: "black",
    borderRadius: "8px",
    border: "1px solid",
    width: "350px",
  };

  const buttonStyle = {
    width: "25px",
    borderRadius: "4px",
    fontSize: "0.55em",
    cursor: "pointer",
    transition: "border-color 0.25s",
    marginLeft: "307px",
    backgroundColor: "#a83232",
  };

  const titleStyle = (isHovered) => ({
    border: "1px solid transparent",
    color: isHovered ? "white" : "#fcba03",
    padding: "0.1em 0.5em",
    fontWeight: "80",
    fontSize: "1.3em",
    fontWeight: "bold",
  });

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <ul className="blogsList">
      {sortedBlogs.map((blog) => (
        <li
          key={blog.id}
          style={blogStyle}
        >
          {user.username === blog.user.username ? (
            <button
              style={buttonStyle}
              onClick={() => handleBlogDelete(blog.id)}
            >
              X
            </button>
          ) : null}
          <Link 
            to={`/blogs/${blog.id}`}
            onMouseEnter={() => setHoveredBlogId(blog.id)}
            onMouseLeave={() => setHoveredBlogId(null)}
          >
            <h3
              style={titleStyle(blog.id === hoveredBlogId)}
              data-testid="blogTitle"
            >
              {blog.title}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogsList;
