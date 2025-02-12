import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ report }) {
    const { data, setData, put, errors } = useForm({
        name: report.name,
        description: report.description,
        date: report.date,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("reports.update", report.id));
    };

    return (
        <>
            <section className="flex items-center justify-center w-screen h-screen">
                <form
                    onSubmit={submit}
                    className="grid w-full p-8 bg-white rounded-md place-items-center"
                >
                    <fieldset className="grid gap-4 w-[400px]">
                        <legend className="w-full text-2xl text-center">
                            Edit Report
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
                                value={data.name}
                            />
                            {errors.name && (
                                <p className="text-red-500">{errors.name}</p>
                            )}
                        </label>
                        <label htmlFor="description" className="flex flex-col">
                            <span className="font-bold">Description</span>
                            <textarea
                                className="placeholder-gray-500 rounded shadow resize-none"
                                name="description"
                                id="description"
                                cols="30"
                                rows="10"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                value={data.description}
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </label>
                        <label htmlFor="date" className="flex flex-col">
                            <span className="font-bold">Date</span>
                            <input
                                className="placeholder-gray-500 rounded shadow "
                                type="date"
                                placeholder="date"
                                name="date"
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                                value={data.date}
                            />
                            {errors.date && (
                                <p className="text-red-500">{errors.date}</p>
                            )}
                        </label>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-black rounded"
                            onClick={submit}
                        >
                            Update
                        </button>
                    </fieldset>
                </form>
            </section>
        </>
    );
}
