import Authenticated from "@/Layouts/AuthedLayout"
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Show({ shelf }) {
    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
    });

    const submit = (e) => {
        e.preventDefault();

        destroy(route("shelf.destroy", shelf.id));
    };

  return (
    <>
      <Authenticated>
            <section className="flex items-center justify-center w-screen h-screen">
                <article className="w-[400px] p-8 place-items-center grid gap-4 border border-black">
                    <h1 className="text-2xl font-bold">{shelf.name}</h1>
                    <p className="text-lg">Product: {shelf.product.name}</p>
                    <div className="flex gap-4 items-center">
                        <Link
                            className="bg-black text-white w-full p-2 rounded-md px-4"
                            href={`/shelves/${shelf.id}/edit`}
                        >
                            Edit
                        </Link>
                        <form onSubmit={submit}>
                            <button
                                className="bg-black text-white w-full p-2 rounded-md px-4"
                                type="submit"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </article>
            </section>
      </Authenticated>
    </>
  )
}

