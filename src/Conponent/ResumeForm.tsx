import React, { useState, useEffect } from 'react';
import {
  Box,
  TextInput,
  Textarea,
  Button,
  Title,
  Group,
  Paper,
  Divider,
  Stack,
  ActionIcon,
  Chip,
  ScrollArea,
  SimpleGrid,
} from '@mantine/core';
import { IconPlus, IconTrash, IconX } from '@tabler/icons-react';

interface ResumeFormProps {
  mode: 'create' | 'edit';
  initialData: any;
  selectedTemplate: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

interface EducationItem {
  school: string;
  degree: string;
  from: string;
  to: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  from: string;
  to: string;
  description: string;
}

interface ProjectItem {
  name: string;
  description: string;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  mode,
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    resumeName: '',
    content: {
      personal: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        position: ''
      },
      careerObjective: '',
      education: [] as EducationItem[],
      experience: [] as ExperienceItem[],
      skills: [] as string[],
      projects: [] as ProjectItem[]
    }
  });

  const [currentSkill, setCurrentSkill] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      try {
        const content = JSON.parse(initialData.content);
        setFormData({
          resumeName: initialData.resumeName,
          content: {
            personal: content.personal || { fullName: '', email: '', phone: '', address: '', position: '' },
            careerObjective: content.careerObjective || '',
            education: content.education || [],
            experience: content.experience || [],
            skills: content.skills || [],
            projects: content.projects || []
          }
        });
      } catch (error) {
        console.error('Error parsing resume content:', error);
      }
    }
  }, [mode, initialData]);

  const handlePersonalChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        personal: {
          ...prev.content.personal,
          [field]: value
        }
      }
    }));
  };

  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        education: [
          ...prev.content.education,
          { school: '', degree: '', from: '', to: '' }
        ]
      }
    }));
  };

  const handleEducationChange = (index: number, field: keyof EducationItem, value: string) => {
    const newEducation = [...formData.content.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, education: newEducation }
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        education: prev.content.education.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        experience: [
          ...prev.content.experience,
          { company: '', role: '', from: '', to: '', description: '' }
        ]
      }
    }));
  };

  const handleExperienceChange = (index: number, field: keyof ExperienceItem, value: string) => {
    const newExperience = [...formData.content.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, experience: newExperience }
    }));
  };

  const handleRemoveExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        experience: prev.content.experience.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          skills: [...prev.content.skills, currentSkill.trim()]
        }
      }));
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        skills: prev.content.skills.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddProject = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        projects: [
          ...prev.content.projects,
          { name: '', description: '' }
        ]
      }
    }));
  };

  const handleProjectChange = (index: number, field: keyof ProjectItem, value: string) => {
    const newProjects = [...formData.content.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, projects: newProjects }
    }));
  };

  const handleRemoveProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        projects: prev.content.projects.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ScrollArea h={500} offsetScrollbars>
        <Stack gap="lg">
          <TextInput
            label="Tên CV"
            placeholder="Nhập tên CV"
            value={formData.resumeName}
            onChange={(e) => setFormData(prev => ({ ...prev, resumeName: e.target.value }))}
            required
          />

          <Paper withBorder p="md">
            <Title order={4} mb="md">Thông tin cá nhân</Title>
            <SimpleGrid cols={2} >
              <TextInput
                label="Họ và tên"
                value={formData.content.personal.fullName}
                onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                required
              />
              <TextInput
                label="Vị trí ứng tuyển"
                value={formData.content.personal.position}
                onChange={(e) => handlePersonalChange('position', e.target.value)}
              />
              <TextInput
                label="Email"
                type="email"
                value={formData.content.personal.email}
                onChange={(e) => handlePersonalChange('email', e.target.value)}
                required
              />
              <TextInput
                label="Số điện thoại"
                value={formData.content.personal.phone}
                onChange={(e) => handlePersonalChange('phone', e.target.value)}
              />
              <TextInput
                label="Địa chỉ"
                value={formData.content.personal.address}
                onChange={(e) => handlePersonalChange('address', e.target.value)}
              />
            </SimpleGrid>
          </Paper>

          <Paper withBorder p="md">
            <Title order={4} mb="md">Mục tiêu nghề nghiệp</Title>
            <Textarea
              placeholder="Nhập mục tiêu nghề nghiệp của bạn"
              value={formData.content.careerObjective}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                content: { ...prev.content, careerObjective: e.target.value }
              }))}
              minRows={3}
            />
          </Paper>

          <Paper withBorder p="md">
            <Group justify="space-between" mb="md">
              <Title order={4}>Học vấn</Title>
              <Button
                size="xs"
                leftSection={<IconPlus size={14} />}
                onClick={handleAddEducation}
                variant="light"
              >
                Thêm
              </Button>
            </Group>
            <Stack gap="md">
              {formData.content.education.map((edu, index) => (
                <Paper key={index} withBorder p="md">
                  <Group justify="space-between" mb="xs">
                    <Title order={6}>Trường học #{index + 1}</Title>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => handleRemoveEducation(index)}
                      size="sm"
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Group>
                  <SimpleGrid cols={2} >
                    <TextInput
                      label="Trường học"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                    />
                    <TextInput
                      label="Bằng cấp/Chuyên ngành"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    />
                    <TextInput
                      label="Từ năm"
                      value={edu.from}
                      onChange={(e) => handleEducationChange(index, 'from', e.target.value)}
                    />
                    <TextInput
                      label="Đến năm"
                      value={edu.to}
                      onChange={(e) => handleEducationChange(index, 'to', e.target.value)}
                    />
                  </SimpleGrid>
                </Paper>
              ))}
            </Stack>
          </Paper>

          <Paper withBorder p="md">
            <Group justify="space-between" mb="md">
              <Title order={4}>Kinh nghiệm làm việc</Title>
              <Button
                size="xs"
                leftSection={<IconPlus size={14} />}
                onClick={handleAddExperience}
                variant="light"
              >
                Thêm
              </Button>
            </Group>
            <Stack gap="md">
              {formData.content.experience.map((exp, index) => (
                <Paper key={index} withBorder p="md">
                  <Group justify="space-between" mb="xs">
                    <Title order={6}>Kinh nghiệm #{index + 1}</Title>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => handleRemoveExperience(index)}
                      size="sm"
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Group>
                  <SimpleGrid cols={2} >
                    <TextInput
                      label="Công ty"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    />
                    <TextInput
                      label="Vị trí"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                    />
                    <TextInput
                      label="Từ tháng/năm"
                      value={exp.from}
                      onChange={(e) => handleExperienceChange(index, 'from', e.target.value)}
                    />
                    <TextInput
                      label="Đến tháng/năm"
                      value={exp.to}
                      onChange={(e) => handleExperienceChange(index, 'to', e.target.value)}
                    />
                  </SimpleGrid>
                  <Textarea
                    label="Mô tả công việc"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    mt="sm"
                    minRows={2}
                  />
                </Paper>
              ))}
            </Stack>
          </Paper>

          <Paper withBorder p="md">
            <Title order={4} mb="md">Kỹ năng</Title>
            <Group gap="xs" mb="md">
              <TextInput
                placeholder="Nhập kỹ năng"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                style={{ flex: 1 }}
              />
              <Button onClick={handleAddSkill}>
                Thêm
              </Button>
            </Group>
            <Group gap="xs">
              {formData.content.skills.map((skill, index) => (
                <Chip
                  key={index}
                  checked={true}
                  variant="filled"
                  color="blue"
                  size="sm"
                >
                  <Group gap={4}>
                    {skill}
                    <ActionIcon
                      size="xs"
                      color="blue"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      <IconX size={12} />
                    </ActionIcon>
                  </Group>
                </Chip>
              ))}
            </Group>
          </Paper>

          <Paper withBorder p="md">
            <Group justify="space-between" mb="md">
              <Title order={4}>Dự án</Title>
              <Button
                size="xs"
                leftSection={<IconPlus size={14} />}
                onClick={handleAddProject}
                variant="light"
              >
                Thêm
              </Button>
            </Group>
            <Stack gap="md">
              {formData.content.projects.map((project, index) => (
                <Paper key={index} withBorder p="md">
                  <Group justify="space-between" mb="xs">
                    <Title order={6}>Dự án #{index + 1}</Title>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => handleRemoveProject(index)}
                      size="sm"
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Group>
                  <TextInput
                    label="Tên dự án"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    mb="sm"
                  />
                  <Textarea
                    label="Mô tả dự án"
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    minRows={2}
                  />
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </ScrollArea>

      <Divider my="md" />

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">
          {mode === 'create' ? 'Tạo CV' : 'Cập nhật CV'}
        </Button>
      </Group>
    </form>
  );
};

export default ResumeForm;