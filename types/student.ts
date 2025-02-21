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
	name: string;
	currentSection: string;
}
