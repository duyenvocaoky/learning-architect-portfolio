/**
 * Google Apps Script — Form đăng ký "7 ngày làm rõ yêu cầu và phân vai đào tạo"
 *
 * CÁCH DÙNG (chạy 1 lần, bằng tài khoản Google của Duyên):
 *   1. Mở https://script.google.com → New project.
 *   2. Xoá đoạn code mẫu, dán toàn bộ file này vào, bấm 💾 Save.
 *   3. Ở thanh trên, chọn hàm  setup  → bấm ▶ Run → cho phép các quyền được hỏi.
 *   4. Mở View → Logs (hoặc Execution log) để lấy LINK FORM, gửi lại cho Claude.
 *
 * Kết quả:
 *   - 1 Google Form + 1 Google Sheet lưu câu trả lời, đặt trong thư mục PCCK5.
 *   - Mỗi khi có người gửi form → Gmail của Duyên tự gửi email xác nhận tới người đó.
 *
 * Muốn sửa nội dung email: sửa EMAIL_SUBJECT / emailBody() bên dưới rồi Save (không cần chạy lại setup).
 */

const FOLDER_ID = '1SiTgZlUrAIhtS_kLcS2Q9h8rA6mjjO_7'; // Google Drive › PCCK5
const FORM_TITLE = 'Đăng ký: 7 ngày làm rõ yêu cầu và phân vai cho dự án đào tạo';
const EMAIL_ITEM_TITLE = 'Email';
const NAME_ITEM_TITLE = 'Họ và tên';
const SENDER_NAME = 'Duyên';
const EMAIL_SUBJECT = 'Duyên đã nhận đăng ký "7 ngày làm rõ yêu cầu và phân vai đào tạo"';

function emailBody(name) {
  const hi = name ? 'Chào ' + name + ',' : 'Chào bạn,';
  return [
    hi,
    '',
    'Duyên đã nhận được đăng ký và phiếu đầu vào dự án của bạn cho chương trình "7 ngày làm rõ yêu cầu và phân vai cho dự án đào tạo". Cảm ơn bạn đã dành thời gian điền phiếu.',
    '',
    'Hiện Duyên đang tham gia một khoá học với yêu cầu ngắt toàn bộ kết nối đến hết ngày 01/11. Duyên sẽ phản hồi bạn ngay khi quay lại.',
    '',
    'Cảm ơn bạn đã kiên nhẫn.',
    '',
    'Duyên',
  ].join('\n');
}

/** Chạy 1 lần: tạo form, sheet, và cài email tự động. */
function setup() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('FORM_ID')) {
    const existing = FormApp.openById(props.getProperty('FORM_ID'));
    Logger.log('Form đã được tạo trước đó, không tạo thêm.');
    Logger.log('LINK FORM (gửi khách): ' + existing.getPublishedUrl());
    return;
  }

  const form = FormApp.create(FORM_TITLE);
  form.setDescription(
    'Cảm ơn bạn đã quan tâm đến chương trình 7 ngày làm rõ yêu cầu và phân vai cho dự án đào tạo.\n\n' +
    'Form này gồm thông tin liên hệ và Phiếu đầu vào dự án, giúp:\n' +
    '1. Duyên hiểu case của bạn trước buổi 1.\n' +
    '2. Bạn gọi tên được chỗ mình đang vướng.\n\n' +
    '• Mất khoảng 20–30 phút. Trả lời ngắn; chưa biết thì ghi "chưa biết" — ô "chưa biết" cũng là thông tin quan trọng.\n' +
    '• Bảo mật: bỏ tên công ty, tên người, số liệu nội bộ. Gọi theo vai trò, ví dụ "Trưởng phòng HR", "SME phòng Kho".\n' +
    '• Hạn điền: ngay sau khi đăng ký, chậm nhất 2 ngày trước buổi live 1.'
  );
  form.setConfirmationMessage(
    'Duyên đã nhận được đăng ký của bạn. Bạn sẽ nhận một email xác nhận trong vài phút (nhớ kiểm tra cả mục Spam/Quảng cáo).'
  );
  form.setProgressBar(true);

  // ---- Thông tin liên hệ ----
  form.addTextItem().setTitle(NAME_ITEM_TITLE).setRequired(true);
  form.addTextItem()
    .setTitle(EMAIL_ITEM_TITLE)
    .setHelpText('Email xác nhận sẽ gửi về địa chỉ này.')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().setHelpText('Vui lòng nhập đúng địa chỉ email.').build());
  form.addTextItem().setTitle('Số điện thoại / Zalo').setRequired(true);

  // ---- A. Yêu cầu bạn nhận được ----
  form.addPageBreakItem().setTitle('A. Yêu cầu bạn nhận được');
  para(form, 'A1. Yêu cầu được giao đúng nguyên văn là gì?', 'Chép lại câu / tin nhắn / email.');
  para(form, 'A2. Ai giao yêu cầu? Người đó liên quan thế nào tới vấn đề?', 'Ghi vai trò, phòng ban. Họ là người "đau" vì vấn đề, hay chỉ được giao đi lo việc này?');
  para(form, 'A3. Hạn chót là ngày nào? Vì sao lại là ngày đó?', 'Có đợt tuyển, đợt audit, báo cáo quý...?');

  // ---- B. Vấn đề phía sau yêu cầu ----
  form.addPageBreakItem()
    .setTitle('B. Vấn đề phía sau yêu cầu')
    .setHelpText('Lưu ý cách viết: tả VẤN ĐỀ, chưa cần tả khóa học. Tạm tránh các từ "khóa học", "nội dung", "slide", "LMS" khi trả lời phần này — những từ này dễ kéo mình vào lối nghĩ "làm khóa học" trước khi hiểu vấn đề.');
  para(form, 'B1. Ngoài thực tế công việc đang xảy ra chuyện gì khiến người ta muốn làm đào tạo?', 'Ai đang làm gì chưa đúng, ở tình huống nào?');
  para(form, 'B2. Vấn đề này đang được đo bằng gì chưa? Nếu có, con số hiện tại là bao nhiêu?', 'Ví dụ: số lỗi, thời gian, số khiếu nại, tỉ lệ nghỉ việc...');
  para(form, 'B3. Nếu không làm gì cả, chuyện gì sẽ xảy ra?', '');
  para(form, 'B4. Theo bạn đoán, vì sao người ta đang làm chưa đúng?', 'Thiếu công cụ, thiếu thời gian, quy trình rối, chưa biết, chưa có kỹ năng... Chỉ cần đoán.');
  para(form, 'B5. Trước đây đã thử cách nào chưa? Kết quả ra sao?', 'Khóa học cũ, tài liệu, nhắc nhở...');

  // ---- C. Tài liệu bạn đang có ----
  form.addPageBreakItem().setTitle('C. Tài liệu bạn đang có');
  para(form, 'C1. Tài liệu được đưa là gì?', 'Bao nhiêu slide/trang, dạng gì.');
  para(form, 'C2. Ai soạn tài liệu đó?', 'Người soạn thường muốn giữ nguyên nội dung.');
  para(form, 'C3. Đọc lướt: tài liệu đang cố giải quyết vấn đề gì? Có giống vấn đề ở B1 không?', '');
  para(form, 'C4. Tài liệu có nhắc tới lỗi hay sai sót cụ thể nào không? Có tình huống khó, "vùng xám" nào mà tài liệu chưa nói tới?', '');
  para(form, 'C5. Phần nào trong tài liệu rõ ràng đã tốn nhiều công hoặc tiền?', 'Thường sẽ bị yêu cầu giữ lại.');

  // ---- D. Những người liên quan (1 câu tự do) ----
  form.addPageBreakItem().setTitle('D. Những người liên quan');
  para(form, 'D. Những người liên quan tới dự án',
    'Với mỗi người, ghi VAI TRÒ (không ghi tên) và bạn đã nói chuyện với người này chưa:\n' +
    '• Người giao yêu cầu\n' +
    '• SME (chuyên gia nội dung)\n' +
    '• Người duyệt cuối\n' +
    '• Ai khác có thể phải duyệt hoặc góp ý? (pháp chế, sếp của người giao, phòng khác...)\n' +
    '• Người học (vai trò, số lượng, kinh nghiệm)');

  // ---- E. Bạn đang ở đâu và vướng chỗ nào ----
  form.addPageBreakItem().setTitle('E. Bạn đang ở đâu và vướng chỗ nào');
  form.addMultipleChoiceItem()
    .setTitle('E1. Bạn đã làm tới bước nào?')
    .setChoiceValues([
      'Mới nhận yêu cầu, chưa làm gì',
      'Đã có brief/ghi chú nhưng còn sơ sài',
      'Đã làm outline',
      'Đã làm storyboard hoặc bản dựng một phần',
      'Đã bị yêu cầu sửa ít nhất 1 lần',
    ])
    .setRequired(true);
  form.addCheckboxItem()
    .setTitle('E2. Bạn đang vướng nhất ở đâu? (chọn tối đa 2)')
    .setChoiceValues([
      'Chưa rõ mục tiêu: học xong người học phải làm được gì',
      'Chưa rõ người học là ai',
      'Chưa rõ phần nào ID làm, phần nào SME chốt',
      'Chưa biết ai là người duyệt cuối',
      'SME không muốn cắt, rút gọn nội dung',
      'Không biết brief như vậy đã đủ để bắt đầu chưa',
    ])
    .showOtherOption(true)
    .setValidation(FormApp.createCheckboxValidation().requireSelectAtMost(2).setHelpText('Chọn tối đa 2 ô.').build())
    .setRequired(true);
  form.addTextItem().setTitle('E3. Nếu sau 7 ngày chỉ giải quyết được 1 điều, bạn muốn đó là điều gì?').setRequired(true);

  // ---- F. Xác nhận ----
  form.addPageBreakItem().setTitle('F. Xác nhận');
  form.addCheckboxItem().setTitle('Bảo mật thông tin')
    .setChoiceValues(['Tôi đã bỏ tên công ty, tên người và số liệu nội bộ.']).setRequired(true);
  form.addCheckboxItem().setTitle('Đồng ý chia sẻ')
    .setChoiceValues(['Tôi được phép chia sẻ bản mô tả đã ẩn thông tin này để nhận góp ý.']).setRequired(true);

  // ---- Sheet lưu câu trả lời + đặt cả hai vào thư mục PCCK5 ----
  const sheet = SpreadsheetApp.create('Câu trả lời – Đăng ký 7 ngày làm rõ yêu cầu');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  const folder = DriveApp.getFolderById(FOLDER_ID);
  DriveApp.getFileById(form.getId()).moveTo(folder);
  DriveApp.getFileById(sheet.getId()).moveTo(folder);

  // ---- Email tự động khi có người gửi form ----
  ScriptApp.newTrigger('sendConfirmation').forForm(form).onFormSubmit().create();

  props.setProperty('FORM_ID', form.getId());
  Logger.log('XONG.');
  Logger.log('LINK FORM (gửi khách): ' + form.getPublishedUrl());
  Logger.log('Link sửa form: ' + form.getEditUrl());
  Logger.log('Link sheet câu trả lời: ' + sheet.getUrl());
}

/** Tự chạy mỗi khi có người gửi form. */
function sendConfirmation(e) {
  const answers = {};
  e.response.getItemResponses().forEach(function (r) {
    answers[r.getItem().getTitle()] = r.getResponse();
  });
  const to = String(answers[EMAIL_ITEM_TITLE] || '').trim();
  if (!to) return;
  const name = String(answers[NAME_ITEM_TITLE] || '').trim();
  MailApp.sendEmail({ to: to, subject: EMAIL_SUBJECT, body: emailBody(name), name: SENDER_NAME });
}

/** Câu trả lời dài, bắt buộc. */
function para(form, title, help) {
  const item = form.addParagraphTextItem().setTitle(title).setRequired(true);
  if (help) item.setHelpText(help);
  return item;
}
