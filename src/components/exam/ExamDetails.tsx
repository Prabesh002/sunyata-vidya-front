import React from 'react';
import { Exam, ExamType } from "@/types/exam";
import { Card, CardContent } from "@/components/ui/card";
import { FaLaptopCode, FaBook, FaCalendarAlt } from "react-icons/fa";

interface ExamDetailsProps {
  exam: Exam;
}

const ExamDetails = ({ exam }: ExamDetailsProps) => {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return `${start.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour12: true
    })} - ${end.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    })}`;
  };

  const getExamTypeDetails = (type: ExamType) => {
    switch (type) {
      case ExamType.Test:
        return {
          icon: <FaBook className="h-5 w-5" />,
          label: "Regular Test",
          color: "text-blue-500 bg-blue-50"
        };
      case ExamType.Terminal:
        return {
          icon: <FaLaptopCode className="h-5 w-5" />,
          label: "Terminal Exam",
          color: "text-green-500 bg-green-50"
        };
      case ExamType.Final:
        return {
          icon: <FaBook className="h-5 w-5" />,
          label: "Final Exam",
          color: "text-purple-500 bg-purple-50"
        };
      default:
        return {
          icon: <FaBook className="h-5 w-5" />,
          label: "Unknown",
          color: "text-gray-500 bg-gray-50"
        };
    }
  };

  const examTypeDetails = getExamTypeDetails(exam.type);

  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {exam.examName}
          </h2>
          
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${examTypeDetails.color}`}>
            {examTypeDetails.icon}
            <span className="font-medium">
              {examTypeDetails.label}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="h-4 w-4 text-gray-400" />
            <span className="font-medium">
              {formatDateRange(exam.startDate, exam.endDate)}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              Duration: {Math.round((new Date(exam.endDate).getTime() - new Date(exam.startDate).getTime()) / (1000 * 60 * 60))} hours
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamDetails;