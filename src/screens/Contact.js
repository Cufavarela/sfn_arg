import { Box, Container } from "@material-ui/core";
import InfoItem from "../components/InfoItem";

const Contact = () => {
  return (
    <Box className="bg noScroll">
      <Container>
        <InfoItem
          title="Contacto"
          info="Atención al cliente disponible las 24hs a través de redes, whatsapp o teléfono."
          icons="💌 • 📞 • 📲"
          contact
        />
        <Box className="smallInfoItemsContainer">
          <InfoItem
            title="Envíos"
            info="Envíos GRATIS a todo el país a través de ANDREANI.
            En CABA entrega presencial GRATIS dentro de las 24hs desde tu compra."
            icons="🚚 • 🎁 • 📫"
            isSmall
          />
          <InfoItem
            title="Dónde estamos?"
            info="Holmberg 4129, Saavedra, CABA."
            icons="🛒 • 🔻 • 🤝"
            isSmall
          />
        </Box>
        <InfoItem
          title="Cómo comprar?"
          info="Contamos con diferentes medios pago para adecuarnos a lo que necesites. Podemos recibir Efectivo, depósitos o transferencias bancarias. También podés abonar con trajeta de débito o crédito, pero estas opciones cuentan con un recargo %."
          icons="💸 • 👟 • 🏧"
        />
      </Container>
    </Box>
  );
};

export default Contact;
