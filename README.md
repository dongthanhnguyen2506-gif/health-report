# Diễn Giải Kết Quả Xét Nghiệm — Ever Việt Nam × SHB × InVivo Lab

Web app hiển thị 78 phiếu diễn giải kết quả xét nghiệm cho nhân viên Công ty Cổ phần Ever Việt Nam.  
Nội dung kiểm định bởi **BS. Chuyên khoa II Vũ Mạnh Cường**.

---

## Deploy lên Vercel (10 phút)

### Bước 1 — Cài Node.js (nếu chưa có)
https://nodejs.org (chọn bản LTS)

### Bước 2 — Cài dependencies
```bash
npm install
```

### Bước 3 — Chạy thử local
```bash
npm run dev
```
Mở http://localhost:3000

### Bước 4 — Push lên GitHub
```bash
git init
git add .
git commit -m "feat: invivo lab report — 78 patients"
git branch -M main
git remote add origin https://github.com/TEN_BAN/TEN_REPO.git
git push -u origin main
```
> Tạo repo mới tại: https://github.com/new

### Bước 5 — Deploy Vercel
1. Vào https://vercel.com → **Add New Project**
2. Import repo GitHub vừa tạo
3. **Framework Preset**: Next.js (tự nhận diện)
4. Nhấn **Deploy**

✅ Xong. URL dạng `https://invivo-report.vercel.app`

---

## Cập nhật dữ liệu
```bash
git add .
git commit -m "update: mô tả thay đổi"
git push
```
Vercel tự redeploy.

---

## Cấu trúc project
```
invivo-report/
├── app/
│   ├── page.tsx              ← Trang danh sách 78 bệnh nhân
│   ├── patients/[id]/page.tsx ← Phiếu chi tiết từng bệnh nhân
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── HealthMap.tsx         ← SVG bản đồ sức khỏe
├── lib/
│   ├── patients.ts           ← Dữ liệu 78 bệnh nhân (đã parse từ PDF)
│   └── types.ts
├── public/
│   ├── logo-ever.png
│   ├── logo-shb.png
│   └── logo-invivo.png
└── package.json
```
