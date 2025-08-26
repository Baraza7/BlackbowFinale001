"use client";
import React, { useState, useEffect } from "react";
import FullGalleryAdmin from "@/components/admin/FullGalleryAdmin";
import AdminLayout from "@/components/admin/AdminLayout";
import initialFullGalleryConfig from "../../../../fullGalleryConfig/fullGalleryConfig";

export default function FullGalleryAdminPage() {
  const [fullGalleryConfig, setFullGalleryConfig] = useState(initialFullGalleryConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch latest config from API on component mount
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch('/api/fullgallery');
        if (!res.ok) throw new Error('Failed to fetch full gallery config');
        const data = await res.json();
        setFullGalleryConfig(data);
      } catch (err) {
        setError('Could not load latest full gallery config. Showing default.');
        setFullGalleryConfig(initialFullGalleryConfig);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  if (loading) {
    return (
      <AdminLayout 
        title="Full Gallery Management"
        breadcrumbs={[
          { label: "Media", href: "/admin/media" },
          { label: "Full Gallery" }
        ]}
        backHref="/admin/media"
      >
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading full gallery configuration...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Full Gallery Management"
      breadcrumbs={[
        { label: "Media", href: "/admin/media" },
        { label: "Full Gallery" }
      ]}
      backHref="/admin/media"
    >
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm">
        <FullGalleryAdmin config={fullGalleryConfig} setConfig={setFullGalleryConfig} />
      </div>
    </AdminLayout>
  );
} 