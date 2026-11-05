# Kế hoạch tổng: Portfolio Coral

*Cập nhật: 05/11/2026 (thêm Giai đoạn 3b – Vercel). Trước đó: 18/10/2026. Bản này thay cho kế hoạch gốc ngày 25/09/2026 (đã bị ghi đè trong file plan của Claude).*

## 1. Bối cảnh
- Trang portfolio cá nhân **Portfolio Coral** của Diên Diên (Learning Experience Architect), làm từ bản thiết kế Coral trên Claude Design, code bằng **Next.js** và xuất ra **trang tĩnh** (chỉ gồm HTML/CSS/JS).
- Mã nguồn: GitHub `duyenvocaoky/learning-architect-portfolio`, nhánh `main`.
- Mục tiêu dài hạn: có một trang để ứng tuyển, chia sẻ kiến thức (blog), và sau này **bán hàng** (lưu dữ liệu khách bằng Supabase).

## 2. Kết quả cần đạt
| # | Kết quả | Trạng thái |
|---|---|---|
| KQ1 | Trang chủ + case study chạy bằng Next.js, đủ EN/VI | ✅ Xong |
| KQ2 | Toàn bộ nội dung nằm một chỗ (`content/*.yml`), EN và VI đặt cạnh nhau | ✅ Xong |
| KQ3 | Diên Diên xem và duyệt trên máy trước khi đưa lên | ✅ Đang áp dụng |
| KQ4 | Code lưu trên GitHub, mỗi thay đổi tự động được kiểm tra, quay lại bản cũ được | ✅ Xong |
| KQ5 | Trang chạy trên mạng, **mã nguồn được giấu (kho riêng tư)** | ⏳ Chuyển từ GitHub Pages sang **Cloudflare Pages** (Giai đoạn 3) |
| KQ6 | Blog chia sẻ tri thức | ✅ Có trang Blog + bài đầu tiên |
| KQ7 | Bán hàng: dữ liệu khách lưu an toàn trên Supabase | ⏳ Giai đoạn 5 |

## 3. Tiêu chí phải đáp ứng
| Tiêu chí | Đo bằng cách nào |
|---|---|
| **An toàn, bảo mật** | Không có máy chủ riêng, không có khóa bí mật trong code. Có header bảo mật (`public/_headers` cho Cloudflare, `public/.htaccess` cho Hostinger). Bật 2FA cho mọi tài khoản. Bảng Supabase bật RLS |
| **Mã nguồn không công khai** | Kho GitHub để **riêng tư**. Người ngoài chỉ xem được trang web, không xem được code, lịch sử sửa hay các PR cũ |
| **Tự động đồng bộ** | Đẩy code lên `main` → trang tự cập nhật sau vài phút |
| **Quay lại bản cũ khi có lỗi** | Bản lỗi không lên được mạng vì đóng gói lỗi thì tự dừng. Quay lại bằng `git revert` |
| **Dễ sửa** | Chữ sửa trong `content/`, màu và cỡ chữ sửa trong `styles/tokens.css` |
| **Nội dung không rải rác** | 100% chữ nằm trong `content/`. Công cụ kiểm tra chặn câu thiếu bản VI |
| **Bảo mật thông tin nghề nghiệp** | Không có tên chương trình nội bộ, tên phòng ban, tên đồng nghiệp, ảnh sự kiện nội bộ hay số liệu nội bộ nhạy cảm. Font và ảnh có bản quyền rõ ràng |
| **Chạy ở mọi nơi** | Kết quả cuối chỉ là file tĩnh trong `out/`: chạy được trên Cloudflare, Hostinger (mọi gói) hay GitHub Pages |

## 4. Việc cần làm, theo giai đoạn

### Giai đoạn 1: Dựng trang ✅ Xong
- Dựng trang chủ và case study bằng Next.js, đủ EN/VI.
- Gom nội dung về `content/*.yml`, có công cụ kiểm tra EN/VI.
- Bảng màu Coral nằm trong `styles/tokens.css`. Font **Plus Jakarta Sans** (giấy phép OFL, đã bỏ Xerox Sans vì không có giấy phép).
- Đổi tên chương trình nội bộ sang cách gọi chung. Bỏ ảnh sự kiện nội bộ và số liệu nhạy cảm (PR #12).
- Trang **Blog** + bài "How I design a course" (mục lục, dòng thời gian 5 bước, ảnh). Trang case study dùng chung bố cục với blog.
- Thêm ảnh xem trước khi chia sẻ link (`og.png`) và icon (PR #11).

### Giai đoạn 2: GitHub ✅ Xong
- Kho `learning-architect-portfolio`, làm sạch lịch sử (bỏ font Xerox, bỏ RT3).
- Mỗi lần đẩy code hoặc mở PR, GitHub tự kiểm tra: lỗi code, lỗ hổng thư viện, đủ EN/VI, đóng gói được.
- Dependabot tự báo khi thư viện cần cập nhật.
- ⚠️ Còn tồn: kho đang **công khai**, và 9 PR cũ (#1–#9) vẫn còn bản chứa font Xerox. **Giai đoạn 3 xử lý việc này** bằng cách chuyển kho về riêng tư.

### Giai đoạn 3: Chuyển sang Cloudflare Pages, giấu mã nguồn ⏳ Đang làm
| # | Việc | Ai làm |
|---|---|---|
| 3.1 | Sửa code cho Cloudflare: quy trình GitHub chỉ còn kiểm tra (bỏ bước đưa lên GitHub Pages), thêm `public/_headers` (header bảo mật), đặt địa chỉ trang bằng `SITE_URL` | Claude |
| 3.2 | Đẩy code lên GitHub (GitHub Desktop → Push origin) | Diên Diên |
| 3.3 | Tạo tài khoản Cloudflare, bật 2FA | Diên Diên |
| 3.4 | Nối Cloudflare Pages với kho GitHub (chỉ cấp quyền cho đúng 1 kho), điền cài đặt đóng gói theo hướng dẫn | Diên Diên làm, Claude hướng dẫn |
| 3.5 | Kiểm tra trang trên `….pages.dev`: EN/VI, blog, case study, ảnh, font, điện thoại, header bảo mật | Claude |
| 3.6 | **Tắt GitHub Pages**: trang `duyenvocaoky.github.io/learning-architect-portfolio` ngừng chạy. Làm **sau khi** 3.5 ổn | Diên Diên |
| 3.7 | **Chuyển kho GitHub về Riêng tư (Private)** | Diên Diên |
| 3.8 | Kiểm tra lại: GitHub Pages tắt, kho không xem được từ ngoài, Cloudflare vẫn tự cập nhật khi đẩy code | Claude |

### Giai đoạn 3b: Đưa trang lên Vercel ⏳ Chờ Diên Diên chốt (thêm ngày 05/11/2026)
Diên Diên đề nghị thêm phương án đưa trang lên **Vercel** (một dịch vụ chuyên chạy trang Next.js, nối được với kho GitHub riêng tư).

| # | Việc | Ai làm |
|---|---|---|
| 3b.1 | Chốt chọn **Vercel hay Cloudflare Pages** (chỉ giữ 1, xem cảnh báo bên dưới) | Diên Diên |
| 3b.2 | Nếu chọn Vercel: tạo tài khoản Vercel bằng GitHub, bật 2FA, chọn gói phù hợp | Diên Diên |
| 3b.3 | Nối Vercel với kho GitHub (chỉ cấp quyền đúng 1 kho), cài: build `npm run build`, thư mục `out`, `NODE_VERSION=22`, `SITE_URL=https://<tên>.vercel.app` | Diên Diên làm, Claude hướng dẫn |
| 3b.4 | Bỏ bước đưa lên GitHub Pages trong quy trình GitHub (chỉ giữ phần kiểm tra), thêm header bảo mật cho Vercel (`vercel.json`) | Claude |
| 3b.5 | Kiểm tra trang trên `….vercel.app` (EN/VI, blog, case study, landing `/7-ngay/`, điện thoại, header bảo mật) | Claude |
| 3b.6 | Tắt GitHub Pages, rồi chuyển kho GitHub về **Riêng tư** (sau khi 3b.5 ổn) | Diên Diên |

**⚠️ Cảnh báo: những điểm chưa nhất quán với mục đích ban đầu**
1. **Gói miễn phí của Vercel (Hobby) không cho dùng thương mại.** Trang này đã có landing bán chương trình 990.000đ và kế hoạch bán hàng ở Giai đoạn 5, nên dùng gói Hobby là **trái điều khoản** của Vercel. Muốn dùng đúng luật phải lên gói **Pro (trả phí hằng tháng)**. Điều này lệch với mục tiêu "chạy miễn phí trước khi trả tiền cho Hostinger". Cloudflare Pages miễn phí và **cho phép** dùng thương mại.
2. **Thêm một nhà cung cấp nữa.** Kế hoạch đang có GitHub Pages (đang chạy), Cloudflare Pages (Giai đoạn 3) và Hostinger (dự phòng). Thêm Vercel trái với nguyên tắc "càng ít bên liên quan càng tốt". Nên **chỉ chọn 1** trong Vercel hoặc Cloudflare.
3. **Mã nguồn vẫn đang công khai.** Dù chọn Vercel hay Cloudflare, mục tiêu "giấu mã nguồn" chỉ đạt khi chuyển kho GitHub về Riêng tư (bước 3b.6 / 3.7). Trong lúc chờ, landing `/7-ngay/` đưa lên GitHub Pages thì code của nó cũng công khai.
4. ✅ *Đã xử lý 05/11: ẩn địa chỉ email khỏi chữ trên trang, chỉ còn link "Nhắn Duyên…".* **Email công khai trên trang.** Landing `/7-ngay/` hiện ghi `duyenvocaoky@gmail.com` để người quan tâm hỏi đợt sau. Email công khai dễ bị gửi thư rác. Điều này chấp nhận được, nhưng nên biết trước.
5. ✅ *Đã ẩn dòng này 05/11.* **Câu "Sau khi bấm đăng ký: bạn điền form…" trên landing không còn đúng**, vì đợt này đã đóng và không có form. Nên ẩn dòng này hoặc đổi thành hướng dẫn "nhắn email để nhận thông tin đợt sau".

**Đề xuất của Claude:** chọn **Cloudflare Pages** thay cho Vercel, vì miễn phí, cho phép bán hàng và ít ràng buộc. Chỉ chọn Vercel nếu Diên Diên chấp nhận trả phí gói Pro.

### Giai đoạn 4: Hoàn thiện nội dung ⏳ Chờ tư liệu
- Phần **AI** trên trang chủ vẫn là chữ mẫu. Cần tên và mô tả 2 dự án, hoặc tạm ẩn.
- **4 case study** còn lại (Franchise, Coaching, Digital, University) đang ghi "sắp ra mắt".
- **Nhúng khóa học Storyline** để nhà tuyển dụng học thử: xuất bằng *Publish → Web*, mỗi file ≤ 25 MB (giới hạn của Cloudflare), bỏ nội dung nội bộ.
- Đọc lại các bản dịch do Claude dịch.
- (Tùy chọn) Mua **tên miền riêng** (khoảng 10–15 USD/năm cho `.com`) và gắn vào Cloudflare.

### Giai đoạn 4b: Landing page "7 ngày làm rõ yêu cầu và phân vai đào tạo" ⏳ Đang làm (từ 20/10/2026)
**Kết quả mong muốn:**
- 1 landing page bán sản phẩm "7 ngày làm rõ yêu cầu và phân vai cho dự án đào tạo" (990.000đ), chỉ tiếng Việt, tại `/7-ngay/`. Không đưa vào menu, dùng như link riêng để chia sẻ.
- Nút đăng ký **gắn link Google Form do Duyên tự tạo** (thông tin liên hệ + phiếu đầu vào dự án). Không dùng form hay email tự động (Duyên đã bỏ phần này ngày 20/10 vì thấy rủi ro).
- Nguồn nội dung: Google Drive › PCCK5 › `7days | Bản chính Landing Page` và `H1-00 Phiếu đầu vào dự án`.

| # | Việc | Ai làm |
|---|---|---|
| 4b.1 | Tạo skill `landing-page-ban-hang` (tối ưu bán hàng) để dùng lại cho các trang sau | Claude |
| 4b.2 | Tự tạo Google Form, gửi link cho Claude | Diên Diên |
| 4b.3 | Dựng landing `/7-ngay/` theo cấu trúc trang mẫu (chữ giữ bản Doc), gắn link form vào nút đăng ký | Claude |
| 4b.4 | Duyệt các chỗ đã biên tập ✅ Đã chốt "hơn 6 năm" kinh nghiệm; giữ nguyên lịch cũ (đã đóng đăng ký) | Diên Diên |
| 4b.5 | Publish branch `landing-7-ngay` → PR → Merge | Diên Diên |
| 4b.6 | Đợt này đã đóng đăng ký (05/11): nút đăng ký hiện "Đã đóng đăng ký đợt này" (mờ, không bấm được) + link email `duyenvocaoky@gmail.com` để hỏi đợt sau. Mở lại đợt mới: đổi `closed: false` và điền `form_url` trong `content/landing-7-ngay.yml` | Claude ✅ |

Ghi chú: giữ nguyên các ngày trong bản Doc (hạn đăng ký 18/10, triển khai 20–27/10). Chưa cần thông tin thanh toán hay mã QR.

### Giai đoạn 5: Bán hàng với Supabase ⏳ Khi đã chốt sản phẩm
- Chốt bán gì, khách cần điền gì, thanh toán bằng gì (PayOS / VNPay / MoMo).
- Tạo bảng dữ liệu, **bật RLS cho mọi bảng**: khách chỉ được *gửi*, không được *đọc* dữ liệu của người khác.
- Trang web chỉ dùng khóa công khai. Việc cần bí mật (xác nhận thanh toán, gửi email) chạy bằng **Supabase Edge Functions**.
- Chống spam form bằng Cloudflare Turnstile.
- Trước khi mở bán: chạy Security Advisor của Supabase, soạn chính sách bảo mật dữ liệu (Nghị định 13/2023), sao lưu định kỳ.
- Gói Supabase miễn phí tự tạm dừng sau 7 ngày không hoạt động → có đơn thật thì nên nâng gói.

### Hostinger: không còn bắt buộc
Cloudflare Pages đã đáp ứng việc chạy trang miễn phí và giấu mã nguồn. Hostinger chỉ cần nếu sau này muốn dùng dịch vụ của họ (email theo tên miền, chẳng hạn). File `public/.htaccess` vẫn được giữ sẵn cho trường hợp đó.

## 5. Nguyên liệu
| Nguyên liệu | Có chưa |
|---|---|
| Code, nội dung, ảnh trang web | ✅ Trong kho GitHub |
| Tài khoản GitHub `duyenvocaoky` + GitHub Desktop | ✅ |
| Tài khoản Cloudflare | ❌ Diên Diên tạo |
| Tư liệu phần AI, 4 case study, khóa học Storyline | ❌ Diên Diên gửi |
| Tên miền riêng | ❌ Tùy chọn |
| Tài khoản Supabase, thông tin sản phẩm, cổng thanh toán | ❌ Giai đoạn 5 |

## 6. Ai làm gì
- **Claude:** toàn bộ phần kỹ thuật (code, cấu hình, kiểm tra, hướng dẫn từng bước).
- **Diên Diên:** đưa ý tưởng, cung cấp tư liệu, duyệt kết quả. Tự làm các việc liên quan đến tài khoản, thanh toán và các nút xác nhận trên GitHub/Cloudflare. Claude không tạo tài khoản, không nhập mật khẩu hay thẻ thanh toán thay chị.

## 7. Lưu ý
- **Trang web luôn công khai** (để người ta xem). "Giấu mã nguồn" là giấu kho code trên GitHub. File đã đóng gói (HTML, ảnh, font) thì trình duyệt của người xem vẫn tải về được.
- **Mọi việc xóa hoặc tắt** (tắt GitHub Pages, xóa nhánh, xóa kho…) đều phải được Claude trình bày rõ và Diên Diên đồng ý trước.
- Mỗi thay đổi đều xem thử trên máy trước khi đưa lên.
- Kho riêng tư ở gói miễn phí của GitHub có 2.000 phút chạy kiểm tra tự động mỗi tháng, đủ dùng.
