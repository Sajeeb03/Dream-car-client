import React, { useContext } from 'react';
import lightLogo from "../../../assets/lightLogo.png"
import darkLogo from "../../../assets/darkLogo.png"
import { ToggleContext } from '../../../Contexts/ThemeSwitch/ThemeSwitch';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
const Footer = () => {
    const { theme } = useContext(ToggleContext);
    return (
        <footer className="footer p-10 bg-base-100 text-base-content dark:bg-primary dark:text-white">
            <div>
                <img className='-ml-10 md:ml-0' src={theme === "dark" ? darkLogo : lightLogo} alt="footer logo" />
                <p className='md:ml-12 text-lg'>Dream Car<br />Buy or sell your car easily.</p>
            </div>
            <div>
                <span className="footer-title opacity-100">Services</span>
                <Link to="/" className="link link-hover">Selling Cars.</Link>
                <Link to="/" className="link link-hover">Offer least prices</Link>
                <Link to="/" className="link link-hover">Marketing</Link>
                <Link to="/" className="link link-hover">Advertisement</Link>
            </div>
            <div>
                <span className="footer-title opacity-100">Technology Used</span>
                <Link to="/" className="link link-hover">React</Link>
                <Link to="/" className="link link-hover">Tailwind/daisyUi</Link>
                <Link to="/" className="link link-hover">React router</Link>
                <Link to="/" className="link link-hover">React Queries</Link>
            </div>
            <div>
                <span className="footer-title opacity-100">Contact Us</span>
                <div className='flex gap-5'>
                    <a href="https://www.facebook.com/sajeebmuntasir"
                        target={`blank`}
                    ><FaFacebook className='h-8 w-8 text-primary dark:text-white' /></a>

                    <a href="https://github.com/Sajeeb03"
                        target="blank"><FaGithub className='h-8 w-8 text-primary dark:text-white' /></a>

                    <a href="https://www.linkedin.com/in/muntasir-sajeeb/"
                        target={`blank`}><FaLinkedin className='h-8 w-8 text-primary dark:text-white' /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;