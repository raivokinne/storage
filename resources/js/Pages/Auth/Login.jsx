import { Head, Link, useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login.store"));
    };

    return (
        <>
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="h-max w-[400px]">
                    <h1 className="mb-2 text-3xl font-black text-center ">
                        Login
                    </h1>
                    <div className="h-max w-[400px] p-3">
                        <form onSubmit={submit}>
                            <div className="grid gap-4">
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
                                <label className="">
                                    <input
                                        className="mr-2 rounded-sm shadow "
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    Remember me
                                </label>
                                <button
                                    type="submit"
                                    className="w-full p-2 font-bold text-white bg-black rounded"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
