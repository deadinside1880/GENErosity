import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { buy } from "../functions";
import { purple } from "@mui/material/colors";
import { getProvider } from "../functions";

export default function CustomCard({ data }) {
  const [purchased, setPurchased] = React.useState(false);
  async function noname() {
    const provider = await getProvider();
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log(data[1], data[0]);
    if (data[1].length > 0) {
      if (data[1].includes(address)) {
        setPurchased(true);
      }
    } else {
      setPurchased(false);
    }
  }
  noname();
  console.log(purchased);
  return (
    <Card
      sx={{
        minWidth: 230,
        maxWidth: 230,
        maxHeight: 200,
        minHeight: 200,
        margin: 4,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: "#D507E0" }}>
          {data[2]}
        </Typography>
        <Typography class="mt-5" variant="body2">
          {data[0]}
        </Typography>
      </CardContent>
      <CardActions class="flex-col ml-2">
        <Typography sx={{ paddingLeft: 1 }} variant="body2">
          ${data[3]}
        </Typography>
        {purchased ? (
          <Button
            sx={{ marginTop: 1, background: "#666666", borderRadius: 3 }}
            variant="contained"
          >
            {" "}
            Purchased
          </Button>
        ) : (
          <Button
            sx={{ marginTop: 1, background: "#D507E0", borderRadius: 3 }}
            variant="contained"
            onClick={() => buy(data[4], data[3])}
          >
            {" "}
            Purchase
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
