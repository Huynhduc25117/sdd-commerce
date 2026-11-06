import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useCommerce } from "../context/CommerceContext";

export default function AccountPage() {
  const { user, updateProfile } = useCommerce();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState(user || { name: "", email: "" });

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 9, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={800}>Bạn chưa đăng nhập</Typography>
        <Button component={RouterLink} to="/login" variant="contained" sx={{ mt: 2 }}>Đăng nhập</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="overline" color="primary" fontWeight={800}>HỒ SƠ CỦA BẠN</Typography>
        <Typography variant="h4" fontWeight={900} sx={{ mb: 3 }}>Thông tin tài khoản</Typography>
        <Stack component="form" spacing={2} onSubmit={(event) => { event.preventDefault(); updateProfile(profile); setSaved(true); }}>
          <TextField required label="Họ và tên" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
          <TextField required type="email" label="Email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />
          {saved && <Alert severity="success">Thông tin demo đã được cập nhật trên trình duyệt.</Alert>}
          <Alert severity="info">Dữ liệu tài khoản chưa được lưu trên máy chủ.</Alert>
          <Button variant="contained" type="submit">Lưu thay đổi</Button>
          <Button component={RouterLink} to="/orders">Xem lịch sử đơn hàng</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
