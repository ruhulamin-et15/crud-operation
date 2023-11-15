import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const loadingMessage = <p>Todos is loading</p>;
const Users = () => {
  const [users, setUsers] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  // const getData = async () => {
  //   try {
  //     setIsloading(true)
  //     const {data} = await axios.get("http://localhost:3001/")
  //     console.log(data)
  //     setIsloading(false)
  //     setUsers(data?.users)
  //   } catch (error) {
  //     setIsloading(false)
  //     console.log(error)
  //   }
  // };

  // useEffect(()=>{
  //   getData()
  // },[])

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => {
        if (!res.ok) {
          throw Error("fetching is not successful");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setIsloading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setIsloading(false);
      });
  }, []);

  const loadingError = <p>{error}</p>;

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isloading && loadingMessage}
            {error && loadingError}
            {users?.map((user) => (
              <tr>
                <td className="bg-primary rounded" key={user.id}>{user.name}</td>
                <td className="bg-secondary rounded" key={user.id}>{user.email}</td>
                <td className="bg-warning rounded" key={user.id}>{user.age}</td>
                <td className="bg-primary rounded">
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-success mx-1"
                  >
                    Update
                  </Link>
                  <button
                    onClick={(e) => handleDelete(user._id)}
                    className="btn btn-danger mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
