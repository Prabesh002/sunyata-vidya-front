export interface SubjectReportCreateDto {
    subjectId: string;
    mark: number;
  }
  
  export interface SubjectReportListDto {
    id: string;
    subjectId: string;
    mark: number;
  }
  
  export interface StudentReportCreateDto {
    studentId: string;
    subjects?: SubjectReportCreateDto[];  
  }
  
  export interface StudentReportUpdateDto {
    studentId: string;
  }
  
  export interface StudentReportListDto {
    id: string;
    studentId: string;
    subjects: SubjectReportListDto[];
  }