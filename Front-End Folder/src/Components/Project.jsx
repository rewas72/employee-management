import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState([]);
  const navigate = useNavigate()
  const [task, setTask] = useState("");
  const [modalVisible, setModalVisible] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [employee, setEmployee] = useState([])
  const statuses = ["Tamamlanacak", "Devam Ediyor", "Bitti"];


  useEffect(() => {
    axios
        .get("http://localhost:3000/auth/employee")
        .then((result) => {
            console.log(result.data)
            if (result.data.Status) {
                setEmployee(result.data.Result);
            } else {
                alert(result.data.Error);
            }
        })
        .catch((err) => console.log(err));
}, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/project")
      .then((result) => {
        if (result.data.Status) {
          setProject(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (projectId) => {
    axios.delete('http://localhost:3000/auth/delete_project/' + projectId)
      .then(result => {
        if (result.data.Status) {
          window.location.reload()
        } else {
          alert(result.data.Error)
        }

      })
  }

  const handleDeleteTask = (taskId)=> {
    axios.delete('http://localhost:3000/auth/delete_task/'+taskId).then(result=> {
      if(result.data.Status) {
        window.location.reload()
      } else {
        alert(result.data.Error)
      }
    })
  }

  

  const handleViewTasks = (projectId, projectName) => {
    axios
      .get(`http://localhost:3000/auth/task/${projectId}`)
      .then((result) => {
        console.log("API Response:", result.data);
        if (result.data.Status) {
          const tasks = Array.isArray(result.data.Result) ? result.data.Result : [];
          setTask(tasks); // Doğru veri yapısını ayarla
          setSelectedProjectName(projectName);
          setModalVisible(true);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  

  const closeModal = () => {
    setModalVisible(false);
    setTask([]);
    setSelectedProjectName("");
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Project List</h3>
      </div>
      <Link to="/dashboard/add_project" className="btn btn-success">
        Add Project
      </Link>
      <Link to={"/dashboard/add_task"} className="btn btn-primary m-2">
        Add Task
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>ProjectId</th>
              <th>ProjectName</th>
              <th>StartDate</th>
              <th>EndDate</th>
            </tr>
          </thead>
          <tbody>
            {project.map((e) => (
              <tr>
                <td>{e.projectId}</td>
                <td>{e.projectName}</td>
                <td>{e.startDate}</td>
                <td>{e.endDate}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_project/` + e.projectId}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.projectId)}
                  >
                    Delete
                  </button>

                  <Link
                    className="btn btn-primary btn-sm m-1 "
                    onClick={() => handleViewTasks(e.projectId, e.projectName)}
                  >
                    Görevleri Gör
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalVisible && (
        <div className="modal d-block modal-xl " style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Görevler - {selectedProjectName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {task.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>TaskId</th>
                        <th>TaskName</th>
                        <th>StartDate</th>
                        <th>EndDate</th>

                        <th>Status</th>
                        <th>employeeId</th>
                      </tr>
                    </thead>
                    <tbody>
                      {task.map((task) => (
                        <tr key={task.taskId}>
                          <td>{task.taskId}</td>
                          <td>{task.taskName}</td>
                          <td>{task.startDate}</td>
                          <td>{task.endDate}</td>
                          <td>{statuses[task.status]}</td>
                          <td>{task.assignedEmployee ? task.assignedEmployee : "No Employee"}</td> {/* assignedEmployee */}
                          <td>
                          <Link to={`/dashboard/edit_task/` + task.taskId} className="btn btn-primary btn-sm m-1 ">
                              Edit
                          </Link>
                          <Link onClick={()=> handleDeleteTask(task.taskId)} className="btn btn-warning btn-sm m-1 ">
                              Delete
                          </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Bu projeye ait görev bulunmamaktadır.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
