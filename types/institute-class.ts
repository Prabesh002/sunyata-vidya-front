export interface InstituteClassCreateDto {
    className: string;
    sections: string[];
  }
  
  export interface InstituteClassUpdateDto {
    className: string;
    sections: string[];
  }
  
  export interface InstituteClassListDto {
    id: string;
    className: string;
    sections: string[];
  }
  export interface Class {
    className: string;
    section: string;
}