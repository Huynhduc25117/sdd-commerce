# SDD Commerce

Monorepo thực hành React + Vite + MUI, Node.js + Express, theo SDD-00.

## Yêu cầu
Node.js LTS tương thích Vite, npm, Git.

## Khởi chạy (PowerShell từ thư mục gốc)
```powershell
npm install
npm install --prefix backend
npm install --prefix frontend
Copy-Item backend/.env.example backend/.env
npm run dev
```
Truy cập http://localhost:5173; API http://localhost:5000/api/health.

## Kiểm thử
```powershell
npm test
npm run build
```

## Ghi chú
- Frontend gọi `/api/health` qua Vite proxy.
- MongoDB và authentication chưa triển khai trong SDD-01.
- Không commit `.env` hay thông tin bí mật.
- Xem `docs/` để biết mục tiêu và quy trình bàn giao.
