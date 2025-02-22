"use client";

import { ExamCreateDto, ExamListDto } from "@/types/exam";
import { post } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ExamForm from "@/src/components/exam/ExamForm";

const CreateExamPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: ExamCreateDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await post<ExamListDto, ExamCreateDto>(API_ENDPOINTS.EXAM, data);
      router.push(`/exams/${response.id}`); // Redirect to the exam details page after successful creation
    } catch (error: any) {
      setError(error.message || "Failed to create exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Exam</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ExamForm onSubmit={handleSubmit} />
      {loading && <p>Creating exam...</p>}
    </div>
  );
};

export default CreateExamPage;