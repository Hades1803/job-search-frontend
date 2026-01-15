import React, { useState, useEffect } from 'react';
import {
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Divider,
  Button,
  Grid,
  List,
  ThemeIcon,
  Box,
  Container,
  Alert,
  Avatar,
  Modal,
  SegmentedControl,
  FileInput,
  TextInput,
  Select,
  LoadingOverlay,
} from '@mantine/core';
import {
  IconMapPin,
  IconBriefcase,
  IconCalendar,
  IconClock,
  IconCurrencyDollar,
  IconUsers,
  IconCheck,
  IconStar,
  IconBookmark,
  IconShare,
  IconAlertCircle,
  IconBuilding,
  IconUpload,
  IconFileText,
  IconLink,
} from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicJobResponse } from '../Services/publicJobService';
import { 
  applyJob, 
  ApplyJobRequest, 
  Application, 
  getMyApplications,
  MyApplicationResponse 
} from '../Services/applyJobService';
import { getMyResumes, ResumeResponse } from '../Services/resumeService';
import { useForm } from '@mantine/form';

interface JobDetailProps {
  job: PublicJobResponse;
  onApply?: () => void;
  onSave?: () => void;
}

type ApplyMethod = 'db' | 'upload' | 'link';

// Helper function to convert MyApplicationResponse to Application
const convertToApplication = (response: MyApplicationResponse): Application => {
  return {
    id: response.applicationId,
    resumeType: response.resumeType,
    uploadedCVPath: null,
    uploadedCVName: null,
    resumeLink: null,
    status: response.status,
    applyDate: response.applyDate,
  };
};

const JobDetail: React.FC<JobDetailProps> = ({ job, onApply, onSave }) => {
  const [applyModalOpened, setApplyModalOpened] = useState(false);
  const [resumes, setResumes] = useState<ResumeResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [resumesLoading, setResumesLoading] = useState(false);
  const [applyMethod, setApplyMethod] = useState<ApplyMethod>('db');
  const [hasApplied, setHasApplied] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);
  const [myApplications, setMyApplications] = useState<MyApplicationResponse[]>([]);

  const form = useForm<ApplyJobRequest>({
    initialValues: {
      jobPostingId: job.id,
      resumeId: null,
      cvFile: null,
      resumeLink: '',
    },
    validate: {
      resumeId: (value) => applyMethod === 'db' && !value ? 'Vui lòng chọn một CV' : null,
      cvFile: (value) => applyMethod === 'upload' && !value ? 'Vui lòng chọn file CV' : null,
      resumeLink: (value) => {
        if (applyMethod === 'link') {
          if (!value?.trim()) return 'Vui lòng nhập link CV';
          if (!value.startsWith('http://') && !value.startsWith('https://')) {
            return 'Link CV phải bắt đầu với http:// hoặc https://';
          }
        }
        return null;
      },
    },
  });

  // Helper functions
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
      return 'Không xác định';
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('vi-VN');
    } catch {
      return 'Không xác định';
    }
  };

  const calculateDaysLeft = (expirationDate: string) => {
    try {
      const diff = new Date(expirationDate).getTime() - Date.now();
      return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    } catch {
      return 0;
    }
  };

  const daysLeft = calculateDaysLeft(job.expirationDate);
  const isExpired = daysLeft === 0;
  const isJobClosed = !job.status || isExpired;

  // Load applications từ API
  const loadApplications = async () => {
    try {
      const apps = await getMyApplications();
      setMyApplications(apps);
      
      // Tìm application cho job hiện tại
      const app = apps.find(a => a.jobId === job.id);
      if (app) {
        setHasApplied(true);
        setCurrentApplication(convertToApplication(app));
      } else {
        setHasApplied(false);
        setCurrentApplication(null);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  // Load applications khi component mount
  useEffect(() => {
    loadApplications();
  }, [job.id]);

  // Load resumes khi modal mở
  useEffect(() => {
    if (applyModalOpened) {
      loadResumes();
    }
  }, [applyModalOpened]);

  const loadResumes = async () => {
    try {
      setResumesLoading(true);
      const data = await getMyResumes();
      setResumes(data);
      
      if (data.length > 0 && !form.values.resumeId) {
        form.setFieldValue('resumeId', data[0].id);
      }
    } catch (error) {
      console.error('Error loading resumes:', error);
      toast.error('Không thể tải danh sách CV');
    } finally {
      setResumesLoading(false);
    }
  };

  const handleApplySubmit = async (values: ApplyJobRequest) => {
    try {
      setLoading(true);
      
      const submitData: ApplyJobRequest = {
        jobPostingId: job.id,
      };

      if (applyMethod === 'db' && values.resumeId) {
        submitData.resumeId = values.resumeId;
      } else if (applyMethod === 'upload' && values.cvFile) {
        submitData.cvFile = values.cvFile;
      } else if (applyMethod === 'link' && values.resumeLink) {
        submitData.resumeLink = values.resumeLink;
      }

      const result = await applyJob(submitData);
      
      // Cập nhật state với kết quả từ API
      setHasApplied(true);
      setCurrentApplication(result);
      
      // Reload danh sách applications để cập nhật
      await loadApplications();

      toast.success(' Ứng tuyển thành công!');
      
      setApplyModalOpened(false);
      form.reset();
      setApplyMethod('db');
      
      onApply?.();
      
    } catch (error: any) {
      console.error('Error applying:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi ứng tuyển');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isValidType = allowedTypes.includes(file.type) || 
                         ['pdf', 'doc', 'docx'].includes(fileExtension || '');
      
      if (!isValidType) {
        toast.error('Chỉ chấp nhận file PDF, DOC, DOCX');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('File không được vượt quá 5MB');
        return;
      }
    }
    
    form.setFieldValue('cvFile', file);
  };

  const handleApplyMethodChange = (value: string) => {
    setApplyMethod(value as ApplyMethod);
    form.setValues({
      jobPostingId: job.id,
      resumeId: null,
      cvFile: null,
      resumeLink: '',
    });
    form.clearErrors();
  };

  // Helper functions for display
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'green';
      case 'REJECTED': return 'red';
      case 'PENDING': return 'yellow';
      default: return 'blue';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'Đã duyệt';
      case 'REJECTED': return 'Đã từ chối';
      case 'PENDING': return 'Đang chờ duyệt';
      default: return 'Không xác định';
    }
  };

  const getApplyMethodText = (method: string) => {
    switch (method) {
      case 'DB_RESUME': return 'CV trong hệ thống';
      case 'UPLOADED_FILE': return 'Upload file CV';
      case 'LINK_ONLY': return 'Link CV';
      default: return 'Không xác định';
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="light"
      />
      
      <Container size="lg" py="xl">
        <Paper shadow="md" p="xl" radius="lg" withBorder>
          {/* Job Header */}
          <Box mb="xl">
            <Group justify="space-between" align="flex-start" mb="lg">
              <Group>
                {job.employerLogo ? (
                  <Avatar
                    src={`${process.env.REACT_APP_API_URL || ''}${job.employerLogo}`}
                    size={60}
                    radius="md"
                    alt={job.employerName}
                  />
                ) : (
                  <Avatar size={60} radius="md" color="blue">
                    {job.employerName?.charAt(0) || 'C'}
                  </Avatar>
                )}
                <Stack gap={4}>
                  <Title order={1}>{job.jobTitle}</Title>
                  <Group>
                    <Text size="lg" c="dimmed">
                      <IconBuilding size={18} style={{ marginRight: 6 }} />
                      {job.employerName || 'Không xác định'}
                    </Text>
                  </Group>
                  <Group>
                    <Badge size="lg" color={job.status ? 'green' : 'red'} variant="light">
                      {job.status ? 'Đang tuyển' : 'Đã đóng'}
                    </Badge>
                    {isExpired && <Badge size="lg" color="red" variant="light">Đã hết hạn</Badge>}
                    {hasApplied && (
                      <Badge size="lg" color="green" variant="light" leftSection={<IconCheck size={14} />}>
                        Đã ứng tuyển
                      </Badge>
                    )}
                  </Group>
                </Stack>
              </Group>
              <Group>
                <Button variant="light" leftSection={<IconBookmark size={18} />} onClick={onSave}>
                  Lưu tin
                </Button>
                <Button variant="light" leftSection={<IconShare size={18} />}>
                  Chia sẻ
                </Button>
              </Group>
            </Group>

            {/* Quick Info Badges */}
            <Group gap="md" wrap="wrap">
              <Badge size="lg" color="orange" leftSection={<IconCurrencyDollar size={14} />}>
                {job.salaryLevelName || 'Thương lượng'}
              </Badge>
              <Badge size="lg" color="blue" leftSection={<IconMapPin size={14} />}>
                {job.workAddress || job.addressName || 'Không xác định'}
              </Badge>
              <Badge size="lg" color="green" leftSection={<IconBriefcase size={14} />}>
                {job.jobTypeName || 'Toàn thời gian'}
              </Badge>
            </Group>
          </Box>

          {/* Alerts */}
          {isExpired && (
            <Alert icon={<IconAlertCircle />} title="Thông báo" color="red" variant="light" mb="xl">
              Tin tuyển dụng này đã hết hạn nộp hồ sơ
            </Alert>
          )}

          {hasApplied && currentApplication && (
            <Alert icon={<IconCheck />} title="Đã ứng tuyển" color="green" variant="light" mb="xl">
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text fw={500}>Bạn đã ứng tuyển công việc này</Text>
                  <Badge color={getStatusColor(currentApplication.status)} variant="filled">
                    {getStatusText(currentApplication.status)}
                  </Badge>
                </Group>
                <Text size="sm">
                  <strong>Ngày ứng tuyển:</strong> {formatDateTime(currentApplication.applyDate)}
                </Text>
                <Text size="sm">
                  <strong>Phương thức:</strong> {getApplyMethodText(currentApplication.resumeType)}
                </Text>
              </Stack>
            </Alert>
          )}

          <Grid gutter="xl">
            {/* Left Column - Job Details */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="xl">
                {/* Job Description */}
                <Paper p="md" withBorder>
                  <Title order={3} mb="md">Mô tả công việc</Title>
                  <Text style={{ whiteSpace: 'pre-line' }}>
                    {job.jobDescription || 'Chưa có mô tả công việc'}
                  </Text>
                </Paper>

                {/* Requirements */}
                <Paper p="md" withBorder>
                  <Title order={3} mb="md">Yêu cầu ứng viên</Title>
                  <Text style={{ whiteSpace: 'pre-line' }}>
                    {job.candidateRequirement || 'Không có yêu cầu cụ thể'}
                  </Text>
                </Paper>

                {/* Benefits */}
                {job.benefits && (
                  <Paper p="md" withBorder>
                    <Title order={3} mb="md">Quyền lợi</Title>
                    <List
                      spacing="sm"
                      icon={
                        <ThemeIcon color="green" size={20} radius="xl">
                          <IconCheck size={12} />
                        </ThemeIcon>
                      }
                    >
                      {job.benefits.split(',').map((benefit, index) => (
                        <List.Item key={index}>{benefit.trim()}</List.Item>
                      ))}
                    </List>
                  </Paper>
                )}
              </Stack>
            </Grid.Col>

            {/* Right Column - Actions */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper p="lg" withBorder style={{ position: 'sticky', top: '24px' }}>
                <Stack gap="md">
                  <Text fw={500} size="lg" ta="center">Thông tin ứng tuyển</Text>
                  
                  <Divider />
                  
                  <Box>
                    <Text fw={500} mb="xs">Lượt xem:</Text>
                    <Text size="xl" fw={700} ta="center">
                      {job.views || 0}
                    </Text>
                  </Box>

                  <Divider />

                  {/* Apply Button */}
                  {hasApplied ? (
                    <Button
                      size="lg"
                      fullWidth
                      disabled
                      leftSection={<IconCheck size={20} />}
                      variant="light"
                      color="green"
                    >
                      Đã ứng tuyển
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      fullWidth
                      disabled={isJobClosed}
                      onClick={() => setApplyModalOpened(true)}
                      color={isJobClosed ? 'gray' : 'blue'}
                    >
                      {isJobClosed ? 'Đã đóng tuyển' : 'Ứng tuyển ngay'}
                    </Button>
                  )}

                  <Button
                    variant="light"
                    size="lg"
                    fullWidth
                    leftSection={<IconBookmark size={18} />}
                    onClick={onSave}
                  >
                    Lưu tin tuyển dụng
                  </Button>

                  {isJobClosed && (
                    <Alert color="orange" variant="light">
                      <Text size="sm">
                        Tin tuyển dụng này {!job.status ? 'đã đóng' : 'đã hết hạn'}.
                      </Text>
                    </Alert>
                  )}

                  {/* Application Info */}
                  {hasApplied && currentApplication && (
                    <>
                      <Divider />
                      <Box>
                        <Text fw={500} mb="xs">Thông tin đơn ứng tuyển:</Text>
                        <Stack gap="xs">
                          <Group>
                            <Text size="sm" fw={500}>Trạng thái:</Text>
                            <Badge 
                              color={getStatusColor(currentApplication.status)} 
                              size="sm"
                              variant="light"
                            >
                              {getStatusText(currentApplication.status)}
                            </Badge>
                          </Group>
                          <Text size="sm">
                            <strong>Ngày ứng tuyển:</strong> {formatDateTime(currentApplication.applyDate)}
                          </Text>
                          <Text size="sm">
                            <strong>Phương thức:</strong> {getApplyMethodText(currentApplication.resumeType)}
                          </Text>
                        </Stack>
                      </Box>
                    </>
                  )}
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>

      {/* Apply Modal */}
      <Modal
        opened={applyModalOpened}
        onClose={() => {
          setApplyModalOpened(false);
          form.reset();
          setApplyMethod('db');
        }}
        title="Ứng tuyển công việc"
        size="lg"
        centered
      >
        <LoadingOverlay visible={loading} />
        
        <form onSubmit={form.onSubmit(handleApplySubmit)}>
          <Stack gap="md">
            <Text fw={500}>Chọn phương thức ứng tuyển:</Text>
            
            <SegmentedControl
              fullWidth
              value={applyMethod}
              onChange={handleApplyMethodChange}
              data={[
                { value: 'db', label: 'CV có sẵn' },
                { value: 'upload', label: 'Upload CV mới' },
                { value: 'link', label: 'Link CV' },
              ]}
            />

            {applyMethod === 'db' && (
              <Select
                label="Chọn CV từ thư viện"
                placeholder="Chọn một CV"
                data={resumes.map(resume => ({
                  value: resume.id.toString(),
                  label: resume.resumeName,
                }))}
                value={form.values.resumeId?.toString() || ''}
                onChange={(value) => form.setFieldValue('resumeId', value ? parseInt(value) : null)}
                error={form.errors.resumeId}
                disabled={resumesLoading || resumes.length === 0}
                required
                nothingFoundMessage="Không tìm thấy CV nào"
              />
            )}

            {applyMethod === 'upload' && (
              <FileInput
                label="Tải lên CV mới"
                placeholder="Chọn file CV"
                accept=".pdf,.doc,.docx"
                value={form.values.cvFile}
                onChange={handleFileChange}
                error={form.errors.cvFile}
                required
                description="Chấp nhận: PDF, DOC, DOCX (tối đa 5MB)"
              />
            )}

            {applyMethod === 'link' && (
              <TextInput
                label="Link CV"
                placeholder="https://drive.google.com/..."
                value={form.values.resumeLink || ''}
                onChange={(e) => form.setFieldValue('resumeLink', e.currentTarget.value)}
                error={form.errors.resumeLink}
                required
              />
            )}

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setApplyModalOpened(false)}>
                Hủy
              </Button>
              <Button type="submit" loading={loading} disabled={isJobClosed}>
                Gửi đơn ứng tuyển
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default JobDetail;