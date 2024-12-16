import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    employeeId: "",
    fullname:"",
    email: "",
    password: "",
    position: "",
  });
  const navigate = useNavigate()



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee);  // Konsolda veri doğru görünüyor

    // JSON kullanarak veriyi gönderin
    axios.post('http://localhost:3000/auth/add_employee', employee)
    .then(result => {
        if (result.data.Status) {
            navigate('/dashboard/employee');
        } else {
            alert(result.data.Error);
        }
    })
    .catch(err => console.log(err));
};


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
            <label for="inputName" className="form-label">
              employeeId
            </label>
            <input
              className="form-control rounded-0"
              id="inputemployeeId"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, employeeId: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="mail"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputName" className="form-label">
              FullName
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, fullname: e.target.value })
              }
            />
          </div>
          
          <div className="col-12">
            
            <label for="inputSalary" className="form-label">
              position
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter position"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            />
          </div>
          
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;