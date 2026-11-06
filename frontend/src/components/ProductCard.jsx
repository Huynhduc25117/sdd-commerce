
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  CardActionArea
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { formatPrice } from "../data/products";
import { useCommerce } from "../context/CommerceContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCommerce();

  return (
    <Card sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      transition: "0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 5
      }
    }}>
      <CardActionArea component={RouterLink} to={`/products/${product.id}`}>
        <CardMedia
          component="img"
          height="190"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "contain", p: 2, bgcolor: "#f8fafc" }}
        />
      </CardActionArea>

      <CardContent sx={{ flexGrow: 1 }}>
        <Chip label={product.category} size="small" />
        <Typography variant="h6" sx={{ mt: 1, fontSize: "1.05rem", minHeight: 48 }}>
          {product.name}
        </Typography>
        <Typography color="primary.dark" fontWeight="bold" sx={{ mt: 1 }}>
          {formatPrice(product.price)}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button
          component={RouterLink}
          to={`/products/${product.id}`}
          variant="outlined"
          sx={{ flex: 1 }}
        >
          Chi tiết
        </Button>
        <Button variant="contained" onClick={() => addToCart(product)} sx={{ flex: 1 }}>
          Thêm giỏ
        </Button>
      </CardActions>
    </Card>
  );
}
