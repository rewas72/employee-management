import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [project, setProject] = useState({
    projectId: "",
    projectName: "",
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate()

  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:3000/auth/add_project', project)
      .then(result => {
          if (result.data.Status) {
              navigate('/dashboard/project');
          } else {
              alert(result.data.Error);
          }
      })
      .catch(err => console.log(err));
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add project</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              ProjectId
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setProject({ ...project, projectId: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Project Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setProject({ ...project, projectName: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              StartDate
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setProject({ ...project, startDate: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              EndDate
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setProject({ ...project, endDate: e.target.value })
              }
            />
          </div>
         
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
