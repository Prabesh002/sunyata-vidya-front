"use client";

import { Exam, ExamUpdateDto, ExamListDto } from "@/types/exam";
import { get, put } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ExamForm from "@/src/components/exam/ExamForm";

const EditExamPage = () => {
  const params = useParams();
  const examId = params.examId as string;
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExamDetails = async () => {
      if (!examId) return;
      try {
        const examData = await get<Exam>(API_ENDPOINTS.EXAM_BY_ID(examId));

        const formatDate = (isoString: string) =>
          new Date(isoString).toISOString().split("T")[0];

        setExam({
          ...examData,
          startDate: formatDate(examData.startDate),
          endDate: formatDate(examData.endDate),
        });
      } catch (error: any) {
        setError(error.message || "Failed to fetch exam details");
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  const handleSubmit = async (data: ExamUpdateDto) => {
    setLoading(true);
    setError(null);
    try {
      await put<ExamListDto, ExamUpdateDto>(API_ENDPOINTS.EXAM_BY_ID(examId), data);
      router.push(`/exams/${examId}`);
    } catch (error: any) {
      setError(error.message || "Failed to update exam");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">Loading exam details...</p>
      </section>
    );
  }

  if (!exam) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">Exam not found</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center">
      <ExamForm onSubmit={handleSubmit} initialValues={exam} isEditMode={true} />
    </section>
  );
};

export default EditExamPage;
