import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTask = () => {

  const { taskId } = useParams()
  const [task, setTask] = useState({
    taskId: "",
    taskName: "",
    startDate: "",
    endDate: "",
    status:"",
  });
  const navigate = useNavigate()
  const statuses = ["Tamamlanacak", "Devam Ediyor", "Bitti"];


  useEffect(() => {
    axios.get('http://localhost:3000/auth/task/' + taskId)
      .then(result => {
        setTask({
          ...task,
          taskId: result.data.Result[0].taskId,
          taskName: result.data.Result[0].taskName,
          startDate: result.data.Result[0].startDate,
          endDate: result.data.Result[0].endDate,
          status: result.data.Result[0].status,
        })
      }).catch(err => console.log(err))
  }, [])

  const handleChange = (e) => {
    const selectedStatus = e.target.value;
    const statusIndex = statuses.indexOf(selectedStatus);
    setTask({ ...task, status: statusIndex }); // INT değerini state'e ata
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_task/'+taskId, task)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/project')
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit task</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              taskId
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Id"
              value={task.taskId}
              onChange={(e) =>
                setTask({ ...task, taskId: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              taskName
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter taskName"
              autoComplete="off"
              value={task.taskName}
              onChange={(e) =>
                setTask({ ...task, taskName: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="inputSalary" className="form-label">
              StartDate
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={task.startDate}
              onChange={(e) =>
                setTask({ ...task, startDate: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              EndDate
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={task.endDate}
              onChange={(e) =>
                setTask({ ...task, endDate: e.target.value })
              }
            />
            <div className="col-12">
              <select value={statuses[task.status] || ""} onChange={handleChange}>
                <option value="" disabled>
                  Durum Seçin
                </option>
                {statuses.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTask