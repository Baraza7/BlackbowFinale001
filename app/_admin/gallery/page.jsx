"use client";
import React, { useState, useEffect } from "react";
import GalleryAdmin from "@/components/admin/GalleryAdmin";
import AdminLayout from "@/components/admin/AdminLayout";
import initialGalleryConfig from "../../../galleryConfig/galleryConfig";

export default function GalleryAdminPage() {
  const [galleryConfig, setGalleryConfig] = useState(initialGalleryConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch latest config from API on component mount
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) throw new Error('Failed to fetch gallery config');
        const data = await res.json();
        setGalleryConfig(data);
      } catch (err) {
        setError('Could not load latest gallery config. Showing default.');
        setGalleryConfig(initialGalleryConfig);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  if (loading) {
    return (
      <AdminLayout 
        title="Gallery Management"
        breadcrumbs={[
          { label: "About", href: "/admin/about" },
          { label: "Gallery" }
        ]}
        backHref="/admin/about"
      >
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gallery configuration...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Gallery Management"
      breadcrumbs={[
        { label: "About", href: "/admin/about" },
        { label: "Gallery" }
      ]}
      backHref="/admin/about"
    >
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm">
        <GalleryAdmin config={galleryConfig} setConfig={setGalleryConfig} />
      </div>
    </AdminLayout>
  );
} 