import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Download, FileImage, Code, FileText } from 'lucide-react';
import './FormatDropdown.css';

export type FileFormat = 'png' | 'svg' | 'pdf';

export interface FormatOption {
  value: FileFormat;
  label: string;
  description: string;
  icon: React.ReactNode;
  extension: string;
}

interface FormatDropdownProps {
  selectedFormat: FileFormat;
  onFormatChange: (format: FileFormat) => void;
  onDownload: (format: FileFormat) => void;
  disabled?: boolean;
  className?: string;
}

const formatOptions: FormatOption[] = [
  {
    value: 'png',
    label: 'PNG',
    description: 'Perfect for web and digital use',
    icon: <FileImage size={16} />,
    extension: '.png'
  },
  {
    value: 'svg',
    label: 'SVG',
    description: 'Scalable vector for print materials',
    icon: <Code size={16} />,
    extension: '.svg'
  },
  {
    value: 'pdf',
    label: 'PDF',
    description: 'Professional document with metadata',
    icon: <FileText size={16} />,
    extension: '.pdf'
  }
];

const FormatDropdown: React.FC<FormatDropdownProps> = ({
  selectedFormat,
  onFormatChange,
  onDownload,
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = formatOptions.find(option => option.value === selectedFormat);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFormatSelect = (format: FileFormat) => {
    onFormatChange(format);
    setIsOpen(false);
  };

  const handleDownloadClick = () => {
    onDownload(selectedFormat);
  };

  return (
    <div className={`format-dropdown ${className}`} ref={dropdownRef}>
      <div className="download-button-group">
        <button
          className="download-button main"
          onClick={handleDownloadClick}
          disabled={disabled}
          title={`Download as ${selectedOption?.label} ${selectedOption?.extension}`}
        >
          <Download size={16} />
          <span className="download-text">
            <span className="download-label">Download</span>
            <span className="download-format">{selectedOption?.label}</span>
          </span>
        </button>
        
        <button
          className="download-button dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label="Select download format"
        >
          <ChevronDown size={14} className={`chevron ${isOpen ? 'open' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="format-dropdown-menu">
          {formatOptions.map((option) => (
            <button
              key={option.value}
              className={`format-option ${option.value === selectedFormat ? 'selected' : ''}`}
              onClick={() => handleFormatSelect(option.value)}
            >
              <div className="format-icon">
                {option.icon}
              </div>
              <div className="format-info">
                <div className="format-label">
                  {option.label} <span className="format-extension">{option.extension}</span>
                </div>
                <div className="format-description">{option.description}</div>
              </div>
              {option.value === selectedFormat && (
                <div className="format-selected-indicator">✓</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormatDropdown;