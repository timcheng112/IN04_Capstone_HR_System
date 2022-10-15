import Navbar from "../../components/Navbar";
import {
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/20/solid";
import { useHistory } from 'react-router-dom';
import { useState, useEffect  } from "react";
import Tabs from '../../features/jobrequest/Tab'
import api from "../../utils/api";
import { getUserId} from "../../utils/Common";
import PostOption from "../../features/jobrequest/PostOption";


export default function JobPost() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filteredPosts, setFilteredPosts] =
    useState(posts);
  const [searchParam] = useState([
    "jobTitle"
  ]);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);
  
  useEffect(() => {
    api
      .getAllJobPosts()
      .then((response) => {
        setPosts(response.data);
        setFilteredPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, [refreshKey]);

  function search(e, items) {
    const value = e.target.value;
    setFilteredPosts(
          items.filter((item) => {
            return searchParam.some((newItem) => {
              return (
                item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) > -1
              );
            });
          })
        );
  }

  return (
    <div className="">
      <Navbar />
      <div className="py-5"></div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center space-x-4">
          <div className="sm:flex-auto">
            <Tabs />
            {/* <h1 className="text-xl font-semibold text-gray-900">Job Requests</h1> */}
          </div>
          <div className="w-full max-w-lg lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search"
                type="search"
                onChange={(e) => {
                  search(e, posts);
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Title
                      </th>
                      {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Department
                      </th> */}
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Post Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Posted By
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredPosts.map((post) => (
                      <tr key={post.postingId}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                          {post.jobTitle}
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{post.department.departmentName}</td> */}
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{post.postDate}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{post.postedBy.firstName}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{post.status}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <PostOption post={post} refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
