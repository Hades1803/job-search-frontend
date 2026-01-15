import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Loader, Center, Alert, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { getPublicJobById } from '../Services/publicJobService';
import JobDetail from '../FindJobs/JobDetail';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        setError('Không tìm thấy ID công việc');
        setLoading(false);
        return;
      }

      const jobId = parseInt(id);
      if (isNaN(jobId)) {
        setError('ID công việc không hợp lệ');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getPublicJobById(jobId);
        
        if (data) {
          setJob(data);
        } else {
          setError('Không tìm thấy thông tin công việc');
        }
      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra khi tải thông tin công việc');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = () => {
    alert('Chức năng ứng tuyển đang được phát triển');
  };

  const handleSave = () => {
    alert('Đã lưu tin tuyển dụng');
  };

  if (loading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error || !job) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Lỗi" mb="md">
          {error || 'Không tìm thấy công việc'}
        </Alert>
        <Button
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate('/jobs')}
        >
          Quay lại danh sách
        </Button>
      </Container>
    );
  }

  return <JobDetail job={job} onApply={handleApply} onSave={handleSave} />;
};

export default JobDetailPage;