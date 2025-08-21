import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

const FullGallery = ({ config: staticConfig }) => {
  const [galleryConfig, setGalleryConfig] = useState(staticConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // First useEffect - fetch config
  useEffect(() => {
    async function fetchConfig() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/fullgallery');
        if (!res.ok) throw new Error('Failed to fetch gallery config');
        const data = await res.json();
        // Enforce removal of the last 3 placeholder images if present
        const trimmed = {
          ...data,
          images: (data.images || []).slice(0, 6),
          settings: {
            ...(data.settings || {}),
          }
        };
        setGalleryConfig(trimmed);
      } catch (err) {
        setError('Could not load latest gallery. Showing default.');
        const trimmedFallback = {
          ...staticConfig,
          images: (staticConfig.images || []).slice(0, 6),
          settings: {
            ...(staticConfig.settings || {}),
          }
        };
        setGalleryConfig(trimmedFallback);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, [staticConfig]);

  // Modal handlers
  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const nextImage = () => {
    if (galleryConfig.images && galleryConfig.images.length > 0) {
      const nextIndex = (currentImageIndex + 1) % galleryConfig.images.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(galleryConfig.images[nextIndex]);
      
      // Auto-navigate to correct page if needed
      const nextPage = Math.floor(nextIndex / imagesPerPage);
      if (nextPage !== currentPage) {
        setCurrentPage(nextPage);
      }
    }
  };

  const prevImage = () => {
    if (galleryConfig.images && galleryConfig.images.length > 0) {
      const prevIndex = (currentImageIndex - 1 + galleryConfig.images.length) % galleryConfig.images.length;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(galleryConfig.images[prevIndex]);
      
      // Auto-navigate to correct page if needed
      const prevPage = Math.floor(prevIndex / imagesPerPage);
      if (prevPage !== currentPage) {
        setCurrentPage(prevPage);
      }
    }
  };

  // Second useEffect - keyboard navigation (always called)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex, galleryConfig.images]);

  // Early returns AFTER all hooks
  if (loading) return <div className="text-center py-8 text-white">Loading gallery...</div>;
  if (error) return <div className="text-center text-red-400 py-2">{error}</div>;

  const { settings, images } = galleryConfig;
  
  // Responsive grid configuration
  const getImagesPerPage = () => {
    // Show up to 6 images per page (2 rows x 3 columns) after trimming
    return Math.min(6, (images || []).length || 6);
  };

  const imagesPerPage = getImagesPerPage();
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = currentPage * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      nextPage();
    }
    if (isRightSwipe && currentPage > 0) {
      prevPage();
    }
  };

  // Responsive grid classes
  const getResponsiveGridClass = () => {
    // Mobile: 1 column, Small tablet: 2x2 grid, Large tablet: 2 columns, Desktop: 3x3 grid
    return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6';
  };

  return (
    <>
      {/* Gallery Grid Container with consistent height */}
      <div className="w-full max-w-6xl mx-auto">
        <div 
          className={`${getResponsiveGridClass()} min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[800px]`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Display current page images */}
          {currentImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`group relative overflow-hidden rounded-lg cursor-pointer bg-gray-800 aspect-square ${
                settings.hoverEffect ? 'transition-transform hover:scale-105' : ''
              }`}
              onClick={() => openModal(image, startIndex + index)}
            >
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={image.imageUrl}
                alt={image.alt || image.title}
                fill
                className={`object-cover ${settings.hoverEffect ? 'transition-transform group-hover:scale-110' : ''}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }} // Ensure consistent aspect ratio
                onError={(e) => {
                  e.target.src = '/placeholder.svg';
                }}
              />
            
            {/* Hover Overlay */}
            {settings.hoverEffect && (
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <Search className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">View Image</p>
                  {image.title && (
                    <p className="text-xs mt-1 opacity-80">{image.title}</p>
                  )}
                </div>
              </div>
            )}

            {/* Image Info Overlay (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="text-white">
                {image.title && (
                  <h3 className="text-sm font-medium mb-1">{image.title}</h3>
                )}
                {image.description && (
                  <p className="text-xs opacity-80 line-clamp-2">{image.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Fill remaining slots with placeholders to maintain grid consistency */}
      {Array.from({ length: Math.max(0, imagesPerPage - currentImages.length) }, (_, index) => (
        <div 
          key={`placeholder-${index}`} 
          className="aspect-square opacity-0"
        >
          {/* Invisible placeholder to maintain grid layout */}
        </div>
      ))}
    </div>

    {/* Pagination Controls */}
    {totalPages > 1 && (
      <div className="flex flex-col items-center mt-8 space-y-4">
        {/* Desktop Pagination */}
        <div className="hidden md:flex items-center justify-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 text-black hover:bg-yellow-500'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === index
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === totalPages - 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 text-black hover:bg-yellow-500'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Mobile Pagination */}
        <div className="flex md:hidden items-center justify-between w-full max-w-sm">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              currentPage === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 text-black hover:bg-yellow-500'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">
              {currentPage + 1} of {totalPages}
            </span>
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              currentPage === totalPages - 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 text-black hover:bg-yellow-500'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )}

    {/* Page Info */}
    {totalPages > 1 && (
      <div className="text-center mt-4 space-y-2">
        <div className="text-white/70 text-sm">
          Page {currentPage + 1} of {totalPages} • {images.length} total images
        </div>
        <div className="md:hidden text-white/50 text-xs">
          Swipe left or right to navigate
        </div>
      </div>
    )}
  </div>

    {/* Modal for full-size image viewing */}
    {selectedImage && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        onClick={closeModal}
      >
        <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Main image */}
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.alt || selectedImage.title}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              style={{ 
                width: 'auto', 
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
              onError={(e) => {
                e.target.src = '/placeholder.svg';
              }}
            />
            
            {/* Image info overlay */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-white">
                  {selectedImage.title && (
                    <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                  )}
                  {selectedImage.description && (
                    <p className="text-sm opacity-90">{selectedImage.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-full px-4 py-2 text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
    )}
  </>
  );
};

export default FullGallery; 