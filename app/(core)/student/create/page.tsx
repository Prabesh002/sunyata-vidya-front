"use client";
import { StudentCreateDto, StudentListDto } from "@/types/student";
import { post } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "@/src/UI/Loading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentForm from "@/src/components/student/StudentForm";

const CreateStudentPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: StudentCreateDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await post<StudentListDto, StudentCreateDto>(API_ENDPOINTS.STUDENT_CREATE, data);
      router.push(`/student/${response.id}`);
    } catch (error: any) {
      setError(error.message || "Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-lg bg-white">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl mt-2 font-semibold">Create New Student</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-500 py-2 px-4 bg-red-100 border border-red-400 rounded-md mb-4">
              {error}
            </div>
          )}
          <StudentForm onSubmit={handleSubmit} />
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

export default CreateStudentPage;