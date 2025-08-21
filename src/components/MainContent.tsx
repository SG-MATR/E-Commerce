import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext"
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
  const {searchQuery,selectedCategory,keyword,minPrice,maxPrice} = useFilter();
  const [products,setProducts] = useState<any[]>([]);
  const [filter,setFilter] = useState<string>('all');
  const [currentPage,setCurrentPage] = useState<number>(1); 
  const [dropdownOpen,setDrowpdownOpen] = useState<boolean>(false);
  const itemsPerPage:number = 12;

  useEffect(()=>{
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage-1)*itemsPerPage}`;
    if(keyword){
     url= `https://dummyjson.com/products/search?q=${keyword}`;
    }
    axios.get(url).then((response)=>{
      setProducts(response.data.products);
    }).catch(err=>console.log(err))
  },[currentPage,keyword]);
  
  const getFilteredProducts = ()=>{
    let filteredProducts = products; // you make this variable to not effect the main products array 
    if(selectedCategory){filteredProducts=filteredProducts.filter((product)=>product.category===selectedCategory)}
    if(minPrice!==undefined){filteredProducts=filteredProducts.filter((product)=>product.price>=minPrice)}
    if(maxPrice!==undefined){filteredProducts=filteredProducts.filter((product)=>product.price<=maxPrice)}
    if(searchQuery){filteredProducts=filteredProducts.filter((product)=>product.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()))}
    switch(filter){
      case 'expensive':
        return filteredProducts.sort((a,b)=>b.price-a.price)
      case 'cheap':
        return filteredProducts.sort((a,b)=>a.price-b.price)
      case 'popular':
        return filteredProducts.sort((a,b)=>b.rating-a.rating)
      default:
        return filteredProducts      
    }
  }
  const filteredProducts = getFilteredProducts();
  const totalProducts:number = 134;
  const totalPages:number = Math.ceil(totalProducts/itemsPerPage)
  const handlePageChange = (page:number)=>{
    // page here is a parameter from the previous button = currentPage -1 or from the next button = currentPage + 1
    if(page>0 && page<=totalPages){
      setCurrentPage(page)
    }
  }
  const getPaginationButton = ()=>{
    const buttons :number[]= [];
    // dynamic changing the numbers of pagination
    // current page =1 >> startPage = 1,endPage = 3
    // current page = 2 >> startPage = 1,endPage = 4
    // current page = 3 >> startPage =1 , endPage = 5
    // current page = 4 >> startPage = 2,endPage = 6
    // current page = 5 >> startPage = 3,endPage = 7
    // current page = 6 >> startPage = 4,endPage = 8
    // current page = 7 >> startPage = 5,endPage = 9
    // current page = 8 >> startPage = 6,endPage = 10
    // current page = 9 >> startPage = 7,endPage = 11
    // current page = 10 >> startPage = 8,endPage = 12
    // current page = 11 >> startPage = 9,endPage = 12
    // current page = 12 >> startPage = 10,endPage = 12

    let startPage = Math.max(1,currentPage-2);
    let endPage = Math.min(totalPages,currentPage+2);
    // you don't want to make pagination numbers increase while the current page is 1 or 2 ,you want if i click in the page 3 increase and give me 4,5,..
    // current page =1 >> endPage = 3+(2-1-1)=3
    // current page =2 >> endPage = 4+(2-2-1)=3
    // so it will look in two cases (1,2) like 1,2,3
    if(currentPage-2<1){
      endPage = Math.min(totalPages,endPage+(2-currentPage-1))
    }
    // you want the final pagination like this 10,11,12 the last three numbers
    // when current page = 10 it is look like 8,9,10,11,12
    // when current page = 11 it is look like 9,10,11,12
    // when current page = 12 it is look like 10,11,12
    // what you want in case of 11 and 12 you want like this 10,11,12 
    // so the final result will be like this with startPage 
    // current page = 11 >> startPage = 9-(11-12) =10
    // current page = 12 >> startPage = 10-(12-12) =10
    if(currentPage+2>totalPages){
      startPage = Math.max(1,startPage-(currentPage-totalPages))
    }
    for(let page = startPage;page<=endPage;page++){
      buttons.push(page);
    }
    return buttons;
  }
  console.log(currentPage)
  console.log(filteredProducts);
  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5 mr-[10rem]">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button className="border px-4 py-2 rounded-full flex items-center">
              <Tally3 className="mr-2 cursor-grab" onClick={()=>setDrowpdownOpen((current)=>!current)}/>
              {filter==='all'?'Filter':filter.charAt(0).toLocaleLowerCase()+filter.slice(1)}
            </button>
            {
              dropdownOpen&&(
                <div className="absolute bg-white border border-grey-300 rounded mt-2 w-full sm:w-40">
                  <button onClick={()=>setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-grab">
                    Cheap
                  </button>
                  <button onClick={()=>setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-grab">
                    Expensive
                  </button>
                  <button onClick={()=>setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-grab  ">
                    Popular
                  </button>
                </div>
              )
            }
          </div>  
        </div>
        {/* Products */}
        <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5">
          {filteredProducts.map((product:any)=>(
            <BookCard key={product.id} id={product.id} title={product.title} image={product.thumbnail} price={product.price} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
        {/* Previous Button */}
          <button disabled={currentPage===1} className="border px-4 py-2 rounded full" onClick={()=>handlePageChange(currentPage-1)}>Previous</button>
        {/* 1,2,3,4,5 Buttons */}
          
        <div className="flex flex-wrap justify-center">
          {getPaginationButton().map((page,index)=>(
            <button key={index} onClick={()=>handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full cursor-grab ${page===currentPage?'bg-black text-white':''}`}>{page}</button>
          ))}
        </div>
        {/* Next Button */}
          <button disabled={currentPage===totalPages} className="border px-4 py-2 rounded full" onClick={()=>handlePageChange(currentPage+1)}>Next</button>
        </div>
      </div>
    </section>
  )
}

export default MainContent