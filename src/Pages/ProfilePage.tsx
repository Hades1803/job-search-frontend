import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getEmployer, updateEmployer, Employer } from "../Services/employerService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  Loader,
  Avatar,
  Box,
  Grid,
  Divider
} from "@mantine/core";
import { 
  IconBuilding, 
  IconUser, 
  IconPhone, 
  IconMapPin, 
  IconWorld, 
  IconUsers,
  IconEdit,
  IconCheck,
  IconX
} from "@tabler/icons-react";

const EmployerPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Employer>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [employerData, setEmployerData] = useState<Employer | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getEmployer();
      setEmployerData(data);
      reset(data);
      showToast("Đã tải thông tin công ty thành công!", "success");
    } catch (err) {
      console.error(err);
      showToast("Không thể tải thông tin công ty!", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    // Sử dụng toastify với config đơn giản
    const toastOptions = {
      position: "top-right" as const,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch(type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'info':
        toast.info(message, toastOptions);
        break;
      case 'warning':
        toast.warning(message, toastOptions);
        break;
    }
  };

  const onSubmit: SubmitHandler<Employer> = async (data) => {
    setSaving(true);
    try {
      await updateEmployer(data);
      showToast("Cập nhật thông tin thành công!", "success");
      setEditMode(false);
      loadData(); // Refresh data
    } catch (error) {
      console.error(error);
      showToast("Cập nhật thất bại!", "error");
    } finally {
      setSaving(false);
    }
  };
  if (!employerData) {
    return (
      <Container size="lg" py={40}>
        <Card>
          <Text>Không có dữ liệu công ty</Text>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      {/* Header with Cover and Avatar */}
      <Card padding={0} mb="xl" radius="md" withBorder>
        {/* Cover Image */}
        <Box
          style={{
            height: 200,
            background: employerData.coverImage 
              ? `url(${employerData.coverImage}) center/cover no-repeat`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderTopLeftRadius: 'var(--mantine-radius-md)',
            borderTopRightRadius: 'var(--mantine-radius-md)',
            position: 'relative'
          }}
        />

        {/* Avatar Container */}
        <Box
          style={{
            position: 'relative',
            marginTop: -60,
            marginLeft: 40,
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '4px solid white',
            backgroundColor: 'white'
          }}
        >
          <Avatar
            src={employerData.logoImage}
            size={112}
            radius="50%"
            alt="Company Logo"
          />
        </Box>

        {/* Company Name and Edit Button */}
        <Group justify="space-between" style={{ padding: '20px 40px' }}>
          <Box style={{ marginTop: 40 }}>
            <Title order={2}>{employerData.employerName}</Title>
            <Text c="dimmed" size="lg">
              {employerData.representativePosition}
            </Text>
          </Box>
          
          {!editMode ? (
            <Button 
              leftSection={<IconEdit size={16} />}
              onClick={() => setEditMode(true)}
              variant="light"
            >
              Chỉnh sửa
            </Button>
          ) : (
            <Group>
              <Button 
                variant="outline" 
                leftSection={<IconX size={16} />}
                onClick={() => {
                  setEditMode(false);
                  reset(employerData);
                  showToast("Đã hủy thay đổi", "info");
                }}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                form="employer-form"
                loading={saving}
                leftSection={<IconCheck size={16} />}
                color="green"
              >
                Lưu thay đổi
              </Button>
            </Group>
          )}
        </Group>
      </Card>

      {/* Main Content */}
      {editMode ? (
        // Edit Form
        <form id="employer-form" onSubmit={handleSubmit(onSubmit)}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">Chỉnh sửa thông tin công ty</Title>
            
            <Stack gap="md">
              <TextInput
                label="Tên công ty"
                placeholder="Nhập tên công ty"
                leftSection={<IconBuilding size={16} />}
                {...register("employerName")}
                required
              />

              <Group grow>
                <TextInput
                  label="Người đại diện"
                  placeholder="Họ và tên"
                  leftSection={<IconUser size={16} />}
                  {...register("representativeName")}
                />
                <TextInput
                  label="Chức vụ"
                  placeholder="Vị trí đại diện"
                  leftSection={<IconUser size={16} />}
                  {...register("representativePosition")}
                />
              </Group>

              <TextInput
                label="Số điện thoại"
                placeholder="Số điện thoại liên hệ"
                leftSection={<IconPhone size={16} />}
                {...register("phone")}
              />

              <TextInput
                label="Địa chỉ"
                placeholder="Địa chỉ công ty"
                leftSection={<IconMapPin size={16} />}
                {...register("address")}
              />

              <Group grow>
                <TextInput
                  label="Website"
                  placeholder="https://example.com"
                  leftSection={<IconWorld size={16} />}
                  {...register("website")}
                />
                <TextInput
                  label="Quy mô công ty"
                  placeholder="VD: 50-100 nhân viên"
                  leftSection={<IconUsers size={16} />}
                  {...register("scale")}
                />
              </Group>

              <Group grow>
                <TextInput
                  label="Logo URL"
                  placeholder="https://example.com/logo.png"
                  leftSection={<IconBuilding size={16} />}
                  {...register("logoImage")}
                />
                <TextInput
                  label="Ảnh bìa URL"
                  placeholder="https://example.com/cover.jpg"
                  leftSection={<IconBuilding size={16} />}
                  {...register("coverImage")}
                />
              </Group>

              <Textarea
                label="Mô tả công ty"
                placeholder="Mô tả về công ty của bạn..."
                minRows={4}
                {...register("description")}
              />
            </Stack>
          </Card>
        </form>
      ) : (
        // View Mode
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
              <Title order={3} mb="md">Thông tin công ty</Title>
              
              <Stack gap="md">
                <Group>
                  <IconUser size={20} />
                  <div>
                    <Text fw={500}>Người đại diện</Text>
                    <Text c="dimmed">{employerData.representativeName || 'Chưa có thông tin'}</Text>
                  </div>
                </Group>

                <Group>
                  <IconPhone size={20} />
                  <div>
                    <Text fw={500}>Số điện thoại</Text>
                    <Text c="dimmed">{employerData.phone || 'Chưa có thông tin'}</Text>
                  </div>
                </Group>

                <Group>
                  <IconMapPin size={20} />
                  <div>
                    <Text fw={500}>Địa chỉ</Text>
                    <Text c="dimmed">{employerData.address || 'Chưa có thông tin'}</Text>
                  </div>
                </Group>

                <Group>
                  <IconWorld size={20} />
                  <div>
                    <Text fw={500}>Website</Text>
                    {employerData.website ? (
                      <Text c="blue">
                        <a href={employerData.website} target="_blank" rel="noopener noreferrer">
                          {employerData.website}
                        </a>
                      </Text>
                    ) : (
                      <Text c="dimmed">Chưa có thông tin</Text>
                    )}
                  </div>
                </Group>

                <Group>
                  <IconUsers size={20} />
                  <div>
                    <Text fw={500}>Quy mô công ty</Text>
                    <Text c="dimmed">{employerData.scale || 'Chưa có thông tin'}</Text>
                  </div>
                </Group>

                <Divider my="sm" />

                <div>
                  <Text fw={500} mb="xs">Mô tả công ty</Text>
                  <Text style={{ whiteSpace: 'pre-wrap' }}>
                    {employerData.description || 'Chưa có mô tả'}
                  </Text>
                </div>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">URL hình ảnh</Title>
              
              <Stack gap="md">
                <div>
                  <Text fw={500} size="sm" c="dimmed">Logo URL</Text>
                  {employerData.logoImage ? (
                    <Text truncate size="sm">{employerData.logoImage}</Text>
                  ) : (
                    <Text c="dimmed" size="sm">Chưa có logo</Text>
                  )}
                </div>

                <div>
                  <Text fw={500} size="sm" c="dimmed">Ảnh bìa URL</Text>
                  {employerData.coverImage ? (
                    <Text truncate size="sm">{employerData.coverImage}</Text>
                  ) : (
                    <Text c="dimmed" size="sm">Chưa có ảnh bìa</Text>
                  )}
                </div>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
};

export default EmployerPage;