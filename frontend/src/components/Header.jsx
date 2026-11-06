
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Badge
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCommerce } from "../context/CommerceContext";

export default function Header() {
  const navigate = useNavigate();
  const { cartCount, user, signOut } = useCommerce();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/products?q=${encodeURIComponent(search.trim())}`);
    setMenuOpen(false);
  };

  const links = [
    { label: "Trang chủ", to: "/" },
    { label: "Sản phẩm", to: "/products" },
    { label: "Đơn hàng", to: "/orders" },
    { label: "Quản trị", to: "/admin" }
  ];

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: "1px solid #e8edf4" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72, gap: { xs: 1, md: 2 }, flexWrap: "wrap" }}>
          <IconButton
            aria-label="Mở điều hướng"
            onClick={() => setMenuOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <Typography component="span" fontSize={22}>☰</Typography>
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: "primary.dark",
              textDecoration: "none",
              fontWeight: 900,
              letterSpacing: "-.04em",
              mr: { xs: "auto", md: 2 }
            }}
          >
            SDD<span style={{ color: "#1769e0" }}>.</span>
          </Typography>

          <Box component="form" onSubmit={submitSearch} sx={{ order: { xs: 3, md: 0 }, flex: { xs: "1 0 100%", md: "1 1 260px" }, maxWidth: { md: 360 } }}>
            <TextField
              size="small"
              fullWidth
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm sản phẩm..."
              inputProps={{ "aria-label": "Tìm sản phẩm" }}
            />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {links.slice(0, 2).map((link) => (
              <Button key={link.to} color="inherit" component={RouterLink} to={link.to}>
                {link.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, md: 1 } }}>
            <Button component={RouterLink} to="/cart" color="inherit" aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}>
              <Badge badgeContent={cartCount} color="primary">Giỏ hàng</Badge>
            </Button>
            {user ? (
              <>
                <Button component={RouterLink} to="/account" color="inherit" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
                  {user.name}
                </Button>
                <Button color="primary" onClick={signOut}>Thoát</Button>
              </>
            ) : (
              <Button component={RouterLink} to="/login" variant="contained">Tài khoản</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }} role="presentation">
          <List>
            {[...links, { label: "Giỏ hàng", to: "/cart" }, ...(user ? [{ label: "Tài khoản", to: "/account" }] : [{ label: "Đăng nhập", to: "/login" }])].map((link) => (
              <ListItemButton key={link.to} component={RouterLink} to={link.to} onClick={() => setMenuOpen(false)}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
