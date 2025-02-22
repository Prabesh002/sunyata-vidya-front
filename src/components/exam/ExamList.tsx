"use client"
import { ExamListDto } from "@/types/exam";
import Link from "next/link";

interface ExamListProps {
  exams: ExamListDto[];
}

const ExamList = ({ exams }: ExamListProps) => {
  return (
    <ul>
      {exams.map((exam) => (
        <li key={exam.id}>
          <Link href={`/exams/${exam.id}`}>
            {exam.examName} ({exam.type})
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ExamList;