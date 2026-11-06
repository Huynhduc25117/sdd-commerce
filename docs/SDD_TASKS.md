# SDD Commerce — Task Tracking

Status values: `TODO`, `IN_PROGRESS`, `DONE`, `BLOCKED`.

## SDD-02 — Frontend Development

| ID | Task | Module / Phase | Status | Related files | Completion criteria | Test result |
|---|---|---|---|---|---|---|
| SDD-02-01 | Hoàn thiện trang chủ, điều hướng và responsive shell | Customer UI | DONE | `frontend/src/pages/HomePage.jsx`, `frontend/src/components/Header.jsx`, `frontend/src/components/Footer.jsx`, `frontend/src/main.jsx` | Trang chủ có banner, danh mục, sản phẩm nổi bật; điều hướng dùng được trên mobile và desktop. | `npm run build` đạt; browser smoke test desktop và menu mobile đạt. |
| SDD-02-02 | Tạo danh sách, tìm kiếm, lọc và sắp xếp sản phẩm | Product browsing | DONE | `frontend/src/pages/ProductListPage.jsx`, `frontend/src/components/ProductCard.jsx`, `frontend/src/context/CommerceContext.jsx` | Tìm kiếm tên/mô tả, lọc danh mục/giá và sắp xếp giá; trạng thái rỗng rõ ràng. | Browser test lọc Laptop (2 kết quả) và empty search đạt. |
| SDD-02-03 | Hoàn thiện chi tiết sản phẩm và giỏ hàng | Cart UI | DONE | `frontend/src/pages/ProductDetailPage.jsx`, `frontend/src/pages/CartPage.jsx`, `frontend/src/context/CommerceContext.jsx` | Xem chi tiết, thêm/xóa/cập nhật số lượng và tính tổng; dữ liệu giỏ hàng tồn tại sau khi tải lại. | Browser test add, đổi số lượng, reload persistence, remove và tính tổng đạt. |
| SDD-02-04 | Tạo checkout COD, lịch sử đơn và hồ sơ tài khoản demo | Customer flows | DONE | `frontend/src/pages/CheckoutPage.jsx`, `frontend/src/pages/OrdersPage.jsx`, `frontend/src/pages/AuthPage.jsx`, `frontend/src/pages/AccountPage.jsx` | Có validation trình duyệt, đặt đơn COD mô phỏng, theo dõi trạng thái và hồ sơ demo lưu cục bộ. | Browser test đăng nhập demo, lưu hồ sơ, đặt COD và hiển thị lịch sử/chi tiết đơn đạt. |
| SDD-02-05 | Tạo giao diện quản trị demo | Admin UI | DONE | `frontend/src/pages/AdminPage.jsx`, `frontend/src/context/CommerceContext.jsx` | Dashboard, CRUD sản phẩm/danh mục, danh sách/khóa tài khoản demo và cập nhật trạng thái đơn; nêu rõ chưa có phân quyền/backend. | Browser test thêm/sửa/xóa sản phẩm, danh mục, user demo, cập nhật trạng thái đơn đạt. |
| SDD-02-06 | Xử lý route 404 và trạng thái rỗng | UX states | DONE | `frontend/src/App.jsx`, `frontend/src/pages/CartPage.jsx`, `frontend/src/pages/ProductDetailPage.jsx`, `frontend/src/pages/ProductListPage.jsx` | URL không tồn tại và dữ liệu rỗng có nội dung, điều hướng khôi phục. | Browser test 404, giỏ hàng rỗng, không có kết quả và sản phẩm không tồn tại đạt. |

## Remaining phases

| ID | Task | Module / Phase | Status | Related files | Completion criteria | Test result |
|---|---|---|---|---|---|---|
| SDD-03-01 | Xây dựng REST API sản phẩm, người dùng và đơn hàng | Backend & Database | TODO | `backend/src/`, `backend/test/` | API đã validation, xử lý lỗi thống nhất và có kiểm thử endpoint. | Chưa chạy. |
| SDD-04-01 | Thiết kế Mongoose models và seed data | Database & Data Modeling | TODO | `backend/src/` | User, Category, Product, Order có schema/index và seed lặp an toàn. | Chưa chạy. |
| SDD-05-01 | Xây dựng đăng nhập Admin và phân quyền thực | Authentication & Authorization | TODO | `backend/src/`, `frontend/src/` | Hash mật khẩu, JWT, middleware role và kiểm thử quyền truy cập; demo frontend không được xem là bảo vệ truy cập. | Chưa chạy. |
| SDD-06-01 | Tích hợp frontend với API và xác thực server-side order | E-commerce Integration | TODO | `frontend/src/context/`, `backend/src/` | Frontend bỏ mock cho tính năng có API; backend xác minh giá/tồn kho khi đặt hàng. | Chưa chạy. |
| SDD-07-01 | Bổ sung kiểm thử tích hợp, E2E và kiểm tra responsive | Testing & Quality | TODO | `frontend/`, `backend/test/` | Các luồng mua hàng/quản trị và build được kiểm tra tự động. | Chưa chạy. |
| SDD-09-01 | Docker, Nginx, CI/CD và hướng dẫn vận hành | DevOps & Deployment | TODO | Repository root, `.github/workflows/`, `docs/` | Có quy trình deploy/rollback, backup/restore và health checks; chỉ triển khai khi được duyệt. | Chưa chạy. |

## Demo boundary

SDD-02 currently has no product, authentication, checkout, or admin API. The frontend uses structured mock products and browser `localStorage` for demonstration only. Do not treat demo login as authentication or demo orders as persisted server records; replace these adapters during SDD-03 through SDD-06.
