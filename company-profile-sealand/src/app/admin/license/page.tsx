"use client";

import { useState, useEffect} from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import LicenseForm from "@/components/modals/license/modalAddLicense";
import LicenseFormEdit from "@/components/modals/license/modalEditLicense";
import { LicenseOutput } from "@/types/license.types";
import { ModalConfirmation } from "@/components/modals/modalConfirmation";
import { toast } from "sonner";
import loadingAnimation from "@/animations/loading.json";
import Lottie from "lottie-react";
import { deleteLicense,getLicenses } from "@/api/license";

export default function TeamsManagement() {
  const [selectedLicense, setSelectedLicense] = useState<LicenseOutput>();
  const open = useUIStore((state) => state.open);
  const [loading, setLoading] = useState(false);
  const isModalAdd = useUIStore((state) => state.activeModal === "addLicense");
  const isModalEdit = useUIStore(
    (state) => state.activeModal === "editLicense"
  );
  const close = useUIStore((state) => state.close);
  const isModalDelete = useUIStore(
    (state) => state.activeModal === "deleteLicense"
  );
  const [license, setLicense] = useState<LicenseOutput[]>([]);
  const fetchLicenses = async () => {
    setLoading(true);
    try {
      const data = await getLicenses();
      setLicense(data.data.data);
    } catch (error) {
      toast.error("Terjadi kesalahan saat memuat licenses");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchLicenses();
  }, []);
  const handleEditClick = (license: LicenseOutput) => {
    setSelectedLicense(license);
    open("editLicense");
  };
  const handleDeleteClick = (license: LicenseOutput) => {
    setSelectedLicense(license);
    open("deleteLicense");
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteLicense(Number(selectedLicense?.id));
        fetchLicenses();
        close();
        toast.success("License berhasil dihapus");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus license");
    }
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manajemen License
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Kelola semua license Anda di sini
          </p>
        </div>
        <button
          onClick={() => open("addLicense")}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Buat License Baru</span>
          <span className="sm:hidden">Buat</span>
        </button>
      </div>

      {/* License Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Gambar
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
              ) : license.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <p className="text-slate-600 text-lg">No license yet</p>
                    <p className="text-slate-500 text-sm mt-1">
                      Click "Buat License Baru" to add a license
                    </p>
                  </td>
                </tr>
              ) : (
                license.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img_url}`}
                            alt={"License Image"}
                            className="w-20 h-30 object-cover rounded-lg"
                        />
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

      {/* Modal for Adding License */}
      {isModalAdd && <LicenseForm onSuccess={() => fetchLicenses()} />}
      {isModalEdit && selectedLicense && (
        <LicenseFormEdit onSuccess={() => fetchLicenses()} license={selectedLicense} />
      )}
      {/* Modal for Deleting License */}
      {isModalDelete && selectedLicense && (
        <ModalConfirmation
          title="Hapus License"
          message={`Apakah Anda yakin ingin menghapus license ini? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onClose={() => close()}
        />
      )}
    </div>
  );
}
