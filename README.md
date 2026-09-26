# Portfolio Coral — Võ Cao Kỳ Duyên

Trang portfolio cá nhân (tiếng Anh + tiếng Việt), làm bằng Next.js, xuất ra trang tĩnh.

- Link hiện tại: https://duyenvocaoky.github.io/learning-architect-portfolio/
- Bản tiếng Việt: thêm `/vi/` vào sau link

## Sửa nội dung (chữ)

Toàn bộ chữ trên trang nằm trong thư mục `content/`:

| File | Nội dung |
|---|---|
| `content/common.yml` | Menu, chân trang, email, LinkedIn |
| `content/home.yml` | Trang chủ (xếp theo thứ tự từ trên xuống) |
| `content/rt3.yml` | Case study RT3 |

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

## Đưa lên mạng

Đẩy thay đổi lên nhánh `main` trên GitHub → trang tự cập nhật sau khoảng 2 phút.
Nếu kiểm tra hoặc đóng gói bị lỗi, việc cập nhật dừng lại và trang đang chạy giữ nguyên bản cũ.
Xem tiến trình ở tab **Actions** trên GitHub.

## Quay lại bản cũ khi bản mới bị lỗi

```bash
git log --oneline          # xem danh sách các bản đã lưu
git revert HEAD            # huỷ bản mới nhất (vẫn giữ lịch sử)
git push                   # trang tự trở về bản trước sau ~2 phút
```

## Sau này

- **Hostinger:** file `public/.htaccess` đã soạn sẵn (bắt buộc HTTPS, header bảo mật).
- **Supabase:** chỉ dùng khoá công khai trên trang web; mọi bảng bật RLS. Không bao giờ đưa khoá bí mật vào code.
