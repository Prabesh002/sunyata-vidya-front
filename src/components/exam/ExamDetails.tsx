import { Exam } from "@/types/exam";

interface ExamDetailsProps {
  exam: Exam;
}

const ExamDetails = ({ exam }: ExamDetailsProps) => {
  return (
    <div>
      <h2>{exam.examName}</h2>
      <p>Type: {exam.type}</p>
      <p>Start Date: {exam.startDate}</p>
      <p>End Date: {exam.endDate}</p>
    </div>
  );
};

export default ExamDetails;