import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { formatPrice } from "../data/products";
import { useCommerce } from "../context/CommerceContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user, cartItems, cartTotal, placeOrder } = useCommerce();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    paymentMethod: "COD"
  });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    if (!cartItems.length) {
      setError("Giỏ hàng đang trống.");
      return;
    }
    try {
      const order = placeOrder(form);
      navigate(`/orders?placed=${encodeURIComponent(order.id)}`);
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="overline" color="primary" fontWeight={800}>HOÀN TẤT ĐƠN HÀNG</Typography>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 3 }}>Thanh toán COD</Typography>
      {!cartItems.length ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography>Giỏ hàng đang trống.</Typography>
          <Button component={RouterLink} to="/products" sx={{ mt: 1 }}>Chọn sản phẩm</Button>
        </Paper>
      ) : (
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="start">
          <Paper component="form" onSubmit={submit} sx={{ p: 3, flex: 1, width: "100%" }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Thông tin giao hàng</Typography>
            <Stack spacing={2}>
              <TextField required name="name" label="Họ và tên" value={form.name} onChange={update} />
              <TextField required name="phone" label="Số điện thoại" value={form.phone} onChange={update} inputProps={{ inputMode: "tel" }} />
              <TextField required name="email" label="Email" type="email" value={form.email} onChange={update} />
              <TextField required name="address" label="Địa chỉ nhận hàng" multiline minRows={2} value={form.address} onChange={update} />
              <TextField select name="paymentMethod" label="Phương thức thanh toán" value={form.paymentMethod} onChange={update}>
                <MenuItem value="COD">Thanh toán khi nhận hàng (COD)</MenuItem>
              </TextField>
              {error && <Alert severity="error">{error}</Alert>}
              <Alert severity="info">Đây là luồng demo. Đơn hàng chỉ được lưu trong trình duyệt này.</Alert>
              <Button type="submit" variant="contained" size="large">Đặt hàng · {formatPrice(cartTotal)}</Button>
            </Stack>
          </Paper>
          <Paper sx={{ p: 3, width: { xs: "100%", md: 300 } }}>
            <Typography variant="h6" fontWeight={800}>Đơn hàng ({cartItems.length})</Typography>
            {cartItems.map(({ product, quantity }) => (
              <Stack direction="row" justifyContent="space-between" gap={1} key={product.id} sx={{ mt: 1.5 }}>
                <Typography variant="body2">{product.name} × {quantity}</Typography>
                <Typography variant="body2" fontWeight={700}>{formatPrice(product.price * quantity)}</Typography>
              </Stack>
            ))}
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, pt: 2, borderTop: "1px solid #e8edf4" }}>
              <Typography fontWeight={800}>Tổng cộng</Typography><Typography fontWeight={900} color="primary.dark">{formatPrice(cartTotal)}</Typography>
            </Stack>
          </Paper>
        </Stack>
      )}
    </Container>
  );
}
