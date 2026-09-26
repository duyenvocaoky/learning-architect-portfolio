# Portfolio Coral — Võ Cao Kỳ Duyên

Trang portfolio cá nhân (tiếng Anh + tiếng Việt), làm bằng Next.js, xuất ra trang tĩnh.

- Bản tiếng Việt nằm ở đường dẫn `/vi/`

## Sửa nội dung (chữ)

Toàn bộ chữ trên trang nằm trong thư mục `content/`:

| File | Nội dung |
|---|---|
| `content/common.yml` | Menu, chân trang, email, LinkedIn |
| `content/home.yml` | Trang chủ (xếp theo thứ tự từ trên xuống) |
| `content/retail-talent.yml` | Case study chương trình nhân tài bán lẻ |

Quy tắc:
- Mỗi câu có 2 dòng: `en: "..."` và `vi: "..."`. Chỉ sửa chữ trong dấu ngoặc kép.
- `*chữ*` → tô màu coral. `\n` → xuống dòng.
- Thiếu bản tiếng Việt → trang **không cho đóng gói**, nên câu chưa dịch không bao giờ lọt lên mạng.

## Sửa màu, cỡ chữ

Mở `styles/tokens.css`. Đổi một giá trị ở đó là cả trang đổi theo.

## Xem thử trên máy

```bash
npm run build
python3 -m http.server 4173 --directory out
```
Mở http://localhost:4173

## Kiểm tra tự động trên GitHub

Kho đang để **riêng tư**. Mỗi lần đẩy thay đổi lên nhánh `main`, GitHub tự kiểm tra:
lỗi code, lỗ hổng thư viện, đủ tiếng Anh + tiếng Việt, đóng gói được. Xem kết quả ở tab **Actions**
(xanh = ổn, đỏ = có lỗi cần sửa).

Trang **chưa** được đưa lên mạng. Bước này sẽ thêm khi chuyển sang Hostinger.

## Quay lại bản cũ khi bản mới bị lỗi

```bash
git log --oneline          # xem danh sách các bản đã lưu
git revert HEAD            # huỷ bản mới nhất (vẫn giữ lịch sử)
git push                   # hoặc bấm "Push origin" trong GitHub Desktop
```

## Sau này

- **Hostinger:** file `public/.htaccess` đã soạn sẵn (bắt buộc HTTPS, header bảo mật).
- **Supabase:** chỉ dùng khoá công khai trên trang web; mọi bảng bật RLS. Không bao giờ đưa khoá bí mật vào code.
