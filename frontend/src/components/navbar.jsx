import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="flex justify-start items-center py-6 text-sm text-gray-600 space-x-10">
      <Link to="/" className="hover:text-black">HOME</Link>
      <button
        onClick={() => navigate("/", { state: { scrollTo: "About" } })}
        className="hover:text-black "
      >
        ABOUT
      </button>
      <Link to="/bookstore" className="hover:text-black">BOOKSTORE</Link>
      <button
        onClick={() => navigate("/", { state: { scrollTo: "footer" } })}
        className="hover:text-black"
      >
        CONTACT
      </button>

      {isLoggedIn ? (
        <button className="nav-button" onClick={logout}>Logout</button>
      ) : (
        <button className="nav-button" onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
}
