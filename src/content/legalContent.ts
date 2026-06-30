export type LegalSection = {
  id: string
  heading: { en: string; vi: string }
  body: { en: string[]; vi: string[] }
}

export type LegalPage = {
  slug: "privacy" | "terms"
  title: { en: string; vi: string }
  eyebrow: { en: string; vi: string }
  updatedAt: string
  sections: LegalSection[]
}

export const privacyPage: LegalPage = {
  slug: "privacy",
  title: { en: "Privacy Policy", vi: "Chính sách quyền riêng tư" },
  eyebrow: { en: "Privacy", vi: "Quyền riêng tư" },
  updatedAt: "June 30, 2026",
  sections: [
    {
      id: "overview",
      heading: { en: "Overview", vi: "Tổng quan" },
      body: {
        en: [
          "Deep Ocean is a local-first focus timer app. This Privacy Policy explains what information may be involved when you use Deep Ocean, how it is stored, and your rights regarding that information.",
          "We are committed to keeping your focus data on your device. Deep Ocean does not require you to create an account and is designed so that the core experience works entirely offline.",
        ],
        vi: [
          "Deep Ocean là ứng dụng hẹn giờ tập trung ưu tiên lưu trữ cục bộ. Chính sách Quyền riêng tư này giải thích thông tin nào có thể liên quan khi bạn sử dụng Deep Ocean, cách lưu trữ và quyền của bạn đối với thông tin đó.",
          "Chúng tôi cam kết giữ dữ liệu tập trung của bạn trên thiết bị. Deep Ocean không yêu cầu bạn tạo tài khoản và được thiết kế để trải nghiệm cốt lõi hoạt động hoàn toàn ngoại tuyến.",
        ],
      },
    },
    {
      id: "information-collected",
      heading: { en: "Information We Collect", vi: "Thông tin chúng tôi thu thập" },
      body: {
        en: [
          "Deep Ocean does not collect your name, email address, or any personal identifier by default. The following information may be involved in specific circumstances:",
          "AI guidance prompts — If you use the Marine Guide feature, the text you enter as context or questions may be sent to a configured third-party AI provider to generate a response. Deep Ocean does not store these prompts on its own servers.",
          "Purchase verification — If you subscribe to Deep Ocean Pro, your purchase is verified through RevenueCat and the Apple App Store. We receive a subscription status and purchase receipt identifier, but not your payment card details or Apple ID.",
        ],
        vi: [
          "Deep Ocean không thu thập tên, địa chỉ email hoặc bất kỳ thông tin nhận dạng cá nhân nào theo mặc định. Các thông tin sau đây có thể liên quan trong các trường hợp cụ thể:",
          "Lời nhắc hướng dẫn AI — Nếu bạn sử dụng tính năng Marine Guide, văn bản bạn nhập làm ngữ cảnh hoặc câu hỏi có thể được gửi đến nhà cung cấp AI bên thứ ba đã cấu hình để tạo phản hồi. Deep Ocean không lưu trữ những lời nhắc này trên máy chủ của mình.",
          "Xác minh giao dịch mua — Nếu bạn đăng ký Deep Ocean Pro, giao dịch mua của bạn được xác minh qua RevenueCat và App Store của Apple. Chúng tôi nhận được trạng thái đăng ký và mã định danh biên lai mua hàng, nhưng không nhận thông tin thẻ thanh toán hoặc Apple ID của bạn.",
        ],
      },
    },
    {
      id: "data-storage",
      heading: { en: "How Your Data Is Stored", vi: "Dữ liệu được lưu trữ như thế nào" },
      body: {
        en: [
          "The core product data in Deep Ocean is stored locally on your device using MMKV, a fast on-device key-value storage library. Data stored locally includes: dive history and expedition records, XP and level progression, streaks and achievements, your creature and artifact collection, app settings and personalization preferences, cached AI guidance responses, and mood and onboarding data.",
          "This data does not leave your device unless you explicitly use a feature that requires a network connection, such as Marine Guide or Pro subscription management.",
        ],
        vi: [
          "Dữ liệu sản phẩm cốt lõi trong Deep Ocean được lưu trữ cục bộ trên thiết bị của bạn bằng MMKV, thư viện lưu trữ khóa-giá trị nhanh trên thiết bị. Dữ liệu được lưu trữ cục bộ bao gồm: lịch sử lặn và hồ sơ thám hiểm, tiến độ XP và cấp độ, chuỗi ngày và thành tích, bộ sưu tập sinh vật và hiện vật, cài đặt ứng dụng và tùy chọn cá nhân hóa, phản hồi hướng dẫn AI đã lưu vào bộ nhớ đệm, và dữ liệu tâm trạng và giới thiệu.",
          "Dữ liệu này không rời khỏi thiết bị của bạn trừ khi bạn sử dụng tính năng yêu cầu kết nối mạng, chẳng hạn như Marine Guide hoặc quản lý đăng ký Pro.",
        ],
      },
    },
    {
      id: "third-party-services",
      heading: { en: "Third-Party Services", vi: "Dịch vụ bên thứ ba" },
      body: {
        en: [
          "Deep Ocean integrates with the following third-party services in specific circumstances:",
          "RevenueCat — Used to manage and verify Deep Ocean Pro subscriptions. RevenueCat processes purchase receipts from the Apple App Store. Their privacy policy is available at revenuecat.com.",
          "AI Providers — The Marine Guide feature may send your focus context and prompts to a configured AI provider. This connection is optional and only active when you use Marine Guide. The provider processes your input according to their own privacy policy.",
          "Apple App Store — App distribution, updates, optional crash reporting (if you have opted in via iOS Settings), and purchase billing are handled by Apple under Apple's privacy policy.",
          "Deep Ocean does not use advertising SDKs, analytics SDKs, or social media tracking.",
        ],
        vi: [
          "Deep Ocean tích hợp với các dịch vụ bên thứ ba sau trong các trường hợp cụ thể:",
          "RevenueCat — Được sử dụng để quản lý và xác minh các đăng ký Deep Ocean Pro. RevenueCat xử lý biên lai mua hàng từ App Store của Apple. Chính sách quyền riêng tư của họ có tại revenuecat.com.",
          "Nhà cung cấp AI — Tính năng Marine Guide có thể gửi ngữ cảnh tập trung và lời nhắc của bạn đến nhà cung cấp AI đã cấu hình. Kết nối này là tùy chọn và chỉ hoạt động khi bạn sử dụng Marine Guide. Nhà cung cấp xử lý đầu vào của bạn theo chính sách quyền riêng tư của riêng họ.",
          "App Store của Apple — Phân phối ứng dụng, cập nhật, báo cáo sự cố tùy chọn (nếu bạn đã chọn tham gia qua Cài đặt iOS) và thanh toán mua hàng được xử lý bởi Apple theo chính sách quyền riêng tư của Apple.",
          "Deep Ocean không sử dụng SDK quảng cáo, SDK phân tích hoặc theo dõi mạng xã hội.",
        ],
      },
    },
    {
      id: "data-sharing",
      heading: { en: "Data Sharing & Sale", vi: "Chia sẻ & bán dữ liệu" },
      body: {
        en: [
          "Deep Ocean does not sell your personal data. We do not share your focus history, session records, or usage patterns with advertisers, data brokers, or any commercial third party.",
          "Information is shared with third-party services only as described in Section 4, and only to the extent necessary to provide the relevant feature you have chosen to use.",
        ],
        vi: [
          "Deep Ocean không bán dữ liệu cá nhân của bạn. Chúng tôi không chia sẻ lịch sử tập trung, hồ sơ phiên làm việc hoặc mô hình sử dụng của bạn với các nhà quảng cáo, nhà môi giới dữ liệu hoặc bất kỳ bên thương mại thứ ba nào.",
          "Thông tin chỉ được chia sẻ với các dịch vụ bên thứ ba như mô tả trong Mục 4, và chỉ ở mức độ cần thiết để cung cấp tính năng liên quan mà bạn đã chọn sử dụng.",
        ],
      },
    },
    {
      id: "your-rights",
      heading: { en: "Your Rights", vi: "Quyền của bạn" },
      body: {
        en: [
          "Because Deep Ocean stores your data locally on your device, you have direct control over it. You can delete all local app data by removing Deep Ocean from your device, or use any data management options available in the app's settings.",
          "For purchase-related data held by RevenueCat or Apple, email us at support@deepocean.io.vn with the subject line \"Data deletion request\" and we will guide you through the process.",
        ],
        vi: [
          "Vì Deep Ocean lưu trữ dữ liệu của bạn cục bộ trên thiết bị, bạn có quyền kiểm soát trực tiếp. Bạn có thể xóa tất cả dữ liệu ứng dụng cục bộ bằng cách xóa Deep Ocean khỏi thiết bị, hoặc sử dụng các tùy chọn quản lý dữ liệu có trong cài đặt của ứng dụng.",
          "Đối với dữ liệu liên quan đến giao dịch mua do RevenueCat hoặc Apple lưu giữ, hãy email cho chúng tôi tại support@deepocean.io.vn với dòng tiêu đề \"Data deletion request\" và chúng tôi sẽ hướng dẫn bạn qua quy trình.",
        ],
      },
    },
    {
      id: "childrens-privacy",
      heading: { en: "Children's Privacy", vi: "Quyền riêng tư trẻ em" },
      body: {
        en: [
          "Deep Ocean is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided information through the app, please contact us at support@deepocean.io.vn and we will take steps to remove it.",
        ],
        vi: [
          "Deep Ocean không hướng đến trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em. Nếu bạn cho rằng một trẻ em đã cung cấp thông tin qua ứng dụng, vui lòng liên hệ với chúng tôi tại support@deepocean.io.vn và chúng tôi sẽ thực hiện các bước để xóa thông tin đó.",
        ],
      },
    },
    {
      id: "policy-changes",
      heading: { en: "Changes to This Policy", vi: "Thay đổi chính sách" },
      body: {
        en: [
          "We may update this Privacy Policy from time to time. When we do, we will update the \"Last updated\" date at the top of this page. Continued use of Deep Ocean after a change constitutes your acceptance of the updated policy.",
        ],
        vi: [
          "Chúng tôi có thể cập nhật Chính sách Quyền riêng tư này theo thời gian. Khi làm như vậy, chúng tôi sẽ cập nhật ngày \"Cập nhật lần cuối\" ở đầu trang này. Tiếp tục sử dụng Deep Ocean sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận chính sách đã cập nhật.",
        ],
      },
    },
    {
      id: "contact",
      heading: { en: "Contact", vi: "Liên hệ" },
      body: {
        en: [
          "If you have questions about this Privacy Policy or your data, please contact us at: support@deepocean.io.vn",
        ],
        vi: [
          "Nếu bạn có câu hỏi về Chính sách Quyền riêng tư này hoặc dữ liệu của mình, vui lòng liên hệ với chúng tôi tại: support@deepocean.io.vn",
        ],
      },
    },
  ],
}

export const termsPage: LegalPage = {
  slug: "terms",
  title: { en: "Terms of Service", vi: "Điều khoản dịch vụ" },
  eyebrow: { en: "Terms", vi: "Điều khoản" },
  updatedAt: "June 30, 2026",
  sections: [
    {
      id: "acceptance",
      heading: { en: "Acceptance of Terms", vi: "Chấp nhận điều khoản" },
      body: {
        en: [
          "By downloading, installing, or using Deep Ocean, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.",
        ],
        vi: [
          "Bằng cách tải xuống, cài đặt hoặc sử dụng Deep Ocean, bạn đồng ý bị ràng buộc bởi Điều khoản Dịch vụ này. Nếu bạn không đồng ý với các điều khoản này, vui lòng không sử dụng ứng dụng.",
        ],
      },
    },
    {
      id: "service-description",
      heading: { en: "Description of Service", vi: "Mô tả dịch vụ" },
      body: {
        en: [
          "Deep Ocean is a focus timer application that represents focus sessions as underwater dive expeditions. The app tracks your time, depth progression, collected discoveries, XP, streaks, and personal achievements — all stored locally on your device.",
          "An optional AI-powered companion called Marine Guide may send context to a configured third-party AI provider to generate personalized focus guidance. Deep Ocean does not require you to create an account. The core experience is available without a network connection.",
        ],
        vi: [
          "Deep Ocean là ứng dụng hẹn giờ tập trung biểu diễn các phiên tập trung dưới dạng các chuyến lặn biển. Ứng dụng theo dõi thời gian, tiến độ độ sâu, khám phá đã thu thập, XP, chuỗi ngày và thành tích cá nhân — tất cả được lưu trữ cục bộ trên thiết bị của bạn.",
          "Một trợ lý tùy chọn hỗ trợ bởi AI có tên Marine Guide có thể gửi ngữ cảnh đến nhà cung cấp AI bên thứ ba đã cấu hình để tạo hướng dẫn tập trung cá nhân hóa. Deep Ocean không yêu cầu bạn tạo tài khoản. Trải nghiệm cốt lõi có sẵn mà không cần kết nối mạng.",
        ],
      },
    },
    {
      id: "intellectual-property",
      heading: { en: "Intellectual Property", vi: "Sở hữu trí tuệ" },
      body: {
        en: [
          "Deep Ocean, including its name, logo, artwork, screen designs, sounds, written content, and code, is owned by Deep Ocean and is protected by intellectual property law.",
          "You are granted a personal, non-exclusive, non-transferable license to use the app on your Apple devices for personal, non-commercial purposes. You may not reproduce, modify, distribute, reverse engineer, or create derivative works from any part of the app without prior written permission.",
        ],
        vi: [
          "Deep Ocean, bao gồm tên, logo, tác phẩm nghệ thuật, thiết kế màn hình, âm thanh, nội dung văn bản và mã nguồn, thuộc sở hữu của Deep Ocean và được bảo vệ bởi luật sở hữu trí tuệ.",
          "Bạn được cấp giấy phép cá nhân, không độc quyền, không thể chuyển nhượng để sử dụng ứng dụng trên các thiết bị Apple của mình cho mục đích cá nhân, phi thương mại. Bạn không được sao chép, sửa đổi, phân phối, đảo ngược kỹ thuật hoặc tạo tác phẩm phái sinh từ bất kỳ phần nào của ứng dụng mà không có sự cho phép bằng văn bản trước.",
        ],
      },
    },
    {
      id: "subscriptions",
      heading: {
        en: "Deep Ocean Pro & Subscriptions",
        vi: "Deep Ocean Pro & Đăng ký",
      },
      body: {
        en: [
          "Deep Ocean Pro is an optional premium subscription that unlocks additional themes, advanced AI insights, and full field journals. Subscriptions are sold through the Apple App Store and managed by RevenueCat. By subscribing, you agree to Apple's payment terms. Deep Ocean does not handle your payment information directly.",
          "To restore a previous purchase, use the Restore Purchases option in the app's Profile or Pro settings. Refunds for App Store purchases are subject to Apple's refund policy and must be requested through your Apple account purchase history. Deep Ocean cannot issue refunds directly.",
        ],
        vi: [
          "Deep Ocean Pro là đăng ký cao cấp tùy chọn mở khóa các chủ đề bổ sung, thông tin AI nâng cao và nhật ký thực địa đầy đủ. Đăng ký được bán qua App Store của Apple và quản lý bởi RevenueCat. Bằng cách đăng ký, bạn đồng ý với điều khoản thanh toán của Apple. Deep Ocean không xử lý thông tin thanh toán của bạn trực tiếp.",
          "Để khôi phục giao dịch mua trước đó, hãy sử dụng tùy chọn Khôi phục giao dịch mua trong cài đặt Hồ sơ hoặc Pro của ứng dụng. Hoàn tiền cho giao dịch mua trên App Store phải tuân theo chính sách hoàn tiền của Apple và phải được yêu cầu qua lịch sử mua hàng của tài khoản Apple. Deep Ocean không thể hoàn tiền trực tiếp.",
        ],
      },
    },
    {
      id: "acceptable-use",
      heading: { en: "Acceptable Use", vi: "Sử dụng hợp lệ" },
      body: {
        en: [
          "You agree to use Deep Ocean only for its intended purpose as a personal focus tool. You must not attempt to reverse engineer, decompile, or extract the source code of the app; use AI features to generate harmful, illegal, or abusive content; circumvent purchase verification or access Pro features without a valid subscription; or use the app in any way that violates applicable law or the rights of others.",
        ],
        vi: [
          "Bạn đồng ý sử dụng Deep Ocean chỉ cho mục đích dự định của nó như một công cụ tập trung cá nhân. Bạn không được: cố gắng đảo ngược kỹ thuật, biên dịch ngược hoặc trích xuất mã nguồn của ứng dụng; sử dụng các tính năng AI để tạo nội dung có hại, bất hợp pháp hoặc lạm dụng; vượt qua xác minh mua hàng hoặc truy cập các tính năng Pro mà không có đăng ký hợp lệ; hoặc sử dụng ứng dụng theo bất kỳ cách nào vi phạm pháp luật hiện hành hoặc quyền của người khác.",
        ],
      },
    },
    {
      id: "disclaimers",
      heading: {
        en: "Disclaimers",
        vi: "Tuyên bố miễn trừ trách nhiệm",
      },
      body: {
        en: [
          "Deep Ocean is provided \"as is\" without warranties of any kind, express or implied. We do not guarantee that the app will be error-free or uninterrupted, or that any particular feature will remain available at all times.",
          "The Marine Guide AI feature depends on third-party providers and may be unavailable due to outages, configuration changes, or service limitations. The offline fallback mode is provided as a best-effort substitute and may not match the quality of hosted AI responses.",
        ],
        vi: [
          "Deep Ocean được cung cấp \"nguyên trạng\" mà không có bảo đảm dưới bất kỳ hình thức nào, rõ ràng hay ngụ ý. Chúng tôi không đảm bảo rằng ứng dụng sẽ không có lỗi hoặc không bị gián đoạn, hoặc bất kỳ tính năng cụ thể nào sẽ luôn khả dụng.",
          "Tính năng AI Marine Guide phụ thuộc vào các nhà cung cấp bên thứ ba và có thể không khả dụng do sự cố, thay đổi cấu hình hoặc giới hạn dịch vụ. Chế độ dự phòng ngoại tuyến được cung cấp như một giải pháp thay thế theo khả năng tốt nhất và có thể không đạt chất lượng như phản hồi AI được lưu trữ.",
        ],
      },
    },
    {
      id: "liability",
      heading: {
        en: "Limitation of Liability",
        vi: "Giới hạn trách nhiệm pháp lý",
      },
      body: {
        en: [
          "To the maximum extent permitted by applicable law, Deep Ocean and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the app.",
          "In no event shall our total liability to you exceed the amount you paid for Deep Ocean Pro in the twelve months preceding the claim.",
        ],
        vi: [
          "Trong phạm vi tối đa được pháp luật hiện hành cho phép, Deep Ocean và những người tạo ra nó sẽ không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc trừng phạt nào phát sinh từ việc bạn sử dụng ứng dụng.",
          "Trong mọi trường hợp, tổng trách nhiệm của chúng tôi đối với bạn sẽ không vượt quá số tiền bạn đã trả cho Deep Ocean Pro trong mười hai tháng trước khi xảy ra khiếu nại.",
        ],
      },
    },
    {
      id: "terms-changes",
      heading: { en: "Changes to Terms", vi: "Thay đổi điều khoản" },
      body: {
        en: [
          "We may update these Terms of Service from time to time. When we do, we will update the \"Last updated\" date on this page. Continued use of Deep Ocean after a change constitutes your acceptance of the updated terms.",
        ],
        vi: [
          "Chúng tôi có thể cập nhật Điều khoản Dịch vụ này theo thời gian. Khi làm như vậy, chúng tôi sẽ cập nhật ngày \"Cập nhật lần cuối\" trên trang này. Tiếp tục sử dụng Deep Ocean sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản đã cập nhật.",
        ],
      },
    },
    {
      id: "contact",
      heading: { en: "Contact", vi: "Liên hệ" },
      body: {
        en: [
          "For questions about these Terms of Service, contact us at: support@deepocean.io.vn",
        ],
        vi: [
          "Để biết câu hỏi về Điều khoản Dịch vụ này, hãy liên hệ với chúng tôi tại: support@deepocean.io.vn",
        ],
      },
    },
  ],
}
