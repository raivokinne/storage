import Authenticated from "@/Layouts/AuthedLayout";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Show({ product }) {
    const { data, setData, delete: destroy, processing, errors, reset } = useForm(
        {},
    );

    const submit = (e) => {
        e.preventDefault();

        destroy(route("product.destroy", shelf.id));
    };

    return (
        <>
            <Authenticated>
                <section className="flex items-center justify-center w-screen h-screen">
                    <article className="grid w-full grid-cols-2 p-8 place-items-center">
                        <div className="grid gap-4">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-lg text-green-500">${product.price}</p>
                            <p className="text-lg">{product.description}</p>
                            <div className="flex items-center gap-4">
                                <Link
                                    className="bg-black text-white w-[100px] flex items-center p-2 rounded-md px-4"
                                    href={`/products/${product.id}/edit`}
                                >
                                    Edit
                                </Link>
                                <form onSubmit={submit}>
                                    <button
                                        className="w-full p-2 px-4 text-white bg-black rounded-md"
                                        type="submit"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                        <img
                            src={`/storage/products/${product.image}`}
                            alt={product.name}
                            className="w-[300px] object-cover rounded-md"
                        />
                    </article>
                </section>
            </Authenticated>
        </>
    );
}

