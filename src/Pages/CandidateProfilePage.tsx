import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getCandidate, updateCandidate, Candidate, CandidateProfileRequest } from "../Services/candidateService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Container, 
  Card, 
  TextInput, 
  Button, 
  Group, 
  Stack, 
  Title, 
  Text,
  Loader,
  Avatar,
  Box,
  Grid,
  Select,
  FileInput,
  Flex
} from "@mantine/core";
import { 
  IconUser, 
  IconPhone, 
  IconCalendar, 
  IconMapPin, 
  IconGenderMale,
  IconGenderFemale,
  IconGenderAgender,
  IconEdit,
  IconCheck,
  IconX,
  IconPhoto
} from "@tabler/icons-react";
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';

const CandidateProfilePage: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    watch, 
    control,
    formState: { errors } 
  } = useForm<CandidateProfileRequest>({
    defaultValues: {
      name: '',
      phone: '',
      gender: '',
      birthDate: '',
      address: '',
      avatarFile: null,
      coverImageFile: null
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [candidateData, setCandidateData] = useState<Candidate | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const avatarFile = watch("avatarFile");
  const coverImageFile = watch("coverImageFile");
  const gender = watch("gender");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (avatarFile && avatarFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(avatarFile);
    }
  }, [avatarFile]);

  useEffect(() => {
    if (coverImageFile && coverImageFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(coverImageFile);
    }
  }, [coverImageFile]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCandidate();
      setCandidateData(data);
      
      // Reset form với dữ liệu từ API
      reset({
        name: data.name,
        phone: data.phone,
        gender: data.gender,
        birthDate: data.birthDate,
        address: data.address,
        avatarFile: null,
        coverImageFile: null
      });
      
      // Set preview images
      if (data.avatar) setAvatarPreview(data.avatar);
      if (data.coverImageFile) setCoverPreview(data.coverImageFile);
      
      showToast("Đã tải thông tin cá nhân thành công!", "success");
    } catch (err) {
      console.error(err);
      showToast("Không thể tải thông tin cá nhân!", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
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

  const onSubmit: SubmitHandler<CandidateProfileRequest> = async (data) => {
    setSaving(true);
    try {
      await updateCandidate(data);
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

  const handleAvatarChange = (file: File | null) => {
    setValue("avatarFile", file);
  };

  const handleCoverChange = (file: File | null) => {
    setValue("coverImageFile", file);
  };

  const handleBirthDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      setValue("birthDate", formattedDate);
    } else {
      setValue("birthDate", '');
    }
  };

  const handleGenderChange = (value: string | null) => {
    setValue("gender", value || '');
  };

//   if (loading) {
//     return (
//       <Container size="lg" py={40}>
//         <Flex justify="center" align="center">
//           <Loader size="lg" />
//         </Flex>
//       </Container>
//     );
//   }

  if (!candidateData && !loading) {
    return (
      <Container size="lg" py={40}>
        <Card>
          <Text>Không có dữ liệu hồ sơ cá nhân</Text>
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
            background: coverPreview 
              ? `url(${coverPreview}) center/cover no-repeat`
              : candidateData?.coverImageFile
              ? `url(${candidateData.coverImageFile}) center/cover no-repeat`
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
            src={avatarPreview || candidateData?.avatar}
            size={112}
            radius="50%"
            alt="Candidate Avatar"
          />
        </Box>

        {/* Candidate Name and Edit Button */}
        <Group justify="space-between" style={{ padding: '20px 40px' }}>
          <Box style={{ marginTop: 40 }}>
            <Title order={2}>{candidateData?.name}</Title>
            <Text c="dimmed" size="lg">
              {candidateData?.gender === 'MALE' ? 'Nam' : 
               candidateData?.gender === 'FEMALE' ? 'Nữ' : 'Khác'}
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
                  reset({
                    name: candidateData?.name || '',
                    phone: candidateData?.phone || '',
                    gender: candidateData?.gender || '',
                    birthDate: candidateData?.birthDate || '',
                    address: candidateData?.address || '',
                    avatarFile: null,
                    coverImageFile: null
                  });
                  setAvatarPreview(candidateData?.avatar || null);
                  setCoverPreview(candidateData?.coverImageFile || null);
                  showToast("Đã hủy thay đổi", "info");
                }}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                form="candidate-form"
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
        <form id="candidate-form" onSubmit={handleSubmit(onSubmit)}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">Chỉnh sửa thông tin cá nhân</Title>
            
            <Stack gap="md">
              <TextInput
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                leftSection={<IconUser size={16} />}
                {...register("name", { required: "Vui lòng nhập họ tên" })}
                required
                error={errors.name?.message}
              />

              <Group grow>
                <TextInput
                  label="Số điện thoại"
                  placeholder="Số điện thoại liên hệ"
                  leftSection={<IconPhone size={16} />}
                  {...register("phone")}
                />
                
                <Select
                  label="Giới tính"
                  placeholder="Chọn giới tính"
                  leftSection={<IconGenderMale size={16} />}
                  data={[
                    { value: 'MALE', label: 'Nam' },
                    { value: 'FEMALE', label: 'Nữ' },
                    { value: 'OTHER', label: 'Khác' }
                  ]}
                  value={gender}
                  onChange={handleGenderChange}
                />
              </Group>

              <Group grow>
                <DateInput
                  label="Ngày sinh"
                  placeholder="Chọn ngày sinh"
                  leftSection={<IconCalendar size={16} />}
                  valueFormat="DD/MM/YYYY"
                  onChange={handleBirthDateChange}
                  value={candidateData?.birthDate ? new Date(candidateData.birthDate) : null}
                />
                
                <TextInput
                  label="Địa chỉ"
                  placeholder="Địa chỉ hiện tại"
                  leftSection={<IconMapPin size={16} />}
                  {...register("address")}
                />
              </Group>

              <Group grow>
                <FileInput
                  label="Ảnh đại diện"
                  placeholder="Chọn ảnh đại diện"
                  leftSection={<IconPhoto size={16} />}
                  accept="image/*"
                  onChange={handleAvatarChange}
                  clearable
                />
                
                <FileInput
                  label="Ảnh bìa"
                  placeholder="Chọn ảnh bìa"
                  leftSection={<IconPhoto size={16} />}
                  accept="image/*"
                  onChange={handleCoverChange}
                  clearable
                />
              </Group>

              {avatarPreview && (
                <Box>
                  <Text size="sm" mb={5}>Xem trước ảnh đại diện:</Text>
                  <Avatar
                    src={avatarPreview}
                    size={100}
                    radius="md"
                    alt="Avatar Preview"
                  />
                </Box>
              )}

              {coverPreview && (
                <Box>
                  <Text size="sm" mb={5}>Xem trước ảnh bìa:</Text>
                  <Box
                    style={{
                      height: 100,
                      width: '100%',
                      background: `url(${coverPreview}) center/cover no-repeat`,
                      borderRadius: 'var(--mantine-radius-md)'
                    }}
                  />
                </Box>
              )}
            </Stack>
          </Card>
        </form>
      ) : (
        // View Mode
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
              <Title order={3} mb="md">Thông tin cá nhân</Title>
              
              <Stack gap="md">
                <Group>
                  <IconUser size={20} />
                  <div>
                    <Text fw={500}>Họ và tên</Text>
                    <Text c="dimmed">{candidateData?.name || 'Chưa có thông tin'}</Text>
                  </div>
                </Group>

                <Group>
                  <IconPhone size={20} />
                  <div>
                    <Text fw={500}>Số điện thoại</Text>
                    <Text c="dimmed">{candidateData?.phone || 'Chưa có thông tin'}</Text>
                  </div>
                </Group>

                <Group>
                  {candidateData?.gender === 'MALE' ? (
                    <IconGenderMale size={20} />
                  ) : candidateData?.gender === 'FEMALE' ? (
                    <IconGenderFemale size={20} />
                  ) : (
                    <IconGenderAgender size={20} />
                  )}
                  <div>
                    <Text fw={500}>Giới tính</Text>
                    <Text c="dimmed">
                      {candidateData?.gender === 'MALE' ? 'Nam' : 
                       candidateData?.gender === 'FEMALE' ? 'Nữ' : 
                       candidateData?.gender === 'OTHER' ? 'Khác' : 'Chưa có thông tin'}
                    </Text>
                  </div>
                </Group>

                <Group>
                  <IconCalendar size={20} />
                  <div>
                    <Text fw={500}>Ngày sinh</Text>
                    <Text c="dimmed">
                      {candidateData?.birthDate 
                        ? dayjs(candidateData.birthDate).format('DD/MM/YYYY')
                        : 'Chưa có thông tin'}
                    </Text>
                  </div>
                </Group>

                <Group>
                  <IconMapPin size={20} />
                  <div>
                    <Text fw={500}>Địa chỉ</Text>
                    <Text c="dimmed">{candidateData?.address || 'Chưa có thông tin'}</Text>
                  </div>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">Hình ảnh</Title>
              
              <Stack gap="md">
                <div>
                  <Text fw={500} mb="xs">Ảnh đại diện</Text>
                  {candidateData?.avatar ? (
                    <Avatar
                      src={candidateData.avatar}
                      size={100}
                      radius="md"
                      alt="Avatar"
                      mb="md"
                    />
                  ) : (
                    <Text c="dimmed" size="sm">Chưa có ảnh đại diện</Text>
                  )}
                </div>

                <div>
                  <Text fw={500} mb="xs">Ảnh bìa</Text>
                  {candidateData?.coverImageFile ? (
                    <Box
                      style={{
                        height: 100,
                        width: '100%',
                        background: `url(${candidateData.coverImageFile}) center/cover no-repeat`,
                        borderRadius: 'var(--mantine-radius-md)'
                      }}
                    />
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

export default CandidateProfilePage;