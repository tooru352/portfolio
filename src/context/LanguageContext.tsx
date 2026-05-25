/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { portfolioData } from '../data';
import { ProjectItem, WorkExpItem, EducationItem, ActivityCertificateItem } from '../types';

export type Language = 'en' | 'vi';

// Detailed translation assets for portfolioData
const portfolioDataVi = {
  s1: {
    title: "DOAN XUAN TOAN",
    subtitle: "THỰC TẬP SINH LẬP TRÌNH VIÊN GAME (GAME DEVELOPER INTERN)",
    body: "Sinh viên năm thứ ba ngành Hệ thống Thông tin Quản lý với nền tảng vững chắc về phát triển ứng dụng di động và web. Có kinh nghiệm làm việc với HTML, CSS, JavaScript, Flutter, Django và kiến thức cơ bản về REST API để xây dựng các ứng dụng phản hồi nhanh và thân thiện với người dùng. Đam mê phát triển trò chơi và hiện đang tự học Unity để theo đuổi sự nghiệp tương lai với tư cách là một Nhà phát triển trò chơi (Game Developer).",
    highlights: ["C# & Unity", "HTML, CSS & JS", "Flutter & Django", "GPA: 3.73 / 4.0", "TOEIC 595"]
  },

  s2: {
    title: "Về Tôi",
    subtitle: "Kết nối Kỹ nghệ Hệ thống, Thiết kế và Chiến lược Quản trị Phân tích",
    body: "Là sinh viên năm 3 ngành Hệ thống Thông tin Quản lý (MIS) tại Trường Đại học Kinh tế – Đại học Đà Nẵng, quá trình đào tạo của tôi là sự kết hợp mạnh mẽ giữa kiến trúc công nghệ và hệ thống vận hành doanh nghiệp. Tôi đam mê tính logic chuẩn mực của việc viết mã nguồn sạch mang tính mở rộng, đồng thời yêu thích tính thẩm mỹ cao của các thiết kế đồ họa responsive được chăm chút tỉ mỉ. Hành trình phát triển của tôi được thúc đẩy bởi khao khát không ngừng học hỏi các công nghệ mới, xây dựng trải nghiệm người dùng mượt mà và khám phá sự kết hợp giữa công nghệ, sự sáng tạo và phát triển trò chơi thông qua Unity.",
    highlights: ["Trường: Trường Đại học Kinh tế - Đại học Đà Nẵng", "Ngành: Hệ thống Thông tin Quản lý - MIS", "Tích lũy GPA: 3.73 / 4.0", "Kỹ năng mềm: Quan sát, Ra quyết định, Giao tiếp, Quản lý thời gian, Thuyết trình, Thích ứng"]
  },

  s3: {
    title: "Kỹ Năng",
    subtitle: "Hệ công nghệ & Các Khả năng Chuyên môn",
    body: "Tôi liên tục mài giũa bộ kỹ năng của mình trên các công nghệ hiện đại để phục vụ đắc lực từ phát triển lối chơi game mượt mà đến thiết kế đồ họa sinh động và xây dựng ứng dụng toàn diện.",
    highlights: ["Ngôn ngữ Lập trình", "Khung công nghệ", "Cơ sở dữ liệu", "Công cụ", "Khái niệm", "Công cụ Thiết kế", "Ngoại ngữ"]
  },

  s4: {
    title: "Kinh Nghiệm làm việc",
    subtitle: "Lịch sử nghề nghiệp & Vai trò hoạt động",
    body: "Sự kết hợp giữa tư duy lập trình và mỹ thuật sáng tạo trong môi trường thực tiễn đa quốc gia và các liên đoàn học thuật năng động.",
    highlights: ["Truyền thông & Thiết kế", "Phục vụ Nhà hàng khách sạn", "Làm việc nhóm tối ưu", "Tác phong chuyên nghiệp"]
  },

  s5: {
    title: "Showcase Dự Án",
    subtitle: "Dự án Công nghệ & Không gian Trực quan",
    body: "Tổng hợp các dự án web, di động và trò chơi điện tử được thiết kế và triển khai từ đầu nhằm thể hiện năng lực lập trình đa hệ sinh thái.",
    highlights: ["Unity Game phát triển", "Hệ thống Web với Django", "Ứng dụng Di động Flutter"]
  },

  s6: {
    title: "Hành trình Lập trình Game",
    subtitle: "Tự nghiên cứu Động lực học Chuyển động trong Unity",
    body: "Để theo đuổi định hướng Nhà phát triển Game Indie, tôi sử dụng C# và Unity lập trình từ con số không các giải pháp tối ưu chuyển động vật lý cơ bản, trạng thái nhảy, va chạm động học mượt mà.",
    highlights: ["Lập trình Hướng đối tượng C#", "Vật lý Động học 2D", "Thiết kế Ý tưởng Game", "Mục tiêu Indie Game Developer"]
  },

  s7: {
    title: "Học Vấn",
    subtitle: "Tri thức hệ thống Quản lý MIS",
    body: "Tiếp xúc toàn diện với mô hình dữ liệu quan hệ, phân tích hệ thống nghiệp vụ và kết cấu mã nguồn, tôi xây dựng được khả năng cộng tác linh hoạt giữa quy trình kinh doanh và hệ quả lập trình.",
    highlights: ["Hệ thống Thông tin Quản lý", "Trường Đại học Kinh tế - Đại học Đà Nẵng", "Danh mục môn học", "GPA xuất sắc"]
  },

  s8: {
    title: "Chứng Chỉ & Hoạt Động",
    subtitle: "Hành trang chứng chỉ & Kỹ năng ngôn ngữ",
    body: "Các năng lực ngôn ngữ quốc tế và vai trò kết nối dự án campus bảo chứng khả năng nghiên cứu tài liệu toàn cầu và làm việc nhóm hiệu quả.",
    highlights: ["Chứng chỉ TOEIC 595", "Chứng chỉ Nhật ngữ N5", "Tiếng Trung HSK 3", "Hoạt động Đoàn khoa"]
  },

  s9: {
    title: "Liên Hệ",
    subtitle: "Khởi tạo kết nối & Cơ hội cộng tác",
    body: "Tôi hiện đang tích cực tìm kiếm cơ hội thực tập sinh và các thử thách lập trình thú vị. Đừng ngần ngại gửi tin nhắn trao đổi hoặc đề xuất phỏng vấn!",
    highlights: ["doanxuantoan3524@gmail.com", "GitHub: tooru352", "LinkedIn: doanxuantoan3524", "Địa bàn Đà Nẵng", "0942482364"]
  }
};

const experienceListVi = [
  {
    id: "exp_media",
    role: "Thiết kế Truyền thông & Mỹ thuật",
    company: "Đoàn Thanh niên – Khoa Thống kê – Tin học",
    period: "2023 - Hiện tại",
    description: "Xây dựng và phát triển các ấn phẩm truyền thông sự kiện, áp phích đồ họa số hóa cho các hội thảo khoa học và ngày hội sinh viên.",
    achievements: [
      "Thiết kế tất cả các ấn phẩm truyền thông hình ảnh cho sự kiện khoa và các chương trình sinh viên.",
      "Tạo dựng các poster tuyên truyền, băng rôn, nội dung tương tác xã hội số và các video/reel tiếp thị ngắn.",
      "Sử dụng thành thạo vẽ kỹ thuật số chuyên sâu và các phần mềm chỉnh sửa đồ họa (Photoshop, Illustrator, After Effects, Premiere, CapCut).",
      "Hợp tác cùng đồng nghiệp trong nhóm để thiết kế giải pháp ý tưởng và tối ưu tiến độ thực thi."
    ],
    skillsGained: ["Ấn phẩm Đồ họa số", "Thiết kế Đồ họa minh họa", "Figma & Adobe CC Suite", "Tối ưu tiến độ thiết kế"]
  },
  {
    id: "exp_service",
    role: "Nhân viên Phụ vụ Nhà hàng (Bán thời gian)",
    company: "Four Points by Sheraton Danang",
    period: "2023 - Hiện tại",
    description: "Hỗ trợ điều hành dịch vụ ẩm thực đón tiếp chu đáo khách du lịch và quản trị nghiệp vụ dịch vụ chuẩn 5 sao.",
    achievements: [
      "Hỗ trợ hoàn thành các ca làm phục vụ trong môi trường khách sạn đẳng cấp quốc tế 5 sao.",
      "Thực thi tốt các tiêu chuẩn tiếp đón dịch vụ và giải quyết phản hồi thực tế của khách nước ngoài.",
      "Rèn luyện sâu sắc khả năng lắng nghe thấu cảm, xử lý khủng hoảng và tính kỷ luật vận hành nhóm."
    ],
    skillsGained: ["Chăm sóc khách hàng chuyên nghiệp", "Ngoại ngữ & Lắng nghe thấu cảm", "Kiểm soát áp lực dịch vụ", "Kỷ luật doanh nghiệp"]
  }
] as WorkExpItem[];

const projectListVi = [
  {
    id: "proj_unity",
    title: "Trò chơi Đi cảnh 2D",
    subtitle: "Unity & C# - Dự án Cá nhân",
    description: "Một tựa game đi cảnh 2D phong cách arcade cổ điển nhằm học hỏi kiến thức cơ bản về Unity, động học chuyển động mượt mà (nhảy, trượt tường) và thiết kế mỹ thuật nhất quán.",
    longDescription: "Thiết kế ý tưởng trò chơi hoàn toàn từ đầu, bao gồm cả thiết kế nhân vật và tài nguyên nền gốc để tạo phong cách thị giác hài hòa nhất thống. Lập trình các trạng thái chuyển động mượt mà cho nhân vật (đi bộ, chạy, nhảy cao với cơ chế nhảy kép và lực trượt tường vật lý phản hồi). Xây dựng hệ thống điểm lưu checkpoint để hồi sinh, quản lý lượng máu nhân vật, các nền tảng chuyển động động học và các tập lệnh C# tương tác với hệ thống Rigidbody2D và Collider2D.",
    technologies: ["Unity 2D", "Lập trình C#", "Vật lý Động học", "Rigidbody2D", "Collider2D"],
    mockupUrl: "/src/assets/images/unity_game_scene_1779545276227.png",
    githubUrl: "https://github.com/tooru352/GameLearning.git",
    period: "05/2026 - Hiện tại",
    category: "game"
  },
  {
    id: "proj_django",
    title: "Ứng dụng Mạng Xã hội Web",
    subtitle: "Django MVC - Dự án Môn học",
    description: "Cổng thông tin web tương tác phân quyền mạnh mẽ kế thừa kiến trúc Django MVC hỗ trợ chia sẻ hình ảnh phong phú, định danh tài khoản an toàn.",
    longDescription: "Đảm nhận thiết kế chính cho Phân hệ Quản lý Bài đăng (Post Management Module). Tạo lập giải pháp website cộng đồng mượt mà. Lập trình vòng đời tương tác nội dung (thao tác đăng tải, chỉnh sửa, xóa tin) liên kết ổ lưu trữ phân bổ thông minh. Hỗ trợ hiển thị bảng tin với cơ chế đăng tải nhiều hình ảnh đồng thời, quản lý cấu hình và kiểm soát phân quyền thành viên. Tận dụng SQLite DB cùng Django ORM để tối ưu hóa truy vấn bài đăng hiệu quả.",
    technologies: ["Django", "Python", "SQLite", "Django ORM", "REST API", "Kiến trúc MVC"],
    mockupUrl: "/src/assets/images/proj_django.png",
    githubUrl: "https://github.com/tooru352/NHOM2_LTW_49k14.1.git",
    period: "03/2026 - 05/2026",
    category: "web"
  },
  {
    id: "proj_flutter",
    title: "Mạng Xã hội Nội bộ Di động",
    subtitle: "Flutter & Node.js - Dự án Môn học",
    description: "Hệ thống kết nối luồng xã hội đa nền tảng kết hợp ứng dụng di động Flutter cùng dịch vụ dữ liệu MongoDB trên khung Node.js.",
    longDescription: "Phụ trách Phân hệ Quản lý Bài đăng. Lập trình giao diện di động Flutter hoạt động tối ưu với điều khiển đối tượng người đọc tinh tế, gắn thẻ bạn bè, tương tác cảm xúc, chia sẻ. Liên kết luồng tải dữ liệu có kích thước lên đến 50MB tích hợp giải pháp tối ưu mạng đám mây Cloudinary CDN của bên thứ ba. Thiết kế sơ đồ quan hệ với Mongoose ODM trên nền cơ sở dữ liệu MongoDB Atlas, tối ưu tính năng xóa mềm (soft delete), phân trang phản hồi mượt.",
    technologies: ["Flutter", "Dart", "Node.js", "MongoDB", "Mongoose ODM", "Cloudinary CDN"],
    mockupUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    githubUrl: "https://github.com/tooru352/Mobile_49K14.1.git",
    period: "03/2026 - 05/2026",
    category: "mobile"
  },
  {
    id: "proj_design_1",
    title: "Welcome to KetinMemovies's World",
    subtitle: "Dự án Truyền thông Sáng tạo Cá nhân",
    description: "Dự án truyền thông sáng tạo cá nhân tập trung vào nghệ thuật kể chuyện, thiết kế hình ảnh và phát triển nhân vật, kết hợp nhiếp ảnh và đồ họa số nhằm mang đến trải nghiệm nghệ thuật đậm chất điện ảnh.",
    longDescription: "Xây dựng cốt truyện và ý tưởng sáng tạo nghệ thuật. Viết kịch bản kể chuyện và biên soạn nội dung dự án. Thiết kế tạo hình nhân vật và định hướng mỹ thuật. Chỉ đạo nhiếp ảnh và bố cục khuôn hình. Chỉnh sửa hậu kỳ hình ảnh và thiết kế tài nguyên đồ họa hoàn chỉnh.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Lightroom", "Bảng vẽ Kỹ thuật số", "Thiết kế Nhân vật", "Nghệ thuật Kể chuyện", "Sáng tạo Nội dung"],
    mockupUrl: "/src/assets/images/proj_design_1.jpg",
    liveUrl: "https://www.facebook.com/share/p/18dVLQS7kS/",
    period: "25/10/2024 – 28/10/2024",
    category: "design"
  },
  {
    id: "proj_design_2",
    title: "Tớ mệt rồi...Nhưng tớ vẫn muốn cố gắng, còn bạn thì sao?",
    subtitle: "Dự án Nhiếp ảnh & Kể chuyện Cảm xúc",
    description: "Một dự án sáng tạo cá nhân tập trung vào câu chuyện truyền động lực và cảm xúc thông qua nhiếp ảnh nghệ thuật dưới góc nhìn điện ảnh cùng thiết kế đồ họa sâu lắng.",
    longDescription: "Viết kịch bản dẫn dắt câu chuyện chân thực và trực tiếp định hướng nội dung dự án. Phát triển ý tưởng sáng tạo và bộ ngôn ngữ hình ảnh. Tổ chức thiết lập bố cục không gian, góc chụp và tạo hình mẫu. Chỉnh sửa hiệu ứng màu sắc ảnh và thiết kế đồ thị chữ nghệ thuật.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Lightroom", "Bảng vẽ Kỹ thuật số", "Nhiếp ảnh & Hậu kỳ", "Nghệ thuật Kể chuyện", "Sáng tạo Nội dung"],
    mockupUrl: "/src/assets/images/proj_design_2.png",
    liveUrl: "https://www.facebook.com/share/p/18YYauvYaK/",
    period: "20/06/2025 – 23/06/2025",
    category: "design"
  },
  {
    id: "proj_design_3",
    title: "Một đôi mắt – Hai cách nhìn",
    subtitle: "Dự án Truyền thông số & Góc nhìn Thị giác",
    description: "Dự án truyền thông sáng tạo khám phá các khía cạnh đa chiều của trải nghiệm sống thông qua nhiếp ảnh điện ảnh, minh họa đồ họa số và kịch bản cốt truyện giàu chiều sâu.",
    longDescription: "Phát triển tuyến cốt truyện hoàn chỉnh và ý tưởng nghệ thuật cốt lõi. Biên soạn kịch bản nội dung độc thoại nội tâm. Thiết kế biểu trưng đồ họa và phong cách mỹ thuật tổng thể. Định hướng góc chụp sáng tạo tận dụng tương phản ánh sáng. Thiết kế tài nguyên minh họa số và biên tập hình ảnh hậu kỳ.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Lightroom", "Bảng vẽ Kỹ thuật số", "Thiết kế Nhân vật", "Nghệ thuật Kể chuyện", "Sáng tạo Nội dung"],
    mockupUrl: "/src/assets/images/proj_design_3.png",
    liveUrl: "https://www.facebook.com/share/p/1DGFztu8MW/",
    period: "16/10/2025 – 19/10/2025",
    category: "design"
  }
] as ProjectItem[];

const educationInfoVi = {
  degree: "Hệ thống Thông tin Quản lý - MIS",
  school: "Trường Đại học Kinh tế – Đại học Đà Nẵng",
  period: "2023 - 2027",
  gpa: "3.73 / 4.0",
  subjects: [
    "Hệ quản trị Cơ sở Dữ liệu (DBMS)",
    "Phân tích & Thiết kế Hệ thống (SAD)",
    "Lập trình Hướng đối tượng (C# / Python)",
    "Phát triển Ứng dụng Web (HTML/CSS/JS/React)",
    "Lập trình Di động (Flutter & Dart)",
    "Kiến trúc REST API & Cấu trúc Dữ liệu"
  ],
  description: "Sinh viên năm thứ ba đại học định hướng liên kết cấu trúc dữ liệu và tối ưu hóa quy trình doanh nghiệp. Thực hành sâu rộng về lập trình ứng dụng C#, Python, di động Flutter, cơ sở dữ liệu SQL và kiến trúc web hiện đại."
} as EducationItem;

const activitiesAndLanguagesVi = [
  {
    id: "cert_toeic",
    title: "Chứng chỉ TOEIC 595",
    issuerOrCategory: "IIG VIỆT NAM",
    date: "20/07/2024",
    description: "Xác thực trình độ nghe hiểu và đọc hiểu tiếng Anh học thuật tiêu chuẩn quốc tế đã đạt.",
    type: "language"
  },
  {
    id: "lang_jp",
    title: "Tiếng Nhật Sơ cấp N5",
    issuerOrCategory: "Trình độ Cơ bản",
    date: "Đang học tập",
    description: "Nhận diện trôi chảy bảng chữ mềm, chữ cứng tiếng Nhật, đồng thời xử lý tốt các tình huống hội thoại giao tiếp thường ngày cơ bản.",
    type: "language"
  },
  {
    id: "lang_cn",
    title: "Tiếng Trung HSK 3",
    issuerOrCategory: "Khảo thí Hanban",
    date: "Đã đạt",
    description: "Tích lũy đầy đủ vốn từ vựng HSK 3, thành thạo giao tiếp trung cấp, phân tích tài liệu và cấu trúc sơ cấp.",
    type: "language"
  }
] as ActivityCertificateItem[];


// Static dictionary translations for UI strings
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.contact": "Contact",

    "btn.hire": "Hire Me",
    "btn.connect": "Let's Connect",
    "btn.launch": "Launch Projects",
    "btn.resume": "Download Resume File",
    "btn.submit": "Establish Connection",
    "btn.sending": "Transmitting...",
    "btn.sendAnother": "Send another message",
    "btn.discuss": "Discuss Project",
    "btn.close": "Close Node Window",

    "title.skills": "Skills",
    "title.experience": "Work Experience",
    "title.projects": "Projects Space",
    "title.physics": "2D Physics Simulator Laboratory",
    "title.education": "Education Node",
    "title.certificates": "Certificates & Activities Network",
    "title.contact": "Initialize Connection",

    "physics.desc": "Interact with Đoàn Xuân Toàn's customized 2D physics sandbox engine. Walk, double jump, dash, and adjust the environment variables dynamically.",
    "physics.telemetry": "LIVE TELEMETRY",
    "physics.grounded": "Grounded",
    "physics.jumps": "Jumps",
    "physics.kinematic": "Kinematic Controller",
    "physics.kinematicDesc": "Directly manipulate the active velocity register (vX, vY) and observe the physics solver behavior in real-time.",
    "physics.jumpBtn": "JUMP [vY]",
    "physics.dashL": "DASH LEFT",
    "physics.dashR": "DASH RIGHT",
    "physics.fuel": "ACTIVE DASH FUEL",
    "physics.gravity": "GRAVITY VALUE",
    "physics.system": "SYSTEM",
    "physics.running": "RUNNING",
    "physics.halted": "HALTED",

    "contact.desc": "Get in touch immediately through existing nodes, digital credentials, or direct communication lines.",
    "contact.dir": "Direct Directory",
    "contact.social": "SOCIAL EXTERNAL NODES",
    "contact.success": "Message Received!",
    "contact.successDesc": "Thank you so much. Your message has been routed to Đoàn Xuân Toàn's inbox. He will reply shortly at your provided mail address.",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.subject": "Subject",
    "contact.message": "Message Body",

    "project.narrative": "Project Narrative",
    "project.architecture": "Architecture Overview",
    "project.architectureDesc": "Formulated as an enterprise-grade academic case, this system aligns secure relational structures with fluid layout engines. It integrates error boundaries and fully isolated storage nodes.",
    "project.stack": "Technology Stack",
    "project.checked": "Deliverable Checked",
    "project.checkedDesc": "Completed, tested, and audited for zero memory leaks or unhandled responsive state exceptions.",

    "edu.highlights": "KEY COURSE SYLLABUS NODES",
    "gpa": "CURRENT ACCUMULATED GPA",

    "notification.title": "SYSTEM: TRANSMITTING RESUME PDF",
    "notification.desc": "Đoàn Xuân Toàn's academic CV transmission was established. Check your local downloads folder.",

    "all": "All",
    "mobile": "Mobile",
    "web": "Web",
    "game": "Game",
    "design": "Design",

    "brand": "DOAN XUAN TOAN"
  },
  vi: {
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.skills": "Kỹ năng",
    "nav.experience": "Kinh nghiệm",
    "nav.projects": "Dự án",
    "nav.education": "Giáo dục",
    "nav.contact": "Liên hệ",

    "btn.hire": "Tuyển dụng",
    "btn.connect": "Kết nối ngay",
    "btn.launch": "Xem các dự án",
    "btn.resume": "Thủ bản Sơ yếu (CV)",
    "btn.submit": "Thiết lập Kết nối",
    "btn.sending": "Đang truyền tải...",
    "btn.sendAnother": "Gửi tin nhắn khác",
    "btn.discuss": "Thảo luận Dự án",
    "btn.close": "Đóng cửa sổ",

    "title.skills": "Kỹ năng",
    "title.experience": "Kinh nghiệm làm việc",
    "title.projects": "Không gian Dự án",
    "title.physics": "Phòng thực nghiệm Vật lý 2D",
    "title.education": "Nút Giáo dục",
    "title.certificates": "Hệ thống Hành trang & Chứng chỉ",
    "title.contact": "Khởi tạo Kết nối",

    "physics.desc": "Trải nghiệm động học 2D tùy biến được xây dựng riêng bởi Đoàn Xuân Toàn. Bạn có thể di chuyển, nhảy kép, lướt nhanh và tinh chỉnh các biến số trọng lực môi trường.",
    "physics.telemetry": "SỐ LIỆU LIVE TELEMETRY",
    "physics.grounded": "Tiếp đất",
    "physics.jumps": "Số lần nhảy",
    "physics.kinematic": "Bộ điều khiển Động học",
    "physics.kinematicDesc": "Tác động trực tiếp lên hệ phân bổ vận tốc chuyển động (vX, vY) và quan sát phản hồi thuật toán vật lý trong thời gian thực.",
    "physics.jumpBtn": "NHẢY LÊN [vY]",
    "physics.dashL": "LƯỚT TRÁI",
    "physics.dashR": "LƯỚT PHẢI",
    "physics.fuel": "CỘT NHIÊN LIỆU PHẢN PHẢN",
    "physics.gravity": "GIÁ TRỊ TRỌNG LỰC G",
    "physics.system": "HỆ THỐNG",
    "physics.running": "ĐANG CHẠY",
    "physics.halted": "TẠM DỪNG",

    "contact.desc": "Liên hệ tức thời qua các hệ thống thư tín, thông tin kỹ thuật số hoặc trao đổi trực tiếp.",
    "contact.dir": "Danh bạ Trực tiếp",
    "contact.social": "CÁC NÚT LIÊN KẾT XÃ HỘI",
    "contact.success": "Tin nhắn đã gửi!",
    "contact.successDesc": "Cảm ơn bạn rất nhiều. Thư điện tử của bạn đã được chuyển tới hòm thư cá nhân của Đoàn Xuân Toàn. Anh ấy sẽ phản hồi sớm nhất qua hòm thư bạn cung cấp.",
    "contact.name": "Tên của bạn",
    "contact.email": "Hòm thư Email",
    "contact.subject": "Tiêu đề",
    "contact.message": "Nội dung thư",

    "project.narrative": "Tóm tắt Dự án",
    "project.architecture": "Tổng quan Kiến trúc",
    "project.architectureDesc": "Được xây dựng như một trường hợp nghiên cứu học thuật chuẩn nghiệp vụ, hệ thống kết hợp hoàn quyện cấu trúc quan hệ vững chắc với giao diện hiển thị linh động. Xử lý tốt các điểm biên lỗi.",
    "project.stack": "Công nghệ tích hợp",
    "project.checked": "Đầu ra đã kiểm thử",
    "project.checkedDesc": "Đã hoàn thành, kiểm thử tỉ mỉ và rà soát lỗi rò rỉ bộ nhớ hoặc các ngoại lệ hiển thị giao diện.",

    "edu.highlights": "DANH MỤC MÔN HỌC CHUYÊN NGÀNH",
    "gpa": "ĐIỂM TRUNG BÌNH TÍCH LŨY GPA",

    "notification.title": "HỆ THỐNG: ĐANG KHỞI TẠO TẢI CV PDF",
    "notification.desc": "Yêu cầu truyền tải Sơ yếu lý lịch của Đoàn Xuân Toàn đã thiết lập thành công. Vui lòng kiểm tra thư mục tải xuống của bạn.",

    "all": "Tất cả",
    "mobile": "Ứng dụng Di động",
    "web": "Trang Web",
    "game": "Trò chơi Game",
    "design": "Thiết kế Đồ họa",

    "brand": "ĐOÀN XUÂN TOÀN"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  data: typeof portfolioData;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to read language from localStorage on mount
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'en' || saved === 'vi') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  // Build the live portfolioData object merged with localized strings if needed
  const [currentData, setCurrentData] = useState<typeof portfolioData>(portfolioData);

  useEffect(() => {
    if (language === 'vi') {
      setCurrentData({
        ...portfolioData,
        s1: portfolioDataVi.s1,
        s2: portfolioDataVi.s2,
        s3: portfolioDataVi.s3,
        s4: portfolioDataVi.s4,
        s5: portfolioDataVi.s5,
        s6: portfolioDataVi.s6,
        s7: portfolioDataVi.s7,
        s8: portfolioDataVi.s8,
        s9: portfolioDataVi.s9,
        projectList: projectListVi,
        experienceList: experienceListVi,
        educationInfo: educationInfoVi,
        activitiesAndLanguages: activitiesAndLanguagesVi
      });
    } else {
      // Restore standard English portfolio data
      setCurrentData(portfolioData);
    }
  }, [language]);

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, data: currentData }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
