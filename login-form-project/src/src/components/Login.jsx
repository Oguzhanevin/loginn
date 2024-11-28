import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
  terms: 'You must agree to the terms of service and privacy policy',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  useEffect(() => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA6]{2,6}$/;

    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = errorMessages.email;
    }

    if (!form.password || form.password.length < 4) {
      newErrors.password = errorMessages.password;
    }

    if (!form.terms) {
      newErrors.terms = errorMessages.terms;
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      history.push('/success');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={!!errors.email}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={!!errors.password}
        />
        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>

      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={!!errors.terms}
        />
        <Label htmlFor="terms" check>
          I agree to the terms of service and privacy policy
        </Label>
        {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
      </FormGroup>

      <Button color="primary" disabled={!isValid}>Sign In</Button>
    </Form>
  );
}