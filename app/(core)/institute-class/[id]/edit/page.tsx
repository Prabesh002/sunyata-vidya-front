"use client";

import { InstituteClassListDto, InstituteClassUpdateDto } from "@/types/institute-class";
import { get, put } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InstituteClassForm from "@/src/components/institute-class/InstituteClassForm";

const EditInstituteClassPage = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];

  const router = useRouter();
  const [instituteClass, setInstituteClass] = useState<InstituteClassListDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return; 
    const fetchInstituteClassDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const instituteClassData = await get<InstituteClassListDto>(API_ENDPOINTS.INSTITUTE_CLASS_BY_ID(id));
        setInstituteClass(instituteClassData);
      } catch (error: any) {
        setError(error.message || "Failed to fetch institute class details");
      } finally {
        setLoading(false);
      }
    };

    fetchInstituteClassDetails();
  }, [id]);

  const handleSubmit = async (data: InstituteClassUpdateDto) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      await put<InstituteClassListDto, InstituteClassUpdateDto>(API_ENDPOINTS.INSTITUTE_CLASS_BY_ID(id), data);
      router.push(`/institute-class/${id}`); 
    } catch (error: any) {
      setError(error.message || "Failed to update institute class");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!instituteClass) {
    return <div>Institute class not found</div>;
  }

  return (
    <div>
      <h1>Edit Institute Class</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <InstituteClassForm
        onSubmit={handleSubmit}
        initialValues={instituteClass}
        isEditMode={true}
      />
    </div>
  );
};

export default EditInstituteClassPage;
