
export const products = [
  {
    id: 1,
    name: "MacBook Air M3",
    category: "Laptop",
    price: 27990000,
    image: "https://placehold.co/600x400?text=MacBook+Air+M3",
    description: "Laptop mỏng nhẹ với chip Apple M3, phù hợp học tập và làm việc."
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "Điện thoại",
    price: 24990000,
    image: "https://placehold.co/600x400?text=iPhone+15+Pro",
    description: "iPhone cao cấp với thiết kế titan và hiệu năng mạnh mẽ."
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "Tai nghe",
    price: 7490000,
    image: "https://placehold.co/600x400?text=Sony+XM5",
    description: "Tai nghe không dây chống ồn, chất lượng âm thanh cao."
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    category: "Điện thoại",
    price: 18990000,
    image: "https://placehold.co/600x400?text=Galaxy+S24",
    description: "Điện thoại Galaxy với các tính năng AI thông minh."
  },
  {
    id: 5,
    name: "Dell XPS 13",
    category: "Laptop",
    price: 32990000,
    image: "https://placehold.co/600x400?text=Dell+XPS+13",
    description: "Laptop cao cấp, thiết kế gọn nhẹ và màn hình sắc nét."
  },
  {
    id: 6,
    name: "Logitech MX Master 3S",
    category: "Phụ kiện",
    price: 2490000,
    image: "https://placehold.co/600x400?text=MX+Master+3S",
    description: "Chuột không dây công thái học dành cho công việc."
  },
  {
    id: 7,
    name: "iPad Air M2",
    category: "Máy tính bảng",
    price: 16990000,
    image: "https://placehold.co/600x400?text=iPad+Air+M2",
    description: "Máy tính bảng linh hoạt cho học tập và sáng tạo."
  },
  {
    id: 8,
    name: "Samsung Galaxy Buds2 Pro",
    category: "Tai nghe",
    price: 3490000,
    image: "https://placehold.co/600x400?text=Galaxy+Buds2+Pro",
    description: "Tai nghe true wireless nhỏ gọn, hỗ trợ chống ồn."
  }
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(price);
