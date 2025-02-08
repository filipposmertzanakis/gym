import React, { useState, useEffect } from 'react';
import { registerUser } from '../apiService';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    lastname: '',
    email: '',
    address: {
      country: '',
      city: '',
      street: ''
    }
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, country: selectedCountry, city: '' }
    }));

    const countryObj = countries.find((c) => c.country === selectedCountry);
    if (countryObj) {
      setCities(countryObj.cities);
    } else {
      setCities([]);
    }
  };

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setCountries(data.data);
        } else {
          console.error('Error fetching countries:', data.msg);
        }
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log('Registration request sent:', response);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="register-form">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register</p>
          <p className="Signup-message">Signup now and get full access to our gym.</p>

          <div className="flex">
            <label>
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Firstname"
                required
                onChange={handleChange}
              />
              <span>Firstname</span>
            </label>
            <label>
              <input
                className="input"
                type="text"
                name="lastname"
                placeholder="Lastname"
                required
                onChange={handleChange}
              />
              <span>Lastname</span>
            </label>
          </div>

          <label>
            <select
              className="input"
              name="address.country"
              required
              value={formData.address.country}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((countryObj) => (
                <option key={countryObj.country} value={countryObj.country}>
                  {countryObj.country}
                </option>
              ))}
            </select>
            <span>Country</span>
          </label>

          <label>
            <select
              className="input"
              name="address.city"
              required
              value={formData.address.city}
              onChange={handleChange}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <span>City</span>
          </label>

          <label>
            <input
              className="input"
              type="text"
              name="address.street"
              placeholder="Street & number"
              required
              onChange={handleChange}
            />
            <span>Street & number</span>
          </label>

          <label>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <span>Username</span>
          </label>

          <label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <span>Password</span>
          </label>

          <label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Confirm password"
              required
              onChange={handleChange}
            />
            <span>Confirm password</span>
          </label>

          <button className="submit" type="submit">
            Request for Register!
          </button>
          <p className="signin">
            Already have an account? <a href="login">Signin</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;