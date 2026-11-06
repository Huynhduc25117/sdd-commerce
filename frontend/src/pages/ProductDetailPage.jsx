import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { formatPrice } from "../data/products";
import { useCommerce } from "../context/CommerceContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useCommerce();
  const product = products.find((entry) => String(entry.id) === id);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={800}>Sản phẩm không tồn tại</Typography>
        <Button component={RouterLink} to="/products" sx={{ mt: 2 }}>Quay lại cửa hàng</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button component={RouterLink} to="/products" sx={{ mb: 2, px: 0 }}>← Tất cả sản phẩm</Button>
      <Paper sx={{ p: { xs: 2, md: 5 }, borderRadius: 4 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 3, md: 6 }} alignItems="center">
          <Box component="img" src={product.image} alt={product.name} sx={{ width: "100%", maxWidth: 520, height: { xs: 260, md: 420 }, objectFit: "contain", bgcolor: "#f8fafc", borderRadius: 3 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="overline" color="primary" fontWeight={800}>{product.category}</Typography>
            <Typography variant="h3" fontWeight={900} sx={{ fontSize: { xs: "2rem", md: "2.7rem" } }}>{product.name}</Typography>
            <Typography variant="h4" color="primary.dark" fontWeight={900} sx={{ my: 2 }}>{formatPrice(product.price)}</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{product.description}</Typography>
            <Alert severity="info" sx={{ my: 3 }}>Thông tin và giá sản phẩm hiện là dữ liệu demo của frontend.</Alert>
            <Stack direction="row" gap={1.5} flexWrap="wrap">
              <Button variant="contained" size="large" onClick={() => { addToCart(product); setAdded(true); }}>Thêm vào giỏ hàng</Button>
              <Button variant="outlined" size="large" onClick={() => { addToCart(product); navigate("/cart"); }}>Mua ngay</Button>
            </Stack>
            {added && <Alert severity="success" sx={{ mt: 2 }}>Đã thêm sản phẩm vào giỏ hàng.</Alert>}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
