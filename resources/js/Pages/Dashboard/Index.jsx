import React, { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import Authenticated from "@/Layouts/AuthedLayout";

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch("/api/user");
            const data = await response.json();
            setUser(data);
            setLoading(false);
        };

        fetchUserData();
    }, []);

    return (
        <Authenticated>
            <div className="relative min-h-screen">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="w-full max-w-lg p-6 text-center">
                        {loading ? (
                            <p className="text-lg">Loading...</p>
                        ) : user ? (
                            <div className="p-6">
                                <div className="mb-6">
                                    <h1 className="mb-4 text-3xl font-bold text-center">
                                        Welcome {user.name} to Storage
                                    </h1>
                                </div>
                            </div>
                        ) : (
                            <p className="text-red-500">
                                Error fetching user data
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Home;
