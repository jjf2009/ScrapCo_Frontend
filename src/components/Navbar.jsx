import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { TbPlant2 } from "react-icons/tb";
import { BsCoin } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
    { name: "Shop with Points", href: "/shop" }
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const points = useSelector((state) => state.point.points);
    const { currentUser, logout } = useAuth();

    const handleLogOut = () => {
        logout();
        setIsDropdownOpen(false);
    };

    return (
        <header className="sticky top-0 z-10 bg-green-950 shadow-lg">
            <section className="max-w-7xl mx-auto p-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
                    <TbPlant2 size={28} /> ScrapCo
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden sm:flex space-x-6 text-white text-lg items-center">
                    <Link to="/shop" className="flex items-center hover:text-green-400">
                        <BsCoin className="mr-1" /> {points.length > 0 ? points.length : 0}
                    </Link>
                    <Link to="/create" className="hover:text-green-400">Publish Item</Link>
                    <Link to="/cart" className="flex items-center hover:text-green-400">
                        <HiOutlineShoppingCart className="mr-1" />
                        <span>{cartItems.length > 0 ? cartItems.length : 0}</span>
                    </Link>

                    {/* User Dropdown */}
                    {currentUser ? (
                        <div className="relative">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <img
                                    src={currentUser.photoURL || "/default-avatar.png"}
                                    alt="User Avatar"
                                    className="size-7 rounded-full ring-2 ring-blue-500 cursor-pointer"
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                    <ul className="py-2">
                                        <li>
                                            <button
                                                onClick={handleLogOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link 
  to="/login" 
  className="px-4 py-2 bg-white text-black font-medium rounded-full shadow-md hover:bg-gray-200 transition duration-300"
>
  Login
</Link>

                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="text-white text-3xl sm:hidden focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <HiX /> : <HiMenu />}
                </button>
            </section>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <nav className="sm:hidden bg-green-900 text-white p-4 flex flex-col items-center space-y-4">
                    <Link to="/shop" className="flex items-center hover:text-green-400">
                        <BsCoin className="mr-1" /> {points.length > 0 ? points.length : 0}
                    </Link>
                    <Link to="/create" className="hover:text-green-400">Publish Item</Link>
                    <Link to="/cart" className="flex items-center hover:text-green-400">
                        <HiOutlineShoppingCart className="mr-1" />
                        <span>{cartItems.length > 0 ? cartItems.length : 0}</span>
                    </Link>

                    {/* User Login/Logout in Mobile */}
                    {currentUser ? (
                        <>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="hover:text-green-400"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogOut}
                                className="text-red-400 hover:text-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link 
  to="/login" 
  className="px-4 py-2 bg-white text-black font-medium rounded-full shadow-md hover:bg-gray-200 transition duration-300"
>
  Login
</Link>

                    )}
                </nav>
            )}
        </header>
    );
};

export default Navbar;
