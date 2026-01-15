import React from 'react';
import {
  SimpleGrid,
  Card,
  Text,
  Group,
  Stack,
  Radio,
  Box,
  Badge,
  useMantineTheme,
  useMantineColorScheme,
  rgba
} from '@mantine/core';
import {
  IconLayout,
  IconPalette,
  IconSparkles
} from '@tabler/icons-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateCode: string) => void;
}

const templates = [
  {
    code: 'template_basic',
    name: 'Template Cơ Bản',
    description: 'Layout truyền thống, phù hợp cho mọi ngành nghề',
    icon: IconLayout,
    color: 'blue'
  },
  {
    code: 'template_modern',
    name: 'Template Hiện Đại',
    description: 'Thiết kế hiện đại với sidebar, phù hợp cho IT và Design',
    icon: IconPalette,
    color: 'indigo'
  },
  {
    code: 'template_creative',
    name: 'Template Sáng Tạo',
    description: 'Thiết kế sáng tạo, phù hợp cho Marketing và Creative',
    icon: IconSparkles,
    color: 'violet'
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onTemplateChange 
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Radio.Group
      value={selectedTemplate}
      onChange={(value) => onTemplateChange(value)}
      size="md"
    >
      <SimpleGrid
        cols={3}
        spacing="lg"
      >
        {templates.map((template) => {
          const Icon = template.icon;
          const color = theme.colors[template.color][6];
          const bgColor = isDark ? theme.colors.dark[6] : theme.colors.gray[0];
          const borderColor = isDark ? theme.colors.dark[4] : theme.colors.gray[2];
          const barColor = isDark ? theme.colors.dark[3] : theme.colors.gray[4];
          
          return (
            <Card
              key={template.code}
              withBorder
              radius="md"
              style={{
                cursor: 'pointer',
                borderColor: selectedTemplate === template.code ? color : undefined,
                borderWidth: selectedTemplate === template.code ? 2 : 1,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = theme.shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => onTemplateChange(template.code)}
            >
              <Stack gap="md">
                <Group justify="space-between">
                  <Badge color={template.color} variant="light">
                    {template.name.split(' ')[0]}
                  </Badge>
                  <Radio value={template.code} />
                </Group>

                <Group>
                  <Box
                    style={{
                      backgroundColor: rgba(color, 0.1),
                      padding: theme.spacing.xs,
                      borderRadius: theme.radius.md,
                    }}
                  >
                    <Icon size={24} color={color} />
                  </Box>
                  <div>
                    <Text fw={500}>{template.name}</Text>
                    <Text size="sm" c="dimmed">{template.description}</Text>
                  </div>
                </Group>

                {/* Template Preview */}
                <Box
                  style={{
                    backgroundColor: bgColor,
                    borderRadius: theme.radius.sm,
                    padding: theme.spacing.sm,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <Box
                    style={{
                      height: 8,
                      backgroundColor: color,
                      borderRadius: theme.radius.sm,
                      marginBottom: theme.spacing.xs,
                    }}
                  />
                  <Group gap="xs" wrap="nowrap">
                    <Box
                      style={{
                        width: '30%',
                        height: 60,
                        backgroundColor: template.code === 'template_modern' ? '#2c3e50' : color,
                        borderRadius: theme.radius.sm,
                      }}
                    />
                    <Box style={{ flex: 1 }}>
                      <Box
                        style={{
                          height: 6,
                          backgroundColor: barColor,
                          borderRadius: theme.radius.sm,
                          marginBottom: 4,
                        }}
                      />
                      <Box
                        style={{
                          height: 6,
                          backgroundColor: barColor,
                          borderRadius: theme.radius.sm,
                          marginBottom: 4,
                          width: '80%',
                        }}
                      />
                      <Box
                        style={{
                          height: 6,
                          backgroundColor: barColor,
                          borderRadius: theme.radius.sm,
                          width: '60%',
                        }}
                      />
                    </Box>
                  </Group>
                </Box>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Radio.Group>
  );
};

export default TemplateSelector;