import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Product from './pages/Product'
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import Searchbar from './components/Searchbar'
import SignUp from './pages/SignUp'
import ForgotPassword from './components/ForgotPassword'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
   <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <NavBar/>
    <Searchbar/>
     <ToastContainer />
      <Routes>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>

        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="product/:id" element={<Product />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/collection" element={<Collection />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/place-order" element={<PlaceOrder />}/>
        <Route path="/orders" element={<Orders />}/>
      </Routes>
      <Footer/>

    </div>
  )
}

export default App