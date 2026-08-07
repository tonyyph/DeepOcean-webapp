import {
  ShieldCheck,
  Sparkles,
  Smartphone,
  TimerReset,
} from "lucide-react";

export const supportEmail = "support@deepocean.io.vn";

export const heroCopy = {
  eyebrow: { en: "Support", vi: "Hỗ trợ" },
  title: { en: "Deep Ocean Support", vi: "Hỗ Trợ Deep Ocean" },
  body: {
    en: "Need help with a focus dive, widget, Live Activity, free app access, or privacy request? Contact the Deep Ocean team and include enough device details to reproduce the issue.",
    vi: "Cần hỗ trợ về lượt lặn tập trung, widget, Live Activity, quyền truy cập ứng dụng miễn phí, hay yêu cầu về quyền riêng tư? Hãy liên hệ đội ngũ Deep Ocean và cung cấp đủ thông tin thiết bị để chúng tôi có thể tái hiện vấn đề.",
  },
  emailButton: { en: "Email support", vi: "Gửi email hỗ trợ" },
  contactButton: { en: "Contact team", vi: "Liên hệ đội ngũ" },
  emailNotePrefix: { en: "Support email: ", vi: "Email hỗ trợ: " },
  cardLabel: { en: "For Apple review", vi: "Dành cho Apple xét duyệt" },
  cardNote: {
    en: "Public support URL for App Store Connect submissions.",
    vi: "Đường dẫn hỗ trợ công khai dùng cho hồ sơ nộp trên App Store Connect.",
  },
} as const;

export const topicsHeading = {
  eyebrow: { en: "How we can help", vi: "Chúng tôi có thể giúp gì" },
  title: { en: "Support topics", vi: "Chủ đề hỗ trợ" },
} as const;

export const supportTopics = [
  {
    icon: TimerReset,
    title: { en: "Focus dives and session history", vi: "Lượt lặn tập trung và lịch sử phiên" },
    body: {
      en: "Get help with timed dives, free dives, saved expedition records, XP, streaks, and progress visibility.",
      vi: "Nhận hỗ trợ về lượt lặn có giờ, lặn tự do, bản ghi thám hiểm đã lưu, XP, chuỗi ngày và hiển thị tiến trình.",
    },
  },
  {
    icon: Smartphone,
    title: { en: "Widgets and Live Activities", vi: "Widget và Live Activities" },
    body: {
      en: "Report issues with home-screen widgets, active dive status, notifications, or iPhone Live Activities.",
      vi: "Báo cáo sự cố với widget màn hình chính, trạng thái lượt lặn đang diễn ra, thông báo, hoặc Live Activities trên iPhone.",
    },
  },
  {
    icon: Sparkles,
    title: { en: "Free access and included features", vi: "Quyền truy cập miễn phí và tính năng đi kèm" },
    body: {
      en: "Ask about included themes, guidance, field journals, collection details, or any feature that does not appear available in the current free app.",
      vi: "Hỏi về giao diện đi kèm, hướng dẫn, nhật ký thực địa, chi tiết bộ sưu tập, hoặc bất kỳ tính năng nào chưa hiển thị trong ứng dụng miễn phí hiện tại.",
    },
  },
  {
    icon: ShieldCheck,
    title: { en: "Privacy and data", vi: "Quyền riêng tư và dữ liệu" },
    body: {
      en: "Request help with local app data, account-related questions, privacy concerns, or data deletion guidance.",
      vi: "Yêu cầu hỗ trợ về dữ liệu cục bộ của ứng dụng, câu hỏi liên quan đến tài khoản, mối lo về quyền riêng tư, hoặc hướng dẫn xóa dữ liệu.",
    },
  },
] as const;

export const beforeEmailingHeading = {
  eyebrow: { en: "Before emailing", vi: "Trước khi gửi email" },
  title: { en: "Include these details", vi: "Bao gồm các thông tin sau" },
} as const;

export const checklistItems = [
  { en: "Device model and iOS version", vi: "Model thiết bị và phiên bản iOS" },
  { en: "Deep Ocean app version", vi: "Phiên bản ứng dụng Deep Ocean" },
  { en: "What you expected to happen", vi: "Điều bạn mong đợi sẽ xảy ra" },
  { en: "What happened instead", vi: "Điều thực tế đã xảy ra" },
  { en: "Screenshots or screen recording if available", vi: "Ảnh chụp màn hình hoặc video quay màn hình nếu có" },
] as const;

export const quickAnswersHeading = {
  eyebrow: { en: "Quick answers", vi: "Giải đáp nhanh" },
} as const;

export const quickAnswers = [
  {
    question: { en: "How fast will support reply?", vi: "Hỗ trợ sẽ phản hồi nhanh như thế nào?" },
    answer: {
      en: "Most support messages are reviewed within 2 business days. Include your device model, iOS version, app version, and screenshots when possible.",
      vi: "Hầu hết các yêu cầu hỗ trợ được xem xét trong vòng 2 ngày làm việc. Vui lòng kèm theo model thiết bị, phiên bản iOS, phiên bản ứng dụng và ảnh chụp màn hình nếu có thể.",
    },
  },
  {
    question: { en: "Do I need to pay to use Deep Ocean?", vi: "Tôi có cần trả phí để dùng Deep Ocean không?" },
    answer: {
      en: "No. The current Deep Ocean experience is presented as free for users. If a feature appears unavailable, email support with your app version and a screenshot so we can investigate.",
      vi: "Không. Trải nghiệm Deep Ocean hiện tại được trình bày là miễn phí cho người dùng. Nếu một tính năng có vẻ chưa khả dụng, hãy gửi email hỗ trợ kèm phiên bản ứng dụng và ảnh chụp màn hình để chúng tôi kiểm tra.",
    },
  },
  {
    question: { en: "Can I request data deletion?", vi: "Tôi có thể yêu cầu xóa dữ liệu không?" },
    answer: {
      en: "Yes. Email support with the subject Data deletion request. Deep Ocean is designed around local-first focus data, and support will guide you through any app-side deletion steps.",
      vi: "Có. Hãy gửi email cho bộ phận hỗ trợ với tiêu đề Data deletion request. Deep Ocean được thiết kế xoay quanh dữ liệu tập trung ưu tiên cục bộ, và bộ phận hỗ trợ sẽ hướng dẫn bạn các bước xóa dữ liệu trong ứng dụng nếu cần.",
    },
  },
] as const;

export const finalCopy = {
  title: { en: "Still need help?", vi: "Vẫn cần hỗ trợ thêm?" },
  body: {
    en: "Send a support request and the team will review it. Include the screen, app version, device model, and what you expected to happen.",
    vi: "Gửi một yêu cầu hỗ trợ và đội ngũ sẽ xem xét. Hãy kèm màn hình liên quan, phiên bản ứng dụng, model thiết bị và điều bạn mong đợi sẽ xảy ra.",
  },
  button: { en: "Email Deep Ocean", vi: "Gửi email cho Deep Ocean" },
} as const;
