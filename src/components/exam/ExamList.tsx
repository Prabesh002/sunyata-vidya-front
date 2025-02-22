import React from 'react';
import { ExamListDto, ExamType } from "@/types/exam";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FaLaptopCode, FaBook, FaCalendarAlt, FaClock, FaArrowRight, FaPen } from "react-icons/fa";

interface ExamListProps {
  exams: ExamListDto[];
}

const ExamList = ({ exams }: ExamListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return `${start.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  };

  const getExamIcon = (type: ExamType) => {
    switch (type) {
      case ExamType.Test:
        return <FaBook className="text-blue-500" />;
      case ExamType.Terminal:
        return <FaLaptopCode className="text-green-500" />;
      case ExamType.Final:
        return <FaBook className="text-purple-500" />;
      default:
        return <FaBook className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4 p-4">
      {exams.map((exam) => (
        <Card
          key={exam.id}
          className="group overflow-hidden bg-white hover:bg-gray-50/50 transition-colors duration-200"
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getExamIcon(exam.type)}
                  <h3 className="font-medium text-gray-900">
                    {exam.examName}
                  </h3>
                </div>
               
                <div className="flex gap-2">
                  <Link
                    href={`/exams/${exam.id}/edit`}
                    className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <FaPen className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/exams/${exam.id}`}
                    className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <FaArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Minimal Date Display */}
              <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCalendarAlt className="h-3.5 w-3.5 text-gray-400" />
                  <span>{formatDateRange(exam.startDate, exam.endDate)}</span>
                </div>
                <div className="flex flex-col space-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaClock className="h-3 w-3 text-gray-400" />
                    <span>Created {formatDate(exam.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="h-3 w-3 text-gray-400" />
                    <span>Updated {formatDate(exam.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExamList;