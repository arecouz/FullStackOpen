const Notification = ({ message }) => {
  const notificationStyle = {
    color: "white",
    backgroundColor: "green",
    padding: "6px",
    marginBottom: "20px",
    marginTop: "20px",
    textAlign: "center",
  };
  const nullStyle = {
    padding: "15px",
    marginBottom: "20px",
    marginTop: "20px",
  };


  if (message === null) {
    return <div style={nullStyle}>{message}</div>;
  }
  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
