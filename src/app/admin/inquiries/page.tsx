"use client";

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Download,
  Search,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Sprout,
  FileSpreadsheet,
  Eye,
  X,
  Loader2,
  RefreshCw,
  Building,
} from "lucide-react";
import Link from "next/link";

interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  crop: string;
  qty: string;
  msg: string;
  created_at: string;
}

export default function InquiriesDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Fetch inquiries from database
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Error loading inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Filter logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(search.toLowerCase())) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.phone && inq.phone.includes(search));

    const matchesCrop = selectedCrop === "All" || inq.crop === selectedCrop;

    return matchesSearch && matchesCrop;
  });

  // Calculate statistics
  const totalLeads = inquiries.length;
  const cucumberLeads = inquiries.filter((i) => i.crop === "English Cucumber").length;
  const tomatoLeads = inquiries.filter((i) => i.crop === "Truss Tomato").length;
  const capsicumLeads = inquiries.filter((i) => i.crop === "Sweet Bell Capsicum").length;

  // Handle Delete
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
        setDeleteConfirmId(null);
      } else {
        alert("Failed to delete inquiry");
      }
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  // Export to CSV helper
  const exportToCSV = () => {
    if (filteredInquiries.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Crop Interest",
      "Quantity",
      "Specifications",
      "Date Submitted",
    ];
    
    // Construct CSV lines
    const rows = filteredInquiries.map((inq) => [
      inq.id,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${(inq.company || "").replace(/"/g, '""')}"`,
      inq.email,
      inq.phone,
      inq.crop,
      `"${inq.qty.replace(/"/g, '""')}"`,
      `"${(inq.msg || "").replace(/"/g, '""')}"`,
      new Date(inq.created_at).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `meenakrishi_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        padding: "40px 4%",
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      {/* Background decorations */}
      <div className="grid-bg" />
      <div className="grid-bg-mask" />
      <div className="green-glow-bg" style={{ top: "-100px", left: "10%" }} />
      <div className="sun-glow-bg" style={{ bottom: "-100px", right: "10%" }} />

      {/* Container */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--accent-green)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "12px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <ArrowLeft size={16} /> Back to Website
            </Link>
            <h1
              style={{
                fontFamily: "var(--font-heading), sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Meenakrishi <span className="text-gradient-green">Inquiry Portal</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "4px" }}>
              Secure local database storage for wholesale supply leads and custom crop inquiries.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={fetchInquiries}
              className="btn-secondary"
              style={{ padding: "12px 18px", fontSize: "0.85rem", borderRadius: "10px" }}
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              onClick={exportToCSV}
              disabled={filteredInquiries.length === 0}
              className="btn-primary"
              style={{
                padding: "12px 20px",
                fontSize: "0.85rem",
                borderRadius: "10px",
                opacity: filteredInquiries.length === 0 ? 0.5 : 1,
                cursor: filteredInquiries.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              <Download size={15} /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          {[
            { label: "Total Leads Stored", val: totalLeads, color: "var(--accent-green)", desc: "All-time logged inquiries" },
            { label: "English Cucumber", val: cucumberLeads, color: "#10b981", desc: "Wholesale cucumber leads" },
            { label: "Truss Tomato", val: tomatoLeads, color: "#f59e0b", desc: "Tomato supply requests" },
            { label: "Sweet Bell Capsicum", val: capsicumLeads, color: "#3b82f6", desc: "Capsicum contract requests" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Stat glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "120px",
                  height: "120px",
                  background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`,
                  borderRadius: "50%",
                }}
              />
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontWeight: 600 }}>
                {stat.label}
              </span>
              <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "#ffffff", margin: "10px 0 4px 0" }}>
                {loading ? "..." : stat.val}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{stat.desc}</span>
            </div>
          ))}
        </div>

        {/* Filters Panel */}
        <div
          className="glass-panel"
          style={{
            padding: "16px 20px",
            borderRadius: "12px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            border: "1px solid rgba(255, 255, 255, 0.03)",
          }}
        >
          {/* Search bar */}
          <div style={{ position: "relative", width: "100%", maxWidth: "360px" }}>
            <Search
              size={18}
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search by name, company, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{
                width: "100%",
                paddingLeft: "42px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "8px",
                fontSize: "0.85rem",
              }}
            />
          </div>

          {/* Crop filters */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "English Cucumber", "Truss Tomato", "Sweet Bell Capsicum"].map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                style={{
                  padding: "8px 14px",
                  fontSize: "0.8rem",
                  borderRadius: "6px",
                  border: "1px solid",
                  borderColor: selectedCrop === crop ? "var(--accent-green)" : "rgba(255, 255, 255, 0.08)",
                  background: selectedCrop === crop ? "rgba(16, 185, 129, 0.1)" : "transparent",
                  color: selectedCrop === crop ? "#ffffff" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div
          className="glass-panel"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.04)",
          }}
        >
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: "12px" }}>
              <Loader2 size={32} className="animate-spin" style={{ color: "var(--accent-green)" }} />
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Loading database records...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-muted)" }}>
              <Sprout size={48} style={{ margin: "0 auto 16px auto", opacity: 0.3, color: "var(--accent-green)" }} />
              <h3 style={{ color: "#ffffff", marginBottom: "6px" }}>No inquiries found</h3>
              <p style={{ fontSize: "0.85rem" }}>
                {inquiries.length === 0 ? "Customer inquiries submitted via the site will appear here." : "Try adjusting your search query or filters."}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "rgba(255,255,255,0.01)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: "600", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>ID</th>
                    <th style={{ padding: "16px 20px", fontWeight: "600", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Customer / Company</th>
                    <th style={{ padding: "16px 20px", fontWeight: "600", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Contact</th>
                    <th style={{ padding: "16px 20px", fontWeight: "600", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Crop Interest</th>
                    <th style={{ padding: "16px 20px", fontWeight: "600", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Quantity</th>
                    <th style={{ padding: "16px 20px", fontWeight: "600", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Date</th>
                    <th style={{ padding: "16px 20px", fontWeight: "600", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.015)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td style={{ padding: "18px 20px", color: "var(--text-muted)", fontWeight: "500" }}>#{inq.id}</td>
                      <td style={{ padding: "18px 20px" }}>
                        <div style={{ fontWeight: "600", color: "#ffffff" }}>{inq.name}</div>
                        {inq.company && (
                          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                            <Building size={12} /> {inq.company}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "18px 20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <a href={`mailto:${inq.email}`} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }} className="hover-link">
                            <Mail size={12} /> {inq.email}
                          </a>
                          {inq.phone && (
                            <a href={`tel:${inq.phone}`} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "6px" }}>
                              <Phone size={12} /> {inq.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "18px 20px" }}>
                        <span
                          style={{
                            backgroundColor:
                              inq.crop === "English Cucumber"
                                ? "rgba(16, 185, 129, 0.08)"
                                : inq.crop === "Truss Tomato"
                                ? "rgba(245, 158, 11, 0.08)"
                                : "rgba(59, 130, 246, 0.08)",
                            color:
                              inq.crop === "English Cucumber"
                                ? "#34d399"
                                : inq.crop === "Truss Tomato"
                                ? "#fbbf24"
                                : "#60a5fa",
                            border: "1px solid",
                            borderColor:
                              inq.crop === "English Cucumber"
                                ? "rgba(16, 185, 129, 0.15)"
                                : inq.crop === "Truss Tomato"
                                ? "rgba(245, 158, 11, 0.15)"
                                : "rgba(59, 130, 246, 0.15)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                          }}
                        >
                          {inq.crop}
                        </span>
                      </td>
                      <td style={{ padding: "18px 20px", fontWeight: "600" }}>{inq.qty}</td>
                      <td style={{ padding: "18px 20px", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Calendar size={12} /> {new Date(inq.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td style={{ padding: "18px 20px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "8px" }}>
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              color: "#ffffff",
                              borderRadius: "6px",
                              padding: "6px",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "var(--accent-green)";
                              e.currentTarget.style.borderColor = "var(--accent-green)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                            }}
                            title="View Requirements"
                          >
                            <Eye size={14} />
                          </button>

                          {deleteConfirmId === inq.id ? (
                            <div style={{ display: "flex", gap: "4px" }}>
                              <button
                                onClick={() => handleDelete(inq.id)}
                                style={{
                                  background: "#ef4444",
                                  border: "none",
                                  color: "#ffffff",
                                  borderRadius: "6px",
                                  padding: "6px 8px",
                                  fontSize: "0.75rem",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                style={{
                                  background: "rgba(255,255,255,0.08)",
                                  border: "none",
                                  color: "#ffffff",
                                  borderRadius: "6px",
                                  padding: "6px 8px",
                                  fontSize: "0.75rem",
                                  cursor: "pointer",
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(inq.id)}
                              style={{
                                background: "rgba(239, 68, 68, 0.05)",
                                border: "1px solid rgba(239, 68, 68, 0.1)",
                                color: "#ef4444",
                                borderRadius: "6px",
                                padding: "6px",
                                cursor: "pointer",
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#ef4444";
                                e.currentTarget.style.color = "#ffffff";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
                                e.currentTarget.style.color = "#ef4444";
                              }}
                              title="Delete Record"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Dialog Modal */}
      {selectedInquiry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              overflow: "hidden",
              animation: "fadeIn 0.3s ease",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.01)",
              }}
            >
              <div>
                <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.25rem", fontWeight: "700" }}>
                  Inquiry Details #{selectedInquiry.id}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Submitted: {new Date(selectedInquiry.created_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "50%",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
                    Customer Name
                  </span>
                  <span style={{ color: "#ffffff", fontWeight: "500" }}>{selectedInquiry.name}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
                    Company / Organization
                  </span>
                  <span style={{ color: "#ffffff", fontWeight: "500" }}>{selectedInquiry.company || "Not Specified"}</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
                    Email Address
                  </span>
                  <a href={`mailto:${selectedInquiry.email}`} style={{ color: "var(--accent-green)", textDecoration: "none", fontWeight: "500" }}>
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
                    Phone Number
                  </span>
                  {selectedInquiry.phone ? (
                    <a href={`tel:${selectedInquiry.phone}`} style={{ color: "var(--accent-green)", textDecoration: "none", fontWeight: "500" }}>
                      {selectedInquiry.phone}
                    </a>
                  ) : (
                    <span style={{ color: "var(--text-muted)" }}>Not Provided</span>
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
                    Crop Interest
                  </span>
                  <span style={{ color: "#ffffff", fontWeight: "600" }}>{selectedInquiry.crop}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
                    Required Qty
                  </span>
                  <span style={{ color: "#ffffff", fontWeight: "600" }}>{selectedInquiry.qty}</span>
                </div>
              </div>

              <div>
                <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
                  Specifications / Client message
                </span>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "16px",
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    maxHeight: "180px",
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedInquiry.msg || "No specifications or messages provided."}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "rgba(255,255,255,0.01)",
              }}
            >
              <button
                onClick={() => setSelectedInquiry(null)}
                className="btn-secondary"
                style={{ padding: "10px 20px", fontSize: "0.85rem" }}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
