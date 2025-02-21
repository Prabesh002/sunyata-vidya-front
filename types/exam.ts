export enum ExamType {
    Test = 0,
    Terminal = 1,
    Final = 2,
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