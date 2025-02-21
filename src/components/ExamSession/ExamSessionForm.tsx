"use client";

import { ExamSessionCreateDto } from "@/types/exam";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExamSessionFormProps {
  onSubmit: (data: ExamSessionCreateDto) => Promise<void>;
}

const ExamSessionForm = ({ onSubmit }: ExamSessionFormProps) => {
  const [sessionDate, setSessionDate] = useState(""); 
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const localDate = new Date(`${sessionDate}T00:00:00`);  
    const utcDate = localDate.toISOString(); 
    const data: ExamSessionCreateDto = {
      sessionDate: utcDate,  
      subject,
    };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sessionDate">Session Date</Label>
        <Input
          id="sessionDate"
          type="date"  // Date only input
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">Create Session</Button>
    </form>
  );
};

export default ExamSessionForm;
