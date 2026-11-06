import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { formatPrice } from "../data/products";
import { useCommerce } from "../context/CommerceContext";

const statuses = ["Chờ xác nhận", "Đang xử lý", "Đang giao", "Đã giao", "Đã hủy"];

export default function AdminPage() {
  const {
    products, categories, orders, user, users, saveProduct, deleteProduct,
    addCategory, deleteCategory, updateOrderStatus, toggleUserStatus
  } = useCommerce();
  const [productForm, setProductForm] = useState({ name: "", category: "", price: "", image: "", description: "" });
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const submitProduct = (event) => {
    event.preventDefault();
    saveProduct({ ...productForm, id: editingProductId, price: Number(productForm.price) });
    setProductForm({ name: "", category: "", price: "", image: "", description: "" });
    setEditingProductId(null);
    setError("");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="overline" color="primary" fontWeight={800}>QUẢN TRỊ</Typography>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>Bảng điều khiển</Typography>
      <Alert severity="warning" sx={{ mb: 3 }}>
        Bản demo frontend: dữ liệu lưu trên trình duyệt, chưa có đăng nhập/phân quyền Admin hoặc đồng bộ backend.
      </Alert>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}><Metric title="Sản phẩm" value={products.length} /></Grid>
        <Grid item xs={12} sm={4}><Metric title="Danh mục" value={categories.length} /></Grid>
        <Grid item xs={12} sm={4}><Metric title="Đơn demo" value={orders.length} /></Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>Thêm sản phẩm</Typography>
        <Stack component="form" onSubmit={submitProduct} spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField required label="Tên sản phẩm" value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} fullWidth />
            <TextField required select label="Danh mục" value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })} fullWidth>
              {categories.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
            </TextField>
            <TextField required type="number" label="Giá (₫)" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} inputProps={{ min: 1 }} fullWidth />
          </Stack>
          <TextField label="URL hình ảnh" value={productForm.image} onChange={(event) => setProductForm({ ...productForm, image: event.target.value })} />
          <TextField label="Mô tả" value={productForm.description} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} />
          {error && <Alert severity="error">{error}</Alert>}
          <Stack direction="row" gap={1}>
            <Button type="submit" variant="contained" sx={{ alignSelf: "start" }}>{editingProductId ? "Lưu sản phẩm" : "Thêm sản phẩm"}</Button>
            {editingProductId && <Button onClick={() => { setEditingProductId(null); setProductForm({ name: "", category: "", price: "", image: "", description: "" }); }}>Hủy sửa</Button>}
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>Sản phẩm ({products.length})</Typography>
        <Table size="small">
          <TableHead><TableRow><TableCell>Tên</TableCell><TableCell>Danh mục</TableCell><TableCell>Giá</TableCell><TableCell align="right">Thao tác</TableCell></TableRow></TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell><TableCell>{product.category}</TableCell><TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => { setEditingProductId(product.id); setProductForm({ ...product, price: String(product.price) }); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Sửa</Button>
                  <Button color="error" onClick={() => setProductToDelete(product)}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>Danh mục</Typography>
        <Stack direction="row" gap={1} sx={{ mb: 2 }}>
          <TextField label="Tên danh mục mới" size="small" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} />
          <Button variant="contained" onClick={() => { if (newCategory.trim()) { addCategory(newCategory.trim()); setNewCategory(""); } }}>Thêm</Button>
        </Stack>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {categories.map((category) => <Button key={category} variant="outlined" onClick={() => { try { deleteCategory(category); setError(""); } catch (deleteError) { setError(deleteError.message); } }}>{category} · Xóa</Button>)}
        </Stack>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>Quản lý đơn hàng</Typography>
        {!orders.length ? <Typography color="text.secondary">Chưa có đơn hàng demo.</Typography> : orders.map((order) => (
          <Stack key={order.id} direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={1} sx={{ py: 1.5, borderBottom: "1px solid #e8edf4" }}>
            <Typography><strong>{order.id}</strong> · {order.customer.name} · {formatPrice(order.total)}</Typography>
            <TextField select size="small" label="Trạng thái" value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)} sx={{ minWidth: 180 }}>
              {statuses.map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
            </TextField>
          </Stack>
        ))}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>Người dùng demo ({users.length})</Typography>
        {!users.length ? (
          <Typography color="text.secondary">Chưa có tài khoản demo. Tài khoản hiện tại: {user?.email || "chưa đăng nhập"}.</Typography>
        ) : users.map((account) => (
          <Stack key={account.email} direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={1} sx={{ py: 1.5, borderBottom: "1px solid #e8edf4" }}>
            <Box>
              <Typography fontWeight={700}>{account.name}</Typography>
              <Typography variant="body2" color="text.secondary">{account.email}</Typography>
            </Box>
            <Button color={account.active ? "warning" : "success"} onClick={() => toggleUserStatus(account.email)}>
              {account.active ? "Khóa tài khoản demo" : "Mở khóa tài khoản demo"}
            </Button>
          </Stack>
        ))}
        <Typography variant="caption" color="text.secondary">Danh sách và trạng thái chỉ là mô phỏng trong trình duyệt; không thay thế phân quyền phía máy chủ.</Typography>
      </Paper>
      <Dialog open={Boolean(productToDelete)} onClose={() => setProductToDelete(null)}>
        <DialogTitle>Xóa sản phẩm?</DialogTitle>
        <DialogContent>
          <DialogContentText>Sản phẩm “{productToDelete?.name}” sẽ bị xóa khỏi dữ liệu demo của trình duyệt.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductToDelete(null)}>Hủy</Button>
          <Button color="error" onClick={() => { deleteProduct(productToDelete.id); setProductToDelete(null); }}>Xóa sản phẩm</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function Metric({ title, value }) {
  return <Paper sx={{ p: 2.5 }}><Typography color="text.secondary">{title}</Typography><Typography variant="h4" fontWeight={900}>{value}</Typography></Paper>;
}
