
export const products = [
  {
    id: 1,
    name: "MacBook Air M3",
    category: "Laptop",
    price: 27990000,
    image: "https://placehold.co/600x400?text=MacBook+Air+M3",
    description: "Laptop mỏng nhẹ, hiệu năng mạnh mẽ."
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "Điện thoại",
    price: 24990000,
    image: "https://placehold.co/600x400?text=iPhone+15+Pro",
    description: "Điện thoại cao cấp với thiết kế titan."
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "Tai nghe",
    price: 7490000,
    image: "https://placehold.co/600x400?text=Sony+XM5",
    description: "Tai nghe chống ồn không dây."
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    category: "Điện thoại",
    price: 18990000,
    image: "https://placehold.co/600x400?text=Galaxy+S24",
    description: "Điện thoại Galaxy với các tính năng AI."
  }
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(price);
