export type FileFormat = 'png' | 'svg' | 'pdf';

/**
 * Download a file from a data URL
 */
export const downloadDataURL = (dataURL: string, filename: string) => {
  try {
    // Convert data URL to blob
    const [header, data] = dataURL.split(',');
    const mime = header.match(/:(.*?);/)?.[1] || 'image/png';
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    
    const blob = new Blob([array], { type: mime });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback to simple method
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
  }
};

/**
 * Download QR code in specific format via API
 */
export const downloadQRCode = async (qrCodeId: string, format: FileFormat, filename?: string) => {
  try {
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const response = await fetch(`${API_BASE_URL}/api/qr/download/${qrCodeId}/${format}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    // Determine file extension
    const extension = format === 'svg' ? '.svg' : format === 'pdf' ? '.png' : '.png'; // PDF currently returns PNG
    const downloadFilename = filename || `qr-code-${qrCodeId}${extension}`;
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('QR download failed:', error);
    throw error;
  }
};

/**
 * Get appropriate file extension for format
 */
export const getFileExtension = (format: FileFormat): string => {
  switch (format) {
    case 'svg':
      return '.svg';
    case 'pdf':
      return '.pdf';
    case 'png':
    default:
      return '.png';
  }
};

/**
 * Download QR code from data URL with format-specific filename
 */
export const downloadQRCodeFromDataURL = (dataURL: string, qrCodeId: string, format: FileFormat = 'png') => {
  const extension = getFileExtension(format);
  const filename = `qr-${qrCodeId}${extension}`;
  downloadDataURL(dataURL, filename);
};