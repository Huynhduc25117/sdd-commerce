import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useCommerce } from "../context/CommerceContext";

export default function ProductListPage() {
  const { products, categories } = useCommerce();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const category = params.get("category") || "Tất cả";
  const sort = params.get("sort") || "featured";
  const minPrice = params.get("min") || "";
  const maxPrice = params.get("max") || "";

  useEffect(() => {
    setQuery(params.get("q") || "");
  }, [params]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    return products
      .filter((product) =>
        `${product.name} ${product.category} ${product.description}`
          .toLocaleLowerCase("vi")
          .includes(normalizedQuery)
      )
      .filter((product) => category === "Tất cả" || product.category === category)
      .filter((product) => !minPrice || product.price >= Number(minPrice))
      .filter((product) => !maxPrice || product.price <= Number(maxPrice))
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [products, query, category, minPrice, maxPrice, sort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="overline" color="primary" fontWeight={800}>CỬA HÀNG</Typography>
      <Typography variant="h4" fontWeight={900}>Tất cả sản phẩm</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Khám phá thiết bị và phụ kiện công nghệ phù hợp với bạn.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} sx={{ mb: 3 }}>
        <TextField
          label="Tìm kiếm"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            updateParam("q", event.target.value);
          }}
          sx={{ flex: 2 }}
        />
        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel id="category-filter-label">Danh mục</InputLabel>
          <Select labelId="category-filter-label" label="Danh mục" value={category} onChange={(event) => updateParam("category", event.target.value === "Tất cả" ? "" : event.target.value)}>
            <MenuItem value="Tất cả">Tất cả danh mục</MenuItem>
            {categories.map((entry) => <MenuItem value={entry} key={entry}>{entry}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="Giá từ (₫)" type="number" value={minPrice} onChange={(event) => updateParam("min", event.target.value)} inputProps={{ min: 0 }} sx={{ minWidth: 140 }} />
        <TextField label="Đến (₫)" type="number" value={maxPrice} onChange={(event) => updateParam("max", event.target.value)} inputProps={{ min: 0 }} sx={{ minWidth: 140 }} />
        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel id="sort-label">Sắp xếp</InputLabel>
          <Select labelId="sort-label" label="Sắp xếp" value={sort} onChange={(event) => updateParam("sort", event.target.value)}>
            <MenuItem value="featured">Nổi bật</MenuItem>
            <MenuItem value="price-asc">Giá: thấp đến cao</MenuItem>
            <MenuItem value="price-desc">Giá: cao đến thấp</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Typography color="text.secondary" sx={{ mb: 2 }}>{visibleProducts.length} sản phẩm</Typography>
      {visibleProducts.length ? (
        <Grid container spacing={3}>
          {visibleProducts.map((product) => <Grid item xs={12} sm={6} md={3} key={product.id}><ProductCard product={product} /></Grid>)}
        </Grid>
      ) : (
        <Box sx={{ py: 9, textAlign: "center", bgcolor: "background.paper", borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={800}>Không tìm thấy sản phẩm</Typography>
          <Typography color="text.secondary">Thử thay đổi từ khóa hoặc bộ lọc của bạn.</Typography>
        </Box>
      )}
    </Container>
  );
}
