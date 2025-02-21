"use client";

import { Exam, ExamUpdateDto, ExamListDto } from "@/types/exam";
import { get, put } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ExamForm from "@/src/components/exam/ExamForm";

interface EditExamPageProps {
  params: { examId: string };
}

const EditExamPage = ({ params }: EditExamPageProps) => {
  const { examId } = params;
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const examData = await get<Exam>(API_ENDPOINTS.EXAM_BY_ID(examId));
        setExam(examData);
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
    return <div>Loading...</div>;
  }

  if (!exam) {
    return <div>Exam not found</div>;
  }

  return (
    <div>
      <h1>Edit Exam</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ExamForm
        onSubmit={handleSubmit}
        initialValues={exam}
        isEditMode={true}
      />
    </div>
  );
};

export default EditExamPage;