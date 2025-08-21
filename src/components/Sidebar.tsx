import React, { useEffect, useState } from "react"
import { useFilter } from "./FilterContext";

const Sidebar = () => {
  interface Product{
    category:string
  }  
  interface FetchResponse{
    products:Product[]
  }
  const [categories,setCategories] = useState<string[]>([]);// the categories will be array of strings
  const [keywords,setKeywords] = useState<string[]>([
    "apple",
    "watch",
    "fashsion",
    "trend",
    "shoes",
    "shirt"
  ]);
  const {searchQuery,setSearchQuery,selectedCategory,setSelectedCategory,minPrice,setMinPrice,maxPrice,setMaxPrice,keyword,setSelectedKeyword} = useFilter()
  useEffect(()=>{
    const fetchCategories = async()=>{
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            const uniqueCategories: string[] = Array.from(new Set(data.products.map((product:any)=>product.category)
        ));
        // or you can do this :[...new Set(data.products.map((product:any)=>product.category]
        setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error Fetching Data',error)
        }
    }
    fetchCategories()
  },[])
  const handleMinPrice = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    setMinPrice(value?parseFloat(value):undefined)
  }
  const handleMaxPrice = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    setMaxPrice(value?parseFloat(value):undefined)
  }
  const handleCategoryChange = (category:string)=>{
    setSelectedCategory(category)
  }
  const handleKeywordChange = (keyword:string)=>{
    setSelectedKeyword(keyword)
  }
  const handleResetFilters = ()=>{
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedKeyword('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
  }
  return (
    <div className="w-64 h-screen p-5 ">
        <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
        <section>
            <input type="text" className="px-2 py-3 border-2 rounded px-2 sm:mb-0" placeholder="Search A Product" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
        </section>
        <div className="flex justify-center items-center mt-3">
            <input type="text" className="w-full px-5 border-2 mr-2 py-3 mb-3" placeholder="Min" value={minPrice??''} onChange={e=>handleMinPrice(e)}/>
            <input type="text" className="w-full px-5 border-2 mr-1 py-3 mb-3" placeholder="Max" value={maxPrice??''} onChange={e=>handleMaxPrice(e)}  />
        </div>
        <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        {/* Category Section */ }
        <section>    
            {
                categories.map((category,index)=>(
                    <label key={index} className="flex items-center mb-2">
                        <input type="radio" name="category" value={category} onChange={()=>handleCategoryChange(category)} checked={selectedCategory===category} className="mr-2 w-[16px] h-[16px]"/>
                        {category.toUpperCase()}
                    </label>
                ))
            }
        </section>
        {/* Keywords Section */ }
        <section>
            <div className="mb-5 mt-4">
                <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                <div>
                    {keywords.map((keyword,index)=>(
                        <button onClick={()=>handleKeywordChange(keyword)} key={index} className="block mb-2 px-4 py-2 text-left border rounded hover:bg-gray-200 hover:cursor-grab w-full">
                            {keyword.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={()=>handleResetFilters()} className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 hover:cursor-grab hover:bg-gray-800">Reset Filters</button>
        </section>
    </div>

  )
}

export default Sidebar