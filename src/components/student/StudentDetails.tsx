"use client";

import { StudentListDto } from "@/types/student";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaUserGraduate, FaBook } from "react-icons/fa";

interface StudentDetailsProps {
  student: StudentListDto;
}

const StudentDetails = ({ student }: StudentDetailsProps) => {
  return (
    <Card className="max-w-lg mx-auto mt-10 p-6 shadow-lg border border-gray-200 rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FaUserGraduate className="text-blue-500" /> {student.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-gray-600">
          <FaBook className="text-green-500" />
          <span className="text-sm">Section: {student.currentSection}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;