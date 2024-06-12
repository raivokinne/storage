import { useState } from "react";
import Authenticated from "@/Layouts/AuthedLayout";
import { useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Index({ users, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const { data, setData, post } = useForm({
        search: searchQuery,
    });

    const handleFilter = (e) => {
        e.preventDefault();
        post(route("users.search"), {
            preserveState: true,
            replace: true,
        });
    };

    const formatDate = (isoString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(isoString).toLocaleDateString(undefined, options);
    };

    return (
        <Authenticated>
            <div className="container mx-auto p-8 mt-20 bg-white rounded-md shadow-md">
                <div className="flex items-center justify-between pb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-600">Users</h2>
                        <span className="text-sm text-gray-500">{users.length} users</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative flex items-center bg-gray-100 rounded-full">
                            <input
                                type="text"
                                className="w-full p-2 px-4 bg-transparent border-none rounded-full focus:outline-none"
                                placeholder="Search by name"
                                value={data.search}
                                onChange={(e) => setData("search", e.target.value)}
                            />
                            <button
                                className="px-4 py-2 text-sm font-semibold text-white transition duration-150 bg-indigo-600 rounded-full hover:bg-indigo-500"
                                onClick={handleFilter}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Role
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Created at
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <a href={`/users/${user.id}/show`}>
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            {user.image ? (
                                                                <img
                                                                    className="w-10 h-10 rounded-full"
                                                                    src={user.image}
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <img
                                                                    className="w-10 h-10 rounded-full"
                                                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                                    alt=""
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">{formatDate(user.created_at)}</p>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <span
                                                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                                                        user.status === "active"
                                                            ? "text-green-900"
                                                            : user.status === "inactive"
                                                            ? "text-orange-900"
                                                            : "text-red-900"
                                                    }`}
                                                >
                                                    <span
                                                        aria-hidden
                                                        className={`absolute inset-0 ${
                                                            user.status === "active"
                                                                ? "bg-green-200"
                                                                : user.status === "inactive"
                                                                ? "bg-orange-200"
                                                                : "bg-red-200"
                                                        } opacity-50 rounded-full`}
                                                    ></span>
                                                    <span className="relative">{user.status}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200" colSpan="4">
                                            <p className="text-gray-900 whitespace-no-wrap">No users found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={users.meta.current_page}
                            lastPage={users.meta.last_page}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

