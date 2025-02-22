export interface StudentCreateDto {
	name: string;
	instituteClassId: string;
	currentSection: string;
  }
  
  export interface StudentUpdateDto {
	name: string;
	instituteClassId: string;
	currentSection: string;
  }
  
  export interface StudentListDto {
	id: string;
	name: string;
	instituteClassId: string; 
	currentSection: string;
  }