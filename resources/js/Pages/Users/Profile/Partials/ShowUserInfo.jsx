import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function ShowUserInfo({ user, auth }) {
    const [isHovered, setIsHovered] = useState(false);
    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("users.update", { user: user.id }));
    };

    return (
        <div className="h-full">
            <div className="block border-b-2 md:flex">
                <div className="w-full p-4 bg-white shadow-md md:w-2/5 sm:p-6 lg:p-8">
                    <div
                        className="relative flex justify-center p-8 mx-2 w-max"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div>
                            {user.image ? (
                                <img
                                    className="w-[250px] h-[250px] rounded-full"
                                    src={user.image}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className="w-[250px] h-[250px] rounded-full"
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt=""
                                />
                            )}
                            {isHovered && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-full">
                                    <h1 className="m-2 text-2xl font-bold text-white">
                                        Change img
                                    </h1>
                                    <input
                                        type="file"
                                        className="px-2 py-1 text-white bg-black rounded text-l"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <form
                    className="w-full p-8 bg-white shadow-md md:w-3/5 lg:ml-4"
                    onSubmit={handleSubmit}
                >
                    <div className="p-6 rounded shadow">
                        <div className="pb-6">
                            <label
                                htmlFor="name"
                                className="block pb-1 font-semibold text-gray-700"
                            >
                                Name
                            </label>
                            <div className="flex">
                                <input
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 rounded-r border-1"
                                    type="text"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="pb-6">
                            <label
                                htmlFor="email"
                                className="block pb-1 font-semibold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 rounded-r border-1"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <div className="text-red-500">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div className="pb-6">
                            <label
                                htmlFor="password"
                                className="block pb-1 font-semibold text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 rounded-r border-1"
                                type="password"
                                value={data.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <div className="text-red-500">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        <div className="pb-6">
                            <label
                                htmlFor="password_confirmation"
                                className="block pb-1 font-semibold text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                className="w-full px-4 py-2 rounded-r border-1"
                                type="password"
                                value={data.password_confirmation}
                                onChange={handleChange}
                            />
                            {errors.password_confirmation && (
                                <div className="text-red-500">
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <h1 className="block font-semibold text-gray-700">
                                Role
                            </h1>
                            {user.role === "admin" ? (
                                <select
                                    name="role"
                                    value={data.role}
                                    onChange={handleChange}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="worker">Worker</option>
                                    <option value="sorter">Sorter</option>
                                </select>
                            ) : (
                                <input
                                    id="role"
                                    name="role"
                                    className="w-full px-4 py-2 rounded-r border-1"
                                    type="text"
                                    value={data.role}
                                    disabled
                                />
                            )}
                            {errors.role && (
                                <div className="text-red-500">
                                    {errors.role}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 mt-6 text-sm font-semibold transition duration-150 bg-indigo-600 rounded text-indigo-50 hover:bg-indigo-500"
                        >
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

