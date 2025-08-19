// App.jsx (fixed)
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import ListProduct from "./pages/ListProduct";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Login from "./components/Login";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log("Backend URL:", backendUrl);

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    else setToken(null);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      {token === null ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Navbar */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <NavBar setToken={setToken} />
          </div>

          {/* Content area */}
          <div className="flex flex-1 pt-16">
            {/* Sidebar */}
            <div className="fixed top-16 bottom-0 left-0 shadow-md bg-white">
              <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto bg-white ml-16 sm:ml-20 md:ml-56 transition-all duration-300">
              <Routes>
                <Route path="/addProduct" element={<AddProduct token={token} />} />
               
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/listProduct" element={<ListProduct token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
