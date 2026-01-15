import axios from "axios";

// const API_URL = "https://job-search-backend-bcgv.onrender.com";
const API_URL = "http://localhost:8081";
// ---- Interfaces ---- //

export interface PublicJobResponse {
  id: number;
  employerName: string;
  employerLogo?: string;
  addressName: string;
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
  majorId: string;
  majorName: string;
  jobTypeId: string;
  jobTypeName: string;
  salaryLevelId: string;
  salaryLevelName: string;
  rankId: string;
  rankName: string;
  addressId: string;
}

// Interface cho paged response
export interface PagedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface Option {
  value: string;
  label: string;
}

export interface FilterOptions {
  jobTypes: Option[];
  majors: Option[];
  ranks: Option[];
  salaryLevels: Option[];
  addresses: Option[];
}

// ---- API Calls ---- //

// GET tất cả job public (paged response)
export const getAllPublicJobs = async (): Promise<PublicJobResponse[]> => {
  try {
    const response = await axios.get<PagedResponse<PublicJobResponse>>(`${API_URL}/api/job-postings/public`);
    // Trả về content array từ paged response
    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error: any) {
    console.error("Error fetching public jobs:", error.response?.data || error.message);
    return [];
  }
};

// GET chi tiết 1 job public theo ID
export const getPublicJobById = async (jobId: number): Promise<PublicJobResponse | null> => {
  try {
    const response = await axios.get<PublicJobResponse>(`${API_URL}/api/job-postings/public/${jobId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching public job by ID:", error.response?.data || error.message);
    return null;
  }
};

// GET tất cả filter options
export const getFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const [jobTypesRes, majorsRes, ranksRes, salaryLevelsRes, addressesRes] = await Promise.all([
      axios.get<{ id: string; name: string }[]>(`${API_URL}/api/job-types`),
      axios.get<{ id: string; name: string }[]>(`${API_URL}/api/majors`),
      axios.get<{ id: string; name: string }[]>(`${API_URL}/api/ranks`),
      axios.get<{ id: string; name: string }[]>(`${API_URL}/api/salary-levels`),
      axios.get<{ id: string; name: string }[]>(`${API_URL}/api/addresses`),
    ]);

    return {
      jobTypes: jobTypesRes.data.map(item => ({ value: item.id, label: item.name })),
      majors: majorsRes.data.map(item => ({ value: item.id, label: item.name })),
      ranks: ranksRes.data.map(item => ({ value: item.id, label: item.name })),
      salaryLevels: salaryLevelsRes.data.map(item => ({ value: item.id, label: item.name })),
      addresses: addressesRes.data.map(item => ({ value: item.id, label: item.name })),
    };
  } catch (error: any) {
    console.error("Error fetching filter options:", error.response?.data || error.message);
    return {
      jobTypes: [],
      majors: [],
      ranks: [],
      salaryLevels: [],
      addresses: [],
    };
  }
};