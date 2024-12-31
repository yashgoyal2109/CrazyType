import React, { useState, useEffect } from "react";
import { symbol, keypic, settings, info, crown, bell, user } from "../assets/Index";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;


const Navbar = ({ callApi }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [username, setUsername] = useState("Loading...");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const goToLeaderboard = () => {
        navigate("/leaderboard");
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${apiurl}/logout`, {}, { withCredentials: true });
            window.location.href = "/auth/login";
        } catch (err) {
            console.error("Logout failed:", err.response?.data || err.message);
        }
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    const goToProfile = () => {
        navigate("/profile");
    };
    const goToHome = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get(`${apiurl}/currentuser`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',

                    }
                });

                if (response.data.success) {
                    setUsername(response.data.user.username);
                    setError(null);
                } else {
                    setUsername("Error loading username");
                    setError(response.data.message);
                }
            } catch (err) {
                console.error("Error fetching username:", err);
                setUsername("Guest");
                setError(err.message);

                if (err.response?.status === 401) {
                    handleLogout();
                    navigate('/login');
                }
            }
        };

        fetchUsername();
    }, [navigate, handleLogout]);

    return (
        <div className="flex flex-row justify-between w-full items-center">
            <div className="w-1/3">
                <div className="flex items-baseline justify-evenly">
                    <Link to = "/">
                        <img src={symbol} alt="logo" className="w-10 cursor-pointer" />
                        <p className="text-2xl font-bold cursor-pointer text-heading_color ">
                            CrazyType
                        </p>
                    </Link>
                    <img
                        src={keypic}
                        alt="keypic"
                        className="image-small cursor-pointer"
                        onClick={callApi}
                    />
                    <img src={crown} alt="crown" className="image-small cursor-pointer" onClick={goToLeaderboard} />
                    <img src={settings} alt="settings" className="image-small cursor-pointer" onClick={goToProfile} />
                </div>
            </div>
            <div className="w-1/6 relative">
                <div
                    className="flex items-center justify-evenly"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={user} alt="user" className="image-small cursor-pointer" />
                    <p className="text-l cursor-pointer text-text_color">{username}</p>
                    {isDropdownVisible && !error && (
                        <div className="absolute top-6 right-0 bg-dropdown_bg shadow-md rounded-lg text-black z-10">
                            <ul className="list-none">
                                <li
                                    className="px-4 py-1 hover:bg-hover_bg text-text_color cursor-pointer"
                                    onClick={goToProfile}
                                >
                                    Profile
                                </li>
                                <li
                                    className="px-4 py-1 hover:bg-hover_bg text-text_color cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;