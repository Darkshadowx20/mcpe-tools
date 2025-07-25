'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import JSZip from 'jszip';
import { skinToTotemMapping } from '../api/convert-totem/totem-mapping';

interface ConversionResult {
  totemSkin: string | null;
  error: string | null;
}

interface ApiErrorResponse {
  error: string;
}

interface ApiSuccessResponse {
  skinBase64: string;
}

export default function SkinConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingPhase, setLoadingPhase] = useState<number>(0);
  const [result, setResult] = useState<ConversionResult>({ totemSkin: null, error: null });
  const [isSlimModel, setIsSlimModel] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // Canvas reference for client-side processing
  const totemCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (phaseIntervalRef.current) {
        clearInterval(phaseIntervalRef.current);
      }
    };
  }, []);

  // Set up drag and drop event listeners
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Check if the mouse is outside the drop zone
      const rect = dropZone.getBoundingClientRect();
      const { clientX, clientY } = e;
      
      if (
        clientX < rect.left ||
        clientX >= rect.right ||
        clientY < rect.top ||
        clientY >= rect.bottom
      ) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const droppedFile = e.dataTransfer.files[0];
        // Check if it's a PNG file
        if (droppedFile.type === 'image/png') {
          setFile(droppedFile);
        } else {
          alert('Please upload a PNG file');
        }
      }
    };

    // Add event listeners
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    // Clean up
    return () => {
      dropZone.removeEventListener('dragenter', handleDragEnter);
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, [isDragging]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const convertSkinToTotem = (skinImg: HTMLImageElement) => {
    // Create totem canvas (16x16 pixels)
    const totemCanvas = totemCanvasRef.current;
    if (!totemCanvas) return null;
    
    const ctx = totemCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    
    // Set canvas dimensions to 16x16 (width x height)
    totemCanvas.width = 16;
    totemCanvas.height = 16;
    
    // Clear canvas with transparency
    ctx.clearRect(0, 0, 16, 16);
    
    // Draw the face and body parts directly from the skin
    // without any surrounding background shape
    Object.keys(skinToTotemMapping).forEach(part => {
      if (part === 'face' || part === 'faceOverlay') {
        const mapping = skinToTotemMapping[part];
        // Draw face parts
        ctx.drawImage(
          skinImg,
          mapping.srcX, mapping.srcY, mapping.srcWidth, mapping.srcHeight,
          mapping.destX, mapping.destY, mapping.destWidth, mapping.destHeight
        );
      }
    });
    
    // Draw body and arm parts
    Object.keys(skinToTotemMapping).forEach(part => {
      if (part !== 'face' && part !== 'faceOverlay') {
        const mapping = skinToTotemMapping[part];
        ctx.drawImage(
          skinImg,
          mapping.srcX, mapping.srcY, mapping.srcWidth, mapping.srcHeight,
          mapping.destX, mapping.destY, mapping.destWidth, mapping.destHeight
        );
      }
    });
    
    // Return as PNG with transparency
    return totemCanvas.toDataURL('image/png');
  };

  const convertSkin = async () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setLoadingPhase(0);
    setResult({ totemSkin: null, error: null });
    
    // Start progress animation with sophisticated phases
    progressIntervalRef.current = setInterval(() => {
      setLoadingProgress(prev => {
        // More natural progress curve with slowdowns at key points
        if (prev < 20) {
          return prev + (Math.random() * 2.5 + 0.5); // Initial quick progress
        } else if (prev < 40) {
          return prev + (Math.random() * 1.2); // First slowdown
        } else if (prev < 60) {
          return prev + (Math.random() * 0.8); // Second slowdown
        } else if (prev < 75) {
          return prev + (Math.random() * 0.4); // Third slowdown
        } else if (prev < 85) {
          return prev + (Math.random() * 0.2); // Almost there
        } else if (prev < 95) {
          return prev + (Math.random() * 0.1); // Final touches
        }
        return prev;
      });
    }, 80); // Faster updates for smoother animation
    
    // Start phase animation for loading messages
    const phases = [
      "Reading skin data",
      "Processing pixels",
      "Mapping textures",
      "Generating totem"
    ];
    
    phaseIntervalRef.current = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % phases.length);
    }, 1500);
    
    try {
      // Create FormData to send the file
      const formData = new FormData();
      if (file) {
        formData.append('skin', file);
      } else {
        throw new Error('Please provide a skin file');
      }
      
      // Call our server API to get the skin data
      const response = await fetch('/api/convert-totem', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json() as ApiErrorResponse;
        throw new Error(errorData.error || 'Failed to fetch skin');
      }
      
      const data = await response.json() as ApiSuccessResponse;
      
      // Convert the skin to totem format using client-side Canvas
      const skinImg = document.createElement('img');
      
      skinImg.onload = () => {
        try {
          const totemDataUrl = convertSkinToTotem(skinImg);
          
          if (totemDataUrl) {
            setResult({ totemSkin: totemDataUrl, error: null });
          } else {
            setResult({ 
              totemSkin: null, 
              error: 'Failed to convert skin to totem' 
            });
          }
        } catch (error) {
          setResult({ 
            totemSkin: null, 
            error: error instanceof Error ? error.message : 'An error occurred during conversion' 
          });
        } finally {
          // Clear the intervals
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          if (phaseIntervalRef.current) {
            clearInterval(phaseIntervalRef.current);
            phaseIntervalRef.current = null;
          }
          
          // Complete animation
          setLoadingProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            setLoadingProgress(0);
          }, 500); // Keep 100% state visible for a moment
        }
      };
      
      skinImg.onerror = () => {
        // Clear the intervals
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        if (phaseIntervalRef.current) {
          clearInterval(phaseIntervalRef.current);
          phaseIntervalRef.current = null;
        }
        
        setIsLoading(false);
        setLoadingProgress(0);
        setResult({ 
          totemSkin: null, 
          error: 'Could not load skin image.' 
        });
      };
      
      // Set the source to the base64 data from our API
      skinImg.src = data.skinBase64;
      
    } catch (error) {
      // Clear the intervals
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (phaseIntervalRef.current) {
        clearInterval(phaseIntervalRef.current);
        phaseIntervalRef.current = null;
      }
      
      setResult({ 
        totemSkin: null, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  // Generate a UUID v4
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, 
            v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Convert base64 data URL to Blob
  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
  };

  const downloadResourcePack = async () => {
    if (!result.totemSkin) return;
    
    try {
      // Create a new JSZip instance
      const zip = new JSZip();
      
      // Create the manifest.json with new UUIDs
      const manifestJson = {
        "format_version": 2,
        "header": {
          "description": `Made in notnicto.com - ${isSlimModel ? 'Slim' : 'Normal'} totem model`,
          "name": `§gCustom Totem ${isSlimModel ? '(Slim)' : ''} §7for Ultramarine`,
          "uuid": generateUUID(),
          "version": [1, 0, 0],
          "min_engine_version": [1, 16, 0]
        },
        "modules": [
          {
            "description": `${isSlimModel ? 'Slim' : 'Normal'} totem model resources`,
            "type": "resources",
            "uuid": generateUUID(),
            "version": [1, 0, 0]
          }
        ]
      };
      
      // Add manifest.json to the root
      zip.file("manifest.json", JSON.stringify(manifestJson, null, 2));
      
      // Get the original skin file data
      const originalSkinBlob = file ? new Blob([await file.arrayBuffer()]) : null;
      
      // Convert the totem skin to a Blob
      const totemBlob = dataURLtoBlob(result.totemSkin);
      
      // Add the original skin to the textures/custom_totem folder
      if (originalSkinBlob) {
        zip.file("textures/custom_totem/totem.png", originalSkinBlob);
      } else {
        // Fallback to using the converted skin if original is not available
        zip.file("textures/custom_totem/totem.png", totemBlob);
      }
      
      // Add the converted totem skin to the textures/items folder
      zip.file("textures/items/totem.png", totemBlob);
      
      // Add the converted totem skin as pack_icon.png in the root
      zip.file("pack_icon.png", totemBlob);
      
      // If slim model is selected, add the slim model files
      if (isSlimModel) {
        try {
          // Fetch the slim model JSON file
          const response = await fetch('/slim_totem.mcpack_FILES/models/entity/totem.geo.json');
          if (response.ok) {
            const slimModelJson = await response.text();
            // Add the slim model files to the resource pack
            zip.file("models/entity/totem.geo.json", slimModelJson);
          } else {
            console.warn("Could not fetch slim model file:", response.statusText);
          }
        } catch (error) {
          console.warn("Could not add slim model files:", error);
        }
      }
      
      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" });
      
      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `custom_totem${isSlimModel ? '_slim' : ''}.mcpack`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error creating resource pack:", error);
      alert("Failed to create resource pack. Please try again.");
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Sample Minecraft totem skin from public directory
  const sampleTotemPath = '/sample.png';

  // Get current loading phase text
  const getLoadingPhaseText = () => {
    const phases = [
      "Reading skin data",
      "Processing pixels",
      "Mapping textures",
      "Generating totem"
    ];
    return phases[loadingPhase];
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0f1218] rounded-lg overflow-hidden shadow-[0_0_30px_rgba(101,31,255,0.15)]">
      {/* Upload Section */}
      <div className="p-6 flex flex-col bg-gradient-to-b from-[#131b2e] to-[#0f1218]">
        <h2 className="text-2xl font-bold mb-4 text-[#61dafb] animate-pulse">Upload Skin</h2>
        
        <div 
          ref={dropZoneRef}
          onClick={handleUploadClick}
          className={`border-2 border-dashed ${isDragging ? 'border-[#61dafb] bg-[#1e2a4a]/40 scale-[1.02]' : 'border-[#4d5bce]/40 hover:border-[#61dafb]/60 hover:bg-[#1e2a4a]/30 hover:scale-[1.02]'} rounded-lg p-8 mb-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300`}
        >
          <div className={`w-16 h-16 mb-4 transition-transform duration-500 ${isDragging ? 'rotate-12 scale-110' : 'hover:rotate-12'}`}>
            <Image 
              src="/file.svg" 
              alt="Upload" 
              width={64} 
              height={64} 
              className={`${isDragging ? 'opacity-100' : 'opacity-70 hover:opacity-100'} transition-opacity duration-300`}
            />
          </div>
          <p className="text-center text-[#61dafb] mb-1 font-medium">
            {isDragging ? 'Drop your file here' : 'Click to upload'}
          </p>
          <p className="text-center text-[#c678dd] text-sm">
            {isDragging ? 'Release to upload' : 'or drag and drop'}
          </p>
          <p className="text-center text-gray-500 text-xs mt-2">PNG skin file (64x64)</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".png"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        
        {file && (
          <div className="text-[#98c379] text-sm mb-4 text-center font-medium animate-fadeIn">
            {file.name}
          </div>
        )}
        
        <div className="mb-4">
          <label className="flex items-center space-x-2 text-[#61afef] hover:text-[#61dafb] transition-colors duration-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isSlimModel}
              onChange={(e) => setIsSlimModel(e.target.checked)}
              className="h-4 w-4 accent-[#c678dd]"
            />
            <span>Slim arms model <span className="text-[#e06c75]">(Alex)</span></span>
          </label>
        </div>
        
        <button
          onClick={convertSkin}
          disabled={isLoading || !file}
          className="relative flex items-center justify-center py-3 px-4 bg-gradient-to-r from-[#4d5bce] to-[#7963d2] hover:from-[#5667de] hover:to-[#8470e3] text-white font-semibold rounded-lg disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:translate-y-[-2px] shadow-md hover:shadow-lg disabled:transform-none disabled:shadow-none mt-auto overflow-hidden"
        >
          {isLoading && (
            <>
              {/* Main progress bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#61dafb] via-[#c678dd] to-[#98c379] transition-all duration-300 z-0"
                style={{ width: `${loadingProgress}%` }}
              />
              
              {/* Shimmer effect */}
              <div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-animation z-10"
                style={{ width: '100%' }}
              />
              
              {/* Progress indicator line */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-glow z-10 transition-all duration-300"
                style={{ left: `${loadingProgress}%` }}
              />
              
              {/* Progress percentage */}
              <div 
                className="absolute top-0 right-0 bg-[#1e2a4a]/80 text-xs font-mono px-1.5 py-0.5 rounded-bl z-10 text-[#61dafb]"
              >
                {Math.round(loadingProgress)}%
              </div>
            </>
          )}
          
          <div className="relative z-10 flex items-center justify-center w-full">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-white/90">{getLoadingPhaseText()}</span>
              </div>
            ) : (
              'Convert to Totem'
            )}
          </div>
        </button>
      </div>
      
      {/* Preview Section */}
      <div className="p-6 flex flex-col bg-gradient-to-b from-[#151d30] to-[#0f1218]">
        <h2 className="text-2xl font-bold mb-4 text-[#c678dd]">Preview</h2>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 mb-4 transform transition-transform duration-500 hover:scale-110">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const isEven = (row + col) % 2 === 0;
                return (
                  <div 
                    key={i} 
                    className={`${isEven ? 'bg-[#151d30]' : 'bg-[#1e2a4a]'}`} 
                  />
                );
              })}
            </div>
            <Image
              src={result.totemSkin || sampleTotemPath}
              alt={result.totemSkin ? "Your Custom Totem" : "Sample Totem Texture"}
              fill
              className="object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <p className={`mb-2 font-medium transition-colors duration-300 ${result.totemSkin ? "text-[#98c379]" : "text-[#61afef]"}`}>
            {result.totemSkin ? "Your custom totem" : "Sample preview"}
          </p>
          
          {result.error && (
            <div className="text-[#e06c75] mt-2 animate-pulse">
              {result.error}
            </div>
          )}
        </div>
        
        {result.totemSkin && (
          <button
            onClick={downloadResourcePack}
            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-[#98c379] to-[#56b6c2] hover:from-[#a9d389] hover:to-[#67c7d3] text-white font-semibold rounded-lg transition-all duration-300 mt-4 transform hover:translate-y-[-2px] shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2 animate-bounce" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Resource Pack
          </button>
        )}
      </div>
      
      {/* Hidden canvas for image processing */}
      <div className="hidden">
        <canvas ref={totemCanvasRef} width="16" height="16"></canvas>
      </div>
    </div>
  );
} 