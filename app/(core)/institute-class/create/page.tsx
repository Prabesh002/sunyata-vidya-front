"use client";

import { InstituteClassCreateDto, InstituteClassListDto } from "@/types/institute-class";
import { post } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InstituteClassForm from "@/src/components/institute-class/InstituteClassForm";
import Loader from "@/src/UI/Loading";

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
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Create Institute Class</h1>
      
      {/* Error Message */}
      {error && (
        <div
          style={{
            color: "red",
            padding: "10px",
            border: "2px solid red",
            borderRadius: "8px",
            marginBottom: "20px",
            backgroundColor: "#fff3f3",
          }}
        >
          {error}
        </div>
      )}
      
      {/* Institute Class Form */}
      <InstituteClassForm onSubmit={handleSubmit} />
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center mt-6">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CreateInstituteClassPage;
