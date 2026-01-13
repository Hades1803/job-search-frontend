import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Container, 
  Card, 
  TextInput, 
  Textarea, 
  Button, 
  Group, 
  Stack, 
  Title, 
  Text,
  NumberInput,
  Select,
  Grid,
  Badge,
  Paper,
  Table,
  ActionIcon,
  Modal,
  Alert,
  Loader,
  Box,
  Divider,
  SimpleGrid,
  ScrollArea
} from "@mantine/core";
import { 
  IconBriefcase, 
  IconMapPin, 
  IconUsers, 
  IconCalendar, 
  IconCash, 
  IconEdit, 
  IconTrash, 
  IconPlus,
  IconSearch,
  IconEye,
  IconCheck,
  IconX,
  IconList,
  IconLayoutGrid,
  IconRefresh
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { JobRequest, JobResponse, getEmployerJobs, createJob, updateJob, deleteJob } from '../Services/jobService';
import axios from 'axios';

const API_URL = "https://job-search-backend-bcgv.onrender.com";

// Interface cho các option từ database
interface SelectOption {
  value: string;
  label: string;
}

// Interface cho response từ API
interface ApiOption {
  id: string;
  name: string;
}

// Service để lấy các option từ API
const getDropdownOptions = async (): Promise<{
  majors: SelectOption[];
  jobTypes: SelectOption[];
  salaryLevels: SelectOption[];
  ranks: SelectOption[];
  addresses: SelectOption[];
}> => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    // Gọi tất cả API đồng thời
    const [jobTypesRes, majorsRes, ranksRes, salaryLevelsRes, addressesRes] = await Promise.all([
      axios.get<ApiOption[]>(`${API_URL}/api/job-types`, { headers }),
      axios.get<ApiOption[]>(`${API_URL}/api/majors`, { headers }),
      axios.get<ApiOption[]>(`${API_URL}/api/ranks`, { headers }),
      axios.get<ApiOption[]>(`${API_URL}/api/salary-levels`, { headers }),
      axios.get<ApiOption[]>(`${API_URL}/api/addresses`, { headers }),
    ]);

    return {
      jobTypes: jobTypesRes.data.map(item => ({ value: item.id, label: item.name })),
      majors: majorsRes.data.map(item => ({ value: item.id, label: item.name })),
      ranks: ranksRes.data.map(item => ({ value: item.id, label: item.name })),
      salaryLevels: salaryLevelsRes.data.map(item => ({ value: item.id, label: item.name })),
      addresses: addressesRes.data.map(item => ({ value: item.id, label: item.name })),
    };
  } catch (error) {
    console.error('Error fetching dropdown options:', error);
    throw error;
  }
};

const PostJobPage = () => {
  const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<JobRequest>();
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [editingJob, setEditingJob] = useState<JobResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // State cho các dropdown options
  const [dropdownData, setDropdownData] = useState({
    majors: [] as SelectOption[],
    jobTypes: [] as SelectOption[],
    salaryLevels: [] as SelectOption[],
    ranks: [] as SelectOption[],
    addresses: [] as SelectOption[],
    genderOptions: [
      { value: 'ANY', label: 'Không yêu cầu' },
      { value: 'MALE', label: 'Nam' },
      { value: 'FEMALE', label: 'Nữ' },
    ]
  });

  // Modal states
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);

  // Fetch jobs và options
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingOptions(true);
      
      try {
        // Fetch jobs
        const jobsData = await getEmployerJobs();
        setJobs(jobsData);
        
        // Fetch dropdown options từ API thực tế
        const options = await getDropdownOptions();
        setDropdownData(prev => ({
          ...prev,
          ...options
        }));
        
        toast.success('Đã tải dữ liệu thành công!');
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Không thể tải dữ liệu');
        
        // Fallback data nếu API fail
        setDropdownData(prev => ({
          ...prev,
          majors: [
            { value: 'IT', label: 'Công nghệ thông tin' },
            { value: 'BUSINESS', label: 'Kinh doanh' },
            { value: 'MARKETING', label: 'Marketing' },
          ],
          jobTypes: [
            { value: 'FULL_TIME', label: 'Toàn thời gian' },
            { value: 'PART_TIME', label: 'Bán thời gian' },
            { value: 'INTERN', label: 'Thực tập' },
          ],
          salaryLevels: [
            { value: 'BELOW_5M', label: 'Dưới 5 triệu' },
            { value: '5M_10M', label: '5 - 10 triệu' },
            { value: '10M_15M', label: '10 - 15 triệu' },
          ],
          ranks: [
            { value: 'jr', label: 'Junior' },
            { value: 'mid', label: 'Middle' },
            { value: 'sr', label: 'Senior' },
          ],
          addresses: [
            { value: 'HCM', label: 'Hồ Chí Minh' },
            { value: 'HN', label: 'Hà Nội' },
            { value: 'DN', label: 'Đà Nẵng' },
          ],
        }));
      } finally {
        setLoading(false);
        setLoadingOptions(false);
      }
    };

    fetchData();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.workAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.major.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle create job
  const onCreateSubmit = async (data: JobRequest) => {
    setSubmitting(true);
    try {
      // Format expiration date to ISO string
      const formattedData = {
        ...data,
        expirationDate: new Date(data.expirationDate).toISOString(),
      };
      
      console.log('Creating job with data:', formattedData);
      
      const createdJob = await createJob(formattedData);
      toast.success('Đăng bài tuyển dụng thành công!');
      closeCreateModal();
      reset();
      
      // Refresh job list
      const jobsData = await getEmployerJobs();
      setJobs(jobsData);
    } catch (error: any) {
      console.error('Error creating job:', error.response?.data || error.message);
      toast.error(`Đăng bài thất bại: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit job
  const onEditSubmit = async (data: JobRequest) => {
    if (!editingJob) return;
    
    setSubmitting(true);
    try {
      // Format expiration date to ISO string
      const formattedData = {
        ...data,
        expirationDate: new Date(data.expirationDate).toISOString(),
      };
      
      console.log('Updating job with data:', formattedData);
      
      const updatedJob = await updateJob(editingJob.id, formattedData);
      toast.success('Cập nhật công việc thành công!');
      closeEditModal();
      reset();
      setEditingJob(null);
      
      // Refresh job list
      const jobsData = await getEmployerJobs();
      setJobs(jobsData);
    } catch (error: any) {
      console.error('Error updating job:', error.response?.data || error.message);
      toast.error(`Cập nhật thất bại: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete job
  const handleDelete = async () => {
    if (!jobToDelete) return;
    
    setSubmitting(true);
    try {
      await deleteJob(jobToDelete);
      toast.success('Xóa công việc thành công!');
      closeDeleteModal();
      
      // Refresh job list
      const jobsData = await getEmployerJobs();
      setJobs(jobsData);
    } catch (error: any) {
      console.error('Error deleting job:', error.response?.data || error.message);
      toast.error(`Xóa thất bại: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
      setJobToDelete(null);
    }
  };

  // Open edit modal with job data
  const openEdit = (job: JobResponse) => {
    setEditingJob(job);
    
    // Set form values
    setValue('jobTitle', job.jobTitle);
    setValue('workAddress', job.workAddress);
    setValue('quantity', job.quantity);
    setValue('genderRequirement', job.genderRequirement || 'ANY');
    setValue('jobDescription', job.jobDescription);
    setValue('candidateRequirement', job.candidateRequirement || '');
    setValue('relatedSkills', job.relatedSkills || '');
    setValue('benefits', job.benefits || '');
    setValue('expirationDate', job.expirationDate.split('T')[0]);
    setValue('note', job.note || '');
    setValue('majorId', job.major.id);
    setValue('jobTypeId', job.jobType.id);
    setValue('salaryLevelId', job.salaryLevel.id);
    setValue('rankId', job.rank.id);
    setValue('addressId', job.address.id);
    
    openEditModal();
  };

  // Open delete confirmation
  const openDelete = (jobId: number) => {
    setJobToDelete(jobId);
    openDeleteModal();
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
      return dateString;
    }
  };

  // Get status badge
  const getStatusBadge = (status: boolean) => {
    return status ? (
      <Badge color="green" variant="light">Đang hoạt động</Badge>
    ) : (
      <Badge color="red" variant="light">Đã đóng</Badge>
    );
  };

  // Refresh data
  const refreshData = async () => {
    setLoading(true);
    try {
      const [jobsData, options] = await Promise.all([
        getEmployerJobs(),
        getDropdownOptions()
      ]);
      setJobs(jobsData);
      setDropdownData(prev => ({
        ...prev,
        ...options
      }));
      toast.success('Đã làm mới dữ liệu!');
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Không thể làm mới dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Job form component
  const JobForm = ({ onSubmit, isEditing = false, onCancel }: any) => {
    if (loadingOptions) {
      return (
        <Box style={{ textAlign: 'center', padding: '40px' }}>
          <Loader size="sm" />
          <Text mt="md">Đang tải dữ liệu lựa chọn...</Text>
        </Box>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Tiêu đề công việc *"
            placeholder="Nhập tiêu đề công việc"
            {...register("jobTitle", { required: "Tiêu đề là bắt buộc" })}
            error={errors.jobTitle?.message}
            leftSection={<IconBriefcase size={16} />}
            required
            disabled={submitting}
          />

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Địa điểm làm việc *"
                placeholder="VD: Remote, 123 Nguyễn Huệ, HCM"
                {...register("workAddress", { required: "Địa điểm là bắt buộc" })}
                error={errors.workAddress?.message}
                leftSection={<IconMapPin size={16} />}
                required
                disabled={submitting}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: "Số lượng là bắt buộc", min: { value: 1, message: "Số lượng phải lớn hơn 0" } }}
                render={({ field }) => (
                  <NumberInput
                    label="Số lượng tuyển *"
                    placeholder="Số lượng"
                    min={1}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.quantity?.message}
                    leftSection={<IconUsers size={16} />}
                    required
                    disabled={submitting}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <Controller
                name="majorId"
                control={control}
                rules={{ required: "Ngành nghề là bắt buộc" }}
                render={({ field }) => (
                  <Select
                    label="Ngành nghề *"
                    placeholder="Chọn ngành nghề"
                    data={dropdownData.majors}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.majorId?.message}
                    required
                    disabled={submitting}
                    searchable
                    nothingFoundMessage="Không tìm thấy ngành nghề"
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="jobTypeId"
                control={control}
                rules={{ required: "Loại hình là bắt buộc" }}
                render={({ field }) => (
                  <Select
                    label="Loại hình công việc *"
                    placeholder="Chọn loại hình"
                    data={dropdownData.jobTypes}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.jobTypeId?.message}
                    required
                    disabled={submitting}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <Controller
                name="salaryLevelId"
                control={control}
                rules={{ required: "Mức lương là bắt buộc" }}
                render={({ field }) => (
                  <Select
                    label="Mức lương *"
                    placeholder="Chọn mức lương"
                    data={dropdownData.salaryLevels}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.salaryLevelId?.message}
                    required
                    disabled={submitting}
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="rankId"
                control={control}
                rules={{ required: "Cấp bậc là bắt buộc" }}
                render={({ field }) => (
                  <Select
                    label="Cấp bậc *"
                    placeholder="Chọn cấp bậc"
                    data={dropdownData.ranks}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.rankId?.message}
                    required
                    disabled={submitting}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <Controller
                name="addressId"
                control={control}
                rules={{ required: "Khu vực là bắt buộc" }}
                render={({ field }) => (
                  <Select
                    label="Khu vực *"
                    placeholder="Chọn khu vực"
                    data={dropdownData.addresses}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.addressId?.message}
                    required
                    disabled={submitting}
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="genderRequirement"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Yêu cầu giới tính"
                    placeholder="Chọn giới tính"
                    data={dropdownData.genderOptions}
                    value={field.value || 'ANY'}
                    onChange={field.onChange}
                    disabled={submitting}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Ngày hết hạn *"
                type="date"
                {...register("expirationDate", { 
                  required: "Ngày hết hạn là bắt buộc",
                  validate: value => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return selectedDate >= today || "Ngày hết hạn phải lớn hơn hoặc bằng ngày hiện tại";
                  }
                })}
                error={errors.expirationDate?.message}
                leftSection={<IconCalendar size={16} />}
                required
                disabled={submitting}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Mô tả công việc *"
            placeholder="Mô tả chi tiết công việc, trách nhiệm..."
            minRows={3}
            {...register("jobDescription", { required: "Mô tả công việc là bắt buộc" })}
            error={errors.jobDescription?.message}
            required
            disabled={submitting}
          />

          <Textarea
            label="Yêu cầu ứng viên"
            placeholder="Yêu cầu về kinh nghiệm, bằng cấp, kỹ năng..."
            minRows={3}
            {...register("candidateRequirement")}
            disabled={submitting}
          />

          <Textarea
            label="Kỹ năng liên quan"
            placeholder="Các kỹ năng cần thiết..."
            minRows={2}
            {...register("relatedSkills")}
            disabled={submitting}
          />

          <Textarea
            label="Phúc lợi"
            placeholder="Các phúc lợi, đãi ngộ..."
            minRows={2}
            {...register("benefits")}
            disabled={submitting}
          />

          <Textarea
            label="Ghi chú"
            placeholder="Ghi chú thêm (nếu có)..."
            minRows={2}
            {...register("note")}
            disabled={submitting}
          />

          <Group justify="flex-end" mt="md">
            <Button 
              variant="outline" 
              onClick={onCancel}
              disabled={submitting}
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              loading={submitting}
              leftSection={isEditing ? <IconEdit size={16} /> : <IconPlus size={16} />}
              disabled={submitting}
            >
              {isEditing ? 'Cập nhật' : 'Đăng bài'}
            </Button>
          </Group>
        </Stack>
      </form>
    );
  };

  return (
    <Container size="xl" py="xl" className='min-h-[100vh]'>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Quản lý Bài đăng Tuyển dụng</Title>
          <Text c="dimmed" size="sm">
            Tạo và quản lý các bài đăng tuyển dụng của công ty bạn
          </Text>
        </div>
        <Group>
          <Button 
            variant="outline" 
            leftSection={<IconRefresh size={16} />}
            onClick={refreshData}
            loading={loading}
          >
            Làm mới
          </Button>
          <Button 
            leftSection={<IconPlus size={16} />} 
            onClick={openCreateModal}
            color="green"
            disabled={loading}
          >
            Đăng bài mới
          </Button>
        </Group>
      </Group>

      {/* Stats */}
      {!loading && (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm">Tổng số bài</Text>
                <Title order={3}>{jobs.length}</Title>
              </div>
              <IconBriefcase size={24} color="var(--mantine-color-blue-6)" />
            </Group>
          </Paper>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm">Đang hoạt động</Text>
                <Title order={3}>{jobs.filter(j => j.status).length}</Title>
              </div>
              <IconCheck size={24} color="var(--mantine-color-green-6)" />
            </Group>
          </Paper>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm">Đã đóng</Text>
                <Title order={3}>{jobs.filter(j => !j.status).length}</Title>
              </div>
              <IconX size={24} color="var(--mantine-color-red-6)" />
            </Group>
          </Paper>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm">Lượt xem</Text>
                <Title order={3}>{jobs.reduce((sum, job) => sum + job.views, 0)}</Title>
              </div>
              <IconEye size={24} color="var(--mantine-color-yellow-6)" />
            </Group>
          </Paper>
        </SimpleGrid>
      )}

      {/* Search and Filters */}
      <Card withBorder mb="xl">
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <TextInput
              placeholder="Tìm kiếm theo tiêu đề, địa điểm, ngành nghề..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              w="100%"
              disabled={loading}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Group justify="flex-end">
              <ActionIcon 
                variant={viewMode === 'list' ? 'filled' : 'outline'} 
                onClick={() => setViewMode('list')}
                disabled={loading}
              >
                <IconList size={18} />
              </ActionIcon>
              <ActionIcon 
                variant={viewMode === 'grid' ? 'filled' : 'outline'} 
                onClick={() => setViewMode('grid')}
                disabled={loading}
              >
                <IconLayoutGrid size={18} />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Jobs List */}
      {loading ? (
        <Box style={{ textAlign: 'center', padding: '40px' }}>
          <Loader size="lg" />
          <Text mt="md">Đang tải danh sách công việc...</Text>
        </Box>
      ) : filteredJobs.length === 0 ? (
        <Card withBorder>
          <Alert color="blue" title={searchTerm ? "Không tìm thấy kết quả" : "Chưa có bài đăng nào"}>
            <Text>
              {searchTerm 
                ? `Không tìm thấy công việc nào phù hợp với "${searchTerm}"`
                : "Bạn chưa có bài đăng tuyển dụng nào. Hãy tạo bài đăng đầu tiên!"
              }
            </Text>
            <Button mt="md" onClick={searchTerm ? () => setSearchTerm('') : openCreateModal}>
              {searchTerm ? 'Xóa tìm kiếm' : 'Tạo bài đăng đầu tiên'}
            </Button>
          </Alert>
        </Card>
      ) : viewMode === 'list' ? (
        // List View
        <Card withBorder>
          <ScrollArea>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Tiêu đề</Table.Th>
                  <Table.Th>Ngành</Table.Th>
                  <Table.Th>Số lượng</Table.Th>
                  <Table.Th>Lương</Table.Th>
                  <Table.Th>Hạn nộp</Table.Th>
                  <Table.Th>Trạng thái</Table.Th>
                  <Table.Th>Thao tác</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredJobs.map((job) => (
                  <Table.Tr key={job.id}>
                    <Table.Td>
                      <Text fw={500}>{job.jobTitle}</Text>
                      <Text size="sm" c="dimmed">{job.workAddress}</Text>
                    </Table.Td>
                    <Table.Td>{job.major.name}</Table.Td>
                    <Table.Td>{job.quantity}</Table.Td>
                    <Table.Td>{job.salaryLevel.name}</Table.Td>
                    <Table.Td>{formatDate(job.expirationDate)}</Table.Td>
                    <Table.Td>{getStatusBadge(job.status)}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon 
                          variant="subtle" 
                          color="blue"
                          onClick={() => openEdit(job)}
                          title="Chỉnh sửa"
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon 
                          variant="subtle" 
                          color="red"
                          onClick={() => openDelete(job.id)}
                          title="Xóa"
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      ) : (
        // Grid View
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {filteredJobs.map((job) => (
            <Card withBorder key={job.id} padding="lg" radius="md">
              <Group justify="space-between" mb="xs">
                <Badge color="blue">{job.major.name}</Badge>
                {getStatusBadge(job.status)}
              </Group>
              
              <Title order={4} mb="xs" lineClamp={1}>{job.jobTitle}</Title>
              
              <Group gap="xs" mb="sm">
                <IconMapPin size={14} />
                <Text size="sm" lineClamp={1}>{job.workAddress}</Text>
              </Group>
              
              <Group gap="xs" mb="sm">
                <IconUsers size={14} />
                <Text size="sm">Số lượng: {job.quantity}</Text>
              </Group>
              
              <Group gap="xs" mb="sm">
                <IconCash size={14} />
                <Text size="sm" lineClamp={1}>Lương: {job.salaryLevel.name}</Text>
              </Group>
              
              <Group gap="xs" mb="md">
                <IconCalendar size={14} />
                <Text size="sm">Hạn nộp: {formatDate(job.expirationDate)}</Text>
              </Group>
              
              <Text size="sm" c="dimmed" lineClamp={3} mb="md">
                {job.jobDescription}
              </Text>
              
              <Group justify="space-between" mt="auto">
                <Group gap="xs">
                  <IconEye size={14} />
                  <Text size="sm">{job.views} lượt xem</Text>
                </Group>
                <Group gap="xs">
                  <ActionIcon 
                    variant="subtle" 
                    color="blue"
                    onClick={() => openEdit(job)}
                    title="Chỉnh sửa"
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon 
                    variant="subtle" 
                    color="red"
                    onClick={() => openDelete(job.id)}
                    title="Xóa"
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* Create Job Modal */}
      <Modal 
        opened={createModalOpened} 
        onClose={closeCreateModal} 
        title="Đăng bài tuyển dụng mới"
        size="lg"
        closeOnClickOutside={!submitting}
      >
        <JobForm 
          onSubmit={onCreateSubmit} 
          onCancel={closeCreateModal}
        />
      </Modal>

      {/* Edit Job Modal */}
      <Modal 
        opened={editModalOpened} 
        onClose={closeEditModal} 
        title="Chỉnh sửa bài tuyển dụng"
        size="lg"
        closeOnClickOutside={!submitting}
      >
        {editingJob && (
          <JobForm 
            onSubmit={onEditSubmit} 
            onCancel={closeEditModal}
            isEditing 
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        opened={deleteModalOpened} 
        onClose={closeDeleteModal} 
        title="Xác nhận xóa"
        size="sm"
      >
        <Stack>
          <Alert color="red" title="Cảnh báo">
            Bạn có chắc chắn muốn xóa bài tuyển dụng này? Hành động này không thể hoàn tác.
          </Alert>
          <Group justify="flex-end">
            <Button variant="outline" onClick={closeDeleteModal} disabled={submitting}>
              Hủy
            </Button>
            <Button color="red" onClick={handleDelete} loading={submitting}>
              Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default PostJobPage;