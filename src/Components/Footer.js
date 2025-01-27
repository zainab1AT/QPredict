import React from "react";
import "../Styles/Footer.css";

function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="ft-info">
          <p className="ft-title">
          <span className="navbar-sign">Q</span>Predict
          </p>
          <p className="ft-description">
            Your trusted platform for online medical consultations and advice, 
            connecting you with expert doctors at your convenience.
          </p>
        </div>

        <div className="ft-list">
          <p className="ft-list-title">Quick Links</p>
          <ul className="ft-list-items">
            <li>
              <a href="#services">Consult a Doctor</a>
            </li>
            <li>
              <a href="#services">Health Tips</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="ft-list" id="contact">
          <p className="ft-list-title">Contact Us</p>
          <ul className="ft-list-items">
            <li>
              <a href="mailto:support@healthplus.com">support@healthplus.com</a>
            </li>
            <li>
              <a href="tel:+0123456789">+012 345 6789</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-copyright">
        <p>© 2023 Health+. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
