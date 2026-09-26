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
| `content/blog.yml` | Trang Blog: tiêu đề, lời giới thiệu, danh sách bài (thứ tự hiển thị) |
| `content/blog/<tên-bài>.yml` | Từng bài blog. Thêm bài mới: chép một file có sẵn, đổi tên, rồi thêm tên vào `posts` trong `blog.yml` |

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

## Đưa lên mạng (GitHub Pages)

Link: https://duyenvocaoky.github.io/learning-architect-portfolio/

Mỗi lần đẩy thay đổi lên nhánh `main`, GitHub tự kiểm tra (lỗi code, lỗ hổng thư viện,
đủ tiếng Anh + tiếng Việt, đóng gói được) rồi cập nhật trang sau khoảng 2 phút.
Nếu có lỗi, việc cập nhật dừng lại và trang đang chạy giữ nguyên bản cũ.
Xem tiến trình ở tab **Actions** (xanh = ổn, đỏ = có lỗi cần sửa).

Pull request chỉ được kiểm tra, không đưa lên mạng cho tới khi gộp vào `main`.

## Quay lại bản cũ khi bản mới bị lỗi

```bash
git log --oneline          # xem danh sách các bản đã lưu
git revert HEAD            # huỷ bản mới nhất (vẫn giữ lịch sử)
git push                   # hoặc bấm "Push origin" trong GitHub Desktop
```

## Sau này

- **Hostinger:** file `public/.htaccess` đã soạn sẵn (bắt buộc HTTPS, header bảo mật).
- **Supabase:** chỉ dùng khoá công khai trên trang web; mọi bảng bật RLS. Không bao giờ đưa khoá bí mật vào code.
