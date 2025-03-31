"use client";
import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";

const Logout = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Remove the access token cookie
        document.cookie = `accessToken=; Max-Age=0; path=/;`;
        // Redirect to the authentication page
        router.push('/Authentication');
    }

    return (
        <div className={`absolute hover:cursor-pointer text-3xl z-100 top-5 right-5`}>
            <RiLogoutBoxLine onClick={handleLogout} />
        </div>
    );
}

export default Logout;
