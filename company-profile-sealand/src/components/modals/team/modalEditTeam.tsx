"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamEditSchema, type TeamEditType } from "@/schema/teamSchema";
import { useState,useEffect } from "react";
import { useDataStore } from "@/store/useDataStore";
import { toast } from "sonner";
import { useUIStore } from "@/store/useUIStore";
import { TeamOutput } from "@/types/team";
import Modal from "../modal";
import { updateTeam } from "@/api/teams";

interface TeamFormEditProps {
  onSuccess: () => void;
  team: TeamOutput;
}
export default function TeamFormEdit({ onSuccess, team }: TeamFormEditProps) {
  const divisions = useDataStore((state) => state.divisions);
  const teams = useDataStore((state) => state.teams);
  const fetchTeams = useDataStore((state) => state.fetchTeams);
  const fetchDivisions = useDataStore((state) => state.fetchDivisions);
  const close = useUIStore((state) => state.close);
  const [imagePreview, setImagePreview] = useState<string | null>(
    `${process.env.NEXT_PUBLIC_API_URL}/${team.img_url}`,
  );
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeamEditType>({
    resolver: zodResolver(TeamEditSchema) as any,
    defaultValues: {
      name: team.name,
      division_id: team.division_id,
      bos_id: team.bos_id,
      role: team.role,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", e.target.files as FileList);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: TeamEditType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("division_id", data.division_id.toString());
    formData.append("bos_id", data.bos_id ? data.bos_id.toString() : "");
    formData.append("role", data.role);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    try {
      const response = await updateTeam(team.id, formData);
      toast.success("Team berhasil diperbarui");
      onSuccess();
      close();
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui team");
    }
  };
  useEffect(() => {
    fetchDivisions();
    fetchTeams();
  }, [fetchDivisions, fetchTeams]);
  return (
    <Modal title="Form Edit Team">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="image"
            className="block text-sm text-neutral-black font-semibold mb-2"
          >
            Gambar <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Thumbnail preview"
                  className="w-full h-auto object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(
                      `${process.env.NEXT_PUBLIC_API_URL}/${team.img_url}`,
                    );
                    setValue("image", undefined as any);
                  }}
                  className={`${imagePreview === `${process.env.NEXT_PUBLIC_API_URL}/${team.img_url}` ? "hidden" : ""} absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <label
                  htmlFor="image"
                  className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors shadow-lg text-sm font-medium flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Ganti Foto
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer py-8">
                <svg
                  className="w-12 h-12 text-slate-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-slate-600 font-medium">
                  Upload Thumbnail
                </span>
                <span className="text-sm text-slate-500">
                  Drag & drop atau klik untuk memilih
                </span>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message?.toString()}
            </p>
          )}
        </div>

        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Name Team <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan nama Team"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Divisi <span className="text-red-500">*</span>
          </label>

          <select
            {...register("division_id", { valueAsNumber: true })}
            className="w-full border border-slate-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">-- Pilih Divisi --</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>

          {errors.division_id && (
            <p className="text-red-600 text-sm mt-1">
              {errors.division_id.message}
            </p>
          )}
        </div>

        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Boss
          </label>

          <select
            {...register("bos_id")}
            className="w-full border border-slate-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">-- Pilih Bos --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          {errors.bos_id && (
            <p className="text-red-600 text-sm mt-1">{errors.bos_id.message}</p>
          )}
        </div>
        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            {...register("role")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan role"
          />
          {errors.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </Modal>
  );
}
