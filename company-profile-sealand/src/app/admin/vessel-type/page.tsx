"use client";

import { useState, useEffect} from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import VesselTypeForm from "@/components/modals/vesselType/modalAddVesselType";
import VesselTypeFormEdit from "@/components/modals/vesselType/modalEditVesselType";
import { VesselTypeOutput } from "@/types/vesels";
import { ModalConfirmation } from "@/components/modals/modalConfirmation";
import { toast } from "sonner";
import loadingAnimation from "@/animations/loading.json";
import Lottie from "lottie-react";
import { useDataStore } from "@/store/useDataStore";
import { deleteVesselType } from "@/api/vessel-type";

export default function VesselTypeManagement() {
  const [selectedVesselType, setSelectedVesselType] = useState<VesselTypeOutput>();
  const open = useUIStore((state) => state.open);
  const [loading, setLoading] = useState(false);
  const isModalAdd = useUIStore((state) => state.activeModal === "addVesselType");
  const isModalEdit = useUIStore(
    (state) => state.activeModal === "editVesselType"
  );
  const close = useUIStore((state) => state.close);
  const isModalDelete = useUIStore(
    (state) => state.activeModal === "deleteVesselType"
  );
 const vesselTypes = useDataStore((state) => state.vesselTypes);
 const fetchVesselTypes = useDataStore((state) => state.fetchVesselTypes);
  
  useEffect(() => {
    fetchVesselTypes();
  }, [fetchVesselTypes]);
  const handleEditClick = (vesselType: VesselTypeOutput) => {
    setSelectedVesselType(vesselType);
    open("editVesselType");
  };
  const handleDeleteClick = (vesselType: VesselTypeOutput) => {
    setSelectedVesselType(vesselType);
    open("deleteVesselType");
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteVesselType(Number(selectedVesselType?.id));
        fetchVesselTypes(true);
        close();
        toast.success("Vessel type berhasil dihapus");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus vessel type");
    }
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manajemen Vessel Type
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Kelola semua vessel type Anda di sini
          </p>
        </div>
        <button
          onClick={() => open("addVesselType")}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Buat Vessel Type Baru</span>
          <span className="sm:hidden">Buat</span>
        </button>
      </div>

      {/* Vessel Type Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Gambar
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Name
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
              ) : vesselTypes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <p className="text-slate-600 text-lg">No vessel type yet</p>
                    <p className="text-slate-500 text-sm mt-1">
                      Click "Buat Vessel Type Baru" to add a vessel type
                    </p>
                  </td>
                </tr>
              ) : (
                vesselTypes.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img_url}`}
                            alt={"Vessel Type Image"}
                            className="w-30 h-20 object-cover rounded-lg"
                        />
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">
                      {item.name}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Edit2
                            size={14}
                            className="text-gray-600 sm:w-4 sm:h-4"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
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

      {/* Modal for Adding Vessel Type */}
      {isModalAdd && <VesselTypeForm onSuccess={() => fetchVesselTypes(true)} />}
      {isModalEdit && selectedVesselType && (
        <VesselTypeFormEdit onSuccess={() => fetchVesselTypes(true)} vesselType={selectedVesselType} />
      )}
      {/* Modal for Deleting Vessel Type */}
      {isModalDelete && selectedVesselType && (
        <ModalConfirmation
          title="Hapus Vessel Type"
          message={`Apakah Anda yakin ingin menghapus vessel type "${selectedVesselType.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onClose={() => close()}
        />
      )}
    </div>
  );
}
