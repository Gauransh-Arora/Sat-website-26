import logo from '../assets/ti-logo.png';
import './TranslucentNavbar.css';

export default function TranslucentNavbar() {
  return (
    <nav className="translucent-floating-navbar">
        <div className="navbar-logo">
            <img src={logo} alt="TI Logo" />
        </div>

        <div className="navbar-links">
            <a href="#home">Home</a>
            <a href="#events">Events</a>
            <a href="#team">Team</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
            <a href="#signin">Sign in</a>
        </div>
    </nav>
  );
}
