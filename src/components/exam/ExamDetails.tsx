import { Exam } from "@/types/exam";
import Link from "next/link";

interface ExamDetailsProps {
  exam: Exam;
}

const ExamDetails = ({ exam }: ExamDetailsProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        <Link href={`/exams/${exam.id}/edit`}>
        {exam.examName}
        </Link>
      </h2>
      <div className="space-y-2">
        <p className="text-lg text-gray-700">Type: <span className="font-medium">{exam.type}</span></p>
        <p className="text-lg text-gray-700">Start Date: <span className="font-medium">{new Date(exam.startDate).toLocaleDateString()}</span></p>
        <p className="text-lg text-gray-700">End Date: <span className="font-medium">{new Date(exam.endDate).toLocaleDateString()}</span></p>
      </div>
    </div>
  );
};

export default ExamDetails;
