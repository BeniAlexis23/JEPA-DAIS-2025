"use client";
import { useEffect, useRef } from "react";

interface UploadFilesProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const UploadFiles = ({ files, setFiles }: UploadFilesProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter((file) => file.type === "application/pdf");

    if (validFiles.length + files.length > 2) {
      alert("Solo se pueden subir hasta max. 2 archivos.");
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  useEffect(() => {
    if (files.length === 0 && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [files]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label className="text-sm font-semibold text-slate-200">Archivos del proyecto</label>
          <p className="mt-1 text-sm text-slate-400">Solo PDF, máximo 2 archivos.</p>
        </div>
        <p className="text-sm font-medium text-secondary">{files.length}/2 cargados</p>
      </div>

      <input
        type="file"
        ref={inputRef}
        required
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        disabled={files.length >= 2}
        className="block w-full cursor-pointer rounded-xl border border-dashed border-secondary/35 bg-secondary/10 text-sm text-slate-300 file:mr-4 file:border-0 file:bg-primary file:px-5 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-secondary hover:file:text-darkmode disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="mt-4 space-y-2">
        {files.map((file, index) => (
          <div key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-darkmode/70 px-4 py-3">
            <span className="truncate text-sm text-slate-200">{file.name}</span>
            <button type="button" onClick={() => removeFile(index)} className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-error/15 text-error transition hover:bg-error hover:text-white" aria-label={`Quitar archivo ${file.name}`}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFiles;
