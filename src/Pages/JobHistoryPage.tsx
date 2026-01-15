import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Button,
  Box,
  Avatar,
  LoadingOverlay,
  Alert,
  Center,
  Modal,
} from '@mantine/core';
import {
  IconCalendar,
  IconCheck,
  IconX,
  IconClockHour3,
  IconEye,
  IconBuilding,
  IconFileText,
} from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMyApplications, MyApplicationResponse } from '../Services/applyJobService';
import JobDetail from '../FindJobs/JobDetail'; // Import JobDetail component
import { getPublicJobById, PublicJobResponse } from '../Services/publicJobService'; // Import service

const JobHistoryPage: React.FC = () => {
  const [applications, setApplications] = useState<MyApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<PublicJobResponse | null>(null);
  const [loadingJob, setLoadingJob] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<MyApplicationResponse | null>(null);

  // Load applications
  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await getMyApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast.error('Không thể tải danh sách ứng tuyển');
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadApplications();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    } catch {
      return 'Không xác định';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'green';
      case 'REJECTED': return 'red';
      case 'PENDING': return 'yellow';
      default: return 'blue';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'Đã duyệt';
      case 'REJECTED': return 'Đã từ chối';
      case 'PENDING': return 'Đang chờ';
      default: return 'Không xác định';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <IconCheck size={14} />;
      case 'REJECTED': return <IconX size={14} />;
      case 'PENDING': return <IconClockHour3 size={14} />;
      default: return null;
    }
  };

  // Handle view job details
  const handleViewDetails = async (application: MyApplicationResponse) => {
    try {
      setLoadingJob(true);
      setSelectedApplication(application);
      
      // Lấy thông tin chi tiết job từ API
      const jobData = await getPublicJobById(application.jobId);
      
      if (jobData) {
        setSelectedJob(jobData);
        setDetailModalOpen(true);
      } else {
        toast.error('Không tìm thấy thông tin công việc');
      }
    } catch (error) {
      console.error('Error loading job details:', error);
      toast.error('Không thể tải thông tin chi tiết công việc');
    } finally {
      setLoadingJob(false);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setDetailModalOpen(false);
    setSelectedJob(null);
    setSelectedApplication(null);
  };

  // Handle save job
  const handleSaveJob = () => {
    toast.success('Đã lưu công việc');
  };

  // Handle apply job (khi xem lại có thể ứng tuyển lại)
  const handleApplyJob = () => {
    // Nếu người dùng ứng tuyển lại từ modal
    toast.info('Đã gửi đơn ứng tuyển');
    // Reload danh sách applications
    loadApplications();
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      
      <Container size="lg" py="xl">
        {/* Header */}
        <Box mb="xl">
          <Title order={1} mb="xs">Lịch sử ứng tuyển</Title>
          <Text c="dimmed">
            Danh sách các công việc bạn đã ứng tuyển
          </Text>
        </Box>

        {/* Applications List */}
        <LoadingOverlay visible={loading} />
        
        {applications.length === 0 ? (
          <Paper p="xl" withBorder>
            <Center py="xl">
              <Stack align="center">
                <IconFileText size={64} color="#ccc" />
                <Title order={3} c="dimmed">Chưa có đơn ứng tuyển nào</Title>
                <Text c="dimmed">Bạn chưa ứng tuyển công việc nào</Text>
                <Button mt="md" component="a" href="/jobs">
                  Tìm việc ngay
                </Button>
              </Stack>
            </Center>
          </Paper>
        ) : (
          <Stack gap="md">
            {applications.map((application) => (
              <Paper key={application.applicationId} p="md" withBorder>
                <Group align="flex-start">
                  <Avatar size="lg" radius="sm" color="blue">
                    <IconBuilding size={24} />
                  </Avatar>
                  
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Group justify="space-between">
                      <Title order={4}>{application.jobTitle}</Title>
                      <Badge 
                        color={getStatusColor(application.status)}
                        leftSection={getStatusIcon(application.status)}
                        variant="light"
                      >
                        {getStatusText(application.status)}
                      </Badge>
                    </Group>
                    
                    <Text c="dimmed">
                      <IconBuilding size={14} style={{ marginRight: 6 }} />
                      {application.companyName}
                    </Text>
                    
                    <Group>
                      <Text size="sm">
                        <IconCalendar size={14} style={{ marginRight: 4 }} />
                        Ứng tuyển: {formatDate(application.applyDate)}
                      </Text>
                    </Group>
                    
                    <Group justify="space-between" mt="sm">
                      <Button
                        variant="light"
                        size="sm"
                        leftSection={<IconEye size={16} />}
                        onClick={() => handleViewDetails(application)}
                        loading={loadingJob && selectedApplication?.jobId === application.jobId}
                      >
                        Xem chi tiết
                      </Button>
                      
                      {application.status === 'PENDING' && (
                        <Alert color="yellow" variant="light" p="xs">
                          Đang chờ xét duyệt
                        </Alert>
                      )}
                    </Group>
                  </Stack>
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
      </Container>

      {/* Job Detail Modal */}
      <Modal
        opened={detailModalOpen}
        onClose={handleModalClose}
        size="90%"
        fullScreen
        title={
          <Group>
            <IconEye size={20} />
            <Text fw={500}>Chi tiết công việc</Text>
            {selectedApplication && (
              <Badge 
                color={getStatusColor(selectedApplication.status)}
                variant="light"
                size="sm"
              >
                Trạng thái: {getStatusText(selectedApplication.status)}
              </Badge>
            )}
          </Group>
        }
        centered
      >
        {selectedJob && (
          <JobDetail
            job={selectedJob}
            onApply={handleApplyJob}
            onSave={handleSaveJob}
          />
        )}
      </Modal>
    </>
  );
};

export default JobHistoryPage;