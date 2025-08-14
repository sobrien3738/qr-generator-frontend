import React from 'react';
import { useParams } from 'react-router-dom';

const QRCodeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>QR Code Analytics</h1>
      <p>Analytics for QR Code: {id}</p>
      <p style={{ color: '#6b7280' }}>
        Analytics page coming soon! This will show detailed scan data, 
        charts, device stats, and location insights.
      </p>
    </div>
  );
};

export default QRCodeDetail;