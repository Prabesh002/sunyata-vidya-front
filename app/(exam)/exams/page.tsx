"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import ExamList from "@/src/components/exam/ExamList";
import { ExamListDto } from "@/types/exam";

const ExamsPage = () => {
  const [exams, setExams] = useState<ExamListDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examsData = await get<ExamListDto[]>(API_ENDPOINTS.EXAM);
        setExams(examsData);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Exams</h1>
      {exams && <ExamList exams={exams} />}
    </div>
  );
};

export default ExamsPage;
