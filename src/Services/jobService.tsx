import axios from "axios";

const API_URL = "https://job-search-backend-bcgv.onrender.com";

// ---- Interfaces ---- //

export interface JobRequest {
  jobTitle: string;
  workAddress: string;
  quantity: number;
  genderRequirement: string;
  jobDescription: string;
  candidateRequirement: string;
  relatedSkills: string;
  benefits: string;
  expirationDate: string; 
  note?: string;
  majorId: string;
  jobTypeId: string;
  salaryLevelId: string;
  rankId: string;
  addressId: string;
}

export interface JobResponse {
  id: number;
  major: { id: string; name: string };
  jobType: { id: string; name: string };
  salaryLevel: { id: string; name: string };
  rank: { id: string; name: string };
  address: { id: string; name: string };
  jobTitle: string;
  workAddress: string;
  quantity: number;
  genderRequirement: string;
  jobDescription: string;
  candidateRequirement: string;
  relatedSkills: string;
  benefits: string;
  postedDate: string;
  expirationDate: string;
  views: number;
  note?: string;
  status: boolean;
}

// ---- Helper: headers ---- //
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ---- API Calls ---- //

// GET tất cả job của employer
export const getEmployerJobs = async (): Promise<JobResponse[]> => {
  try {
    const response = await axios.get<JobResponse[]>(`${API_URL}/api/job-postings/employer/my-jobs`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching employer jobs:", error.response?.data || error.message);
    throw error;
  }
};

// POST tạo job mới
export const createJob = async (jobData: JobRequest): Promise<JobResponse> => {
  try {
    const response = await axios.post<JobResponse>(
      `${API_URL}/api/job-postings/employer`,
      jobData,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating job:", error.response?.data || error.message);
    throw error;
  }
};

// PUT cập nhật job theo ID
export const updateJob = async (jobId: number, jobData: JobRequest): Promise<JobResponse> => {
  try {
    const response = await axios.put<JobResponse>(
      `${API_URL}/api/job-postings/employer/${jobId}`,
      jobData,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating job:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE job theo ID
export const deleteJob = async (jobId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/job-postings/employer/${jobId}`, {
      headers: getHeaders(),
    });
  } catch (error: any) {
    console.error("Error deleting job:", error.response?.data || error.message);
    throw error;
  }
};
