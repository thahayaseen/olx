
import Home from './Pages/Home'
import './App.css'
// import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import Auth from './Pages/auth'
import { ToastContainer } from 'react-toastify'
import Products from './Pages/viewProduct'
import Error from './Pages/Error'


function App() {


  return (
    <>
  
    <ToastContainer/>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path='/auth' element={<Auth/>} ></Route>
    <Route path='/product/:id' element={<Products/>}></Route>
    <Route path="*" element={<Error/>}></Route>

     </Routes>
    </>
  )
}

export default App
