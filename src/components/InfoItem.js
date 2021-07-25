import { Box, Button, Typography } from "@material-ui/core";
import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png";

const InfoItem = ({ title, info, icons, isSmall, contact }) => {
  return (
    <Box className={isSmall ? "bgInfoItem small" : "bgInfoItem"}>
      <Typography
        variant={isSmall ? "h4" : "h2"}
        align="left"
        className="title"
      >
        {title}
      </Typography>
      <Typography className="text" align="left" variant="h6">
        {info}
      </Typography>
      {contact && (
        <Box className="redes">
          <Button
            href="https://api.whatsapp.com/send?phone=541166145318&text=%C2%A1Hola!%20Seba%20soy%20el%20espiritu%20de%20cufa"
            target="blank"
          >
            <img className="socialNetwork" src={whatsapp} alt="logo de wp" />
          </Button>
          <Typography variant="h4" className="text">
            {" "}
            •{" "}
          </Typography>
          <Button href="https://www.instagram.com/sfn_arg/" target="blank">
            <img className="socialNetwork" src={instagram} alt="logo de wp" />
          </Button>
        </Box>
      )}
      {!contact && (
        <Box className="icons">
          <Typography
            align="center"
            variant={isSmall ? "h5" : "h4"}
            className="text"
          >
            {icons}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default InfoItem;
