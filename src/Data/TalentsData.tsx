import { IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const searchFields = [
    { title: "Job Title", icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] },
    { title: "Location", icon: IconMapPin, options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'] },
    { title: "Skills", icon: IconRecharging, options: ["HTML", "CSS", "JavaScript", "React", "Angular", "Node.js", "Python", "Java", "Ruby", "PHP", "SQL", "MongoDB", "PostgreSQL", "Git", "API Development", "Testing and Debugging", "Agile Methodologies", "DevOps", "AWS", "Azure", "Google Cloud"] },
]
const talents = [
    {
        name: "Nguyễn Văn An",
        role: {
            company: "FPT Software",
            position: "Frontend Developer"
        },
        topSkills: ["React", "TypeScript", "Tailwind CSS","Express JS"],
        about: "Một lập trình viên giao diện người dùng với 3 năm kinh nghiệm, chuyên về phát triển ứng dụng web hiện đại.",
        expectedCtc: "2000 - 3000",
        location: "Hà Nội",
        image: "avatar"
        },
    {
        name: "Trần Thị Bích",
        role: {
            company: "VNG Corporation",
            position: "Backend Developer"
        },
        topSkills: ["Node.js", "NestJS", "MongoDB"],
        about: "Đam mê xây dựng hệ thống backend hiệu quả, có kinh nghiệm triển khai RESTful APIs và làm việc với cơ sở dữ liệu NoSQL.",
        expectedCtc: "2000 - 3000",
        location: "TP. Hồ Chí Minh",
        image: "avatar"
    },
    {
        name: "Lê Hoàng Minh",
        role: {
            company: "Shopee Vietnam",
            position: "DevOps Engineer"
        },
        topSkills: ["AWS", "Docker", "CI/CD"],
        about: "Chuyên gia về DevOps với khả năng triển khai hạ tầng cloud, tự động hóa quy trình build-deploy và giám sát hệ thống.",
        expectedCtc: "3000 - 3000",
        location: "TP. Hồ Chí Minh",
        image: "avatar"
    },
    {
        name: "Phạm Ngọc Quỳnh",
        role: {
            company: "Tiki Tech",
            position: "Fullstack Developer"
        },
        topSkills: ["Vue.js", "Laravel", "MySQL"],
        about: "Lập trình viên fullstack năng động, yêu thích học hỏi công nghệ mới và có khả năng làm việc với cả frontend và backend.",
        expectedCtc: "2000 - 3000",
        location: "Hà Nội",
        image: "avatar"
    },
    {
        name: "Đỗ Thành Long",
        role: {
            company: "Viettel Solutions",
            position: "AI Engineer"
        },
        topSkills: ["Python", "TensorFlow", "Computer Vision"],
        about: "Kỹ sư AI chuyên xây dựng các mô hình học sâu trong nhận dạng hình ảnh và xử lý ngôn ngữ tự nhiên.",
        expectedCtc: "3000 - 3000",
        location: "Đà Nẵng",
        image: "avatar"
    }
];


const profile = {
    name: "Nguyễn Văn An",
    role: "Senior Devops Engineer",
    company: "VNG Coporation",
    location: "Hà Nội, Việt Nam",
    about: "Tôi là một lập trình viên frontend với hơn 4 năm kinh nghiệm trong việc xây dựng các ứng dụng web hiện đại. Tôi đam mê tạo ra các trải nghiệm người dùng trực quan, hiệu năng cao, và dễ sử dụng. Kỹ năng chính của tôi là làm việc với React, TypeScript và hệ thống thiết kế UI linh hoạt với Tailwind CSS.",
    skills: [
      "React.js", 
      "TypeScript", 
      "Next.js", 
      "Tailwind CSS", 
      "Redux Toolkit", 
      "Figma to Code", 
      "RESTful API", 
      "Jest", 
      "Storybook", 
      "CI/CD", 
      "Agile/Scrum"
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "FPT Software",
        location: "Hà Nội, Việt Nam",
        startDate: "03/2022",
        endDate: "Hiện tại",
        description: `- Phát triển và duy trì hệ thống quản lý khách hàng (CRM) cho đối tác đến từ Nhật Bản sử dụng React, Redux Toolkit và Tailwind CSS.\n- Tham gia thiết kế và tối ưu UI/UX cho hơn 10 màn hình chính, đảm bảo performance và accessibility.\n- Tích hợp hệ thống CI/CD với GitLab và thực hiện test tự động bằng Jest và Testing Library.\n- Dẫn dắt nhóm 4 thành viên frontend và phối hợp chặt chẽ với backend team để triển khai API hiệu quả.`
      },
      {
        title: "Frontend Developer",
        company: "Công ty TNHH TechX",
        location: "Hồ Chí Minh, Việt Nam",
        startDate: "06/2020",
        endDate: "02/2022",
        description: `- Tham gia dự án thương mại điện tử đa nền tảng, xây dựng giao diện với Next.js và Styled Components.\n- Phối hợp với team thiết kế để chuyển giao bản vẽ Figma thành UI pixel-perfect.\n- Viết unit test cho các component UI và đóng góp xây dựng thư viện component nội bộ bằng Storybook.`
      },
      {
        title: "Intern Frontend Developer",
        company: "TMA Solutions",
        location: "Hồ Chí Minh, Việt Nam",
        startDate: "01/2020",
        endDate: "05/2020",
        description: `- Học hỏi và thực hành phát triển website với HTML, CSS, JavaScript thuần và ReactJS cơ bản.\n- Tham gia team nhỏ phát triển dashboard nội bộ để theo dõi tiến độ công việc.\n- Được mentor hướng dẫn về Git workflow và quy trình làm việc theo Agile.`
      }
    ],
    certifications: [
      {
        title: "Meta Front-End Developer Professional Certificate",
        issuer: "Coursera / Meta",
        issueDate: "07/2023",
        certificateId : "ABCD1234"
      },
      {
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        issueDate: "03/2022",
        certificateId : "QWER7896"
      }
    ]
  };
  
  

export { searchFields, talents,profile }