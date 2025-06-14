import React, { useState } from 'react';
import { updateGalleryConfig } from '@/lib/gallery';

const GalleryAdmin = ({ config, setConfig }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prevConfig => ({
      ...prevConfig,
      settings: {
        ...prevConfig.settings,
        [name]: type === 'checkbox' ? checked : value,
      }
    }));
  };

  const handleImageChange = (index, e) => {
    const { name, value } = e.target;
    const newImages = [...config.images];
    newImages[index] = { ...newImages[index], [name]: value };
    setConfig(prevConfig => ({ ...prevConfig, images: newImages }));
  };

  const addImage = () => {
    const newImage = {
      id: `img-${Date.now()}`,
      title: 'New Image',
      imageUrl: 'https://placehold.co/1200x800/EEE/31343C?text=New+Image',
      buttonText: 'Button Text',
      buttonLink: '#'
    };
    setConfig(prevConfig => ({ ...prevConfig, images: [...prevConfig.images, newImage]}));
  };

  const removeImage = (index) => {
    const newImages = config.images.filter((_, i) => i !== index);
    setConfig(prevConfig => ({ ...prevConfig, images: newImages}));
  };

  // Save to Firestore directly
  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage('');
    try {
      await updateGalleryConfig(config);
      setMessage('Gallery configuration saved!');
    } catch (err) {
      setMessage('Error saving gallery: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gallery Settings</h1>
          <button onClick={handleSaveChanges} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        {message && <div className="mb-4 text-center text-sm text-green-600">{message}</div>}
        {/* -- General Settings -- */}
        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Accordion Height</label>
              <input type="text" name="accordionHeight" value={config.settings.accordionHeight} onChange={handleSettingChange} className="w-full p-2 border rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Default Active Panel (Index)</label>
              <input type="number" name="defaultActiveIndex" value={config.settings.defaultActiveIndex} onChange={handleSettingChange} className="w-full p-2 border rounded-md"/>
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="hoverToExpand" name="hoverToExpand" checked={config.settings.hoverToExpand} onChange={handleSettingChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
              <label htmlFor="hoverToExpand" className="ml-2 block text-sm text-gray-900">Enable Hover to Expand</label>
            </div>
          </div>
        </div>
        {/* -- Image Management -- */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Manage Images</h2>
            <button onClick={addImage} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
              + Add Image
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {config.images.map((image, index) => (
            <div key={image.id} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-800">Image {index + 1}</h3>
                <button onClick={() => removeImage(index)} className="text-red-500 hover:text-red-700 font-semibold text-sm">Remove</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                  <input type="text" name="imageUrl" value={image.imageUrl} onChange={(e) => handleImageChange(index, e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <input type="text" name="title" value={image.title} onChange={(e) => handleImageChange(index, e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Button Text</label>
                  <input type="text" name="buttonText" value={image.buttonText} onChange={(e) => handleImageChange(index, e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Button Link</label>
                  <input type="text" name="buttonLink" value={image.buttonLink} onChange={(e) => handleImageChange(index, e)} className="w-full p-2 border rounded-md"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryAdmin; 