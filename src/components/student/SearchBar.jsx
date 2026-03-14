import { assets } from '../../assets/assets/assets'

const SearchBar = ({ onClose }) => {
  return (
    <div className="flex items-start justify-center px-6">

      <form className="max-w-xl w-full flex items-center border border-gray-500 rounded-4xl ">

        <img
          src={assets.search_icon}
          alt="search"
          className="w-5 mx-2"
        />

        <input
          type="text"
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