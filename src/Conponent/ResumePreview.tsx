import React from 'react';
import {
  Box,
  Button,
  Group,
  Stack,
  ActionIcon,
  Paper,
  Loader
} from '@mantine/core';
import {
  IconPrinter,
  IconDownload,
  IconX
} from '@tabler/icons-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TemplateBasic from './templates/TemplateBasic';
import TemplateModern from './templates/TemplateModern';
import { type ResumeResponse } from '../Services/resumeService';
import ResumePDF from './ResumePDF';

interface ResumePreviewProps {
  resume: ResumeResponse;
  onClose?: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (resume.templateCode) {
      case 'template_modern':
        return <TemplateModern data={resume.content} />;
      case 'template_basic':
      default:
        return <TemplateBasic data={resume.content} />;
    }
  };

  // Chuyển đổi templateCode sang template name cho PDF
  const getPDFTemplate = (): 'basic' | 'modern' => {
    switch (resume.templateCode) {
      case 'template_modern':
        return 'modern';
      case 'template_basic':
      default:
        return 'basic';
    }
  };

  // Parse content từ string sang object
  const getResumeData = () => {
    try {
      return typeof resume.content === 'string' 
        ? JSON.parse(resume.content) 
        : resume.content;
    } catch (error) {
      console.error('Error parsing resume content:', error);
      return {};
    }
  };

  // Tạo tên file PDF
  const getFileName = () => {
    const data = getResumeData();
    const name = data.personal?.fullName?.replace(/\s+/g, '_') || 'CV';
    const date = new Date().toISOString().slice(0, 10);
    return `CV_${name}_${date}.pdf`;
  };

  // Tạo custom button component để tách biệt logic
  const PDFDownloadButton = () => (
    <PDFDownloadLink
      document={
        <ResumePDF 
          data={getResumeData()} 
          template={getPDFTemplate()}
        />
      }
      fileName={getFileName()}
    >
      {({ loading }) => (
        <Button
          leftSection={
            loading ? <Loader size="xs" /> : <IconDownload size={18} />
          }
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Đang tạo PDF...' : 'Tải xuống PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );

  return (
    <Stack gap="md">
      {/* Action Buttons */}
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Group>
            <Button
              variant="outline"
              leftSection={<IconPrinter size={18} />}
              onClick={handlePrint}
            >
              In CV
            </Button>

            {/* Nút tải PDF */}
            <PDFDownloadButton />
          </Group>
          
          {onClose && (
            <ActionIcon
              variant="light"
              color="gray"
              onClick={onClose}
              size="lg"
            >
              <IconX size={18} />
            </ActionIcon>
          )}
        </Group>
      </Paper>

      {/* Resume Preview */}
      <Box
        style={{
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
          padding: 16,
          backgroundColor: '#f8f9fa',
          borderRadius: 'var(--mantine-radius-md)',
        }}
      >
        {renderTemplate()}
      </Box>
    </Stack>
  );
};

export default ResumePreview;