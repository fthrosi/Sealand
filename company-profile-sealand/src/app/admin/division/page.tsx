"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { deleteDivision } from "@/api/division";
import { useDataStore } from "@/store/useDataStore";
import DivisionAdd from "@/components/modals/division/modalAddDivision";
import DivisionFormEdit from "@/components/modals/division/modalEditDivision";
import { ModalConfirmation } from "@/components/modals/modalConfirmation";
import { toast } from "sonner";
import loadingAnimation from "@/animations/loading.json";
import Lottie from "lottie-react";
import { DivisionOutput} from "@/types/team";

export default function Division() {
  const [selectedDivision, setSelectedDivision] = useState<DivisionOutput | null>(null);
  const open = useUIStore((state) => state.open);
  const [loading, setLoading] = useState(false);
  const isModalAdd = useUIStore((state) => state.activeModal === "addDivision");
  const isModalEdit = useUIStore(
    (state) => state.activeModal === "editDivision"
  );
  const close = useUIStore((state) => state.close);
  const isModalDelete = useUIStore(
    (state) => state.activeModal === "deleteDivision"
  );
  const division = useDataStore((state) => state.divisions);
  const fetchDivisions = useDataStore((state) => state.fetchDivisions);
  useEffect(() => {
    fetchDivisions();
  }, [fetchDivisions]);
  const handleEditClick = (division: DivisionOutput) => {
    setSelectedDivision(division);
    open("editDivision");
  };
  const handleDeleteClick = (division: DivisionOutput) => {
    setSelectedDivision(division);
    open("deleteDivision");
  };
 const handleConfirmDelete = async () => {
    try {
      const response = await deleteDivision(selectedDivision?.id as number);
      fetchDivisions(true);
      close();
      toast.success("Karir berhasil dihapus");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus karir");
    }
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manajemen Divisi
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Kelola semua divisi Anda di sini
          </p>
        </div>
        <button
          onClick={() => open("addDivision")}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Buat Divisi Baru</span>
          <span className="sm:hidden">Buat</span>
        </button>
      </div>

      {/* Divisions Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Nama Divisi
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12">
                    <div className="flex justify-center">
                      <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        className="w-24 h-24"
                      />
                    </div>
                  </td>
                </tr>
              ) : division.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <p className="text-slate-600 text-lg">No divisions yet</p>
                    <p className="text-slate-500 text-sm mt-1">
                      Click "Buat Divisi Baru" to add a division
                    </p>
                  </td>
                </tr>
              ) : (
                division.map((division) => (
                  <tr
                    key={division.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                        {division.name}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEditClick(division)}
                          className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Edit2
                            size={14}
                            className="text-gray-600 sm:w-4 sm:h-4"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(division)}
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

      {/* Modal for Adding Career */}
      {isModalAdd && <DivisionAdd onSuccess={() => fetchDivisions(true)} onClose={close} />}
      {isModalEdit && selectedDivision && (
        <DivisionFormEdit onSuccess={() => fetchDivisions(true)} division={selectedDivision} />
      )}
      {/* Modal for Deleting Career */}
      {isModalDelete && selectedDivision && (
        <ModalConfirmation
          title="Hapus Divisi"
          message={`Apakah Anda yakin ingin menghapus divisi "${selectedDivision.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onClose={() => close()}
        />
      )}
    </div>
  );
}
