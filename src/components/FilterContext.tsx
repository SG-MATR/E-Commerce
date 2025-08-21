import { createContext,useContext,useState } from "react";
import type {ReactNode} from 'react';

interface FilterContextType {
    searchQuery:string,
    setSearchQuery:(query:string)=>void,
    selectedCategory:string,
    setSelectedCategory:(category:string)=>void,
    minPrice:number|undefined,
    setMinPrice:(price:number|undefined)=>void,
    maxPrice:number|undefined,
    setMaxPrice:(price:number|undefined)=>void,
    keyword:string,
    setSelectedKeyword:(keyword:string)=>void
}
const FilterContext =  createContext<FilterContextType|undefined>(undefined);

export const FilterProvider:React.FC<{children:ReactNode}> =({children})=>{
    const [searchQuery,setSearchQuery] = useState<string>('')
    const [selectedCategory,setSelectedCategory] = useState<string>('')
    const [minPrice,setMinPrice] = useState<number|undefined>(undefined)
    const [maxPrice,setMaxPrice] = useState<number|undefined>(undefined)
    const [keyword,setSelectedKeyword] = useState<string>('');

    return <FilterContext.Provider value={{searchQuery,setSearchQuery,selectedCategory,setSelectedCategory,minPrice,setMinPrice,maxPrice,setMaxPrice,keyword,setSelectedKeyword}}>
        {children}
    </FilterContext.Provider>
}

export const useFilter = ()=>{
    const context = useContext(FilterContext);
    if(context===undefined){
        throw new Error("useFilter must be used wihtin a FilterProvider")
    }
    return context;
}

// Steps to make a context with react and typescript
/*
1- create the interface (value,setvalue)
2- create the context with (createContext) and give the interface to it 
3- create context provider to wrap all components as childrens in it to can make use of sharing props and states
4- use (useContext) to make use of the context
5- import the context provider in your app 
*/