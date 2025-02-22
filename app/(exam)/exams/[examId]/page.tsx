"use client"
import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import ExamDetails from "@/src/components/exam/ExamDetails";
import { Exam } from "@/types/exam";
import { use } from "react"; 

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Exam Details</h1>
      {exam && <ExamDetails exam={exam} />}
    </div>
  );
};

export default ExamDetailsPage;
