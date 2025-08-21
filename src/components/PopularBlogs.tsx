import { MessageCircle, ThumbsUp } from "lucide-react"

const PopularBlogs = () => {
  const blogs = [
    {
      title:'My Amazing Blog 1',
      author:'User 1',
      likes:142,
      comments:44
    },
    {
      title:'My Amazing Blog 2',
      author:'User 2',
      likes:132,
      comments:24
    },
    {
      title:'My Amazing Blog 3',
      author:'User 3',
      likes:100,
      comments:19
    },
    {
      title:'My Amazing Blog 4',
      author:'User 4',
      likes:190,
      comments:100
    },
  ]
  return (
    <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog,index)=>(
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold mb-2">{blog.title}</span>
            </div>
            <span className="text-gray-600">Published by {blog.author}</span>
            <div className="flex items-center mt-2">
              <MessageCircle size={16}/>
              <span className="text-gray-500 mr-5 ml-1">{blog.comments}</span>
              <ThumbsUp size={16}/>
              <span className="text-gray-500 mr-2 ml-2">{blog.likes}</span>
              <span></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PopularBlogs