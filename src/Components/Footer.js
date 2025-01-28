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
            Your trusted platform for online medical consultations and advice.
          </p>
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
        <p>© 2024 QPredict. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
