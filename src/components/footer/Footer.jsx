import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut esse facilis iusto eligendi distinctio ipsam corrupti nobis excepturi culpa! Placeat?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis eum sit in laudantium natus odit impedit veritatis officiis dolore totam?
                </div>
                <div className="socialIcons">
                    <a className="icon" href="https://www.facebook.com/imvikashkk/" target="_blank">
                        <FaFacebookF />
                    </a>
                    <a className="icon" href="https://www.instagram.com/imvikashkk/" target="_blank">
                        <FaInstagram />
                    </a>
                    <a className="icon" href="https://twitter.com/imvikashkk" target="_blank">
                        <FaTwitter />
                    </a>
                    <a className="icon" href="https://www.linkedin.com/in/imvikashkk/" target="_blank">
                        <FaLinkedin />
                    </a>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;
