"use client";

import { ExamRoutineCreateDto, ExamRoutineListDto } from "@/types/exam";
import { post } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useParams } from "next/navigation";
import ExamRoutineForm from "@/src/components/ExamRoutine/ExamRoutineForm";

const CreateExamRoutinePage = () => {
  const router = useRouter();
  const { examId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit:any = async (data: ExamRoutineCreateDto) => {
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
    <div>
      <h1>Create Exam Routine</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ExamRoutineForm onSubmit={handleSubmit} />
      {loading && <p>Creating exam routine...</p>}
    </div>
  );
};

export default CreateExamRoutinePage;