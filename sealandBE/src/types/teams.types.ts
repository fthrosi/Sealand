export type TeamInput = {
    name: string;
    img_url: string;
    division_id: number;
    bos_id: number;
    role: string;
}
interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  managerId: string | null;
}

// Struktur final per divisi
export interface TeamDTO {
  id: string;
  name: string;
  members: TeamMember[];
}