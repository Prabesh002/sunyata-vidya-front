"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";

import { StudentListDto } from "@/types/student";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentList from "@/src/components/student/StudentList";
import Loader from "@/src/UI/Loading";

const StudentPage = () => {
  const [students, setStudents] = useState<StudentListDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentsData = await get<StudentListDto[]>(API_ENDPOINTS.STUDENT_GET_ALL);
        setStudents(studentsData);
      } catch (error: any) {
        setError(error.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <Loader></Loader>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <section className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Students</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentList students={students} />
          <Link
            href="/student/create"
            className="inline-flex items-center gap-2 mt-4 text-blue-500 hover:underline"
          >
            <FaUserPlus /> Create New Student
          </Link>
        </CardContent>
      </Card>
    </section>
  );
};

export default StudentPage;