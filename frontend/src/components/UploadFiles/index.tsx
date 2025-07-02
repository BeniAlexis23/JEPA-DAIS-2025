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
        const allowedTypes = [
            "application/pdf",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];

        const validFiles = fileArray.filter((file) => allowedTypes.includes(file.type));

        if (validFiles.length + files.length > 2) {
            alert("Solo se pueden subir hasta 2 archivos.");
            return;
        }

        setFiles((prev) => [...prev, ...validFiles]);
    };

    const removeFile = (indexToRemove: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    // 💡 Aquí está el paso 3: limpiar input si files está vacío
    useEffect(() => {
        if (files.length === 0 && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [files]);

    return (
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-white">
                Selecciona los archivos para cargar (PDF o PPT - máx. 2)
            </label>
            <input
                type="file"
                ref={inputRef}
                required
                accept=".pdf,.ppt,.pptx"
                multiple
                onChange={handleFileChange}
                disabled={files.length >= 2}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />

            {/* Vista previa de archivos */}
            <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadFiles;