import { SiHomebridge } from "react-icons/si";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer p-4 flex flex-col items-center gap-4 mt-auto">
      <div className="flex items-center gap-6">
        <NavLink to="/" className="flex items-center gap-2 hover:text-gray-400">
          <SiHomebridge aria-label="Home" size={20} />
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      <div>
        <p className="text-sm">
          For any problem, you can contact:{" "}
          <a href="mailto:Admin@pleasecuddle.me" className="underline">
            Admin@pleasecuddle.me
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
