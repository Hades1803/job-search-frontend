import axios from "axios";

const API_URL = "https://job-search-backend-bcgv.onrender.com/api/employer/me";

export interface Employer {
  employerName: string;
  representativeName: string;
  representativePosition: string;
  phone: string;
  coverImage?: string | null;
  logoImage?: string | null;
  scale: string;
  description: string;
  address: string;
  website: string;
}

export const getEmployer = async (): Promise<Employer> => {
  try {
    const response = await axios.get<Employer>(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching employer:", error);
    throw error;
  }
};

export const updateEmployer = async (data: Employer): Promise<Employer> => {
  try {
    const formData = new FormData();

    // Thêm các field
    formData.append("employerName", data.employerName || "");
    formData.append("representativeName", data.representativeName || "");
    formData.append("representativePosition", data.representativePosition || "");
    formData.append("phone", data.phone || "");
    formData.append("coverImage", data.coverImage || ""); // nếu là URL hoặc file
    formData.append("logoImage", data.logoImage || "");   // nếu là URL hoặc file
    formData.append("scale", data.scale || "");
    formData.append("description", data.description || "");
    formData.append("address", data.address || "");
    formData.append("website", data.website || "");

    const response = await axios.put(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error updating employer:", error.response?.data || error.message);
    throw error;
  }
};
