import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

const TaskForm = ({ show, handleClose, handleSave, taskData }) => {
  const [newTask, setNewTask] = useState({
    AssignedTo: '',
    Status: '',
    dueDate: '24/09/2024',
    priority: '',
    comments: '',
  });

  useEffect(() => {
    if (taskData) {
      setNewTask(taskData);
    } else {
      setNewTask({ AssignedTo: '', Status: '', dueDate: '', priority: '', comments: '' });
    }
  }, [taskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    handleSave(newTask);
    handleClose();
  };

  return (
    <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter"  centered>
      <Modal.Header className=" justify-content-center"  closeButton onClick={handleClose}>
        <Modal.Title id="contained-modal-title-vcenter">{taskData ? "Edit Task" : "New Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="d-grid row" style={{gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>
          <div className="mb-3 d-flex flex-column flex-wrap-nowrap">
            <label className="form-label">Assigned To</label>
            <input
              type="text"
              className="form-control"
              name="AssignedTo"
              value={newTask.AssignedTo}
              onChange={handleChange}/>
              
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleChange}
            />
          </div>
         
          
          <div className="mb-3 d-flex flex-column flex-wrap-nowrap">
          <label className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              name="Status"
              value={newTask.Status}
              onChange={handleChange}/>
          
            
             <label className="form-label">Priority</label>
            <input
              type="text"
              className="form-control"
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
            />
          </div></div>
          <div className="w-100 d-grid">
            <label className="form-label">Comments</label>
            <textarea
              className="form-control"
              name="comments"
              rows="3"
              value={newTask.comments}
              onChange={handleChange}
            ></textarea>
          </div> 
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn border border-2 px-4 " onClick={handleClose}>
          Cancel
        </button>
        <button className="btn border border-2 px-4" onClick={onSave}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
