import { useEffect, useRef, useState } from "react";
import { Camera, X } from 'lucide-react';
import axios from "axios";
import { RotateLoader } from "react-spinners";
import { toast } from 'react-toastify';

export const AddProductForm = ({ setadd, update }:{ setadd: (x:boolean) => void, update: (h: string) => void }) => {

    useEffect(() => {
        if (!localStorage.getItem('logned')) {
            setadd(false)
        }
    }, []);

    const upimage = useRef<HTMLImageElement | null>(null);
    const [loading, setloading] = useState(false);
    const [img, setimg] = useState<File | null>(null);
    const [alldatas, setFormData] = useState({
        productName: '',
        price: '',
        location: '',
        category: '',
        description: '',
        seller: localStorage.getItem('logned')
    });

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Basic Validation
        if (!alldatas.productName.trim() || !alldatas.price.trim() || !alldatas.location.trim()|| !alldatas.category.trim() || !alldatas.description.trim()) {
            toast.error("All fields and image are required!");
            return;
        }
        if (localStorage.getItem('logned')) {
            console.log(localStorage.getItem('logned'));
            
        }
        console.log(alldatas);
        
        const alldata = new FormData();
        alldata.append('product', JSON.stringify(alldatas));
        alldata.append('image', img);

        setloading(true);
        
        axios.post('http://localhost:3000/addproduct', alldata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((data) => {
            toast.success(data.data.message);
            setadd(false);
            setloading(false);
            update();
        })
        .catch((err) => {
            toast.error(err.message);
            setloading(false);
        });
    };

    const handleImageUpload = (e: FileList | null) => {
        if (!e || !e.length || !upimage.current) {
            return;
        }
        upimage.current.src = URL.createObjectURL(e[0]);
        setimg(e[0]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...alldatas,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add New Product</h2>
                    <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => setadd(false)}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="productName"
                                required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleChange}
                            >
                                <option value="">Select category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Vehicles">Vehicles</option>
                                <option value="Property">Property</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Fashion">Fashion</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                            <div
                                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer upimagediv"
                                onClick={() => document.getElementById('imageInput')?.click()}
                            >
                                <Camera className="mx-auto mb-2" size={32} />
                                <p className="text-sm text-gray-500">Click to upload images</p>
                            </div>
                            <img src="" ref={upimage} className="h-56" alt="" />
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e?.target?.files)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => setadd(false)}
                            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Post Product
                        </button>
                    </div>
                </form>
            </div>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <RotateLoader color="blue" size={15} />
                </div>
            )}
        </div>
    );
};
