export enum ExamType {
  Test = 0,
  Terminal = 1,
  Final = 2,
}

export interface Class {
  className: string;
  section: string;
}

export interface ExamCreateDto {
  examName: string;
  type: ExamType;
  startDate: string; 
  endDate: string;   
}

export interface ExamUpdateDto {
  examName: string;
  type: ExamType;
  startDate: string; 
  endDate: string;   
}

export interface ExamListDto {
  id: string; 
  examName: string;
  type: ExamType;
  startDate: string;
  endDate: string;   
}

export interface ExamRoutineCreateDto {
  class: Class;
}

export interface ExamRoutineUpdateDto {
  class: Class;
}

export interface ExamRoutineListDto {
  id: string; 
  class: Class;
  examId: string;
}

export interface ExamSessionCreateDto {
  sessionDate: string;
  subject: string;
  sequenceOrder?: number;
}

export interface ExamSessionUpdateDto {
  sessionDate: string; 
  subject: string;
  sequenceOrder?: number;
}

export interface ExamSessionListDto {
  id: string; 
  sessionDate: string; 
  subject: string;
  sequenceOrder?: number;
  examRoutineId: string; 
}

export interface ExamReorderDto {
  sessionOrder: { [sessionId: string]: number }; 
}

export interface Exam {
    id: string; // GUID
    examName: string;
    type: ExamType;
    startDate: string; 
    endDate: string;   
    examRoutines?: ExamRoutine[]
}

export interface ExamRoutine {
    id: string; 
    class: Class;
    examId: string; 
    examSessions?: ExamSession[]
}

export interface ExamSession {
    id: string; 
    sessionDate: string; 
    subject: string;
    sequenceOrder?: number;
    examRoutineId: string;
}
export interface SessionOrder {
  [sessionId: string]: number;
}