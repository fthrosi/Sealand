"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { deleteFlag } from "@/api/flags";
import { useDataStore } from "@/store/useDataStore";
import FlagAdd from "@/components/modals/flag/modal-add-flag";
import FlagFormEdit from "@/components/modals/flag/modal-edit-flag";
import { ModalConfirmation } from "@/components/modals/modalConfirmation";
import { toast } from "sonner";
import loadingAnimation from "@/animations/loading.json";
import Lottie from "lottie-react";
import { FlagOutput } from "@/types/flag.types";

export default function Flags() {
  const [selectedFlag, setSelectedFlag] = useState<FlagOutput | null>(null);
  const open = useUIStore((state) => state.open);
  const [loading, setLoading] = useState(false);
  const isModalAdd = useUIStore((state) => state.activeModal === "addFlag");
  const isModalEdit = useUIStore(
    (state) => state.activeModal === "editFlag"
  );
  const close = useUIStore((state) => state.close);
  const isModalDelete = useUIStore(
    (state) => state.activeModal === "deleteFlag"
  );
  const flags = useDataStore((state) => state.flags);
  const fetchFlags = useDataStore((state) => state.fetchFlags);
  useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);
  const handleEditClick = (flag: FlagOutput) => {
    setSelectedFlag(flag);
    open("editFlag");
  };
  const handleDeleteClick = (flag: FlagOutput) => {
    setSelectedFlag(flag);
    open("deleteFlag");
  };
 const handleConfirmDelete = async () => {
    try {
      const response = await deleteFlag(selectedFlag?.id as number);
      fetchFlags(true);
      close();
      toast.success("Bendera berhasil dihapus");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus bendera");
    }
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manajemen Bendera
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Kelola semua bendera Anda di sini
          </p>
        </div>
        <button
          onClick={() => open("addFlag")}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Buat Bendera Baru</span>
          <span className="sm:hidden">Buat</span>
        </button>
      </div>

      {/* Flags Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Nama Bendera
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
              ) : flags.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <p className="text-slate-600 text-lg">No flags yet</p>
                    <p className="text-slate-500 text-sm mt-1">
                      Click "Buat Bendera Baru" to add a flag
                    </p>
                  </td>
                </tr>
              ) : (
                flags.map((flag) => (
                  <tr
                    key={flag.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                        {flag.name}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEditClick(flag)}
                          className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Edit2
                            size={14}
                            className="text-gray-600 sm:w-4 sm:h-4"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(flag)}
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

      {/* Modal for Adding Flag */}
      {isModalAdd && <FlagAdd onSuccess={() => fetchFlags(true)} onClose={close} />}
      {isModalEdit && selectedFlag && (
        <FlagFormEdit onSuccess={() => fetchFlags(true)} flag={selectedFlag} />
      )}
      {/* Modal for Deleting Flag */}
      {isModalDelete && selectedFlag && (
        <ModalConfirmation
          title="Hapus Bendera"
          message={`Apakah Anda yakin ingin menghapus bendera "${selectedFlag.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onClose={() => close()}
        />
      )}
    </div>
  );
}
