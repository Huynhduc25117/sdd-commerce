
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function HomePage() {
  return (
    <>
      {/* Banner */}
      <Box sx={{
        background: "linear-gradient(120deg, #0f172a, #2563eb)",
        color: "white",
        py: { xs: 7, md: 11 }
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Công nghệ dành cho bạn
          </Typography>

          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Khám phá laptop, điện thoại và phụ kiện công nghệ.
          </Typography>

          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            sx={{ bgcolor: "white", color: "#0f172a" }}
          >
            Khám phá sản phẩm
          </Button>
        </Container>
      </Box>

      {/* Sản phẩm nổi bật */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sản phẩm nổi bật
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Những sản phẩm công nghệ được giới thiệu tại SDD Commerce.
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ mt: 6, p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Khám phá thêm nhiều sản phẩm
          </Typography>

          <Button
            component={RouterLink}
            to="/products"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Xem tất cả sản phẩm
          </Button>
        </Paper>
      </Container>
    </>
  );
}
