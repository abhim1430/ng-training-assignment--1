import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Row, Col, Pagination } from "react-bootstrap";

import { FaListCheck } from "react-icons/fa6";
import { SlMagnifier } from "react-icons/sl";
import { TodoData } from "../services/TodoData";
import Modal from "react-bootstrap/Modal";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currId, setCurrId] = useState();
  const [taskName,setTaskName] =useState("");
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [currentTaskData, setCurrentTaskData] = useState(null); // Track current task data for editing
 

  const handleDeleteModal = (id, task) => {
    setCurrId(id);
    setTaskName(task);
    setIsOpen(true);
  };

  const handleDelete = () => {
    const dt = data.filter((item) => item.id !== currId);
    setData(dt);
    console.log(dt);
    setIsOpen(false);
  };
  const handleSave = (task) => {
    if (task.id) {
      // Update existing task
      setData(data.map(item => (item.id === task.id ? task : item)));
    } else {
      // Add new task
      setData([...data, { ...task, id: Date.now() }]);
    }
  };

  const handleEdit = (item) => {
    setCurrentTaskData(item);
    setShowNewTaskModal(true);
  };

  useEffect(() => {
    setData(TodoData);
  }, []);

  return (
    <div className="p-5">
      <section>
        <div className="d-flex justify-content-between align-items-center border">
          <div className="d-grid justify-content-center align-items-center p-2 pb-0">
            <span className="d-flex justify-content-center align-items-center gap-2">
              <span
                className="bg-danger  d-flex justify-content-center align-items-center rounded-3 text-white"
                style={{ width: "2.5rem", height: "2.5rem" }}

              >
                <FaListCheck />
              </span>

              <span className="d-flex flex-column h-100 ">
                <span>Tasks</span>
                <span>All Tasks</span>
                </span>
                </span>
                <span>{data.length} records</span>
                </div>
          <div className="d-grid gap-2 p-2">
            <span>
              <button
                className="btn text-primary border  px-5"
                style={{ borderRadius: "0" }}
                onClick={() => {
                  setCurrentTaskData(null); // Clear current task data for new task
                  setShowNewTaskModal(true);
                }}
              >
                New Task
              </button>
              <button onClick={() => window.location.reload()}
                className="btn text-primary border  px-5"
                style={{ borderRadius: "0" }}
              >
                Refresh
              </button>
            </span>
            <span className="d-flex justify-content-between border px-3">
            <input
                type="text"
                placeholder="Search"
                className="border-0 w-100"
                onFocus={(e) => (e.target.style.outline = "none")}
              />
              <button className="btn">
                <SlMagnifier />
              </button>
            </span>
          </div>
        </div>

        <table className="table table-hover border">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th colSpan="2">Comments</th>

            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{<input type="checkbox" />}</td>
                <td>{item.AssignedTo}</td>
                <td>{item.Status}</td>
                <td>{item.dueDate}</td>
                <td>{item.priority}</td>
                <td>{item.comments}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="none border" id="dropdown-basic"></Dropdown.Toggle>

                    <Dropdown.Menu className="bg-warning">
                      <Dropdown.Item onClick={() => handleEdit(item)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                         onClick={() =>
                          handleDeleteModal(item.id, item.AssignedTo)
                        }
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Delete Confirmation Modal */}
      {isOpen && (
        <Modal
          show
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="bg-danger text-white justify-content-center" closeButton onClick={() => setIsOpen(false)}>
            <Modal.Title id="contained-modal-title-vcenter ">Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you want to delete task {taskName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn border border-2 px-4" onClick={() => setIsOpen(false)}>
              No
            </button>
            <button className="btn border border-2 px-4" onClick={handleDelete}>
              Yes
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* New Task Modal */}
      <TaskForm
        show={showNewTaskModal}
        handleClose={() => setShowNewTaskModal(false)}
        handleSave={handleSave}
        taskData={currentTaskData} // Pass current task data for editing
      />
      <Row>
        <Col className="d-flex justify-content-between align-items-center">
        <p>{data.length} records</p>
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </Col>
      </Row>
    
    </div>
  );
};



export default TaskList;
