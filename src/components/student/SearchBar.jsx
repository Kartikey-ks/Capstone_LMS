import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets/assets"

const SearchBar = ({ data }) => {

  const [search, setSearch] = useState(data || "")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(search.trim() !== ""){
      navigate(`/course-list/${search}`)
    } else {
      navigate(`/course-list`)
    }
  }

  return (
    <div className="flex items-start justify-center px-6">

      <form 
        onSubmit={handleSubmit}
        className="max-w-xl w-full flex items-center border border-gray-500 rounded-4xl"
      >

        <img
          src={assets.search_icon}
          alt="search"
          className="w-5 mx-2"
        />

        <input
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search for courses"
          className="flex-1 outline-none text-gray-600"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 ml-2 rounded-3xl cursor-pointer"
        >
          Search
        </button>

      </form>

    </div>
  )
}

export default SearchBar