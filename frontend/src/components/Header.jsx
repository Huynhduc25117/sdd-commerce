
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: "white",
              textDecoration: "none",
              fontWeight: 800
            }}
          >
            SDD Commerce
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" component={RouterLink} to="/">
              Trang chủ
            </Button>
            <Button color="inherit" component={RouterLink} to="/products">
              Sản phẩm
            </Button>
            <Button color="inherit" component={RouterLink} to="/cart">
              Giỏ hàng
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Đăng nhập
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
