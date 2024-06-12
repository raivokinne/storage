import Authenticated from "@/Layouts/AuthedLayout";

export default function Index({ products, auth }) {
    return (
        <Authenticated>
            <section className="grid mt-32 place-items-center">
                <div className="grid grid-cols-4 place-items-center gap-10 w-[1400px]">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <article
                                key={product.id}
                                className="p-8 w-[300px] h-[400px] bg-white rounded-md border border-black"
                            >
                                <a href={`/products/${product.id}/show`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover w-full h-48 rounded-md"
                                    />
                                </a>
                                <div className="w-full border-t-2 border-black pt-4">
                                    <h1 className="text-xl font-semibold">
                                        {product.name}
                                    </h1>
                                    <p className="font-bold text-green-500">
                                        ${product.price}
                                    </p>
                                </div>
                            </article>
                        ))
                    ) : (
                        <p className="text-xl">No products found</p>
                    )}

                    {(auth.user.role === "admin" || auth.user.role === "worker") && (
                        <a
                            href="/products/create"
                            className="flex items-center justify-center w-12 h-12 p-2 text-2xl text-white bg-black rounded-full"
                        >
                            +
                        </a>
                    )}
                </div>
            </section>
        </Authenticated>
    );
}

