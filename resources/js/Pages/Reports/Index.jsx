import Authenticated from "@/Layouts/AuthedLayout";

export default function Index({ reports }) {
    return (
        <Authenticated>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg mt-20">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-3xl font-bold mb-6">History Reports</h1>
                            <hr className="my-6" />
                            <ul className="list-none space-y-4">
                                {reports.map((report) => (
                                    <li key={report.id} className="flex justify-between items-center">
                                        <a
                                            className="hover:underline text-blue-600 text-lg"
                                            href={`/reports/${report.id}/show`}
                                        >
                                            {report.name}
                                        </a>
                                        <p className="text-gray-600">{report.date}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

