import {
  BellRing,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  Compass,
  FishSymbol,
  Gauge,
  Gem,
  History,
  Layers3,
  MoonStar,
  Palette,
  Sparkles,
  TimerReset,
  Trophy,
  Waves,
} from "lucide-react";

export const siteLinks = {
  primaryCta: "#final-cta",
  secondaryCta: "#how-it-works",
  privacy: "/privacy",
  terms: "/terms",
  support: "/support",
  contact: "mailto:support@deepocean.io.vn",
} as const;

export const navItems = [
  { label: { en: "Why Deep Ocean", vi: "Vì sao chọn Deep Ocean" }, href: "#problem" },
  { label: { en: "Features", vi: "Tính năng" }, href: "#features" },
  { label: { en: "Experience", vi: "Trải nghiệm" }, href: "#screens" },
  { label: { en: "Pro", vi: "Pro" }, href: "#premium" },
  { label: { en: "Privacy", vi: "Quyền riêng tư" }, href: "#privacy" },
] as const;

export const problemSolution = {
  problem: {
    eyebrow: { en: "The surface problem", vi: "Vấn đề trên mặt nước" },
    title: {
      en: "Most timers measure attention. They do not make it easier to return.",
      vi: "Hầu hết bộ đếm giờ chỉ đo sự tập trung. Chúng không giúp bạn dễ quay lại hơn.",
    },
    body: {
      en: "A plain countdown can feel like another demand. Deep Ocean gives focus a calm sense of place, visible progression, and a reason to protect the next few minutes.",
      vi: "Một bộ đếm ngược đơn thuần có thể giống thêm một áp lực khác. Deep Ocean mang lại cho sự tập trung một cảm giác về nơi chốn bình yên, tiến trình rõ ràng và một lý do để bảo vệ vài phút tiếp theo.",
    },
  },
  solution: {
    eyebrow: { en: "A quieter system", vi: "Một hệ thống tĩnh lặng hơn" },
    title: {
      en: "Every session becomes a dive with a beginning, a descent, and something worth surfacing with.",
      vi: "Mỗi phiên tập trung trở thành một lượt lặn có điểm bắt đầu, một hành trình đi xuống, và điều gì đó đáng để mang lên khi trồi lên mặt nước.",
    },
    body: {
      en: "Choose a duration or free dive, watch time become depth, discover ocean life, and build a personal record of focused work without turning productivity into noise.",
      vi: "Chọn thời lượng hoặc lặn tự do, xem thời gian biến thành độ sâu, khám phá sinh vật đại dương, và xây dựng một hồ sơ cá nhân về công việc tập trung mà không biến năng suất thành áp lực ồn ào.",
    },
  },
} as const;

export const features = [
  {
    icon: TimerReset,
    title: { en: "Timed and free dives", vi: "Lặn có giờ và lặn tự do" },
    description: {
      en: "Start with 15, 25, 45, or 60 minutes, choose a custom duration, or leave the timer open and surface when the work is done.",
      vi: "Bắt đầu với 15, 25, 45 hoặc 60 phút, chọn thời lượng tùy chỉnh, hoặc để bộ đếm giờ mở và trồi lên khi công việc hoàn tất.",
    },
    tag: { en: "Core focus", vi: "Tập trung cốt lõi" },
  },
  {
    icon: Layers3,
    title: { en: "Five depth zones", vi: "Năm vùng độ sâu" },
    description: {
      en: "Focused minutes move you from the Sunlight Zone through Twilight, Midnight, Abyssal, and the Hadal Trench.",
      vi: "Những phút tập trung đưa bạn từ Vùng Ánh Sáng qua Vùng Chạng Vạng, Vùng Nửa Đêm, Vùng Vực Thẳm, và Rãnh Hadal.",
    },
    tag: { en: "Progression", vi: "Tiến trình" },
  },
  {
    icon: FishSymbol,
    title: { en: "Creatures, artifacts, and lore", vi: "Sinh vật, cổ vật và truyền thuyết" },
    description: {
      en: "Deterministic discovery rolls reveal creatures and artifacts from the zone you reached, building an expedition log over time.",
      vi: "Các lượt khám phá xác định sẵn hé lộ sinh vật và cổ vật từ vùng bạn đã đến, dần xây dựng một nhật ký thám hiểm theo thời gian.",
    },
    tag: { en: "Collection", vi: "Bộ sưu tập" },
  },
  {
    icon: Trophy,
    title: { en: "XP, levels, streaks, and titles", vi: "XP, cấp độ, chuỗi ngày và danh hiệu" },
    description: {
      en: "Completed focus earns XP and can advance levels, daily streaks, zone unlocks, and milestone achievements.",
      vi: "Hoàn thành phiên tập trung nhận XP và có thể tăng cấp độ, duy trì chuỗi ngày, mở khóa vùng mới và đạt các cột mốc thành tựu.",
    },
    tag: { en: "Motivation", vi: "Động lực" },
  },
  {
    icon: ChartNoAxesCombined,
    title: { en: "Focus analytics", vi: "Phân tích tập trung" },
    description: {
      en: "Review total focus, maximum depth, weekly rhythm, recent expeditions, discoveries, and per-session reports.",
      vi: "Xem lại tổng thời gian tập trung, độ sâu tối đa, nhịp độ theo tuần, các chuyến thám hiểm gần đây, khám phá và báo cáo từng phiên.",
    },
    tag: { en: "Reflection", vi: "Nhìn lại" },
  },
  {
    icon: MoonStar,
    title: { en: "Calm sensory feedback", vi: "Phản hồi giác quan êm dịu" },
    description: {
      en: "Cinematic motion, underwater ambience, semantic haptics, reduced-motion support, and discovery alerts shape the ritual.",
      vi: "Chuyển động điện ảnh, không khí dưới nước, rung phản hồi có ngữ nghĩa, hỗ trợ giảm chuyển động và thông báo khám phá tạo nên nghi thức tập trung.",
    },
    tag: { en: "Atmosphere", vi: "Không khí" },
  },
] as const;

export const featureStories = [
  {
    image: {
      src: "/assets/ocean-portal-wide.png",
      alt: "Deep Ocean widget artwork showing a whale below a sunlit ocean portal",
      width: 1000,
      height: 500,
      position: "center",
    },
    category: { en: "The ritual", vi: "Nghi thức" },
    title: {
      en: "Start with a destination, not another countdown.",
      vi: "Bắt đầu với một điểm đến, không phải thêm một bộ đếm ngược.",
    },
    description: {
      en: "Choose a timed or open-ended dive and let focused minutes become a visible descent through the ocean.",
      vi: "Chọn một lượt lặn có giờ hoặc không giới hạn và để những phút tập trung trở thành một hành trình đi xuống đại dương có thể nhìn thấy được.",
    },
  },
  {
    image: {
      src: "/assets/living-jellyfish-square.png",
      alt: "Deep Ocean Living Ocean widget artwork with a glowing jellyfish",
      width: 900,
      height: 900,
      position: "center",
    },
    category: { en: "The atmosphere", vi: "Không khí" },
    title: {
      en: "A living world that makes returning feel natural.",
      vi: "Một thế giới sống động khiến việc quay lại trở nên tự nhiên.",
    },
    description: {
      en: "Ocean zones, discoveries, restrained motion, ambience, and haptics turn focus into a repeatable calm ritual.",
      vi: "Các vùng đại dương, khám phá, chuyển động tiết chế, không khí và rung phản hồi biến sự tập trung thành một nghi thức bình yên có thể lặp lại.",
    },
  },
  {
    image: {
      src: "/screenshots/stats.png",
      alt: "Real Deep Ocean Dive Analytics screen with focus totals and expedition history",
      width: 1290,
      height: 2796,
      position: "center 18%",
    },
    category: { en: "The record", vi: "Hồ sơ" },
    title: {
      en: "See the attention you protected over time.",
      vi: "Xem lại sự tập trung bạn đã bảo vệ theo thời gian.",
    },
    description: {
      en: "Completed dives build authentic history through total focus, weekly rhythm, depth records, and recent expeditions.",
      vi: "Các lượt lặn đã hoàn thành xây dựng nên lịch sử chân thực qua tổng thời gian tập trung, nhịp độ theo tuần, kỷ lục độ sâu và các chuyến thám hiểm gần đây.",
    },
  },
] as const;

export const steps = [
  {
    number: "01",
    title: { en: "Tell Deep Ocean what you want to improve", vi: "Cho Deep Ocean biết điều bạn muốn cải thiện" },
    description: {
      en: "Onboarding captures goals such as focus, consistency, stress reduction, learning, routines, and productivity.",
      vi: "Bước giới thiệu ghi nhận các mục tiêu như tập trung, duy trì đều đặn, giảm căng thẳng, học tập, thói quen và năng suất.",
    },
  },
  {
    number: "02",
    title: { en: "Choose a focus rhythm", vi: "Chọn nhịp độ tập trung" },
    description: {
      en: "Select a recommended workflow and a timed or open-ended dive that fits the energy you have today.",
      vi: "Chọn một quy trình được gợi ý và một lượt lặn có giờ hoặc không giới hạn phù hợp với năng lượng bạn có hôm nay.",
    },
  },
  {
    number: "03",
    title: { en: "Descend while you work", vi: "Đi xuống trong khi bạn làm việc" },
    description: {
      en: "The live dive tracks elapsed focus, depth, zone, discoveries, pause state, and completion without crowding the screen.",
      vi: "Lượt lặn trực tiếp theo dõi thời gian tập trung đã trôi qua, độ sâu, vùng, khám phá, trạng thái tạm dừng và hoàn thành mà không làm rối màn hình.",
    },
  },
  {
    number: "04",
    title: { en: "Surface with a useful record", vi: "Trồi lên với một hồ sơ hữu ích" },
    description: {
      en: "A completed dive is saved with XP, depth, discoveries, level progress, streak updates, and an expedition report.",
      vi: "Một lượt lặn hoàn thành được lưu lại cùng XP, độ sâu, khám phá, tiến trình cấp độ, cập nhật chuỗi ngày và báo cáo thám hiểm.",
    },
  },
] as const;

export const screenPreviews = [
  {
    id: "home",
    label: { en: "Home", vi: "Trang chính" },
    title: { en: "A calm launch point", vi: "Một điểm khởi đầu bình yên" },
    description: {
      en: "See your last dive, preferred session, quick durations, depth progress, daily guidance, streak, dives, and level.",
      vi: "Xem lượt lặn gần nhất, phiên yêu thích, thời lượng nhanh, tiến trình độ sâu, hướng dẫn hằng ngày, chuỗi ngày, số lượt lặn và cấp độ.",
    },
  },
  {
    id: "dive",
    label: { en: "Live dive", vi: "Lặn trực tiếp" },
    title: { en: "Attention, with almost no chrome", vi: "Sự tập trung, gần như không giao diện thừa" },
    description: {
      en: "One cinematic screen holds the progress ring, elapsed time, depth, zone, discoveries, pause, surface, and abort controls.",
      vi: "Một màn hình điện ảnh duy nhất chứa vòng tiến trình, thời gian đã trôi qua, độ sâu, vùng, khám phá, cùng các nút tạm dừng, trồi lên và hủy.",
    },
  },
  {
    id: "collection",
    label: { en: "Expedition log", vi: "Nhật ký thám hiểm" },
    title: { en: "A collection earned through real focus", vi: "Một bộ sưu tập đạt được nhờ sự tập trung thật sự" },
    description: {
      en: "Catalog creatures and artifacts by rarity, revisit sightings, and unlock deeper field-journal entries with Pro.",
      vi: "Phân loại sinh vật và cổ vật theo độ hiếm, xem lại các lần bắt gặp, và mở khóa các mục nhật ký thực địa chuyên sâu hơn với Pro.",
    },
  },
  {
    id: "stats",
    label: { en: "Dive analytics", vi: "Phân tích lượt lặn" },
    title: { en: "A history of protected attention", vi: "Một lịch sử của sự tập trung được bảo vệ" },
    description: {
      en: "Review total focus, maximum depth, a seven-day heatmap, recent expeditions, and individual session reports.",
      vi: "Xem lại tổng thời gian tập trung, độ sâu tối đa, bản đồ nhiệt bảy ngày, các chuyến thám hiểm gần đây và báo cáo từng phiên.",
    },
  },
  {
    id: "ai",
    label: { en: "Marine Guide", vi: "Hướng Dẫn Viên Biển" },
    title: { en: "Guidance grounded in your app context", vi: "Hướng dẫn dựa trên bối cảnh sử dụng ứng dụng của bạn" },
    description: {
      en: "Daily recommendations, motivation, session reflection, mood selection, and a cached or local fallback when hosted AI is unavailable.",
      vi: "Gợi ý hằng ngày, động lực, nhìn lại phiên tập trung, chọn tâm trạng, và cơ chế dự phòng cục bộ hoặc lưu đệm khi AI trên máy chủ không khả dụng.",
    },
  },
  {
    id: "premium",
    label: { en: "Profile & Pro", vi: "Hồ sơ & Pro" },
    title: { en: "Settings and premium access in one place", vi: "Cài đặt và quyền truy cập cao cấp ở một nơi" },
    description: {
      en: "Manage the diver profile, XP, themes, language, reminders, motion, haptics, audio, and verified Pro entitlements.",
      vi: "Quản lý hồ sơ thợ lặn, XP, giao diện, ngôn ngữ, nhắc nhở, chuyển động, rung phản hồi, âm thanh và quyền lợi Pro đã xác minh.",
    },
  },
] as const;

export const premiumBenefits = [
  {
    icon: Palette,
    title: "Seven premium themes",
    description:
      "App-wide visual identities with distinct palettes, typography, particles, gradients, and ambient effects.",
  },
  {
    icon: BrainCircuit,
    title: "Deep AI insights",
    description:
      "Unlock personal trend analysis, mood-correlated patterns, focus plans, and a guided breathing ritual.",
  },
  {
    icon: BookOpen,
    title: "Full field journals",
    description:
      "Read the folklore, theories, and sealed expedition notes behind discovered creatures and artifacts.",
  },
  {
    icon: Gem,
    title: "A more personal ocean",
    description:
      "Pro elevates the tab experience and lets the visual system feel deliberately yours while the core timer remains accessible.",
  },
] as const;

export const intelligence = [
  {
    icon: BrainCircuit,
    title: "Context-aware companion",
    description:
      "Guidance can use your level, streak, mood, unlocked zones, achievements, and recent sessions.",
  },
  {
    icon: Compass,
    title: "Personal onboarding plan",
    description:
      "Your selected goals shape recommended items and a starting workflow before the first dive.",
  },
  {
    icon: Sparkles,
    title: "Graceful offline fallback",
    description:
      "If a hosted AI provider is unavailable, a deterministic local guide still produces data-driven recommendations.",
  },
] as const;

export const progressMetrics = [
  { value: "5", label: "ocean zones", icon: Layers3 },
  { value: "164", label: "catalog entries", icon: FishSymbol },
  { value: "500", label: "local session records", icon: Gauge },
  { value: "EN / VI", label: "app languages", icon: Waves },
] as const;

export const progressFeatures = [
  {
    icon: History,
    title: "Expedition history",
    body: "Every surfaced session becomes a dated record with duration, maximum depth, discoveries, and XP.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Weekly focus shape",
    body: "A seven-day heatmap makes consistency visible without turning the experience into a spreadsheet.",
  },
  {
    icon: Trophy,
    title: "Long-term progression",
    body: "Levels, current and longest streaks, depth records, collection milestones, and title achievements reward return.",
  },
] as const;

export const faqs = [
  {
    question: "What is a focus dive?",
    answer:
      "It is a focus session represented as an underwater descent. Time becomes depth, deeper durations reach new zones, and completed sessions can produce discoveries and progression.",
  },
  {
    question: "Do I have to use a fixed timer?",
    answer:
      "No. Deep Ocean includes quick and custom timed sessions plus a free dive with no fixed end time.",
  },
  {
    question: "What stays available without Pro?",
    answer:
      "The core dive timer, XP, streaks, basic expedition history, collection loop, and standard guidance remain part of the core experience. Pro adds premium themes, deeper AI insights, and full field journals.",
  },
  {
    question: "Does the AI companion require an internet connection?",
    answer:
      "Hosted AI features need a configured provider and connectivity, but the app includes cached and local fallback behavior so basic guidance does not disappear.",
  },
  {
    question: "Can I keep track of a dive outside the app?",
    answer:
      "The implementation includes home-screen widgets, timed-dive completion notifications, an Android active-dive notification, and iPhone Live Activity support. Final device and store QA is still required before release.",
  },
  {
    question: "Is Deep Ocean available now?",
    answer:
      "Store availability links have not been provided for this landing page yet. The current calls to action are clearly marked as beta or store-link placeholders.",
  },
] as const;

export const widgetHighlights = [
  "Start, pause, or resume a focus session",
  "Open the AI companion or daily progress",
  "See streak, focus targets, zone, depth, and discoveries",
  "Follow an active timed dive with iPhone Live Activities",
] as const;

export const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Experience", href: "#screens" },
      { label: "Deep Ocean Pro", href: "#premium" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy Policy", href: siteLinks.privacy },
      { label: "Terms of Service", href: siteLinks.terms },
      { label: "Support", href: siteLinks.support },
      { label: "Email support", href: siteLinks.contact },
    ],
  },
] as const;

export const auxiliaryIcons = { BellRing };
