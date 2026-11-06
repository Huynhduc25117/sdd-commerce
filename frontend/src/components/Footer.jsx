
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={3}>
          <Box>
            <Typography variant="h6" fontWeight={900}>SDD Commerce</Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.72 }}>
              Thiết bị công nghệ phù hợp với nhịp sống của bạn.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Link component={RouterLink} to="/products" color="inherit" underline="hover">Sản phẩm</Link>
            <Link component={RouterLink} to="/orders" color="inherit" underline="hover">Đơn hàng</Link>
            <Link component={RouterLink} to="/account" color="inherit" underline="hover">Tài khoản</Link>
          </Stack>
        </Stack>
        <Typography variant="caption" sx={{ display: "block", mt: 4, opacity: 0.6 }}>
          © {new Date().getFullYear()} SDD Commerce. Frontend demo — dữ liệu lưu trên trình duyệt.
        </Typography>
      </Container>
    </Box>
  );
}
