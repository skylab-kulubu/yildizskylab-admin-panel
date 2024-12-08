import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="grid" style={{ gridTemplateColumns: "auto 1fr" }}>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
