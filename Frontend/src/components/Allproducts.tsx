import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Allproducts() {
    const [products,Setproduct]=useState(null)
    useEffect(()=>{
        axios.get('http://localhost:3000/getProduct')
        .then((data)=>{
            Setproduct(data.data)
        })
    },[])
console.log(products);


 
}

export default Allproducts
