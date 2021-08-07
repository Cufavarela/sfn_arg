import { Box, Container } from "@material-ui/core";
import InfoItem from "../components/InfoItem";

const AboutUs = () => {
  return (
    <Box className="bg noScroll">
      <Container>
        <InfoItem
          title="Nosotros"
          info="Hola! Somos SFN_ARG en Junio de 2020 comenzamos esta aventura debido
            a las circunstancias de la pandemia mundial, tuvimos que
            reinventarnos totalmente y empezar desde cero. Nuestro objetivo más
            allá de intentar conseguirte lo que estás buscando es darte una
            atención personalizada. Que sientas que estamos trabajando 100% para
            vos y estamos disponibles para cualquier duda o inquietud. Nos
            caracterizamos por contestar rapido, trabajar de manera eficaz y
            estar atentos a todos los detalles, porque al fin y al cabo son los
            que marcan la diferencia!"
          icons="🏃‍♂️ • 👟 • 🏃‍♀️"
        />
        <Box className="smallInfoItemsContainer">
          <InfoItem
            title="Envíos"
            info="Envíos GRATIS a todo el país a través de ANDREANI.
            En CABA entrega prescencial GRATIS dentro de las 24hs desde tu compra."
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

export default AboutUs;
