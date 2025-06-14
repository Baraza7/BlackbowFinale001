import React, { useState, useEffect, useId } from 'react';
import PropTypes from 'prop-types';
import './ImageAccordion.css';
import { getGalleryConfig } from '@/lib/gallery';

const AccordionItem = ({ item, index, activeIndex, onItemClick, hoverToExpand, uniqueId }) => {
  const isActive = index === activeIndex;
  const inputId = `${uniqueId}-${index}`;

  const handleMouseEnter = () => {
    if (hoverToExpand) {
      onItemClick(index);
    }
  };

  return (
    <>
      <input
        type="radio"
        name={`ekit_ia_${uniqueId}`}
        id={inputId}
        className="elementskit-single-image-accordion--input"
        hidden
        checked={isActive}
        onChange={() => onItemClick(index)}
      />
      <label
        htmlFor={inputId}
        className={`elementskit-single-image-accordion ekit-image-accordion-item ${isActive ? 'active' : ''}`}
        style={{ backgroundImage: `url(${item.imageUrl})` }}
        onMouseEnter={handleMouseEnter}
      >
        <span className="elementskit-accordion-content">
          <span className="elementskit-accordion-title-wraper">
            <span className="elementskit-accordion-title">{item.title || ''}</span>
          </span>
          {item.buttonText && (
            <span className="elementskit-btn-wraper">
              <a href={item.buttonLink || '#'} className="ekit-image-accordion--btn elementskit-btn whitespace--normal">
                {item.buttonText}
              </a>
            </span>
          )}
        </span>
      </label>
    </>
  );
};

const ImageAccordion = ({ config: staticConfig }) => {
  const [galleryConfig, setGalleryConfig] = useState(staticConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(staticConfig.settings.defaultActiveIndex || 0);
  const uniqueId = useId();

  useEffect(() => {
    async function fetchConfig() {
      setLoading(true);
      setError('');
      try {
        const data = await getGalleryConfig();
        setGalleryConfig(data);
        setActiveIndex(data.settings.defaultActiveIndex || 0);
      } catch (err) {
        setError('Could not load latest gallery. Showing default.');
        setGalleryConfig(staticConfig);
        setActiveIndex(staticConfig.settings.defaultActiveIndex || 0);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="text-center py-8">Loading gallery...</div>;
  if (error) <div className="text-center text-red-500 py-2">{error}</div>;

  const { settings, images } = galleryConfig;

  return (
    <div className={`ekit-wid-con ${settings.hoverToExpand ? 'ekit-image-accordion-hover' : 'ekit-image-accordion-click'}`}>
      <div className="elementskit-image-accordion-wraper" style={{ height: settings.accordionHeight || '500px' }}>
        {images.map((image, index) => (
          <AccordionItem
            key={image.id}
            item={image}
            index={index}
            activeIndex={activeIndex}
            onItemClick={setActiveIndex}
            hoverToExpand={settings.hoverToExpand}
            uniqueId={uniqueId}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageAccordion; 