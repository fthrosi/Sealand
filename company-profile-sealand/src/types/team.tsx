export interface TeamMember {
  id: string
  name: string
  position: string
  photo: string
  managerId?: string | null
}

export interface Division {
  id: string
  name: string
  members: TeamMember[]
}
export type TeamInput = {
    name: string;
    image: File;
    division_id: number;
    bos_id: number;
    role: string;
}
export interface DivisionOutput {
    id: number;
    name: string;
}
export interface DivisionInput{
    name: string;
}
export type TeamOutput = {
    id: number;
    name: string;
    img_url: string;
    division_id: number;
    bos_id: number;
    division: DivisionOutput;
    role: string;
    bos : {name: string}
}