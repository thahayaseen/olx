import  { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string; // Unique identifier for the product
  productName: string; // Name of the product
  description: string; // Product description
  price: number; // Product price
  image: string; // Image URL of the product
  location: string; // Location where the product is available
  category: string; // Category of the product (e.g., Vehicles)
  seller: string; // Seller's unique identifier (e.g., user ID)
  createdAt: string; // Timestamp when the product was created
  updatedAt: string; // Timestamp when the product was last updated
}


const ProductPage = () => {
  const navigate=useNavigate()
  const [ischange,setChange]=useState(false)
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set()); 
  
const updated=()=>{
  // console.log('here now',h);
  setChange(!ischange)
}
  useEffect(() => {
    axios.get('http://localhost:3000/getProduct')
    .then((response) => {

      setProducts(response.data.data);
    })
    
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [ischange]);

  const handleWishlistToggle = (productId: string) => {
    setWishlistedProducts((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar update={updated}/>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} onClick={()=>{navigate(`/product/${product._id}`)}} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleWishlistToggle(product._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                >
                  <Heart
                    size={20}
                    className={wishlistedProducts.has(product._id) ? "fill-red-500 text-red-500" : "text-gray-500"}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">${product.price}</h2>
                  <span className="text-sm text-gray-500">{product.createdAt}</span> {/* Displaying createdAt */}
                </div>
                <h3 className="mt-2 text-lg text-gray-700">{product.productName}</h3> {/* Displaying productName */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  {product.location}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="flex items-center px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                      <MessageCircle size={16} className="mr-1" />
                      Chat
                    </button>
                    <button className="flex items-center px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                      <Share2 size={16} className="mr-1" />
                      Share
                    </button>
                  </div>
               
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
