import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
}
const HeadingAndSubheading: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "4.5rem",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" sx={{ color: "#384D68", fontWeight: "normal" }}>
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#757575",
          maxWidth: "50rem",
          alignItems: "center",
          textAlign: "center",
          lineHeight: "1.3",
          fontWeight: "normal",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default HeadingAndSubheading;
