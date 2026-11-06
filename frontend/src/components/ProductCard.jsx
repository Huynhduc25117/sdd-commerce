
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { formatPrice } from "../data/products";

export default function ProductCard({ product }) {
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
      <CardMedia
        component="img"
        height="190"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: "contain", p: 2 }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Chip label={product.category} size="small" />
        <Typography variant="h6" sx={{ mt: 1 }}>
          {product.name}
        </Typography>
        <Typography color="primary" fontWeight="bold">
          {formatPrice(product.price)}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={RouterLink}
          to={`/products/${product.id}`}
          variant="contained"
          fullWidth
        >
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
}
