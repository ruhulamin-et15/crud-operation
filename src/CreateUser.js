import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:3001/createUser", {name,email,age})
      console.log(data)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e)=>setName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e)=>setAge(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
