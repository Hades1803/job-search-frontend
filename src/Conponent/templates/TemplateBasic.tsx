import React from 'react';
import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  SimpleGrid,
  Box,
  Divider
} from '@mantine/core';
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconSchool,
  IconBuilding,
  IconTools
} from '@tabler/icons-react';

interface TemplateBasicProps {
  data: any;
}

const TemplateBasic: React.FC<TemplateBasicProps> = ({ data }) => {
  const resumeData = typeof data === 'string' ? JSON.parse(data) : data;

  return (
    <Paper
      shadow="md"
      p="xl"
      style={{
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
      }}
    >
      {/* Header */}
      <Box
        style={(theme) => ({
          backgroundColor: theme.colors.blue[7],
          color: 'white',
          padding: theme.spacing.xl,
          marginBottom: theme.spacing.xl,
          borderRadius: theme.radius.md,
        })}
      >
        <Title order={1} c="white" mb="xs">
          {resumeData.personal?.fullName || 'Họ và tên'}
        </Title>
        <Title order={3} c="white" opacity={0.9} mb="md">
          {resumeData.personal?.position || 'Vị trí ứng tuyển'}
        </Title>
        
        <SimpleGrid cols={3} spacing="md">
          <Group gap="xs">
            <IconMail size={18} />
            <Text size="sm">{resumeData.personal?.email || 'email@example.com'}</Text>
          </Group>
          <Group gap="xs">
            <IconPhone size={18} />
            <Text size="sm">{resumeData.personal?.phone || '0123456789'}</Text>
          </Group>
          <Group gap="xs">
            <IconMapPin size={18} />
            <Text size="sm">{resumeData.personal?.address || 'Địa chỉ'}</Text>
          </Group>
        </SimpleGrid>
      </Box>

      {/* Career Objective */}
      {resumeData.careerObjective && (
        <Stack gap="xs" mb="xl">
          <Group gap="xs">
            <IconBriefcase size={20} color="#228be6" />
            <Title order={3} c="#228be6">Mục tiêu nghề nghiệp</Title>
          </Group>
          <Text>{resumeData.careerObjective}</Text>
        </Stack>
      )}

      <SimpleGrid cols={2} spacing="xl">
        {/* Left Column */}
        <Stack gap="xl">
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <Stack gap="xs">
              <Group gap="xs">
                <IconTools size={20} color="#228be6" />
                <Title order={3} c="#228be6">Kỹ năng</Title>
              </Group>
              <Group gap="xs">
                {resumeData.skills.map((skill: string, index: number) => (
                  <Box
                    key={index}
                    style={(theme) => ({
                      backgroundColor: theme.colors.blue[0],
                      color: theme.colors.blue[7],
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderRadius: theme.radius.sm,
                      fontWeight: 500,
                    })}
                  >
                    {skill}
                  </Box>
                ))}
              </Group>
            </Stack>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <Stack gap="xs">
              <Title order={3} c="#228be6">Dự án</Title>
              {resumeData.projects.map((project: any, index: number) => (
                <Box key={index}>
                  <Text fw={600}>{project.name}</Text>
                  <Text size="sm" c="dimmed">{project.description}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>

        {/* Right Column */}
        <Stack gap="xl">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <Stack gap="xs">
              <Group gap="xs">
                <IconSchool size={20} color="#228be6" />
                <Title order={3} c="#228be6">Học vấn</Title>
              </Group>
              {resumeData.education.map((edu: any, index: number) => (
                <Box key={index}>
                  <Text fw={600}>{edu.school}</Text>
                  <Text size="sm" c="dimmed">
                    {edu.degree} | {edu.from} - {edu.to}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <Stack gap="xs">
              <Group gap="xs">
                <IconBuilding size={20} color="#228be6" />
                <Title order={3} c="#228be6">Kinh nghiệm làm việc</Title>
              </Group>
              {resumeData.experience.map((exp: any, index: number) => (
                <Box key={index}>
                  <Text fw={600}>{exp.company}</Text>
                  <Text size="sm" c="dimmed">
                    {exp.role} | {exp.from} - {exp.to}
                  </Text>
                  <Text size="sm" mt={4}>{exp.description}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </SimpleGrid>
    </Paper>
  );
};

export default TemplateBasic;