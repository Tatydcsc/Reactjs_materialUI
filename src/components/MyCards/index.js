import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "../Card";

function MyCards({ cards = [] }) {
  return (
    <Grid container spacing={4}>
      {cards && cards.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
          <Card card={card} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MyCards;
