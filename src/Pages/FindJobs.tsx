import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Title,
  Text,
  Paper,
  Loader,
  Center,
  Pagination,
  Badge,
  Box,
  Divider,
} from '@mantine/core';
import { IconSearch, IconFilter, IconMapPin, IconBriefcase, IconCurrencyDollar, IconUser } from '@tabler/icons-react';
import { getAllPublicJobs, getFilterOptions, PublicJobResponse, Option } from '../Services/publicJobService';
import JobCard from '../FindJobs/JobCard';

const FindJobPage: React.FC = () => {
  const [jobs, setJobs] = useState<PublicJobResponse[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<PublicJobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter options state
  const [filterOptions, setFilterOptions] = useState<{
    jobTypes: Option[];
    majors: Option[];
    ranks: Option[];
    salaryLevels: Option[];
    addresses: Option[];
  }>({
    jobTypes: [],
    majors: [],
    ranks: [],
    salaryLevels: [],
    addresses: [],
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedSalary, setSelectedSalary] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedRank, setSelectedRank] = useState<string | null>(null);

  // Pagination
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 12;

  // Fetch jobs và filter options
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [jobsData, optionsData] = await Promise.all([
          getAllPublicJobs(),
          getFilterOptions()
        ]);
        
        console.log('Jobs data received:', jobsData);
        console.log('Filter options:', optionsData);
        
        // Đảm bảo jobs là array hợp lệ
        const validJobs = Array.isArray(jobsData) ? jobsData : [];
        setJobs(validJobs);
        setFilteredJobs(validJobs);
        setFilterOptions(optionsData);
        
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
        setJobs([]);
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!Array.isArray(jobs) || jobs.length === 0) {
      setFilteredJobs([]);
      return;
    }

    let result = [...jobs];

    // Search by job title or description
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => {
        const jobTitle = job.jobTitle?.toLowerCase() || '';
        const jobDesc = job.jobDescription?.toLowerCase() || '';
        const candidateReq = job.candidateRequirement?.toLowerCase() || '';
        const skills = job.relatedSkills?.toLowerCase() || '';
        
        return jobTitle.includes(term) || 
               jobDesc.includes(term) || 
               candidateReq.includes(term) ||
               skills.includes(term);
      });
    }

    // Filter by major (dùng majorId)
    if (selectedMajor) {
      result = result.filter(job => job.majorId === selectedMajor);
    }

    // Filter by job type (dùng jobTypeId)
    if (selectedJobType) {
      result = result.filter(job => job.jobTypeId === selectedJobType);
    }

    // Filter by salary level (dùng salaryLevelId)
    if (selectedSalary) {
      result = result.filter(job => job.salaryLevelId === selectedSalary);
    }

    // Filter by location (dùng addressId)
    if (selectedLocation) {
      result = result.filter(job => job.addressId === selectedLocation);
    }

    // Filter by rank (dùng rankId)
    if (selectedRank) {
      result = result.filter(job => job.rankId === selectedRank);
    }

    setFilteredJobs(result);
    setActivePage(1);
  }, [jobs, searchTerm, selectedMajor, selectedJobType, selectedSalary, selectedLocation, selectedRank]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedMajor(null);
    setSelectedJobType(null);
    setSelectedSalary(null);
    setSelectedLocation(null);
    setSelectedRank(null);
  };

  // Get filter badge labels
  const getFilterLabel = (value: string | null, options: Option[]) => {
    if (!value) return '';
    const option = options.find(opt => opt.value === value);
    return option?.label || value;
  };

  if (loading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Paper p="xl" withBorder>
          <Stack align="center" gap="md">
            <Title order={3} c="red">Lỗi tải dữ liệu</Title>
            <Text c="dimmed">{error}</Text>
            <Button onClick={() => window.location.reload()}>
              Thử lại
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack mb="xl" gap="xs">
        <Title order={1}>Tìm kiếm việc làm</Title>
        <Text c="dimmed">
          Tìm thấy {filteredJobs.length} công việc phù hợp với bạn
        </Text>
      </Stack>

      <Paper p="lg" shadow="sm" withBorder mb="xl">
        <Stack>
          <TextInput
            placeholder="Tìm kiếm theo chức danh, kỹ năng, công ty..."
            leftSection={<IconSearch size={18} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="md"
          />

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Select
                label="Ngành nghề"
                placeholder="Tất cả ngành"
                data={filterOptions.majors}
                value={selectedMajor}
                onChange={setSelectedMajor}
                leftSection={<IconBriefcase size={16} />}
                clearable
                searchable
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Select
                label="Loại hình"
                placeholder="Tất cả loại"
                data={filterOptions.jobTypes}
                value={selectedJobType}
                onChange={setSelectedJobType}
                leftSection={<IconBriefcase size={16} />}
                clearable
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Select
                label="Mức lương"
                placeholder="Tất cả mức"
                data={filterOptions.salaryLevels}
                value={selectedSalary}
                onChange={setSelectedSalary}
                leftSection={<IconCurrencyDollar size={16} />}
                clearable
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Select
                label="Địa điểm"
                placeholder="Tất cả địa điểm"
                data={filterOptions.addresses}
                value={selectedLocation}
                onChange={setSelectedLocation}
                leftSection={<IconMapPin size={16} />}
                clearable
                searchable
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Select
                label="Cấp bậc"
                placeholder="Tất cả cấp bậc"
                data={filterOptions.ranks}
                value={selectedRank}
                onChange={setSelectedRank}
                leftSection={<IconUser size={16} />}
                clearable
              />
            </Grid.Col>
          </Grid>

          <Group justify="space-between">
            <Group gap="xs">
              <Badge variant="light" color="blue" size="lg">
                <IconFilter size={12} /> Bộ lọc
              </Badge>
              {selectedMajor && (
                <Badge variant="outline" color="blue" size="md">
                  Ngành: {getFilterLabel(selectedMajor, filterOptions.majors)}
                </Badge>
              )}
              {selectedJobType && (
                <Badge variant="outline" color="green" size="md">
                  Loại: {getFilterLabel(selectedJobType, filterOptions.jobTypes)}
                </Badge>
              )}
              {selectedSalary && (
                <Badge variant="outline" color="orange" size="md">
                  Lương: {getFilterLabel(selectedSalary, filterOptions.salaryLevels)}
                </Badge>
              )}
              {selectedLocation && (
                <Badge variant="outline" color="red" size="md">
                  Địa điểm: {getFilterLabel(selectedLocation, filterOptions.addresses)}
                </Badge>
              )}
              {selectedRank && (
                <Badge variant="outline" color="violet" size="md">
                  Cấp bậc: {getFilterLabel(selectedRank, filterOptions.ranks)}
                </Badge>
              )}
            </Group>
            <Button
              variant="light"
              onClick={handleResetFilters}
              disabled={!searchTerm && !selectedMajor && !selectedJobType && !selectedSalary && !selectedLocation && !selectedRank}
            >
              Xóa bộ lọc
            </Button>
          </Group>
        </Stack>
      </Paper>

      {filteredJobs.length === 0 ? (
        <Center py={100}>
          <Stack align="center" gap="md">
            <Title order={3} c="dimmed">
              Không tìm thấy công việc phù hợp
            </Title>
            <Text c="dimmed">
              {jobs.length === 0 ? 
                'Hiện chưa có công việc nào. Vui lòng quay lại sau.' : 
                'Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'}
            </Text>
            {jobs.length > 0 && (
              <Button onClick={handleResetFilters}>
                Xóa tất cả bộ lọc
              </Button>
            )}
          </Stack>
        </Center>
      ) : (
        <>
          <Grid mb="xl">
            {paginatedJobs.map((job) => {
              // Kiểm tra job.id hợp lệ trước khi render
              if (!job.id || isNaN(job.id)) {
                console.warn('Skipping job with invalid ID:', job);
                return null;
              }
              return (
                <Grid.Col key={job.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <JobCard job={job} />
                </Grid.Col>
              );
            })}
          </Grid>

          {totalPages > 1 && (
            <Box mt="xl">
              <Divider mb="md" />
              <Group justify="center">
                <Pagination
                  value={activePage}
                  onChange={setActivePage}
                  total={totalPages}
                  siblings={1}
                  boundaries={1}
                  size="lg"
                />
              </Group>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default FindJobPage;