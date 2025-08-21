import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Sidebar from "./components/Sidebar"
import MainContent from './components/MainContent'
import ProductPage from './components/ProductPage'
import TopSeller from './components/TopSeller'
import PopularBlogs from './components/PopularBlogs'
const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar/>
        <div className='rounded flex justify-center flex-wrap w-full'>
          <Routes>
            <Route path='/' element={<MainContent/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
          </Routes>
        </div>
        <div>
          <TopSeller/>
          <PopularBlogs/>
        </div>
      </div>
    </Router>
  )
}

export default App