"use client";

import { ExamListDto, ExamType } from "@/types/exam";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { FaLaptopCode, FaBook } from "react-icons/fa"; 

interface ExamListProps {
  exams: ExamListDto[];
}

const ExamList = ({ exams }: ExamListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };

  const renderExamType = (type: ExamType) => {
    switch (type) {
      case ExamType.Test:
        return <><FaBook className="inline-block mr-2 text-blue-500" />Test</>;
      case ExamType.Terminal:
        return <><FaLaptopCode className="inline-block mr-2 text-green-500" />Terminal</>;
      case ExamType.Final:
        return <>Final</>;
      default:
        return <span>Unknown Type</span>;
    }
  };

  return (
    <ul className="space-y-4">
      {exams.map((exam) => (
        <li key={exam.id} className="border-b py-4">
          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{exam.examName}</CardTitle>
              <p className="text-sm text-gray-500">{renderExamType(exam.type)}</p>
            </CardHeader>
            <CardContent className="text-gray-700">
              <div className="space-y-2">
                <p><strong>Start Date:</strong> {formatDate(exam.startDate)}</p>
                <p><strong>End Date:</strong> {formatDate(exam.endDate)}</p>
                <p><strong>Created At:</strong> {formatDate(exam.createdAt)}</p>
                <p><strong>Updated At:</strong> {formatDate(exam.updatedAt)}</p>
              </div>
              <div className="mt-4">
                <Link href={`/exams/${exam.id}`} className="text-blue-600 hover:text-blue-800">View Exam Details</Link>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ExamList;
