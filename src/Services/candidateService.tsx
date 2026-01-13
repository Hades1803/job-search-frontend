import axios from "axios";

const API_URL = "https://job-search-backend-bcgv.onrender.com/api/candidate/me";

/**
 * Candidate data trả về từ backend
 */
export interface Candidate {
  id?: number;
  name: string;
  phone: string;
  gender: string;
  birthDate: string; // yyyy-MM-dd
  address: string;
  avatar?: string | null;
  coverImageFile?: string | null;
}


export interface CandidateProfileRequest {
  name: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: string;
  avatarFile?: File | null;
  coverImageFile?: File | null;
}


export const getCandidate = async (): Promise<Candidate> => {
  try {
    const response = await axios.get<Candidate>(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching candidate profile", error);
    throw error;
  }
};

/**
 * UPDATE my candidate profile
 */
export const updateCandidate = async (
  data: CandidateProfileRequest
): Promise<Candidate> => {
  try {
    const formData = new FormData();

    // TEXT FIELDS
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("birthDate", data.birthDate);
    formData.append("address", data.address);

    // FILE FIELDS (đúng tên DTO)
    if (data.avatarFile) {
      formData.append("avatarFile", data.avatarFile);
    }

    if (data.coverImageFile) {
      formData.append("coverFile", data.coverImageFile);
    }

    const response = await axios.put(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating candidate profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};
