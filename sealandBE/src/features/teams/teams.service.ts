import { TeamsRepository } from "./teams.repository.js";
import { TeamInput,TeamDTO } from "../../types/teams.types.js";
import fs from "fs/promises";

export class TeamsService {
  private teamsRepository: TeamsRepository;

  constructor() {
    this.teamsRepository = new TeamsRepository();
  }

  async getAllTeams() {
    try {
      const teams = await this.teamsRepository.getAllTeams();
      return {
        data: teams,
        message: "Teams retrieved successfully",
      };
    } catch (error) {
      throw error;
    }
  }
  async getTeamFormat() {
    try {
      const teams = await this.teamsRepository.getAllTeams();

      const groupedData: TeamDTO[] = teams.reduce((acc, team) => {
        // Cari apakah divisi ini sudah ada di dalam accumulator (acc)
        let divisionGroup = acc.find(
          (item) => item.name === team.division.name,
        );

        // Jika belum ada, buat kategori divisi baru
        if (!divisionGroup) {
          divisionGroup = {
            id: team.division.name.toLowerCase().replace(/\s+/g, "-"),
            name: team.division.name,
            members: [],
          };
          acc.push(divisionGroup);
        }

        // Masukkan data anggota ke dalam members divisi yang sesuai
        divisionGroup.members.push({
          id: team.id.toString(),
          name: team.name,
          position: team.role,
          photo: `/${team.img_url}`,
          managerId: team.bos_id ? team.bos_id.toString() : null,
        });

        return acc;
      }, [] as TeamDTO[]);
      return {
        data: groupedData,
        message: "Teams retrieved successfully",
      };
    } catch (error) {
        throw error;
    }
  }

  async getTeam(id: number) {
    try {
      const team = await this.teamsRepository.getTeam(id);
      if (!team) {
        throw new Error("Team not found");
      }
      return {
        data: team,
        message: "Team retrieved successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async addTeam(input: TeamInput) {
    try {
      const newTeam = await this.teamsRepository.addTeam(input);
      return {
        data: newTeam,
        message: "Team added successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async editTeam(id: number, input: TeamInput) {
    try {
      const teamExists = await this.teamsRepository.getTeam(id);
      if (!teamExists) {
        throw new Error("Team not found");
      }
      const updatedTeam = await this.teamsRepository.editTeam(id, input);
      if (
        teamExists.img_url &&
        input.img_url &&
        teamExists.img_url !== input.img_url
      ) {
        await fs.unlink(teamExists.img_url);
      }
      return {
        data: updatedTeam,
        message: "Team updated successfully",
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteTeam(id: number) {
    try {
      const teamExists = await this.teamsRepository.getTeam(id);
      if (!teamExists) {
        throw new Error("Team not found");
      }
      const deletedTeam = await this.teamsRepository.deleteTeam(id);
      if (teamExists.img_url) {
        await fs.unlink(teamExists.img_url);
      }
      return {
        data: deletedTeam,
        message: "Team deleted successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
