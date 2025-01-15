import axios from 'axios';
import { 
  MapPin, 
  Calendar, 
  Phone,
  Heart,
  Share2,
  MessageCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface Seller {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
}

interface ProductDetails {
  _id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
  location: string;
  category: string;
  seller: Seller;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  pdata: ProductDetails;
}

const ProductView = () => {
  const [param, setParam] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setParam(id);
    }
  }, [id]);

  useEffect(() => {
    if (param) {
      axios.get<ApiResponse>(`http://localhost:3000/product/${param}`)
        .then((response) => {
          const fetchedProduct = response.data.pdata;
          setProduct(fetchedProduct);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [param]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
              <div className="aspect-square">
                <img 
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
                >
                  <Heart 
                    className={`w-6 h-6 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
                  />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold mt-4 text-gray-900">
                    {product.productName}
                  </h1>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(product.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{product.seller.name}</h3>
                    <p className="text-gray-500 text-sm">Member since {new Date(product.createdAt).getFullYear()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
                  <Phone className="w-5 h-5" />
                  Contact Seller
                </button>
                <button className="border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;