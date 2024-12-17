import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const [task, setTask] = useState({
        taskId: "",
        projectId: "",
        employeeId: "",
        taskName: "",
        startDate: "",
        endDate: "",
        manDay: "",
        status: "",
        delay: "",
    });
    const navigate = useNavigate()


    const handleChange = (e) => {
        const selectedStatus = e.target.value;
        const statusIndex = statuses.indexOf(selectedStatus);
        setTask({ ...task, status: statusIndex }); // INT değerini state'e ata
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/auth/add_task', task)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/project');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

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

    const [status, setStatus] = useState(""); // Seçilen durumu tutmak için state
    const [project, setProject] = useState([]);
    const statuses = ["Tamamlanacak", "Devam Ediyor", "Bitti"];
    const [employee, setEmployee] = useState([])


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add task</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputName" className="form-label">
                            taskId
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(e) =>
                                setTask({ ...task, taskId: e.target.value })
                            }
                        />
                        <div className="col-12">
                            <label for="category" className="form-label">
                                projectId
                            </label>
                            <select
                                name="projectId"
                                id="projectId"
                                className="form-select"
                                onChange={(e) => setTask({ ...task, projectId: e.target.value })}
                            >
                                {project.map((p) => (
                                    <option key={p.projectId} value={p.projectId}>
                                        {p.projectName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label for="inputName" className="form-label">
                            employeeId
                        </label>
                        <select
                            name="employeeId"
                            id="employeeId"
                            className="form-select"
                            onChange={(e) => setTask({ ...task, employeeId: e.target.value })}
                        >
                            {employee.map((m) => (
                                <option key={m.employeeId} value={m.employeeId}>
                                    {m.fullname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">
                            task Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) =>
                                setTask({ ...task, taskName: e.target.value })
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
                                setTask({ ...task, startDate: e.target.value })
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
                                setTask({ ...task, endDate: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">
                            man day
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) =>
                                setTask({ ...task, manDay: e.target.value })
                            }
                        />
                    </div>
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
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">
                            delay
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) =>
                                setTask({ ...task, delay: e.target.value })
                            }
                        />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Add task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
