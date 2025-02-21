export interface Class {
    className: string;
    section: string;
  }
  export interface TeacherCreateDto {
      name: string;
      subject: string;
    assignedClasses?: Class[];
  }
  
  export interface TeacherUpdateDto {
      name: string;
      subject: string;
      assignedClasses?: Class[];
  }
  
  export interface TeacherListDto {
      name: string;
      subject: string;
  }
  