import React, { useState, useEffect } from 'react';
import { 
  getMyResumes, 
  createResume, 
  updateResume, 
  deleteResume, 
  type ResumeRequest, 
  type ResumeResponse 
} from '../Services/resumeService';
import TemplateSelector from '../Conponent/TemplateSelector';
import ResumeForm from '../Conponent/ResumeForm';
import ResumePreview from '../Conponent/ResumePreview';
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Group,
  Stack,
  Modal,
  Paper,
  LoadingOverlay,
  Alert,
  Notification,
  ActionIcon,
  Badge,
  SimpleGrid,
  Divider,
  Center
} from '@mantine/core';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconRefresh,
  IconFileText,
  IconTemplate,
  IconCalendar,
  IconCheck,
  IconAlertCircle
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const ResumePage: React.FC = () => {
  const [resumes, setResumes] = useState<ResumeResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedResume, setSelectedResume] = useState<ResumeResponse | null>(null);
  const [resumeToDelete, setResumeToDelete] = useState<number | null>(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('template_basic');
  
  // Modal states
  const [formOpened, { open: openForm, close: closeForm }] = useDisclosure(false);
  const [previewOpened, { open: openPreview, close: closePreview }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  // Load resumes on component mount
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyResumes();
      setResumes(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải danh sách CV');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = () => {
    setMode('create');
    setSelectedResume(null);
    setSelectedTemplate('template_basic');
    openForm();
  };

  const handleEditResume = (resume: ResumeResponse) => {
    setMode('edit');
    setSelectedResume(resume);
    setSelectedTemplate(resume.templateCode);
    openForm();
  };

  const handlePreviewResume = (resume: ResumeResponse) => {
    setSelectedResume(resume);
    openPreview();
  };

  const handleDeleteClick = (id: number) => {
    setResumeToDelete(id);
    openDelete();
  };

  const handleDeleteConfirm = async () => {
    if (resumeToDelete) {
      try {
        await deleteResume(resumeToDelete);
        setSuccessMessage('Đã xóa CV thành công');
        fetchResumes();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể xóa CV');
      } finally {
        closeDelete();
        setResumeToDelete(null);
      }
    }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      const resumeData: ResumeRequest = {
        resumeName: formData.resumeName,
        templateCode: selectedTemplate,
        content: JSON.stringify(formData.content)
      };

      if (mode === 'create') {
        await createResume(resumeData);
        setSuccessMessage('Tạo CV mới thành công');
      } else if (mode === 'edit' && selectedResume) {
        await updateResume(selectedResume.id, resumeData);
        setSuccessMessage('Cập nhật CV thành công');
      }

      closeForm();
      fetchResumes();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể lưu CV');
    }
  };

  const handleTemplateChange = (templateCode: string) => {
    setSelectedTemplate(templateCode);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Clear notifications
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Quản lý CV</Title>
          <Text c="dimmed" size="sm">Tạo và quản lý CV của bạn</Text>
        </div>
        <Group>
          <Button
            variant="light"
            leftSection={<IconRefresh size={20} />}
            onClick={fetchResumes}
          >
            Làm mới
          </Button>
          <Button
            leftSection={<IconPlus size={20} />}
            onClick={handleCreateResume}
          >
            Tạo CV mới
          </Button>
        </Group>
      </Group>

      {/* Error Alert */}
      {error && (
        <Alert 
          icon={<IconAlertCircle size={18} />} 
          title="Lỗi" 
          color="red" 
          mb="md"
          withCloseButton
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {/* Success Notification */}
      {successMessage && (
        <Notification
          icon={<IconCheck size={20} />}
          color="teal"
          title="Thành công"
          onClose={() => setSuccessMessage(null)}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1000
          }}
        >
          {successMessage}
        </Notification>
      )}

      {/* Loading State */}
      {loading ? (
        <Center py="xl">
          <LoadingOverlay visible={loading} />
        </Center>
      ) : resumes.length === 0 ? (
        <Paper p="xl" withBorder radius="md">
          <Stack align="center" gap="md">
            <IconFileText size={80} stroke={1.5} color="#adb5bd" />
            <div>
              <Title order={3} ta="center" mb="xs">
                Bạn chưa có CV nào
              </Title>
              <Text c="dimmed" ta="center">
                Tạo CV đầu tiên của bạn để bắt đầu ứng tuyển công việc
              </Text>
            </div>
            <Button
              size="lg"
              leftSection={<IconPlus size={20} />}
              onClick={handleCreateResume}
            >
              Tạo CV mới
            </Button>
          </Stack>
        </Paper>
      ) : (
        <SimpleGrid
          cols={3}
          spacing="lg"
        >
          {resumes.map((resume) => (
            <Card
              key={resume.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s',
              }}
            >
              <Card.Section inheritPadding py="md">
                <Badge color="blue" variant="light">
                  {resume.templateCode.replace('template_', '')}
                </Badge>
              </Card.Section>

              <Stack gap="xs" style={{ flex: 1 }}>
                <Title order={4}>{resume.resumeName}</Title>
                <Group gap="xs">
                  <IconTemplate size={16} color="#868e96" />
                  <Text size="sm" c="dimmed">
                    Template: {resume.templateCode}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconCalendar size={16} color="#868e96" />
                  <Text size="sm" c="dimmed">
                    Cập nhật: {formatDate(resume.updatedAt)}
                  </Text>
                </Group>
              </Stack>

              <Divider my="md" />

              <Group justify="space-between">
                <ActionIcon
                  color="blue"
                  variant="light"
                  size="lg"
                  onClick={() => handlePreviewResume(resume)}
                  title="Xem trước"
                >
                  <IconEye size={20} />
                </ActionIcon>
                <ActionIcon
                  color="yellow"
                  variant="light"
                  size="lg"
                  onClick={() => handleEditResume(resume)}
                  title="Chỉnh sửa"
                >
                  <IconEdit size={20} />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  variant="light"
                  size="lg"
                  onClick={() => handleDeleteClick(resume.id)}
                  title="Xóa"
                >
                  <IconTrash size={20} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* Create/Edit Resume Modal */}
      <Modal
        opened={formOpened}
        onClose={closeForm}
        title={mode === 'create' ? 'Tạo CV mới' : 'Chỉnh sửa CV'}
        size="lg"
        padding="xl"
      >
        {mode === 'create' && (
          <Stack gap="md" mb="xl">
            <Text size="sm" fw={500}>Chọn template</Text>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={handleTemplateChange}
            />
          </Stack>
        )}
        
        <ResumeForm
          mode={mode}
          initialData={selectedResume}
          selectedTemplate={selectedTemplate}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
        />
      </Modal>

      {/* Preview Modal */}
      <Modal
        opened={previewOpened}
        onClose={closePreview}
        title={
          <Group gap="xs">
            <IconEye size={20} />
            <Text>Xem trước CV: {selectedResume?.resumeName}</Text>
          </Group>
        }
        size="xl"
        fullScreen
        padding="xl"
      >
        {selectedResume && (
          <ResumePreview
            resume={selectedResume}
            onClose={closePreview}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title="Xác nhận xóa CV"
      >
        <Stack gap="md">
          <Text>
            Bạn có chắc chắn muốn xóa CV này không? Hành động này không thể hoàn tác.
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={closeDelete}>
              Hủy
            </Button>
            <Button 
              color="red" 
              leftSection={<IconTrash size={16} />}
              onClick={handleDeleteConfirm}
            >
              Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default ResumePage;