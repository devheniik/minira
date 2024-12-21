import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface JobTitle {
    id: number;
    name: string;
    description: string;
    companyId: number;
    createdAt: string;
    updatedAt: string;
}

function useJobTitles() {
    const fetchJobTitles = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}job-title`);
        return res.data;
    };

    return useQuery<JobTitle[]>({
        queryKey: ["jobTitles"],
        queryFn: fetchJobTitles,
    });
}

export default useJobTitles;
