import React, { Component } from "react";
import Box from "@material-ui/core/Box";

export class Star extends Component {
  render() {
    return (
      <div>
        <p>
          Dieser Text dient Ihnen als Anleitung durch unsere Testapp. Die App
          besteht aus 2 Teilen, der Sozial- und der Familienanamnese. In beiden
          Teilen geht es um eine möglichst umfassende Beschreibung Ihrer
          persönlichen Situation. Sollten Sie einen Eintrag vergessen, werden
          Sie vom Programm darauf hingewiesen. In der Sozialanamnese geht es vor
          allem um Ihr berufliches Umfeld während die Familienanamnese Ihre
          Verwandschaftsbeziehungen erfasst. Bitte versuchen Sie die Beziehungen
          möglichst genau zu erfassen. Ihr betreuender Arzt bekommt dadurch
          einen schnellen und persönlichen Einblick über Ihre persönliche
          Situation und kann den Untersuch besser auf Sie abstimmen.
        </p>

        <Box
          display="flex"
          flexDirection="row"
          p={1}
          m={1}
          justifyContent="flex-end"
        >
          {" "}
          <img
            src={require("./images/thinksmiley.jpg")}
            height="70px"
            width="70px"
          />
        </Box>
      </div>
    );
  }
}

export default Star;
