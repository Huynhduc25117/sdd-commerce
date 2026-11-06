import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { formatPrice } from "../data/products";
import { useCommerce } from "../context/CommerceContext";

export default function CartPage() {
  const { cartItems, cartTotal, updateCartQuantity, removeFromCart } = useCommerce();

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="overline" color="primary" fontWeight={800}>GIỎ HÀNG CỦA BẠN</Typography>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 3 }}>Giỏ hàng</Typography>
      {!cartItems.length ? (
        <Paper sx={{ p: { xs: 3, md: 7 }, textAlign: "center" }}>
          <Typography variant="h6" fontWeight={800}>Giỏ hàng đang trống</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Hãy tìm sản phẩm yêu thích của bạn.</Typography>
          <Button component={RouterLink} to="/products" variant="contained" sx={{ mt: 3 }}>Khám phá sản phẩm</Button>
        </Paper>
      ) : (
        <Stack direction={{ xs: "column", md: "row" }} alignItems="start" gap={3}>
          <Stack spacing={2} sx={{ flex: 1, width: "100%" }}>
            {cartItems.map(({ product, quantity }) => (
              <Paper key={product.id} sx={{ p: 2 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
                  <Box component="img" src={product.image} alt={product.name} sx={{ width: 110, height: 100, objectFit: "contain", bgcolor: "#f8fafc", borderRadius: 2 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={800}>{product.name}</Typography>
                    <Typography color="primary.dark" fontWeight={700}>{formatPrice(product.price)}</Typography>
                  </Box>
                  <TextField
                    label="Số lượng"
                    type="number"
                    size="small"
                    value={quantity}
                    inputProps={{ min: 1, step: 1 }}
                    onChange={(event) => updateCartQuantity(product.id, Math.max(1, Number(event.target.value) || 1))}
                    sx={{ width: 110 }}
                  />
                  <IconButton aria-label={`Xóa ${product.name}`} color="error" onClick={() => removeFromCart(product.id)}>×</IconButton>
                </Stack>
              </Paper>
            ))}
          </Stack>
          <Paper sx={{ p: 3, width: { xs: "100%", md: 340 }, position: { md: "sticky" }, top: 100 }}>
            <Typography variant="h6" fontWeight={900}>Tóm tắt đơn hàng</Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
              <Typography color="text.secondary">Tạm tính</Typography>
              <Typography fontWeight={700}>{formatPrice(cartTotal)}</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">Phí vận chuyển sẽ được xác nhận khi xử lý đơn.</Typography>
            <Button component={RouterLink} to="/checkout" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>Tiến hành thanh toán</Button>
          </Paper>
        </Stack>
      )}
    </Container>
  );
}
