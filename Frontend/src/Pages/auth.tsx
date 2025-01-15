import { useEffect, useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Auth = () => {

  const nevigate = useNavigate();
  const isloged = localStorage.getItem('logned')
  console.log(isloged);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',

    password: '',
    name: ''
  });
  useEffect(() => {


    if (isloged) {
      console.log('goin');

      nevigate('/')
      return
    }
  }, [isloged, nevigate])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      console.log("sending");
      // console.log(formData);

      axios.post('http://localhost:3000/login',
        formData
      )
        .then((data) => {
          if (data.status == 200) {
            console.log('afsfd');
            localStorage.setItem('logned', data.data.uid)

            nevigate('/')
          }
          else{
            console.log(data);
            
          }
        })
        .catch((err) => {
          console.log('in catch');

          toast.error(err.response.data.message);

        })
    }
    else {
      axios.post('http://localhost:3000/signup', formData)
        .then((data) => {
          if (data.status == 200) {
            console.log('afsfd');
            localStorage.setItem('logned', data.data.uid)

            nevigate('/')
          }

        })
        .catch((err)=>{
          toast.error(err.response.data.message)
          
        })
    }
    console.log('Form submitted:', formData);
  };

  return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
      {/* Close Button */}
      <button onClick={() => {
        nevigate('/')
      }} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
        <X className="h-6 w-6" />
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p className="text-gray-600 text-sm">
          {isLogin
            ? 'Login to access your account'
            : 'Join the largest marketplace community'}
        </p>
      </div>



      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 ' />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isLogin && (
          <div className="text-right">
            <button type="button" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>

      {/* Toggle Auth Mode */}
      <p className="text-center mt-6 text-gray-600">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline font-medium"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  </div>)

};

export default Auth;