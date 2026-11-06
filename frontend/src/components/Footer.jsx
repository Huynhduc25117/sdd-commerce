
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#101828",
        color: "white",
        py: 4,
        mt: "auto"
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" fontWeight="bold">
          SDD Commerce
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
          Website thương mại điện tử đồ công nghệ.
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          © 2026 SDD Commerce — Software Development & DevOps.
        </Typography>
      </Container>
    </Box>
  );
}
