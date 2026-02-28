'use client';

import { useState, useRef } from 'react';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function CloudinaryUpload({
  onUpload,
  label = 'Upload File',
  accept = 'image/*',
  folder = 'quickhire',
  type = 'image', // 'image' | 'file'
  value = '',
  className = '',
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const isImage = type === 'image';

  const uploadToCloudinary = async (file) => {
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setError('');
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', folder);

      const resourceType = isImage ? 'image' : 'auto';
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
        { method: 'POST', body: formData }
      );

      const data = await res.json();

      if (data.secure_url) {
        setPreview(data.secure_url);
        onUpload?.(data.secure_url);
      } else {
        setError(data.error?.message || 'Upload failed. Please try again.');
      }
    } catch {
      setError('Upload failed. Please check your connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  const handleRemove = () => {
    setPreview('');
    setFileName('');
    setError('');
    onUpload?.('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-[#25324B] mb-2">
          {label}
        </label>
      )}

      {/* Preview */}
      {preview && isImage && (
        <div className="relative mb-3 inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Upload preview"
            className="w-24 h-24 rounded-lg object-cover border-2 border-[#4640DE]/20"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition shadow-md"
          >
            ✕
          </button>
        </div>
      )}

      {/* File preview (non-image) */}
      {preview && !isImage && (
        <div className="flex items-center gap-3 mb-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-green-700 font-medium truncate flex-1">
            {fileName || 'File uploaded'}
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-400 hover:text-red-600 text-sm font-semibold"
          >
            Remove
          </button>
        </div>
      )}

      {/* Upload Area */}
      {!preview && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-[#4640DE] bg-[#4640DE]/5'
              : 'border-gray-300 hover:border-[#4640DE] hover:bg-gray-50'
          } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-[#4640DE] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {isImage ? (
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              )}
              <div>
                <p className="text-sm text-gray-600">
                  <span className="text-[#4640DE] font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {isImage ? 'PNG, JPG, WEBP up to 10MB' : 'PDF, DOC, DOCX up to 10MB'}
                </p>
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}
