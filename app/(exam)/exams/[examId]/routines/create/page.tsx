"use client";

import { ExamRoutineCreateDto, ExamRoutineListDto } from "@/types/exam";
import { post } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useParams } from "next/navigation";
import ExamRoutineForm from "@/src/components/ExamRoutine/ExamRoutineForm";

const CreateExamRoutinePage = () => {
  const router = useRouter();
  const { examId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: ExamRoutineCreateDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await post<ExamRoutineListDto, ExamRoutineCreateDto>(
        API_ENDPOINTS.EXAM_ROUTINE(examId as string),
        data
      );
      router.push(`/exams/${examId}/routines/${response.id}`);
    } catch (error: any) {
      setError(error.message || "Failed to create exam routine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Create Exam Routine</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ExamRoutineForm onSubmit={handleSubmit} />
      {loading && (
        <div className="mt-6 text-center">
          <p className="text-gray-500">Creating exam routine...</p>
        </div>
      )}
    </div>
  );
};

export default CreateExamRoutinePage;
