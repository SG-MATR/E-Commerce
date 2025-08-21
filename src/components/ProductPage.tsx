import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

interface Product{
  id:string,
  title:string,
  description:string,
  price:number,
  rating:number,
  images:string[],

}

const ProductPage = () => {
  const {id} = useParams<{id:string}>();
  const navigate = useNavigate();
  const [product,setProduct] = useState<Product|null>(null);
  useEffect(()=>{
    if(id){
      axios.get<Product>(`https://dummyjson.com/products/${id}`).then(response=>setProduct(response.data)).catch(err=>console.log(err));
    }
  },[id])
  console.log(product)
  if(!product){
    return <h1>Loading...</h1>
  }
  return (
    <div className="w-[60%] p-5">
      <button onClick={()=>navigate(-1)} className="mb-5 px-4 py-2 bg-black text-white rounded cursor-grab">Back</button>
      <img src={product.images[0]} alt="productImage" className="w-[50%] h-auto mb-5" />
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <h1 className="mb-4 text-gray-700 w-[70%]">{product.description}</h1>
      <div className="flex">
        <p>Price: ${product.price}</p>
        <p className="ml-10">Rating: {product.rating}</p>
      </div>
    </div>
  )
}

export default ProductPage