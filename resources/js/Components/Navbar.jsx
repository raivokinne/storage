import { useForm } from "@inertiajs/react";

const Navbar = () => {
    const { delete: destroy, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        destroy(route("logout"));
    };

    return (
        <>
            <nav className="h-20 flex items-center bg-white justify-center w-full">
                <div className="container flex items-center justify-between mx-6">
                    <div className="flex items-center">
                        <a href="/">
                            <p>STORAGE</p>
                        </a>
                    </div>

                    <ul className="flex items-center space-x-6">
                        <li>
                            <a href="/dashboard" className="hover:text-gray-400">Home</a>
                        </li>
                        <li>
                            <a href="/reports" className="hover:text-gray-400">Reports</a>
                        </li>
                        <li>
                            <a href="/users" className="hover:text-gray-400">Users</a>
                        </li>
                        <li>
                            <a href="/shelves" className="hover:text-gray-400">Shelves</a>
                        </li>
                        <li>
                            <a href="/products" className="hover:text-gray-400">Products</a>
                        </li>
                    </ul>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <form onSubmit={submit}>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    Logout
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
