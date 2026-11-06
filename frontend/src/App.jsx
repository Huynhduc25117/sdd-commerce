
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

function PlaceholderPage({ title }) {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Trang này sẽ được phát triển ở bước tiếp theo.
      </Typography>
    </Container>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
        <Header />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={<PlaceholderPage title="Danh sách sản phẩm" />}
            />
            <Route
              path="/products/:id"
              element={<PlaceholderPage title="Chi tiết sản phẩm" />}
            />
            <Route
              path="/cart"
              element={<PlaceholderPage title="Giỏ hàng" />}
            />
            <Route
              path="/login"
              element={<PlaceholderPage title="Đăng nhập" />}
            />
            <Route
              path="/admin"
              element={<PlaceholderPage title="Quản trị" />}
            />
            <Route
              path="*"
              element={<PlaceholderPage title="404 - Không tìm thấy trang" />}
            />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
}
