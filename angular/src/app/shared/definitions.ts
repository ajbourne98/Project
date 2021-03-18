export type Reading = {
  moduleId: number;
  name: string;
  id: number;
};

export type Grade = {
  moduleId: number;
  grade: string;
  id: number;
};

export type Assignment = {
  moduleId: number;
  name: string;
  id: number;
};

export type ImportantDeadline = {
  date: Date;
  info: string;
};
