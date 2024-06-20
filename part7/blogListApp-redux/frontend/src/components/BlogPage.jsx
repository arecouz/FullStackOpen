import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogPage = ({incrementLikes, user, handleBlogDelete}) => {
  const blogStyle = {
    padding: "5px 5px",
    backgroundColor: "black",
    borderRadius: "8px",
    border: "1px solid",
    width: "350px",
  };

  const buttonStyle = {
    width: "40px",
    borderRadius: "8px",
    fontSize: "0.55em",
    fontWeight: "500",
    fontFamily: "inherit",
    backgroundColor: "green",
    cursor: "pointer",
    transition: "border-color 0.25s",
    marginLeft: "15px",
  };

  const tittleStyle = {
    border: "1px solid transparent",
    color: "#fcba03",
    padding: "0.6em 0.8em",
    fontWeight: "80",
    fontFamily: "'Courier New', monospace",
    fontSize: "1.3em",
    fontWeight: "bold",
  };

  const blogs = useSelector((state) => state.blogs);

  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return null;
  }

  return (
    <>
      <h3 style={tittleStyle} data-testid="blogTitle">
        {blog.title}
        <div></div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <p>by {blog.author}</p>
        <p>
          likes: {blog.likes}
          <button style={buttonStyle} onClick={() => incrementLikes(blog.id)}>
            +1
          </button>
        </p>
        <p style={{ fontSize: "18px" }}>
          created by user: {blog.user.username}
        </p>
      </h3>
    </>
  );
};

export default BlogPage;
