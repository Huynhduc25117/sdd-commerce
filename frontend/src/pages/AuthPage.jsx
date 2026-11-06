import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useCommerce } from "../context/CommerceContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn } = useCommerce();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (mode === "register" && form.password.length < 8) {
      setError("Mật khẩu cần có ít nhất 8 ký tự.");
      return;
    }
    try {
      signIn(form);
      navigate("/account");
    } catch (signInError) {
      setError(signInError.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 5, md: 9 } }}>
      <Paper component="form" onSubmit={submit} sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="overline" color="primary" fontWeight={800}>TÀI KHOẢN SDD</Typography>
        <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>{mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản"}</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Đăng nhập để quản lý thông tin và theo dõi đơn hàng.</Typography>
        {mode === "register" && <TextField required fullWidth label="Họ và tên" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} sx={{ mb: 2 }} />}
        <Stack spacing={2}>
          <TextField required fullWidth type="email" label="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <TextField required fullWidth type="password" label="Mật khẩu" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} inputProps={{ minLength: mode === "register" ? 8 : undefined }} />
          {error && <Alert severity="error">{error}</Alert>}
          <Alert severity="warning">Đăng nhập/đăng ký hiện chỉ mô phỏng giao diện; chưa gửi thông tin đến backend.</Alert>
          <Button type="submit" variant="contained" size="large">{mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}</Button>
        </Stack>
        <Button fullWidth sx={{ mt: 2 }} onClick={() => { setError(""); setMode(mode === "login" ? "register" : "login"); }}>
          {mode === "login" ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
        </Button>
      </Paper>
    </Container>
  );
}
