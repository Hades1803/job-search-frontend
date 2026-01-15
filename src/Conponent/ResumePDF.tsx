import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// ĐƯỜNG DẪN ĐÚNG: public/fonts/Nunito-Medium.ttf (có "s")
const FONT_PATH = '/fonts/Nunito-Medium.ttf';

// CHỈ ĐĂNG KÝ 1 LẦN
Font.register({
  family: 'Nunito',
  src: FONT_PATH, // Đường dẫn đúng
});

// HOẶC nếu bạn có nhiều font weights:
// Font.register({
//   family: 'Nunito',
//   fonts: [
//     {
//       src: '/fonts/Nunito-Regular.ttf',
//       fontWeight: 'normal',
//     },
//     {
//       src: '/fonts/Nunito-Medium.ttf',
//       fontWeight: 500, // Medium là 500
//     },
//     {
//       src: '/fonts/Nunito-Bold.ttf',
//       fontWeight: 'bold',
//     },
//   ],
// });

// Styles chung
const commonStyles = StyleSheet.create({
  page: {
    fontFamily: 'Nunito',
    fontSize: 11,
    padding: 30,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e40af',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  itemSubtitle: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: 'justify',
    marginBottom: 8,
  },
});

interface ResumeContent {
  personal?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    position: string;
  };
  careerObjective?: string;
  education?: Array<{
    school: string;
    degree: string;
    from: string;
    to: string;
  }>;
  experience?: Array<{
    company: string;
    role: string;
    from: string;
    to: string;
    description: string;
  }>;
  skills?: string[];
  projects?: Array<{
    name: string;
    description: string;
  }>;
}

// ========== TEMPLATE BASIC ==========
const basicStyles = StyleSheet.create({
  ...commonStyles,
  page: {
    ...commonStyles.page,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  position: {
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 15,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  contactItem: {
    fontSize: 10,
  },
  skillTag: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 500,
    marginRight: 5,
    marginBottom: 5,
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '48%',
  },
  rightColumn: {
    width: '48%',
  },
});

const TemplateBasicPDF = ({ data }: { data: ResumeContent }) => (
  <Document>
    <Page size="A4" style={basicStyles.page}>
      <View style={basicStyles.header}>
        <Text style={basicStyles.name}>
          {data.personal?.fullName || 'Họ và tên'}
        </Text>
        <Text style={basicStyles.position}>
          {data.personal?.position || 'Vị trí ứng tuyển'}
        </Text>
        
        <View style={basicStyles.contactRow}>
          <Text style={basicStyles.contactItem}>
            Email: {data.personal?.email || 'email@example.com'}
          </Text>
          <Text style={basicStyles.contactItem}>
            ĐT: {data.personal?.phone || '0123456789'}
          </Text>
          <Text style={basicStyles.contactItem}>
            Địa chỉ: {data.personal?.address || 'Địa chỉ'}
          </Text>
        </View>
      </View>

      {data.careerObjective && (
        <View style={{ marginBottom: 20 }}>
          <Text style={commonStyles.sectionTitle}>Mục tiêu nghề nghiệp</Text>
          <Text style={commonStyles.itemDescription}>{data.careerObjective}</Text>
        </View>
      )}

      <View style={basicStyles.twoColumn}>
        <View style={basicStyles.leftColumn}>
          {data.skills && data.skills.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={commonStyles.sectionTitle}>Kỹ năng</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.skills.map((skill: string, index: number) => (
                  <Text key={index} style={basicStyles.skillTag}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {data.projects && data.projects.length > 0 && (
            <View>
              <Text style={commonStyles.sectionTitle}>Dự án</Text>
              {data.projects.map((project: any, index: number) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={commonStyles.itemTitle}>{project.name}</Text>
                  <Text style={commonStyles.itemDescription}>
                    {project.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={basicStyles.rightColumn}>
          {data.education && data.education.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={commonStyles.sectionTitle}>Học vấn</Text>
              {data.education.map((edu: any, index: number) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={commonStyles.itemTitle}>{edu.school}</Text>
                  <Text style={commonStyles.itemSubtitle}>
                    {edu.degree} | {edu.from} - {edu.to}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {data.experience && data.experience.length > 0 && (
            <View>
              <Text style={commonStyles.sectionTitle}>Kinh nghiệm làm việc</Text>
              {data.experience.map((exp: any, index: number) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={commonStyles.itemTitle}>{exp.company}</Text>
                  <Text style={commonStyles.itemSubtitle}>
                    {exp.role} | {exp.from} - {exp.to}
                  </Text>
                  <Text style={commonStyles.itemDescription}>
                    {exp.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

// ========== TEMPLATE MODERN ==========
const modernStyles = StyleSheet.create({
  ...commonStyles,
  page: {
    ...commonStyles.page,
    flexDirection: 'row',
    padding: 0,
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: 20,
    minHeight: '100%',
  },
  mainContent: {
    width: '70%',
    padding: 30,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
    paddingBottom: 3,
  },
  sidebarText: {
    fontSize: 10,
    marginBottom: 5,
  },
  skillBarContainer: {
    marginBottom: 10,
  },
  skillName: {
    fontSize: 10,
    marginBottom: 3,
  },
  skillBar: {
    height: 4,
    backgroundColor: '#34495e',
    borderRadius: 2,
  },
  skillBarFill: {
    height: 4,
    backgroundColor: '#3498db',
    borderRadius: 2,
  },
  sectionTitleModern: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dateBadge: {
    backgroundColor: '#e8f4fc',
    color: '#3498db',
    padding: '2 8',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 500,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  educationDates: {
    width: 100,
    marginTop: 2,
  },
  educationContent: {
    flex: 1,
    marginLeft: 15,
  },
});

const TemplateModernPDF = ({ data }: { data: ResumeContent }) => (
  <Document>
    <Page size="A4" style={modernStyles.page}>
      <View style={modernStyles.sidebar}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={modernStyles.avatarCircle}>
            <Text style={modernStyles.avatarText}>
              {data.personal?.fullName?.charAt(0) || 'CV'}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
            {data.personal?.fullName || 'Họ và tên'}
          </Text>
          <Text style={{ fontSize: 11, color: '#bdc3c7' }}>
            {data.personal?.position || 'Vị trí ứng tuyển'}
          </Text>
        </View>

        <Text style={modernStyles.sidebarTitle}>Thông tin liên hệ</Text>
        <View style={{ marginBottom: 15 }}>
          <Text style={modernStyles.sidebarText}>
            Email: {data.personal?.email || 'email@example.com'}
          </Text>
          <Text style={modernStyles.sidebarText}>
            ĐT: {data.personal?.phone || '0123456789'}
          </Text>
          <Text style={modernStyles.sidebarText}>
            Địa chỉ: {data.personal?.address || 'Địa chỉ'}
          </Text>
        </View>

        {data.skills && data.skills.length > 0 && (
          <>
            <Text style={modernStyles.sidebarTitle}>Kỹ năng</Text>
            <View style={{ marginBottom: 15 }}>
              {data.skills.map((skill: string, index: number) => (
                <View key={index} style={modernStyles.skillBarContainer}>
                  <Text style={modernStyles.skillName}>{skill}</Text>
                  <View style={modernStyles.skillBar}>
                    <View style={[modernStyles.skillBarFill, { width: '80%' }]} />
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      <View style={modernStyles.mainContent}>
        {data.careerObjective && (
          <View style={{ marginBottom: 25 }}>
            <Text style={modernStyles.sectionTitleModern}>
              Mục tiêu nghề nghiệp
            </Text>
            <Text style={commonStyles.itemDescription}>
              {data.careerObjective}
            </Text>
          </View>
        )}

        {data.experience && data.experience.length > 0 && (
          <View style={{ marginBottom: 25 }}>
            <Text style={modernStyles.sectionTitleModern}>
              Kinh nghiệm làm việc
            </Text>
            {data.experience.map((exp: any, index: number) => (
              <View key={index} style={modernStyles.experienceItem}>
                <View style={modernStyles.experienceHeader}>
                  <Text style={commonStyles.itemTitle}>{exp.company}</Text>
                  <Text style={modernStyles.dateBadge}>
                    {exp.from} - {exp.to}
                  </Text>
                </View>
                <Text style={commonStyles.itemSubtitle}>{exp.role}</Text>
                <Text style={commonStyles.itemDescription}>
                  {exp.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={{ marginBottom: 25 }}>
            <Text style={modernStyles.sectionTitleModern}>Học vấn</Text>
            {data.education.map((edu: any, index: number) => (
              <View key={index} style={modernStyles.educationItem}>
                <View style={modernStyles.educationDates}>
                  <Text style={{ fontSize: 10, color: '#3498db', fontWeight: 500 }}>
                    {edu.from} - {edu.to}
                  </Text>
                </View>
                <View style={modernStyles.educationContent}>
                  <Text style={commonStyles.itemTitle}>{edu.school}</Text>
                  <Text style={commonStyles.itemSubtitle}>{edu.degree}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {data.projects && data.projects.length > 0 && (
          <View>
            <Text style={modernStyles.sectionTitleModern}>Dự án</Text>
            {data.projects.map((project: any, index: number) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={commonStyles.itemTitle}>{project.name}</Text>
                <Text style={commonStyles.itemDescription}>
                  {project.description}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

interface ResumePDFProps {
  data: ResumeContent;
  template?: 'basic' | 'modern';
}

const ResumePDF: React.FC<ResumePDFProps> = ({ data, template = 'basic' }) => {
  switch (template) {
    case 'modern':
      return <TemplateModernPDF data={data} />;
    case 'basic':
    default:
      return <TemplateBasicPDF data={data} />;
  }
};

export default ResumePDF;