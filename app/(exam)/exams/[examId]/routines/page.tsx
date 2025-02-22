"use client";

import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { ExamRoutineListDto } from "@/types/exam";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ExamRoutineList from "@/src/components/ExamRoutine/ExamRoutineList";
import Loader from "@/src/UI/Loading";

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
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Exam Routines</h1>
      {routines ? (
        <ExamRoutineList routines={routines} examId={examId as string} />
      ) : (
        <p>No routines available.</p> 
      )}
      <div className="mt-8 text-center">
        <Link href={`/exams/${examId}/routines/create`}>
          <button className="px-6 py-3 text-white bg-black rounded-full hover:bg-gray-900 transition-all duration-300">
            Create New Routine
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ExamRoutinesPage;
