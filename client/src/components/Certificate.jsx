import React, { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";

const Certificate = forwardRef(({ volunteer }, ref) => {
  if (!volunteer) return null;

  const issueDate = new Date(
    volunteer.certificateDate || "2026-06-15"
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const verifyUrl = `${window.location.origin}/verify/${encodeURIComponent(volunteer.registrationNumber || "AF/2026/1468")}`;

  return (
    <>
      <style>
        {`
          /* Imported UnifrakturMaguntia for the traditional Gothic Blackletter style */
          @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Monsieur+La+Doulaise&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap');
          
          /* Gothic/Blackletter styling for primary headers */
          .cert-gothic {
            font-family: 'UnifrakturMaguntia', serif;
            letter-spacing: 1px;
          }
          /* Premium signature script font for the Recipient Name */
          .cert-name {
            font-family: 'Monsieur La Doulaise', cursive;
          }
          .cert-sans {
            font-family: 'Montserrat', sans-serif;
          }
        `}
      </style>

      <div
        ref={ref}
        style={{
          width: "1123px",
          height: "794px",
          background: "#FFFDF4", 
          position: "relative",
          overflow: "hidden",
          color: "#051D40", 
          boxSizing: "border-box",
        }}
      >
        {/* ================= PREMIUM TRIPLE BORDER SYSTEM ================= */}
        <div style={{ position: "absolute", inset: "12px", border: "5px solid #051D40" }} />
        <div style={{ position: "absolute", inset: "22px", border: "2px solid #D4AF37" }} />
        <div style={{ position: "absolute", inset: "28px", border: "0.75px solid #051D40" }} />

        {/* ================= CORNER DECORATIONS ================= */}
        <div style={{ position: "absolute", top: "34px", left: "34px", width: "90px", height: "90px", color: "#D4AF37" }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,0 C30,0 45,15 45,35 C45,20 30,5 0,0 Z M0,0 C0,30 15,45 35,45 C20,45 5,30 0,0 Z M15,15 C25,15 30,20 30,30 C30,25 25,20 15,15 Z M5,40 C15,35 20,45 10,50 C5,45 0,42 5,40 Z M40,5 C35,15 45,20 50,10 C45,5 42,0 40,5 Z M2,2 C12,12 15,25 12,35 C25,15 12,5 2,2 Z" />
            <circle cx="8" cy="8" r="2.5" />
          </svg>
        </div>

        <div style={{ position: "absolute", top: "34px", right: "34px", width: "90px", height: "90px", color: "#D4AF37", transform: "scaleX(-1)" }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,0 C30,0 45,15 45,35 C45,20 30,5 0,0 Z M0,0 C0,30 15,45 35,45 C20,45 5,30 0,0 Z M15,15 C25,15 30,20 30,30 C30,25 25,20 15,15 Z M5,40 C15,35 20,45 10,50 C5,45 0,42 5,40 Z M40,5 C35,15 45,20 50,10 C45,5 42,0 40,5 Z M2,2 C12,12 15,25 12,35 C25,15 12,5 2,2 Z" />
            <circle cx="8" cy="8" r="2.5" />
          </svg>
        </div>

        <div style={{ position: "absolute", bottom: "34px", left: "34px", width: "90px", height: "90px", color: "#D4AF37", transform: "scaleY(-1)" }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,0 C30,0 45,15 45,35 C45,20 30,5 0,0 Z M0,0 C0,30 15,45 35,45 C20,45 5,30 0,0 Z M15,15 C25,15 30,20 30,30 C30,25 25,20 15,15 Z M5,40 C15,35 20,45 10,50 C5,45 0,42 5,40 Z M40,5 C35,15 45,20 50,10 C45,5 42,0 40,5 Z M2,2 C12,12 15,25 12,35 C25,15 12,5 2,2 Z" />
            <circle cx="8" cy="8" r="2.5" />
          </svg>
        </div>

        <div style={{ position: "absolute", bottom: "34px", right: "34px", width: "90px", height: "90px", color: "#D4AF37", transform: "scale(-1)" }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,0 C30,0 45,15 45,35 C45,20 30,5 0,0 Z M0,0 C0,30 15,45 35,45 C20,45 5,30 0,0 Z M15,15 C25,15 30,20 30,30 C30,25 25,20 15,15 Z M5,40 C15,35 20,45 10,50 C5,45 0,42 5,40 Z M40,5 C35,15 45,20 50,10 C45,5 42,0 40,5 Z M2,2 C12,12 15,25 12,35 C25,15 12,5 2,2 Z" />
            <circle cx="8" cy="8" r="2.5" />
          </svg>
        </div>

        <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", width: "109px", height: "12px", color: "#D4AF37", opacity: 0.85 }}>
          <svg viewBox="0 0 100 10 fill" fill="currentColor">
            <path d="M0,5 Q25,0 50,5 Q75,0 100,5 Q75,10 50,5 Q25,10 0,5 Z" />
            <circle cx="50" cy="5" r="3" fill="#051D40" />
          </svg>
        </div>

        {/* ================= CENTER CONTENT CONTAINER ================= */}
        <div style={{ padding: "42px 100px 0", textAlign: "center" }}>
          
          {/* Top Logo Emblem */}
          <div style={{ marginBottom: "4px" }}>
            <img
              src="/images/logo.png"
              alt="Annapurna Foundation"
              style={{ width: "95px", height: "95px", objectFit: "contain", margin: "0 auto" }}
            />
          </div>

          {/* UPDATED: Applied Gothic Blackletter style to Foundation Name */}
          <h1 className="sans-serif" style={{ margin: "0", fontSize: "48px", fontWeight: "normal", color: "#051D40", lineHeight: "1.1" }}>
            Annapurna Foundation
          </h1>
          
          {/* Subheader Details */}
          <div className="cert-sans" style={{ fontSize: "12px", fontWeight: "700", color: "#C5A059", letterSpacing: "4px", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", marginRight: "10px" }}>—•—</span>
            KAITHAL
            <span style={{ fontSize: "10px", marginLeft: "10px" }}>—•—</span>
          </div>
          <div className="cert-sans" style={{ fontSize: "11px", fontWeight: "600", color: "#C5A059", letterSpacing: "1px", marginTop: "2px" }}>
            ESTD SINCE 2023
          </div>

          {/* Decorative Divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0 12px" }}>
            <div style={{ width: "120px", height: "1px", background: "linear-gradient(to left, #C5A059, transparent)" }} />
            <div style={{ width: "5px", height: "5px", backgroundColor: "#051D40", transform: "rotate(45deg)", margin: "0 8px" }} />
            <div style={{ width: "120px", height: "1px", background: "linear-gradient(to right, #C5A059, transparent)" }} />
          </div>

          {/* UPDATED: Applied Gothic Blackletter style to Certificate of Appreciation line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "6px" }}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none"><path d="M30 8H2M6 3l-5 5 5 5M14 4l-4 4 4 4M22 5l-2 3 2 3" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <h2 className="cert-gothic" style={{ margin: "0", fontSize: "38px", fontWeight: "normal", color: "#051D40", lineHeight: "1" }}>
              Certificate of Appreciation
            </h2>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" style={{ transform: "scaleX(-1)" }}><path d="M30 8H2M6 3l-5 5 5 5M14 4l-4 4 4 4M22 5l-2 3 2 3" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>

          {/* REMAINS NORMAL: Clean sans-serif line for presentation text */}
          <p className="cert-sans" style={{ fontSize: "13.5px", fontWeight: "600", color: "#4A5568", margin: "0 auto 28px", letterSpacing: "0.5px" }}>
            This Certificate is Proudly Presented To
          </p>

          {/* Dynamic Premium Script Recipient Name */}
          <h3 className="cert-name" style={{ fontSize: "85px", margin: "16px auto 28px", color: "#051D40", fontWeight: "normal", lineHeight: "1", minHeight: "85px" }}>
            {volunteer.fullName || "Jatin Kumar"}
          </h3>

          {/* Elegant Fine Accent Under Name */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "6px auto 14px" }}>
            <div style={{ width: "350px", height: "1px", background: "linear-gradient(to right, transparent, #C5A059, transparent)" }} />
            <div style={{ position: "absolute", width: "16px", height: "6px", color: "#C5A059" }}>
              <svg viewBox="0 0 20 10" fill="currentColor"><path d="M0,5 Q10,0 20,5 Q10,10 0,5 Z"/></svg>
            </div>
          </div>

          {/* Main Prose Block */}
          <p className="cert-sans" style={{ maxWidth: "760px", margin: "0 auto", fontSize: "13px", color: "#1A202C", lineHeight: "1.6", fontWeight: "500" }}>
            For your outstanding dedication and selfless volunteer service towards
            the Annapurna Foundation's mission of providing nutritious meals
            to underprivileged children.
          </p>
          <p className="cert-sans" style={{ maxWidth: "760px", margin: "20px auto 0", fontSize: "13px", color: "#051D40", fontWeight: "700", fontStyle: "italic" }}>
            Your contribution has created a meaningful impact in the community and is sincerely appreciated.
          </p>
        </div>

        {/* ================= BOTTOM METADATA & SIGNATURE FOOTER ================= */}
        <div
          className="cert-sans"
          style={{
            position: "absolute",
            bottom: "48px",
            left: "75px",
            right: "75px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Left Column Grid */}
          <table style={{ borderCollapse: "collapse", fontSize: "11px", color: "#051D40", width: "260px", textAlign: "left" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <td style={{ padding: "5px 0", fontWeight: "700", width: "125px" }}>👤 Registration No.</td>
                <td style={{ padding: "5px 0", color: "#4A5568", fontWeight: "600" }}>: {volunteer.registrationNumber || "AF/2026/1468"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <td style={{ padding: "5px 0", fontWeight: "700" }}>🪪 Certificate No.</td>
                <td style={{ padding: "5px 0", color: "#4A5568", fontWeight: "600" }}>: {volunteer.certificateNumber || "CERT-AF-2026-1468"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <td style={{ padding: "5px 0", fontWeight: "700" }}>📅 Issue Date</td>
                <td style={{ padding: "5px 0", color: "#4A5568", fontWeight: "600" }}>: {issueDate}</td>
              </tr>
              <tr>
                <td style={{ padding: "5px 0", fontWeight: "700" }}>👤 Volunteer Since</td>
                <td style={{ padding: "5px 0", color: "#4A5568", fontWeight: "600" }}>
                  : {volunteer.createdAt ? new Date(volunteer.createdAt).toLocaleString("en-US", { month: "long", year: "numeric" }) : "June 2026"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Golden Stamp Seal */}
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "-10px", zIndex: 10 }}>
            <img src="/images/seal.png" alt="Official Gold Seal" style={{ width: "125px", height: "125px", objectFit: "contain" }} />
          </div>

          {/* Right Signature Cluster Block */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "28px" }}>
            <div style={{ textAlign: "center", width: "115px" }}>
              <img src="/images/sourav-sign.png" alt="Sourav Signature" style={{ height: "40px", objectFit: "contain", marginBottom: "2px" }} />
              <div style={{ borderTop: "1px solid #051D40", paddingTop: "4px" }}>
                <div style={{ fontWeight: "700", color: "#051D40", fontSize: "13px" }}>Sourav</div>
                <div style={{ fontSize: "8.5px", color: "#4A5568", fontWeight: "700", letterSpacing: "0.5px" }}>PRESIDENT</div>
              </div>
            </div>

            <div style={{ textAlign: "center", width: "115px" }}>
              <img src="/images/sajan-sign.png" alt="Sajan Signature" style={{ height: "40px", objectFit: "contain", marginBottom: "2px" }} />
              <div style={{ borderTop: "1px solid #051D40", paddingTop: "4px" }}>
                <div style={{ fontWeight: "700", color: "#051D40", fontSize: "13px" }}>Sajan</div>
                <div style={{ fontSize: "8.5px", color: "#4A5568", fontWeight: "700", letterSpacing: "0.5px" }}>DIRECTOR</div>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#fff", padding: "4px", borderRadius: "2px", boxShadow: "0 0 4px rgba(0,0,0,0.06)", display: "inline-block", border: "1px solid #CBD5E1" }}>
                <QRCodeSVG value={verifyUrl} size={64} level="M" />
              </div>
              <div style={{ marginTop: "4px", color: "#051D40", fontSize: "7.5px", fontWeight: "700", width: "75px", lineHeight: "1.2" }}>
                Scan to Verify Certificate
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
});

export default Certificate;