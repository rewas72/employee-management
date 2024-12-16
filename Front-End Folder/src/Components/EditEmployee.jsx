import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
  const { employeeId } = useParams()
  const [employee, setEmployee] = useState({
    email: "",
    fullname: "",
    position: "",
  });
  const navigate = useNavigate()

  useEffect(() => {


    axios.get('http://localhost:3000/auth/employee/' + employeeId)
      .then(result => {
        setEmployee({
          ...employee,
          email: result.data.Result[0].email,
          fullname: result.data.Result[0].fullname,
          position: result.data.Result[0].position,
        })
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    console.log("API Response:", result); // Yanıtı loglayın
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_employee/' + employeeId, employee)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/employee')
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              FullName
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              autoComplete="off"
              value={employee.fullname}
              onChange={(e) =>
                setEmployee({ ...employee, fullname: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className='col-12'>
            <label for="inputSalary" className="form-label">
              position
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              autoComplete="off"
              value={employee.position}
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee