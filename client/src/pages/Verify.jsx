import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toPng } from "html-to-image";
import { jsPDF } from 'jspdf';
import Certificate from '../components/Certificate';
import { Copy, Share2, Printer, CheckCircle, AlertCircle } from 'lucide-react';

const Verify = () => {
  const { registrationNumber } = useParams();
  const decodedRegNumber = decodeURIComponent(registrationNumber);

  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const certificateRef = useRef(null);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/volunteers/verify/${encodeURIComponent(decodedRegNumber)}`);
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

  // Close share menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);

      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#FFFDD0",
        quality: 1,
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
      alert("Failed to download certificate. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyRegNumber = () => {
    navigator.clipboard.writeText(volunteer.registrationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = (platform) => {
    const text = `I'm a verified volunteer at Annapurna Foundation! Registration: ${volunteer.registrationNumber}`;
    const url = window.location.href;
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
        <p className="mt-4 text-gray-600 font-medium">Verifying certificate...</p>
      </div>
    );
  }

  if (error || !volunteer) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 sm:py-20 flex flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full"
        >
          <AlertCircle className="text-red-500 text-6xl mb-6 mx-auto" size={64} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-poppins">
            Invalid Certificate
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            This certificate was not issued by Annapurna Foundation, or the registration number is incorrect.
          </p>
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-100 break-all">
            <span className="font-medium">Registration No:</span>{" "}
            <span className="font-mono">{decodedRegNumber}</span>
          </div>
          <button
            onClick={() => window.history.back()}
            className="mt-6 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Verification Success Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden mb-8 sm:mb-12"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 text-white text-center">
            <h1 className="text-xl sm:text-2xl font-bold font-poppins flex items-center justify-center gap-2">
              <CheckCircle className="text-3xl" size={28} />
              Verified Volunteer
            </h1>
            <p className="text-green-100 text-sm sm:text-base mt-1">
              Official Record found in Annapurna Foundation Database
            </p>
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold shrink-0">
                {volunteer.fullName.charAt(0)}
              </div>
              <div className="flex-1 text-center md:text-left space-y-4 w-full">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-bold">
                    Volunteer Name
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
                    {volunteer.fullName}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Registration Number</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-mono font-bold text-primary text-sm sm:text-base break-all">
                        {volunteer.registrationNumber}
                      </p>
                      <button
                        onClick={handleCopyRegNumber}
                        className="text-gray-400 hover:text-primary transition p-1"
                        aria-label="Copy registration number"
                      >
                        <Copy size={16} />
                      </button>
                      {copied && (
                        <span className="text-xs text-green-600 font-medium">Copied!</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Certificate Number</p>
                    <p className="font-mono font-bold text-primary text-sm sm:text-base break-all">
                      {volunteer.certificateNumber || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Issue Date</p>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      {new Date(volunteer.certificateDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Certificate Status</p>
                    <p className="font-bold text-green-600 text-sm sm:text-base flex items-center gap-1">
                      <CheckCircle size={16} />
                      Active & Valid
                    </p>
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
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-poppins text-center">
            Certificate of Appreciation
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base text-center">
            Download a high-resolution PDF copy of your certificate for your records, or share it on your professional profiles.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-orange-600 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 w-full sm:w-auto"
            >
              {isDownloading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Generating PDF...
                </>
              ) : (
                <>
                  ⬇ Download Certificate
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="bg-gray-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Printer size={20} />
              Print
            </button>

            <div className="relative w-full sm:w-auto" ref={shareMenuRef}>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Share2 size={20} />
                Share
              </button>

              {showShareMenu && (
                <div className="absolute mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full sm:w-48 z-10">
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition text-sm flex items-center gap-2"
                  >
                    <span className="text-blue-700">in</span> LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition text-sm flex items-center gap-2"
                  >
                    <span className="text-blue-400">🐦</span> Twitter
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition text-sm flex items-center gap-2"
                  >
                    <span className="text-blue-600">f</span> Facebook
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition text-sm flex items-center gap-2"
                  >
                    <span className="text-green-500">💬</span> WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Certificate Preview */}
          <div className="border border-gray-200 rounded-xl bg-gray-50 p-3 sm:p-4 shadow-inner overflow-auto max-h-[500px] sm:max-h-[600px]">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 font-semibold uppercase text-center">
              📄 Live Preview
            </p>
            <div className="flex justify-center">
              <div 
                className="transform scale-50 sm:scale-75 md:scale-90 lg:scale-100 origin-top transition-all duration-300"
                style={{ transformOrigin: 'top center' }}
              >
                <Certificate ref={certificateRef} volunteer={volunteer} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Print-specific styles */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #certificate-print-area, #certificate-print-area * {
              visibility: visible;
            }
            #certificate-print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Verify;