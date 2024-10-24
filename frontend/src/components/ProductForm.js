// frontend/src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Navbar, Nav } from 'react-bootstrap';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', stock: '' });

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/products/${id}`, product);
      } else {
        await axios.post('/products', product);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Inventory Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Save
          </Button>
          {' '}
          <Button variant="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ProductForm;
