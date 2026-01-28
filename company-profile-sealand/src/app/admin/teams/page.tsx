"use client";

import { useState, useEffect, use } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import TeamForm from "@/components/modals/team/modalAddTeam";
import TeamFormEdit from "@/components/modals/team/modalEditTeam";
import { TeamOutput } from "@/types/team";
import { ModalConfirmation } from "@/components/modals/modalConfirmation";
import { toast } from "sonner";
import loadingAnimation from "@/animations/loading.json";
import Lottie from "lottie-react";
import { useDataStore } from "@/store/useDataStore";
import { deleteTeam } from "@/api/teams";

export default function TeamsManagement() {
  const [selectedTeam, setSelectedTeam] = useState<TeamOutput>();
  const open = useUIStore((state) => state.open);
  const [loading, setLoading] = useState(false);
  const isModalAdd = useUIStore((state) => state.activeModal === "addTeam");
  const isModalEdit = useUIStore(
    (state) => state.activeModal === "editTeam"
  );
  const close = useUIStore((state) => state.close);
  const isModalDelete = useUIStore(
    (state) => state.activeModal === "deleteTeam"
  );
  const fetchTeams = useDataStore((state) => state.fetchTeams);
  const teams = useDataStore((state) => state.teams);
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);
  const handleEditClick = (team: TeamOutput) => {
    setSelectedTeam(team);
    open("editTeam");
  };
  const handleDeleteClick = (team: TeamOutput) => {
    setSelectedTeam(team);
    open("deleteTeam");
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteTeam(Number(selectedTeam?.id));
        fetchTeams(true);
        close();
        toast.success("Team berhasil dihapus");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus team");
    }
  };
  console.log(teams);
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manajemen Team
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Kelola semua team Anda di sini
          </p>
        </div>
        <button
          onClick={() => open("addTeam")}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Buat Team Baru</span>
          <span className="sm:hidden">Buat</span>
        </button>
      </div>

      {/* Team Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Gambar
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Nama Team
                </th>
                <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  divisi
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Bos
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12">
                    <div className="flex justify-center">
                      <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        className="w-24 h-24"
                      />
                    </div>
                  </td>
                </tr>
              ) : teams.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <p className="text-slate-600 text-lg">No portfolios yet</p>
                    <p className="text-slate-500 text-sm mt-1">
                      Click "Buat Portfolio Baru" to add a portfolio
                    </p>
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr
                    key={team.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${team.img_url}`}
                            alt={team.name}
                            className="size-20 object-cover rounded-lg"
                        />
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">
                      {team.name}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                      {team.division.name}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                      {team.bos ? team.bos.name : "-"}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                      {team.role}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEditClick(team)}
                          className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Edit2
                            size={14}
                            className="text-gray-600 sm:w-4 sm:h-4"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(team)}
                          className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2
                            size={14}
                            className="text-red-600 sm:w-4 sm:h-4"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding Team */}
      {isModalAdd && <TeamForm onSuccess={() => fetchTeams(true)} />}
      {isModalEdit && selectedTeam && (
        <TeamFormEdit onSuccess={() => fetchTeams(true)} team={selectedTeam} />
      )}
      {/* Modal for Deleting Team */}
      {isModalDelete && selectedTeam && (
        <ModalConfirmation
          title="Hapus Team"
          message={`Apakah Anda yakin ingin menghapus team "${selectedTeam.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onClose={() => close()}
        />
      )}
    </div>
  );
}
