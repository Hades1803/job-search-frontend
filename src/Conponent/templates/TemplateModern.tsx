import React from 'react';
import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Box,
  Progress
} from '@mantine/core';
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconSchool,
  IconBuilding,
  IconCode,
  IconFolder
} from '@tabler/icons-react';
import { useMantineTheme } from '@mantine/core';

interface TemplateModernProps {
  data: any;
}

const TemplateModern: React.FC<TemplateModernProps> = ({ data }) => {
  const theme = useMantineTheme();
  const resumeData = typeof data === 'string' ? JSON.parse(data) : data;

  return (
    <Paper
      shadow="md"
      style={{
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        backgroundColor: '#fff',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Sidebar */}
      <Box
        style={{
          width: '30%',
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: theme.spacing.xl,
        }}
      >
        {/* Avatar and Name */}
        <Stack align="center" gap="md" mb="xl">
          <Box
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: '#34495e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Title order={2} c="white">
              {resumeData.personal?.fullName?.charAt(0) || 'CV'}
            </Title>
          </Box>
          <Title order={3} c="white" ta="center">
            {resumeData.personal?.fullName || 'Họ và tên'}
          </Title>
          <Text size="sm" c="#bdc3c7" ta="center">
            {resumeData.personal?.position || 'Vị trí ứng tuyển'}
          </Text>
        </Stack>

        {/* Contact Info */}
        <Stack gap="md" mb="xl">
          <Title order={4} c="#3498db">Thông tin liên hệ</Title>
          <Stack gap="xs">
            <Group gap="xs">
              <IconMail size={16} color="#3498db" />
              <Text size="sm">{resumeData.personal?.email || 'email@example.com'}</Text>
            </Group>
            <Group gap="xs">
              <IconPhone size={16} color="#3498db" />
              <Text size="sm">{resumeData.personal?.phone || '0123456789'}</Text>
            </Group>
            <Group gap="xs">
              <IconMapPin size={16} color="#3498db" />
              <Text size="sm">{resumeData.personal?.address || 'Địa chỉ'}</Text>
            </Group>
          </Stack>
        </Stack>

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <Stack gap="md">
            <Title order={4} c="#3498db">
              <IconCode size={16} style={{ marginRight: 8 }} />
              Kỹ năng
            </Title>
            <Stack gap="xs">
              {resumeData.skills.map((skill: string, index: number) => (
                <Box key={index}>
                  <Text size="sm" mb={2}>{skill}</Text>
                  <Progress
                    value={80}
                    color="blue"
                    size="sm"
                    style={{
                      backgroundColor: '#34495e',
                      '& .mantine-Progress-bar': {
                        backgroundColor: '#3498db',
                      }
                    } as any}
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
        )}
      </Box>

      {/* Main Content */}
      <Box
        style={{
          flex: 1,
          padding: theme.spacing.xl,
        }}
      >
        {/* Career Objective */}
        {resumeData.careerObjective && (
          <Stack gap="xs" mb="xl">
            <Title order={3} c="#2c3e50" style={{ borderBottom: '2px solid #3498db', paddingBottom: 4 }}>
              Mục tiêu nghề nghiệp
            </Title>
            <Text>{resumeData.careerObjective}</Text>
          </Stack>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <Stack gap="md" mb="xl">
            <Title order={3} c="#2c3e50" style={{ borderBottom: '2px solid #3498db', paddingBottom: 4 }}>
              <IconBuilding size={20} style={{ marginRight: 8 }} />
              Kinh nghiệm làm việc
            </Title>
            {resumeData.experience.map((exp: any, index: number) => (
              <Box key={index}>
                <Group justify="space-between" mb={4}>
                  <Title order={5} c="#2c3e50">
                    {exp.company}
                  </Title>
                  <Box
                    style={{
                      backgroundColor: '#e8f4fc',
                      color: '#3498db',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {exp.from} - {exp.to}
                  </Box>
                </Group>
                <Text size="sm" c="#7f8c8d" mb={4}>
                  {exp.role}
                </Text>
                <Text size="sm" c="#34495e">
                  {exp.description}
                </Text>
              </Box>
            ))}
          </Stack>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <Stack gap="md" mb="xl">
            <Title order={3} c="#2c3e50" style={{ borderBottom: '2px solid #3498db', paddingBottom: 4 }}>
              <IconSchool size={20} style={{ marginRight: 8 }} />
              Học vấn
            </Title>
            {resumeData.education.map((edu: any, index: number) => (
              <Box key={index} style={{ display: 'flex' }}>
                <Box style={{ minWidth: 100, marginTop: 4 }}>
                  <Text size="sm" c="#3498db" fw={500}>
                    {edu.from} - {edu.to}
                  </Text>
                </Box>
                <Box style={{ marginLeft: 16 }}>
                  <Title order={5} c="#2c3e50">
                    {edu.school}
                  </Title>
                  <Text size="sm" c="#7f8c8d">
                    {edu.degree}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <Stack gap="md">
            <Title order={3} c="#2c3e50" style={{ borderBottom: '2px solid #3498db', paddingBottom: 4 }}>
              <IconFolder size={20} style={{ marginRight: 8 }} />
              Dự án
            </Title>
            {resumeData.projects.map((project: any, index: number) => (
              <Box key={index}>
                <Title order={5} c="#2c3e50" mb={4}>
                  {project.name}
                </Title>
                <Text size="sm" c="#34495e">
                  {project.description}
                </Text>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default TemplateModern;