
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Chip,
  Card,
  CardContent
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCommerce } from "../context/CommerceContext";

export default function HomePage() {
  const { products, categories } = useCommerce();

  return (
    <>
      <Box sx={{
        background: "radial-gradient(circle at 80% 10%, #3987ff 0, transparent 32%), linear-gradient(120deg, #0b1730, #1749a3)",
        color: "white",
        py: { xs: 8, md: 12 },
        overflow: "hidden"
      }}>
        <Container maxWidth="lg">
          <Chip label="SDD COMMERCE · TECH FOR EVERY DAY" sx={{ mb: 2, color: "white", bgcolor: "rgba(255,255,255,.14)", fontWeight: 700 }} />
          <Typography variant="h2" fontWeight={900} gutterBottom sx={{ maxWidth: 700, fontSize: { xs: "2.5rem", md: "4rem" }, letterSpacing: "-.04em", lineHeight: 1.08 }}>
            Nâng tầm trải nghiệm công nghệ của bạn
          </Typography>

          <Typography variant="h6" sx={{ mb: 4, opacity: 0.82, maxWidth: 600, fontWeight: 400 }}>
            Tìm thiết bị phù hợp cho công việc, học tập và những khoảnh khắc mỗi ngày.
          </Typography>

          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            size="large"
            sx={{ bgcolor: "white", color: "#0f172a", "&:hover": { bgcolor: "#eaf1ff" } }}
          >
            Khám phá sản phẩm
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "end" }} sx={{ mb: 3 }} gap={1}>
          <Box>
            <Typography variant="overline" color="primary" fontWeight={800}>CHỌN THEO NHU CẦU</Typography>
            <Typography variant="h4" fontWeight={900}>Danh mục nổi bật</Typography>
          </Box>
          <Button component={RouterLink} to="/products">Xem tất cả sản phẩm</Button>
        </Stack>
        <Grid container spacing={2} sx={{ mb: 7 }}>
          {categories.slice(0, 4).map((category, index) => (
            <Grid item xs={6} md={3} key={category}>
              <Card component={RouterLink} to={`/products?category=${encodeURIComponent(category)}`} sx={{ textDecoration: "none", color: "inherit", transition: ".2s", "&:hover": { borderColor: "primary.main", transform: "translateY(-3px)" } }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>{["⌘", "▣", "◉", "✦"][index]}</Typography>
                  <Typography fontWeight={800}>{category}</Typography>
                  <Typography variant="body2" color="text.secondary">{products.filter((product) => product.category === category).length} sản phẩm</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "end" }} sx={{ mb: 3 }} gap={1}>
          <Box>
            <Typography variant="overline" color="primary" fontWeight={800}>ĐƯỢC TUYỂN CHỌN CHO BẠN</Typography>
            <Typography variant="h4" fontWeight={900}>Sản phẩm nổi bật</Typography>
          </Box>
          <Typography color="text.secondary">Thiết bị công nghệ đáng để khám phá.</Typography>
        </Stack>
        <Grid container spacing={3}>
          {products.slice(0, 4).map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ mt: 7, p: { xs: 3, md: 5 }, textAlign: "center", borderRadius: 3, bgcolor: "#edf4ff", boxShadow: "none" }}>
          <Typography variant="h5" fontWeight={900}>
            Sẵn sàng tìm người bạn công nghệ tiếp theo?
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Duyệt bộ sưu tập sản phẩm của SDD Commerce.</Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Xem tất cả sản phẩm
          </Button>
        </Paper>
      </Container>
    </>
  );
}
