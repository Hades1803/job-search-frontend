import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const dropdownData = [
  { 
    title: "Job Title", 
    icon: IconSearch, 
    options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] 
  },
  { 
    title: "Location", 
    icon: IconMapPin, 
    options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto','Viet Nam'] 
  },
  { 
    title: "Experience", 
    icon: IconBriefcase, 
    options: ['Entry Level', 'Intermediate', 'Expert'] 
  },
  { 
    title: "Job Type", 
    icon: IconRecharging, 
    options: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'] 
  }
];

const jobList = [
    {
      jobTitle: "Frontend Developer",
      company: "TechNova",
      applicants: 45,
      experience: "1-3 years",
      jobType: "Full-time",
      location: "Ho Chi Minh City",
      package: "12000 - 18000",
      postedDaysAgo: 2,
      description: "Develop and maintain responsive web applications using React and TypeScript."
    },
    {
      jobTitle: "Backend Engineer",
      company: "DataWorks",
      applicants: 60,
      experience: "2-5 years",
      jobType: "Remote",
      location: "Hanoi",
      package: "15000 - 22000",
      postedDaysAgo: 4,
      description: "Build scalable RESTful APIs and manage database operations using Node.js and MongoDB."
    },
    {
      jobTitle: "DevOps Engineer",
      company: "Cloudify",
      applicants: 30,
      experience: "3+ years",
      jobType: "Full-time",
      location: "Da Nang",
      package: "20000 - 28000",
      postedDaysAgo: 1,
      description: "Manage CI/CD pipelines and cloud infrastructure with Docker, Kubernetes, and AWS."
    },
    {
      jobTitle: "UI/UX Designer",
      company: "CreativeMind",
      applicants: 25,
      experience: "1-2 years",
      jobType: "Part-time",
      location: "Remote",
      package: "8000 - 12000",
      postedDaysAgo: 5,
      description: "Design user interfaces and enhance user experience for mobile and web applications."
    },
    {
      jobTitle: "Mobile App Developer",
      company: "Appify",
      applicants: 50,
      experience: "2-4 years",
      jobType: "Full-time",
      location: "Ho Chi Minh City",
      package: "14000 - 20000",
      postedDaysAgo: 3,
      description: "Develop cross-platform mobile apps using Flutter or React Native."
    },
    {
      jobTitle: "QA Engineer",
      company: "TestPro",
      applicants: 18,
      experience: "1-3 years",
      jobType: "Remote",
      location: "Can Tho",
      package: "10000 - 15000",
      postedDaysAgo: 6,
      description: "Design and execute test cases, ensure product quality and performance."
    },
    {
      jobTitle: "System Administrator",
      company: "SecureNet",
      applicants: 33,
      experience: "3-5 years",
      jobType: "Full-time",
      location: "Hanoi",
      package: "17000 - 25000",
      postedDaysAgo: 2,
      description: "Maintain and monitor internal servers, firewalls, and system performance."
    },
    {
      jobTitle: "AI/ML Engineer",
      company: "DeepTech",
      applicants: 22,
      experience: "2-4 years",
      jobType: "Full-time",
      location: "Da Nang",
      package: "22000 - 30000",
      postedDaysAgo: 1,
      description: "Build machine learning models and deploy them into production."
    },
    {
      jobTitle: "Technical Writer",
      company: "DocuMentors",
      applicants: 10,
      experience: "1+ years",
      jobType: "Part-time",
      location: "Remote",
      package: "7000 - 10000",
      postedDaysAgo: 7,
      description: "Write technical documentation and user manuals for software products."
    },
    {
      jobTitle: "Product Manager",
      company: "VisionSoft",
      applicants: 38,
      experience: "4-6 years",
      jobType: "Full-time",
      location: "Ho Chi Minh City",
      package: "25000 - 35000",
      postedDaysAgo: 3,
      description: "Lead product development cycles and collaborate with cross-functional teams."
    }
  ];
  
export {dropdownData,jobList}