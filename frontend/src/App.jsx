
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";

function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 9, md: 14 }, textAlign: "center" }}>
      <Typography variant="h1" color="primary" fontWeight={900}>404</Typography>
      <Typography variant="h4" fontWeight={800}>Không tìm thấy trang</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">Về trang chủ</Button>
    </Container>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
        <Header />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
}
