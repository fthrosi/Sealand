"use client";

import { useState, useEffect, use } from "react";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { getCareers,deleteCareer } from "@/api/career";
import { CareerOutput } from "@/types/career.type";
import { useDataStore } from "@/store/useDataStore";
import CareerAdd from "@/components/modals/career/modalAddCareer";
import CareerFormEdit from "@/components/modals/career/modalEditCareer";
import { ModalConfirmation } from "@/components/modals/modalConfirmation";
import { toast } from "sonner";
import loadingAnimation from "@/animations/loading.json";
import Lottie from "lottie-react";

export default function Career() {
  const [selectedCareer, setSelectedCareer] = useState<CareerOutput | null>(null);
  const open = useUIStore((state) => state.open);
  const [loading, setLoading] = useState(false);
  const isModalAdd = useUIStore((state) => state.activeModal === "addCareer");
  const isModalEdit = useUIStore(
    (state) => state.activeModal === "editCareer"
  );
  const close = useUIStore((state) => state.close);
  const isModalDelete = useUIStore(
    (state) => state.activeModal === "deleteCareer"
  );
  const [careers, setCareers] = useState<CareerOutput[]>([]);
const fetchVesselTypes = useDataStore((state) => state.fetchVesselTypes);
  const fetchCareers = async () => {
    setLoading(true);
    try {
      const response = await getCareers();
      console.log("Data karir berhasil dimuat:", response.data.data);
      setLoading(false);
        setCareers(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error(
        "Terjadi kesalahan saat memuat data kategori karir:",
        error
      );
    }
  };
  useEffect(() => {
    fetchCareers();
    fetchVesselTypes();
  }, []);
  const handleEditClick = (career: CareerOutput) => {
    setSelectedCareer(career);
    open("editCareer");
  };
  const handleDeleteClick = (career: CareerOutput) => {
    setSelectedCareer(career);
    open("deleteCareer");
  };
 const handleConfirmDelete = async () => {
    try {
      const response = await deleteCareer(selectedCareer?.id as number);
      fetchCareers();
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
            Manajemen Karir
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Kelola semua karir Anda di sini
          </p>
        </div>
        <button
          onClick={() => open("addCareer")}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Buat Karir Baru</span>
          <span className="sm:hidden">Buat</span>
        </button>
      </div>

      {/* Careers Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Nama Posisi
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Level
                </th>
                <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Tipe Kapal
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Contract Duration
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Route
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Status
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
              ) : careers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <p className="text-slate-600 text-lg">No careers yet</p>
                    <p className="text-slate-500 text-sm mt-1">
                      Click "Buat Karir Baru" to add a career
                    </p>
                  </td>
                </tr>
              ) : (
                careers.map((career) => (
                  <tr
                    key={career.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                        {career.title}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                        {career.level || '-'}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm">
                      {career.vessel_type?.name || '-'}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm">
                      {career.times_contract ? `${career.times_contract} Month` : '-'}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm">
                      {career.route || '-'}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm">
                      {career.status || '-'}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEditClick(career)}
                          className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Edit2
                            size={14}
                            className="text-gray-600 sm:w-4 sm:h-4"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(career)}
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
      {isModalAdd && <CareerAdd onSuccess={fetchCareers} onClose={close} />}
      {isModalEdit && selectedCareer && (
        <CareerFormEdit onSuccess={fetchCareers} career={selectedCareer} />
      )}
      {/* Modal for Deleting Career */}
      {isModalDelete && selectedCareer && (
        <ModalConfirmation
          title="Hapus Karir"
          message={`Apakah Anda yakin ingin menghapus karir "${selectedCareer.title}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onClose={() => close()}
        />
      )}
    </div>
  );
}
