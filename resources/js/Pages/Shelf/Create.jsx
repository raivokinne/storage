import { useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthedLayout";

export default function Create({ auth, products }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        product_id: 0,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("shelf.store"));
    };
    return (
        <>
            <Authenticated>
                <section className="flex items-center justify-center w-screen h-screen">
                    <form
                        onSubmit={submit}
                        className="grid w-full p-8 bg-white rounded-md place-items-center"
                        encType="multipart/form-data"
                    >
                        <fieldset
                            disabled={processing}
                            className="grid gap-4 w-[400px]"
                        >
                            <legend className="w-full text-2xl text-center">
                                Add Shelf
                            </legend>
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
                                htmlFor="product_id"
                                className="flex flex-col"
                            >
                                <span className="font-bold">Product</span>
                                <select
                                    className="placeholder-gray-500 rounded shadow "
                                    name="product_id"
                                    onChange={(e) =>
                                        setData("product_id", e.target.value)
                                    }
                                >
                                    <option value="0">Select Product</option>
                                    {products.map((product) => (
                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && (
                                    <p className="text-red-500">
                                        {errors.product_id}
                                    </p>
                                )}
                            </label>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-black rounded"
                                onClick={submit}
                            >
                                Create
                            </button>
                        </fieldset>
                    </form>
                </section>
            </Authenticated>
        </>
    );
}
