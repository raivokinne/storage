import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
    
export default function Show({ report }) {
    const { data, setData, delete: destroy, errors } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        destroy(route("report.destroy", report.id));
    };
    return (
        <>
            <section className="flex items-center justify-center w-screen h-screen">
                <article className="w-[400px] p-8 place-items-center grid gap-4 border border-black">
                    <h1 className="text-2xl font-bold">{report.name}</h1>
                    <p className="text-lg">{report.description}</p>
                    <p className="text-lg">{report.date}</p>
                    <div className="flex gap-4 items-center">
                        <Link
                            className="bg-black text-white w-full p-2 rounded-md px-4"
                            href={`/reports/${report.id}/edit`}
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
        </>
    );
}
