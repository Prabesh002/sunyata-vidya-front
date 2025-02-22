"use client";
import { ExamCreateDto, ExamType, ExamUpdateDto } from "@/types/exam";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExamFormProps {
  onSubmit: (data: ExamCreateDto | ExamUpdateDto) => Promise<void>;
  initialValues?: ExamCreateDto | ExamUpdateDto;
  isEditMode?: boolean;
}

const ExamForm = ({ onSubmit, initialValues, isEditMode }: ExamFormProps) => {
  const [examName, setExamName] = useState(initialValues?.examName || "");
  const [type, setType] = useState<ExamType>(
    initialValues?.type || ExamType.Test
  );
  const [startDate, setStartDate] = useState(initialValues?.startDate || "");
  const [endDate, setEndDate] = useState(initialValues?.endDate || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: ExamCreateDto | ExamUpdateDto = {
      examName,
      type,
      startDate,
      endDate,
    };
    await onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Exam" : "Create New Exam"}</CardTitle>
        <CardDescription>
          {isEditMode
            ? "Update the exam details below"
            : "Fill in the details to create a new exam"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="examName" className="text-sm font-medium">
              Exam Name
            </Label>
            <Input
              id="examName"
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              required
              className="w-full"
              placeholder="Enter exam name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">
              Exam Type
            </Label>
            <Select
              value={type.toString()}
              onValueChange={(value) => setType(parseInt(value) as ExamType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ExamType.Test.toString()}>Test</SelectItem>
                <SelectItem value={ExamType.Terminal.toString()}>
                  Terminal
                </SelectItem>
                <SelectItem value={ExamType.Final.toString()}>Final</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isEditMode ? "Update Exam" : "Create Exam"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExamForm;