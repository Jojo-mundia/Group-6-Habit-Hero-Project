import React from "react";

const Navbar = () => {
  const { user } = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };

  return (
    <nav className="navbar navbar-dark bg-dark p-3"
    style={{height: "100px"}}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1>
          Good {getGreeting()},{user?.firstName}!
        </h1>
        <div className="d-flex align-items-center">
          <Clock />
          <div className="ms-3">
            <Link className="btn btn-outline-light me-2 " to="/home">
            Home
              </Link>
          </div>
        </div>
      </div>
    </nav>
  )
};
