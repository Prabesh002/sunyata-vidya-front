"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import ExamDetails from "@/src/components/exam/ExamDetails";
import { Exam } from "@/types/exam";
import { use } from "react";
import Link from "next/link";

interface ExamDetailsPageProps {
  params: Promise<{ examId: string }>;
}

const ExamDetailsPage = ({ params }: ExamDetailsPageProps) => {
  const { examId } = use(params);

  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const examData = await get<Exam>(API_ENDPOINTS.EXAM_BY_ID(examId));
        setExam(examData);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Loading exam details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-semibold text-gray-900 mb-8">Exam Details</h1>
      {exam && <ExamDetails exam={exam} />}

      <div className="mt-6">
        <Link href={`/exams/${examId}/routines`} className="text-blue-500 hover:underline">
          View Routines
        </Link>
      </div>
    </div>
  );
};

export default ExamDetailsPage;