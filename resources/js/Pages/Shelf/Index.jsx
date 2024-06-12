import { useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthedLayout";

export default function Index({ shelves, auth }) {
    const { data, setData, delete: destroy, processing } = useForm({});

    const submit = (e, id) => {
        e.preventDefault();
        destroy(route("shelf.destroy", id));
    };

    return (
        <Authenticated>
            <div className="container mx-auto p-8 mt-20 bg-white rounded-md shadow-md">
                <div className="flex items-center justify-between pb-6">
                    <h1 className="text-3xl font-bold">Shelves</h1>
                    {(auth.user.role === "admin" || auth.user.role === "worker") && (
                        <a
                            href="/shelves/create"
                            className="p-2 px-4 text-2xl text-white bg-black rounded-full"
                        >
                            +
                        </a>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-full overflow-hidden rounded-lg shadow-md">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr className="bg-black">
                                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase border-b-2 border-gray-200 w-[5%]">
                                        Id
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase border-b-2 border-gray-200 w-[10%]">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase border-b-2 border-gray-200 w-[10%]">
                                        Product
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase border-b-2 border-gray-200 w-[1%]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {shelves.length > 0 ? (
                                    shelves.map((shelf) => (
                                        <tr key={shelf.id} className="bg-white">
                                            <td className="px-5 py-5 text-sm border-b border-gray-200">
                                                <a href={`/shelves/${shelf.id}/show`}>
                                                    <p className="text-gray-900 whitespace-no-wrap">{shelf.id}</p>
                                                </a>
                                            </td>
                                            <td className="px-5 py-5 text-sm border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">{shelf.name}</p>
                                            </td>
                                            <td className="px-5 py-5 text-sm border-b border-gray-200">
                                                <a href={`/products/${shelf.product.id}/show`}>
                                                    <p className="text-gray-900 whitespace-no-wrap">{shelf.product.name}</p>
                                                </a>
                                            </td>
                                            <td className="px-5 py-5 text-sm border-b border-gray-200">
                                                <div className="flex items-center space-x-4">
                                                    <a
                                                        href={`/shelves/${shelf.id}/edit`}
                                                        className="p-2 px-4 text-white bg-gray-800 rounded-full"
                                                    >
                                                        Edit
                                                    </a>
                                                    <form onSubmit={(e) => submit(e, shelf.id)}>
                                                        <button
                                                            type="submit"
                                                            className="p-2 px-4 text-white bg-red-600 rounded-full"
                                                        >
                                                            Delete
                                                        </button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-5 py-5 text-sm text-center text-gray-900 border-b border-gray-200"
                                        >
                                            No shelves found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

