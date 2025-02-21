"use client";


import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { ExamRoutineListDto } from "@/types/exam";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ExamRoutineList from "@/src/components/ExamRoutine/ExamRoutineList";

interface ExamRoutinesPageProps {
  params: { examId: string };
}

const ExamRoutinesPage = () => {
  const { examId } = useParams();
  const [routines, setRoutines] = useState<ExamRoutineListDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const routinesData = await get<ExamRoutineListDto[]>(
          API_ENDPOINTS.EXAM_ROUTINE(examId as string)
        );
        setRoutines(routinesData);
      } catch (error: any) {
        console.error("Error fetching exam routines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [examId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Exam Routines</h1>
      {routines && <ExamRoutineList routines={routines} examId={examId as string} />}
      <Link href={`/exams/${examId}/routines/create`}>Create New Routine</Link>
    </div>
  );
};

export default ExamRoutinesPage;