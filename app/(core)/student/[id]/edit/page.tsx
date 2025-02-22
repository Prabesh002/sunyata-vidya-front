"use client";

import { StudentListDto, StudentUpdateDto } from "@/types/student";
import { get, put } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import Loader from "@/src/UI/Loading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentForm from "@/src/components/student/StudentForm";

interface EditStudentPageProps {
  params: { id: string };
}

const EditStudentPage = ({ params }: EditStudentPageProps) => {
  const { id } = params;
  const router = useRouter();
  const [student, setStudent] = useState<StudentListDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleSubmit = async (data: StudentUpdateDto) => {
    setLoading(true);
    setError(null);
    try {
      await put<StudentListDto, StudentUpdateDto>(API_ENDPOINTS.STUDENT_UPDATE(id), data);
      router.push(`/student/${id}`);
    } catch (error: any) {
      setError(error.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader></Loader>
  }

  if (!student) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Student not found</div>;
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-lg bg-white">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl mt-2 font-semibold">Edit Student</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-500 py-2 px-4 bg-red-100 border border-red-400 rounded-md mb-4">
              {error}
            </div>
          )}
          <StudentForm onSubmit={handleSubmit} initialValues={student} isEditMode={true} />
          {loading && (
            <div className="flex justify-center mt-6">
              <Loader />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default EditStudentPage;
