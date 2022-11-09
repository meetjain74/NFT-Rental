import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import React from "react";
import { FEATURED_NFT_DATA } from "../../constants/DefaultData";

const FeaturedNFT: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {FEATURED_NFT_DATA.map((item, index) => {
        return (
          <Grid sx={{ alignItems: "center", justifyContent: "center" }} item key={index}>
            <Card sx={{ maxWidth: 345, minHeight: 345, margin: "1rem 1.5rem" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={require("../../assets/" + item.image)}
                  alt={item.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rent Price ..................................{item.rentPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Daily Rent ..................................{item.dailyRent}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FeaturedNFT;
