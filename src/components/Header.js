import { Link } from "react-router-dom";
import logo from "../assets/logoSinFondo.png";
import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png";
import { Box, Button, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <div className="navbarContainer">
      <Box className="logoAndButtons">
        <img className="logo" src={logo} alt="logo de sfn" />
        <ul className="navbarMenu">
          <li className="navbarItem">
            <Link to="/">Inicio</Link>
          </li>
          <li className="navbarItem">
            <Link to="/aboutUs">Nosotros</Link>
          </li>
          <li className="navbarItem">
            <Link to="/contact">Contacto</Link>
          </li>
        </ul>
      </Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Button
          href="https://api.whatsapp.com/send?phone=541166145318&text=%C2%A1Hola!%20quiero%20consultar%20sobre%20"
          target="blank"
        >
          <img className="socialNetwork" src={whatsapp} alt="logo de wp" />
        </Button>
        <Button href="https://www.instagram.com/sfn_arg/" target="blank">
          <img className="socialNetwork" src={instagram} alt="logo de wp" />
        </Button>
        <Typography style={{ margin: "0px 18px 0px 10px" }} variant="h6">
          |
        </Typography>
        <Link style={{ textDecoration: "none" }} to="/admin">
          <Button variant="outlined" color="secondary">
            Admin
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Header;
