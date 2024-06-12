import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
    });

    const submit = (e) => {
        e.preventDefault();

        console.log(data);
        post(route("register.store"));
    };

    return (
        <>
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="h-max w-[400px]">
                    <h1 className="mb-2 text-3xl font-black text-center ">
                        Register
                    </h1>
                    <div className="p-3">
                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                <label htmlFor="name" className="flex flex-col">
                                    <span className="font-bold">Name</span>
                                    <input
                                        className="placeholder-gray-500 rounded shadow "
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </label>
                                <label
                                    htmlFor="email"
                                    className="flex flex-col"
                                >
                                    <span className="font-bold">Email</span>
                                    <input
                                        className="placeholder-gray-500 rounded shadow "
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <p className="text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </label>
                                <label
                                    htmlFor="password"
                                    className="flex flex-col"
                                >
                                    <span className="font-bold">Password</span>
                                    <input
                                        className="placeholder-gray-500 rounded shadow "
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <p className="text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </label>
                                <label
                                    htmlFor="password_confirmation"
                                    className="flex flex-col"
                                >
                                    <span className="font-bold">
                                        Confirm Password
                                    </span>
                                    <input
                                        className="placeholder-gray-500 rounded shadow "
                                        type="password"
                                        placeholder="confirm password"
                                        name="password_confirmation"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-red-500">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </label>
                                <label htmlFor="role" className="flex flex-col">
                                    <span className="font-bold">Role</span>
                                    <select
                                        className="text-gray-500 rounded shadow "
                                        name="role"
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="sorter">Sorter</option>
                                        <option value="worker">Worker</option>
                                    </select>
                                    {errors.role && (
                                        <p className="text-red-500">
                                            {errors.role}
                                        </p>
                                    )}
                                </label>

                                <button
                                    type="submit"
                                    className="w-full p-2 font-bold text-white bg-black"
                                >
                                    Register
                                </button>
                                <Link
                                    href="/"
                                    className="w-full text-center underline text-sky-500"
                                >
                                    already have an account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
