import React from 'react'
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download Our App</h4>
                <p>Download App for Android and IOS</p>
                <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
                    <img src={playStore} alt="playstore" />
                </a>
                <a href="https://www.apple.com/in/app-store/" target="_blank" rel="noreferrer">
                    <img src={appStore} alt="appstore" />
                </a>
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2022 &copy; Asif</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.linkedin.com/in/mdasifraza28/" target="_blank" rel="noreferrer">
                    LinkedIn
                </a>
                <a href="https://github.com/mdasifraza" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://twitter.com/mdasifr36" target="_blank" rel="noreferrer">Twitter</a>
            </div>
        </footer>
    )
}

export default Footer