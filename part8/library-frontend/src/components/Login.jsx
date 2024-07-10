import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = ({ isAuthorized, setAuthorization }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('@login mutuation', error.message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setAuthorization(token);
      localStorage.setItem('user', token);
      nav('/books');
    }
  }, [result.data]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ variables: { username, password } });
      setAuthorization(response.data.login.value);
      localStorage.setItem('user', token);
      nav('/books');
    } catch (error) {
      console.log('@handleLogin', error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <br></br>
          <h2 className="text-left">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicUsername">
              <Form.Control
                type="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
