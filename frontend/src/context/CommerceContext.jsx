import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products as initialProducts } from "../data/products";

const CommerceContext = createContext(null);

function readStorage(key, fallback) {
  const value = window.localStorage.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error);
    return fallback;
  }
}

export function CommerceProvider({ children }) {
  const [products, setProducts] = useState(() =>
    readStorage("sdd-commerce-products", initialProducts)
  );
  const [cart, setCart] = useState(() => readStorage("sdd-commerce-cart", []));
  const [orders, setOrders] = useState(() => readStorage("sdd-commerce-orders", []));
  const [categories, setCategories] = useState(() =>
    readStorage(
      "sdd-commerce-categories",
      [...new Set(initialProducts.map((product) => product.category))]
    )
  );
  const [user, setUser] = useState(() => readStorage("sdd-commerce-user", null));
  const [users, setUsers] = useState(() => readStorage("sdd-commerce-users", []));

  useEffect(() => {
    window.localStorage.setItem("sdd-commerce-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    window.localStorage.setItem("sdd-commerce-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem("sdd-commerce-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    window.localStorage.setItem("sdd-commerce-categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("sdd-commerce-user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("sdd-commerce-user");
    }
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem("sdd-commerce-users", JSON.stringify(users));
  }, [users]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean),
    [cart, products]
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { productId: product.id, quantity }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) {
      setCart((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setCart((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  };

  const placeOrder = (customer) => {
    if (!cartItems.length) throw new Error("Giỏ hàng đang trống.");
    const order = {
      id: `SDD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Chờ xác nhận",
      paymentMethod: "Thanh toán khi nhận hàng (COD)",
      customer,
      items: cartItems.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        image: product.image,
        unitPrice: product.price,
        quantity
      })),
      total: cartTotal
    };
    setOrders((current) => [order, ...current]);
    setCart([]);
    return order;
  };

  const signIn = ({ name, email }) => {
    const normalizedEmail = email.trim().toLocaleLowerCase("vi");
    const existingUser = users.find((entry) => entry.email === normalizedEmail);
    if (existingUser && !existingUser.active) {
      throw new Error("Tài khoản demo này đã bị khóa.");
    }

    const account = {
      name: name || existingUser?.name || normalizedEmail.split("@")[0],
      email: normalizedEmail,
      active: true
    };
    setUser(account);
    setUsers((current) =>
      existingUser
        ? current.map((entry) => (entry.email === normalizedEmail ? account : entry))
        : [...current, account]
    );
  };

  const signOut = () => setUser(null);

  const updateProfile = (profile) => {
    const updated = { ...user, ...profile };
    setUser(updated);
    setUsers((currentUsers) =>
      currentUsers.map((entry) => (entry.email === user.email ? updated : entry))
    );
  };

  const toggleUserStatus = (email) =>
    setUsers((current) =>
      current.map((entry) =>
        entry.email === email ? { ...entry, active: !entry.active } : entry
      )
    );

  const saveProduct = (product) => {
    setProducts((current) => {
      const exists = current.some((entry) => entry.id === product.id);
      return exists
        ? current.map((entry) => (entry.id === product.id ? product : entry))
        : [{ ...product, id: Date.now() }, ...current];
    });
    setCategories((current) =>
      current.includes(product.category) ? current : [...current, product.category]
    );
  };

  const deleteProduct = (productId) =>
    setProducts((current) => current.filter((product) => product.id !== productId));

  const addCategory = (category) =>
    setCategories((current) =>
      current.includes(category) ? current : [...current, category]
    );

  const deleteCategory = (category) => {
    if (products.some((product) => product.category === category)) {
      throw new Error("Hãy chuyển sản phẩm sang danh mục khác trước khi xóa.");
    }
    setCategories((current) => current.filter((entry) => entry !== category));
  };

  const updateOrderStatus = (orderId, status) =>
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status } : order))
    );

  const value = {
    products,
    categories,
    cartItems,
    cartCount,
    cartTotal,
    orders,
    user,
    users,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    placeOrder,
    signIn,
    signOut,
    updateProfile,
    toggleUserStatus,
    saveProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    updateOrderStatus
  };

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) throw new Error("useCommerce must be used within CommerceProvider.");
  return context;
}
