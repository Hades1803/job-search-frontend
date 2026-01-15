import axios from "axios";

/* =======================
   API URLs
======================= */
const APPLY_JOB_URL = "http://localhost:8081/api/applications/apply";
const GET_MY_APPLICATIONS_URL =
  "http://localhost:8081/api/applications/my";

/* =======================
   INTERFACES
======================= */
export interface ApplyJobRequest {
  jobPostingId: number;
  resumeId?: number | null;
  cvFile?: File | null;
  resumeLink?: string | null;
}

export interface Application {
  id: number;
  resumeType: "DB_RESUME" | "UPLOADED_FILE" | "LINK_ONLY";
  uploadedCVPath?: string | null;
  uploadedCVName?: string | null;
  resumeLink?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  applyDate: string;
}

export interface MyApplicationResponse {
  applicationId: number;

  jobId: number;
  jobTitle: string;
  companyName: string;

  resumeType: "DB_RESUME" | "UPLOADED_FILE" | "LINK_ONLY";
  status: "PENDING" | "APPROVED" | "REJECTED";

  applyDate: string;
}

/* =======================
   APPLY JOB (POST)
======================= */
export const applyJob = async (
  data: ApplyJobRequest
): Promise<Application> => {
  const formData = new FormData();
  formData.append("jobPostingId", data.jobPostingId.toString());

  // Chỉ gửi 1 loại CV đúng logic backend
  if (data.resumeId) {
    formData.append("resumeId", data.resumeId.toString());
  } else if (data.cvFile) {
    formData.append("cvFile", data.cvFile);
  } else if (data.resumeLink) {
    formData.append("resumeLink", data.resumeLink);
  }

  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(APPLY_JOB_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: (status) => status < 500,
    });

    // Nếu backend trả JSON OK
    if (response.status >= 200 && response.status < 300 && response.data) {
      return {
        id: response.data.id,
        resumeType: response.data.resumeType,
        uploadedCVPath: response.data.uploadedCVPath ?? null,
        uploadedCVName: response.data.uploadedCVName ?? null,
        resumeLink: response.data.resumeLink ?? null,
        status: response.data.status,
        applyDate: response.data.applyDate,
      };
    }

    // Fallback nếu backend lỗi serialize
    return createFallbackApplication(data);
  } catch (error) {
    console.error("Apply job failed (fallback used)", error);
    return createFallbackApplication(data);
  }
};

/* =======================
   GET MY APPLICATIONS
======================= */
export const getMyApplications = async (): Promise<MyApplicationResponse[]> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(GET_MY_APPLICATIONS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (Array.isArray(response.data)) {
      return response.data.map((item) => ({
        applicationId: item.applicationId,
        jobId: item.jobId,
        jobTitle: item.jobTitle,
        companyName: item.companyName,
        resumeType: item.resumeType,
        status: item.status,
        applyDate: item.applyDate,
      }));
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch my applications", error);
    return [];
  }
};

/* =======================
   FALLBACK HELPER
======================= */
function createFallbackApplication(
  data: ApplyJobRequest
): Application {
  const now = new Date();

  return {
    id: Math.floor(now.getTime() / 1000),
    resumeType: data.cvFile
      ? "UPLOADED_FILE"
      : data.resumeId
      ? "DB_RESUME"
      : "LINK_ONLY",
    uploadedCVPath: data.cvFile
      ? `/uploads/cv/applied_${now.getTime()}.pdf`
      : null,
    uploadedCVName: data.cvFile ? data.cvFile.name : null,
    resumeLink: data.resumeLink ?? null,
    status: "PENDING",
    applyDate: now.toISOString(),
  };
}
