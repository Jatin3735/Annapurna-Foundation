import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toPng } from "html-to-image";
import { jsPDF } from 'jspdf';
import Certificate from '../components/Certificate';

const Verify = () => {
  const { registrationNumber } = useParams();
  const decodedRegNumber = decodeURIComponent(registrationNumber);

  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/volunteers/verify/${encodeURIComponent(decodedRegNumber)}`);
        if (response.ok) {
          const data = await response.json();
          setVolunteer(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteer();
  }, [decodedRegNumber]);

  const handleDownload = async () => {
  if (!certificateRef.current) return;

  try {
    setIsDownloading(true);

    const dataUrl = await toPng(certificateRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "#FFFDD0",
    });

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(dataUrl, "PNG", 0, 0, 297, 210);

    pdf.save(
      `${volunteer.fullName.replace(/\s+/g, "_")}_Certificate.pdf`
    );
  } catch (err) {
    console.error(err);
    alert("Failed to download certificate.");
  } finally {
    setIsDownloading(false);
  }
};

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-primary text-xl font-bold">Verifying...</div>;
  }

  if (error || !volunteer) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 flex flex-col items-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg mx-4">
          <div className="text-red-500 text-6xl mb-6 flex justify-center">❌</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">Invalid Certificate</h1>
          <p className="text-gray-600 mb-8">This certificate was not issued by Annapurna Foundation, or the registration number is incorrect.</p>
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-100">
            Reg No: <span className="font-mono">{decodedRegNumber}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Verification Success Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12"
        >
          <div className="bg-green-500 p-6 text-white text-center">
            <h1 className="text-2xl font-bold font-poppins flex items-center justify-center gap-2">
              <span className="text-3xl">✔</span> Verified Volunteer
            </h1>
            <p className="text-green-100 mt-1">Official Record found in Annapurna Foundation Database</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-bold shrink-0">
                {volunteer.fullName.charAt(0)}
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Volunteer Name</p>
                  <h2 className="text-3xl font-bold text-gray-900">{volunteer.fullName}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Registration Number</p>
                    <p className="font-mono font-bold text-primary">{volunteer.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Certificate Number</p>
                    <p className="font-mono font-bold text-primary">{volunteer.certificateNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Issue Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(volunteer.certificateDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Certificate Status</p>
                    <p className="font-bold text-green-600">Active & Valid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certificate Preview and Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">Certificate of Appreciation</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            You can download a high-resolution PDF copy of your certificate for your records, or to share on your professional profiles.
          </p>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg flex items-center justify-center gap-2 mx-auto disabled:opacity-70 mb-12"
          >
            {isDownloading ? 'Generating PDF...' : '⬇ Download Official Certificate'}
          </button>

          <div className="border w-full border-gray-200 rounded-xl bg-gray-100 p-4 inline-block shadow-inner overflow-hidden max-w-full">
            <p className="text-sm text-gray-500 mb-4 font-semibold uppercase">Live Preview</p>
            {/* Wrapper to scale down the massive A4 component for preview on screen */}
            <div className="origin-top flex justify-center" style={{ transform: 'scale(0.3)', transformOrigin: 'top center', height: '240px', width: '100%' }}>
              <div className="absolute top-0">
                <Certificate ref={certificateRef} volunteer={volunteer} />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Verify;
