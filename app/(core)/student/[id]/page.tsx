"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import StudentDetails from "@/src/components/student/StudentDetails";
import { StudentListDto } from "@/types/student";
import { useParams } from "next/navigation"; 
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "@/src/UI/Loading";

interface StudentDetailsPageProps {
  params: { id: string };
}

const StudentDetailsPage = ({ params }: StudentDetailsPageProps) => { 
  const { id } = params; 
  const [student, setStudent] = useState<StudentListDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentData = await get<StudentListDto>(API_ENDPOINTS.STUDENT_GET(id));
        setStudent(studentData);
      } catch (error: any) {
        setError(error.message || "Failed to fetch student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (loading) {
    return <Loader></Loader>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }

  if (!student) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Student not found</div>;
  }

  return (
    <section className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Student Details</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentDetails student={student} />
          <Link
            href={`/student/${id}/edit`}
            className="inline-flex items-center gap-2 mt-4 text-blue-500 hover:underline"
          >
            <FaEdit /> Edit Student
          </Link>
        </CardContent>
      </Card>
    </section>
  );
};

export default StudentDetailsPage;
