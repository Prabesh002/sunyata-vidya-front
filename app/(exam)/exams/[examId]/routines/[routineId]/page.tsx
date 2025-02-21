"use client";

import { ExamRoutineListDto, ExamSessionListDto, ExamSessionCreateDto, SessionOrder } from "@/types/exam";
import { get, post, put } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ExamSessionForm from "@/src/components/ExamSession/ExamSessionForm";
import { Reorder } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SessionItem from "@/src/components/ExamSession/SessionItem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ExamRoutineDetailsPage = () => {
  const { examId, routineId } = useParams();
  const [routine, setRoutine] = useState<ExamRoutineListDto | null>(null);
  const [sessions, setSessions] = useState<ExamSessionListDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shiftDays, setShiftDays] = useState<number | null>(null)
  const [shiftError, setShiftError] = useState<string | null>(null);
  const [shiftSuccess, setShiftSuccess] = useState<string | null>(null);

  const fetchRoutineDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const routineData = await get<ExamRoutineListDto>(API_ENDPOINTS.EXAM_ROUTINE_BY_ID(routineId as string));
      const sessionsData = await get<ExamSessionListDto[]>(API_ENDPOINTS.EXAM_ROUTINE_SESSION(routineId as string));

      setRoutine(routineData);
      setSessions(sessionsData);
    } catch (error: any) {
      setError(error.message || "Failed to fetch exam routine details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutineDetails();
  }, [routineId]);

  const handleCreateSession = async (data: ExamSessionCreateDto) => {
    setLoading(true);
    setError(null);
    try {
      await post<ExamSessionListDto, ExamSessionCreateDto>(API_ENDPOINTS.EXAM_ROUTINE_SESSION(routineId as string), data);
      await fetchRoutineDetails();
    } catch (error: any) {
      setError(error.message || "Failed to create exam session");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (newOrder: ExamSessionListDto[]) => {
    setSessions(newOrder);

    const updatedSessions: SessionOrder = newOrder.reduce((acc, session, index) => {
      acc[session.id] = index;
      return acc;
    }, {} as SessionOrder);

    try {
      await put(API_ENDPOINTS.EXAM_ROUTINE_REORDER(routineId as string), { sessionOrder: updatedSessions });
    } catch (error: any) {
      setError("Failed to update session order");
    }
  };

  const handleSaveSession = async (id: string, updatedSession: ExamSessionListDto) => {
    setLoading(true);
    setError(null);
    try {
      await put<ExamSessionListDto, ExamSessionListDto>(
        API_ENDPOINTS.EXAM_SESSION_BY_ID(id),
        updatedSession
      );
      await fetchRoutineDetails();
    } catch (error: any) {
      setError(error.message || "Failed to save session changes");
    } finally {
      setLoading(false);
    }
  };

  const handleShiftRoutine = async () => {
    setShiftError(null);
    setShiftSuccess(null);

    if (shiftDays === null) {
      setShiftError("Please enter a valid number of days to shift.");
      return;
    }
    try {
      await put(API_ENDPOINTS.EXAM_ROUTINE_SHIFT(routineId as string, shiftDays), {});
      setShiftSuccess("Routine shifted successfully!");
      await fetchRoutineDetails();
    } catch (error: any) {
      setShiftError(error.message || "Failed to shift routine");
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">Loading exam routine...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Exam Routine Details</CardTitle>
          <p className="text-gray-500">
            {routine?.class.className} - {routine?.class.section}
          </p>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Exam Sessions</h3>
          {sessions.length > 0 ? (
            <Reorder.Group axis="y" values={sessions} onReorder={handleReorder} className="space-y-2">
              {sessions.map((session) => (
                <Reorder.Item key={session.id} value={session}>
                  <SessionItem session={session} onSave={handleSaveSession} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <p className="text-gray-500">No exam sessions found for this routine.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Create New Exam Session</CardTitle>
        </CardHeader>
        <CardContent>
          <ExamSessionForm onSubmit={handleCreateSession} />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Shift Routine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="shiftDays">Shift Routine by Days:</Label>
            <Input
              type="number"
              id="shiftDays"
              placeholder="Enter number of days"
              onChange={(e) => setShiftDays(parseInt(e.target.value))}
            />
          </div>
          <Button onClick={handleShiftRoutine}>Shift Routine</Button>
          {shiftError && <p className="text-red-500">{shiftError}</p>}
          {shiftSuccess && <p className="text-green-500">{shiftSuccess}</p>}
        </CardContent>
      </Card>
    </section>
  );
};

export default ExamRoutineDetailsPage;