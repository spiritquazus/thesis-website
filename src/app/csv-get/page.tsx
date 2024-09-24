"use client";
import React from 'react';

const ExportCSVButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('../api/getTable');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'survey_data.csv'); // Name the file
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('Failed to fetch the CSV file');
      }
    } catch (error) {
      console.error('An error occurred while fetching the CSV file', error);
    }
  };

  return (
    <button onClick={handleDownload}>Download Survey Data</button>
  );
};

export default ExportCSVButton;