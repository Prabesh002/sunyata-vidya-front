"use client";

import { InstituteClassCreateDto, InstituteClassListDto } from "@/types/institute-class";
import { post } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InstituteClassForm from "@/src/components/institute-class/InstituteClassForm";

const CreateInstituteClassPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: InstituteClassCreateDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await post<InstituteClassListDto, InstituteClassCreateDto>(API_ENDPOINTS.INSTITUTE_CLASS, data);
      router.push(`/institute-class/${response.id}`); 
    } catch (error: any) {
      setError(error.message || "Failed to create institute class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Institute Class</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <InstituteClassForm onSubmit={handleSubmit} />
      {loading && <p>Creating institute class...</p>}
    </div>
  );
};

export default CreateInstituteClassPage;