"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VesselEditSchema, type VesselEditType } from "@/schema/vesselSchema";
import { toast } from "sonner";
import { useUIStore } from "@/store/useUIStore";
import { VesselOutput } from "@/types/vesels";
import Modal from "../modal";
import { updateVessel } from "@/api/vessel";
import { useDataStore } from "@/store/useDataStore";
import { useEffect } from "react";

interface VesselFormEditProps {
  onSuccess: () => void;
  vessel: VesselOutput;
}
export default function VesselFormEdit({
  onSuccess,
  vessel,
}: VesselFormEditProps) {
  const flags = useDataStore((state) => state.flags);
  const types = useDataStore((state) => state.vesselTypes);
  const fetchFlags = useDataStore((state) => state.fetchFlags);
  const fetchVesselTypes = useDataStore((state) => state.fetchVesselTypes);
  const close = useUIStore((state) => state.close);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VesselEditType>({
    resolver: zodResolver(VesselEditSchema),
    defaultValues: {
      name: vessel.name,
      flag_id: vessel.flag_id,
      type_id: vessel.type_id,
      url: vessel.url,
    },
  });

  const onSubmit = async (data: VesselEditType) => {
    try {
      const response = await updateVessel(vessel.id, data);
      toast.success("Vessel berhasil diperbarui");
      onSuccess();
      close();
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui vessel");
    }
  };
  useEffect(() => {
    fetchFlags();
    fetchVesselTypes();
  }, [fetchFlags, fetchVesselTypes]);
  return (
    <Modal title="Edit Divisi">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Name Vessel <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan nama Vessel"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Flag <span className="text-red-500">*</span>
          </label>

          <select
            {...register("flag_id", { valueAsNumber: true })}
            className="w-full border border-slate-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">-- Pilih Flag --</option>
            {flags.map((flag) => (
              <option key={flag.id} value={flag.id}>
                {flag.name}
              </option>
            ))}
          </select>

          {errors.flag_id && (
            <p className="text-red-600 text-sm mt-1">
              {errors.flag_id.message}
            </p>
          )}
        </div>

        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Type Vessel <span className="text-red-500">*</span>
          </label>

          <select
            {...register("type_id", { valueAsNumber: true })}
            className="w-full border border-slate-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">-- Pilih Type Vessel --</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          {errors.type_id && (
            <p className="text-red-600 text-sm mt-1">
              {errors.type_id.message}
            </p>
          )}
        </div>

        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Url <span className="text-red-500">*</span>
          </label>
          <input
            {...register("url")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan Url Vessel"
          />
          {errors.url && (
            <p className="text-red-600 text-sm mt-1">{errors.url.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors mt-6"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Menyimpan...
            </span>
          ) : (
            "Simpan Perubahan"
          )}
        </button>
      </form>
    </Modal>
  );
}
