import logo from "../../assets/logo-footer.svg";

import "./style.scss";

function Footer () {
    return (
        <footer className="footer">
            <img src={logo} className="footer-logo" alt="Kasa logo"/>
            <h3 className="footer-text">© 2020 Kasa. All rights reserved</h3>
        </footer>
    )
}

export default Footer