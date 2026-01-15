import React from 'react';
import { Card, Text, Group, Badge, Avatar, Stack, Box } from '@mantine/core';
import { IconMapPin, IconBriefcase, IconCalendar, IconCurrencyDollar } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { PublicJobResponse } from '../Services/publicJobService';

interface JobCardProps {
  job: PublicJobResponse;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Calculate days ago
  const calculateDaysAgo = (postedDate: string) => {
    try {
      const posted = new Date(postedDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - posted.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const daysAgo = calculateDaysAgo(job.postedDate);

  // Kiểm tra job.id có hợp lệ không
  const jobId = job?.id;
  if (!jobId || isNaN(jobId)) {
    console.error('Invalid job ID:', jobId);
    return null;
  }

  return (
    <Link to={`/jobs/${jobId}`} style={{ textDecoration: 'none' }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
      >
        {/* Header */}
        <Group justify="space-between" mb="md" align="flex-start">
          <Group gap="xs" wrap="nowrap">
            <Avatar
              size="md"
              radius="sm"
              color="blue"
              variant="light"
            >
              {job.jobTitle?.charAt(0) || 'J'}
            </Avatar>
            <Stack gap={2} style={{ flex: 1 }}>
              <Text fw={600} size="md" lineClamp={1}>
                {job.jobTitle || 'Không có tiêu đề'}
              </Text>
              <Text size="sm" c="dimmed" lineClamp={1}>
                {job.employerName || 'Không xác định'}
              </Text>
            </Stack>
          </Group>
          <Badge color={job.status ? 'green' : 'red'} variant="light" size="sm">
            {job.status ? 'Đang tuyển' : 'Đã đóng'}
          </Badge>
        </Group>

        {/* Job info */}
        <Stack gap="xs" mb="md">
          <Group gap={4}>
            <IconMapPin size={14} />
            <Text size="sm" c="dimmed" lineClamp={1}>
              {job.workAddress || job.addressName || 'Không xác định'}
            </Text>
          </Group>
          <Group gap={4}>
            <IconBriefcase size={14} />
            <Text size="sm" c="dimmed" lineClamp={1}>
              {job.jobTypeName || 'Toàn thời gian'} • {job.rankName || ''}
            </Text>
          </Group>
        </Stack>

        {/* Skills tags */}
        {job.relatedSkills && (
          <Group gap={4} mb="md" wrap="wrap">
            {job.relatedSkills.split(',').slice(0, 2).map((skill, index) => (
              <Badge key={index} size="xs" variant="outline" color="blue">
                {skill.trim()}
              </Badge>
            ))}
            {job.relatedSkills.split(',').length > 2 && (
              <Badge size="xs" variant="light" color="gray">
                +{job.relatedSkills.split(',').length - 2}
              </Badge>
            )}
          </Group>
        )}

        {/* Job description preview */}
        {job.jobDescription && (
          <Box mb="md" style={{ flex: 1 }}>
            <Text size="sm" lineClamp={3} c="dimmed">
              {truncateText(job.jobDescription, 120)}
            </Text>
          </Box>
        )}

        {/* Footer */}
        <Group justify="space-between" mt="auto">
          <Group gap={4}>
            <IconCurrencyDollar size={14} />
            <Text size="sm" fw={500}>
              {job.salaryLevelName || 'Thương lượng'}
            </Text>
          </Group>
          <Group gap={4}>
            <IconCalendar size={12} />
            <Text size="xs" c="dimmed">
              {daysAgo === 0 ? 'Hôm nay' : `${daysAgo} ngày`}
            </Text>
          </Group>
        </Group>
      </Card>
    </Link>
  );
};

export default JobCard;