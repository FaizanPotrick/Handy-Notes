import React from "react";

function CreateTodos({
  title,
  description,
  tag,
  textChange,
  submitHandeler,
}) {
  return (
    <form
      className="modal fade"
      id="createNotes"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      onSubmit={submitHandeler}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Todos
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={textChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={description}
                rows="3"
                onChange={textChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={tag}
                onChange={textChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-dark"
              data-bs-dismiss="modal"
              disabled={!title}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateTodos;