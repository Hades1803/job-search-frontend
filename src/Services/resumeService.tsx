import axios from "axios";

const API_URL = "http://localhost:8081";

// ---- Interfaces ---- //

// Interface cho ResumeContent
export interface ResumeContent {
  personal?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    position: string;
  };
  careerObjective?: string;
  education?: Array<{
    school: string;
    degree: string;
    from: string;
    to: string;
  }>;
  experience?: Array<{
    company: string;
    role: string;
    from: string;
    to: string;
    description: string;
  }>;
  skills?: string[];
  projects?: Array<{
    name: string;
    description: string;
  }>;
}

export interface ResumeRequest {
  resumeName: string;
  templateCode: string;
  content: string; // JSON string của ResumeContent
}

export interface ResumeResponse {
  id: number;
  resumeName: string;
  templateCode: string;
  content: string; // JSON string
  updatedAt: string;
}

// ---- Helper: headers ---- //
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ---- API Calls ---- //

// GET danh sách CV của candidate
export const getMyResumes = async (): Promise<ResumeResponse[]> => {
  try {
    const response = await axios.get<ResumeResponse[]>(
      `${API_URL}/api/candidate/resumes`,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching resumes:", error.response?.data || error.message);
    throw error;
  }
};

// GET CV theo ID (preview)
export const getResumeById = async (id: string | number): Promise<ResumeResponse> => {
  try {
    const response = await axios.get<ResumeResponse>(
      `${API_URL}/api/candidate/resumes/${id}`,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching resume:", error.response?.data || error.message);
    throw error;
  }
};

// POST tạo CV mới
export const createResume = async (
  data: ResumeRequest
): Promise<ResumeResponse> => {
  try {
    const response = await axios.post<ResumeResponse>(
      `${API_URL}/api/candidate/resumes`,
      data,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating resume:", error.response?.data || error.message);
    throw error;
  }
};

// PUT cập nhật CV
export const updateResume = async (
  id: number,
  data: ResumeRequest
): Promise<ResumeResponse> => {
  try {
    const response = await axios.put<ResumeResponse>(
      `${API_URL}/api/candidate/resumes/${id}`,
      data,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating resume:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE CV
export const deleteResume = async (id: number): Promise<void> => {
  try {
    await axios.delete(
      `${API_URL}/api/candidate/resumes/${id}`,
      { headers: getHeaders() }
    );
  } catch (error: any) {
    console.error("Error deleting resume:", error.response?.data || error.message);
    throw error;
  }
};