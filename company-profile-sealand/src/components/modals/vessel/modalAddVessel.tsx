"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VesselSchema, type VesselType } from "@/schema/vesselSchema";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUIStore } from "@/store/useUIStore";
import Modal from "../modal";
import { addVessel } from "@/api/vessel";
import { useDataStore } from "@/store/useDataStore";

interface VesselFormProps {
  onSuccess: () => void;
}
export default function VesselForm({ onSuccess }: VesselFormProps) {
  const flags = useDataStore((state) => state.flags);
  const types = useDataStore((state) => state.vesselTypes);
  const fetchFlags = useDataStore((state) => state.fetchFlags);
  const fetchVesselTypes = useDataStore((state) => state.fetchVesselTypes);
  const close = useUIStore((state) => state.close);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VesselType>({
    resolver: zodResolver(VesselSchema),
    defaultValues: {
      name: "",
      flag_id: 0,
      type_id: 0,
      url: "",
    },
  });

  const onSubmit = async (data: VesselType) => {
    try {
      const response = await addVessel(data);
      if (response.data.success) {
        toast.success("Vessel berhasil ditambahkan");
        reset();
        onSuccess();
        close();
      } else {
        toast.error("Gagal menambahkan vessel");
      }
      console.log(data);
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };
  useEffect(() => {
    fetchFlags();
    fetchVesselTypes();
  }, [fetchFlags, fetchVesselTypes]);
  return (
    <Modal title="Form Tambah Vessel">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* TITLE */}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Vessel"}
        </button>
      </form>
    </Modal>
  );
}
