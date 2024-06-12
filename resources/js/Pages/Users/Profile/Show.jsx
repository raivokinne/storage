import { useState } from "react";
import { Dialog } from "@headlessui/react";
import ShowUserInfo from "./Partials/ShowUserInfo";

export default function Edit({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    console.log(user);

    return (
        <div className="p-4">
            <ShowUserInfo user={user} />
        </div>
    );
}

