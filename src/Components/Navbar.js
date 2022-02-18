import React from "react";

function Navbar({search,searchChange}) {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <h1 className="navbar-brand m-0">
            Todos
          </h1>
          <form className="d-flex">
            <input
              className="form-control"
              name="search"
              value={search}
              placeholder="Search"
              onChange={searchChange}
            />
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
