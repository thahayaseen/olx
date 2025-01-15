
import { Search, MapPin, Bell, MessageCircle, Plus, User,LogOut } from 'lucide-react';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddProductForm } from './addProduct'
import { toast } from 'react-toastify';
interface Nav{
  update?:()=>void
}
const Navbar:React.FC<Nav> = ({update}) => {
  const [isadd, setadd] = useState(false)
  const [logged,setloged]=useState(true)
  const navigate = useNavigate()
  return (
    <nav className="bg-white shadow-md">
      {/* Top Nav */}
      <div className="container mx-auto px-4">
        <div  className="flex items-center justify-between h-16 ">
          {/* Logo */}
          <div onClick={()=>{navigate('/')}} className="flex items-center cursor-pointer">
            <span className="text-2xl font-bold text-blue-600">OLX</span>
          </div>

          {/* Location Selector */}
          <div className="flex items-center border rounded-md px-2 py-1 mx-4 cursor-pointer hover:border-blue-500">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span className="ml-2 text-gray-700">Select Location</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r-md">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center ml-4 space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MessageCircle className="h-6 w-6 text-gray-600" />
            </button>
            {
              localStorage.getItem('logned') ? <button onClick={() => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: 'Do you want to log out?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, log me out!',
                  cancelButtonText: 'Cancel',
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Add your logout logic here (e.g., clear session, redirect to login page)
                    setloged(!logged)
                    localStorage.clear()
                    Swal.fire('Logged Out!', 'You have been logged out successfully.', 'success');
                  }
                });
                
              }} className="p-2 hover:bg-gray-100 rounded-full">
                <LogOut className="h-6 w-6 text-gray-600" />
              </button> : <button onClick={() => {
                if (!localStorage.getItem('logned')) {
                  navigate('/auth')
                }
              }} className="p-2 hover:bg-gray-100 rounded-full">
                <User className="h-6 w-6 text-gray-600" />
              </button>
            }
            <button onClick={() => {
              console.log(localStorage.getItem('logned'));
              
              if(localStorage.getItem('logned')){
                setadd(true)
               
                
              }
              else{
                toast.error("Please Login")
              }
            }} className="flex items-center px-4 py-2 bg-white border-2 border-black rounded-md hover:bg-gray-50">
              <Plus className="h-5 w-5 mr-1" />
              <span className="font-semibold">SELL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 h-12 text-sm">
            <span className="hover:text-blue-600 cursor-pointer">ALL CATEGORIES</span>
            <span className="hover:text-blue-600 cursor-pointer">Cars</span>
            <span className="hover:text-blue-600 cursor-pointer">Motorcycles</span>
            <span className="hover:text-blue-600 cursor-pointer">Mobile Phones</span>
            <span className="hover:text-blue-600 cursor-pointer">Houses</span>
            <span className="hover:text-blue-600 cursor-pointer">TV - Video - Audio</span>
            <span className="hover:text-blue-600 cursor-pointer">Electronics</span>
          </div>
        </div>
      </div>
      <div>
        {isadd && (<AddProductForm setadd={setadd} update={update} />)}
      </div>
    </nav>
  );
};

export default Navbar;