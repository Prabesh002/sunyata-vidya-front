"use client";

import { InstituteClassListDto, InstituteClassUpdateDto } from "@/types/institute-class";
import { get, put } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InstituteClassForm from "@/src/components/institute-class/InstituteClassForm";
import Loader from "@/src/UI/Loading";

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
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );
  }

  if (!instituteClass) {
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
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Institute Class Not Found</h1>
        <p style={{ color: "gray", fontSize: "18px" }}>
          We couldn't find the class you're looking for. Please try again later.
        </p>
      </div>
    );
  }

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
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Edit Institute Class</h1>

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

      {/* Form to Edit Institute Class */}
      <InstituteClassForm
        onSubmit={handleSubmit}
        initialValues={instituteClass}
        isEditMode={true}
      />
    </div>
  );
};

export default EditInstituteClassPage;
