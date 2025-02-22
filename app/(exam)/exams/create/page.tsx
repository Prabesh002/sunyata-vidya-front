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
      router.push(`/exams/${response.id}`);
    } catch (error: any) {
      setError(error.message || "Failed to create exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <ExamForm onSubmit={handleSubmit} />
    </section>
  );
};

export default CreateExamPage;
