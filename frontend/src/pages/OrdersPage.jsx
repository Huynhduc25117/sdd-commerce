import { useSearchParams, Link as RouterLink } from "react-router-dom";
import { Alert, Button, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { formatPrice } from "../data/products";
import { useCommerce } from "../context/CommerceContext";

const statusColor = (status) => {
  if (status === "Đã giao") return "success";
  if (status === "Đã hủy") return "error";
  if (status === "Đang giao") return "info";
  return "warning";
};

export default function OrdersPage() {
  const { orders } = useCommerce();
  const [params] = useSearchParams();
  const placedOrder = params.get("placed");

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="overline" color="primary" fontWeight={800}>THEO DÕI ĐƠN HÀNG</Typography>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 3 }}>Đơn hàng của bạn</Typography>
      {placedOrder && <Alert severity="success" sx={{ mb: 2 }}>Đặt hàng thành công. Mã đơn hàng: <strong>{placedOrder}</strong></Alert>}
      {!orders.length ? (
        <Paper sx={{ p: 5, textAlign: "center" }}>
          <Typography variant="h6" fontWeight={800}>Bạn chưa có đơn hàng</Typography>
          <Button component={RouterLink} to="/products" variant="contained" sx={{ mt: 2 }}>Mua sắm ngay</Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => (
            <Paper key={order.id} sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1}>
                <BoxLabel label="Mã đơn" value={order.id} />
                <BoxLabel label="Ngày đặt" value={new Date(order.createdAt).toLocaleString("vi-VN")} />
                <Chip label={order.status} color={statusColor(order.status)} />
              </Stack>
              <Typography sx={{ mt: 2 }}>{order.items.map((item) => `${item.name} × ${item.quantity}`).join(" · ")}</Typography>
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                <Typography color="text.secondary">{order.paymentMethod}</Typography>
                <Typography color="primary.dark" fontWeight={900}>{formatPrice(order.total)}</Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
      <Alert severity="info" sx={{ mt: 3 }}>Trạng thái đơn hàng hiện được lưu cục bộ để trình diễn.</Alert>
    </Container>
  );
}

function BoxLabel({ label, value }) {
  return <Stack><Typography variant="caption" color="text.secondary">{label}</Typography><Typography fontWeight={800}>{value}</Typography></Stack>;
}
