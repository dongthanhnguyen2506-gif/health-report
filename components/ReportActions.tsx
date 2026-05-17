'use client'

type ReportActionsProps = {
  patientId: string
  patientName: string
  originalUrl?: string
}

export default function ReportActions({
  patientId,
  patientName,
  originalUrl,
}: ReportActionsProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Đã sao chép link phiếu diễn giải.')
    } catch {
      alert('Không thể sao chép link. Vui lòng copy trực tiếp trên thanh địa chỉ.')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="report-actions">
        <div className="report-actions-inner">
          <div className="report-title">
            <div className="report-eyebrow">Phiếu diễn giải</div>
            <div className="report-name">{patientName}</div>
          </div>

          <div className="report-buttons">
            {originalUrl && (
              <a
                className="report-btn report-btn-original"
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mở kết quả xét nghiệm gốc"
              >
                <span className="btn-icon">📄</span>
                <span className="btn-text">KQXN gốc</span>
              </a>
            )}

            <button
              className="report-btn report-btn-copy"
              type="button"
              onClick={handleCopyLink}
              aria-label="Sao chép link phiếu"
            >
              <span className="btn-icon">🔗</span>
              <span className="btn-text">Sao chép link</span>
            </button>

            <button
              className="report-btn report-btn-print"
              type="button"
              onClick={handlePrint}
              aria-label="In hoặc lưu PDF"
            >
              <span className="btn-icon">🖨️</span>
              <span className="btn-text">In / PDF</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .report-actions {
          position: sticky;
          top: 0;
          z-index: 9999;
          background: var(--navy);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 24px rgba(15, 30, 53, 0.18);
        }

        .report-actions-inner {
          max-width: 1180px;
          margin: 0 auto;
          min-height: 64px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .report-title {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .report-eyebrow {
          color: rgba(255, 255, 255, 0.55);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .report-name {
          color: white;
          font-size: clamp(13px, 2.8vw, 18px);
          font-weight: 800;
          letter-spacing: 0.03em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.25;
        }

        .report-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .report-btn {
          height: 40px;
          padding: 0 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 14px;
          font-weight: 800;
          white-space: nowrap;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.12);
          -webkit-tap-highlight-color: transparent;
        }

        .report-btn-original {
          background: rgba(255, 255, 255, 0.1);
          color: var(--gold-m);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        .report-btn-copy {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .report-btn-print {
          background: var(--gold-m);
          color: var(--navy);
          font-weight: 900;
          box-shadow: 0 8px 20px rgba(184, 150, 62, 0.28);
        }

        .btn-icon {
          font-size: 15px;
          line-height: 1;
        }

        .btn-text {
          line-height: 1;
        }

        @media (max-width: 720px) {
          .report-actions-inner {
            min-height: 58px;
            padding: 8px 10px;
            gap: 8px;
          }

          .report-eyebrow {
            display: none;
          }

          .report-name {
            font-size: 13px;
            max-width: 42vw;
          }

          .report-buttons {
            gap: 6px;
          }

          .report-btn {
            height: 38px;
            padding: 0 11px;
            font-size: 12px;
            gap: 5px;
          }

          .btn-icon {
            font-size: 14px;
          }
        }

        @media (max-width: 540px) {
          .report-actions-inner {
            min-height: 56px;
          }

          .report-name {
            max-width: 34vw;
            font-size: 12.5px;
          }

          .report-btn {
            width: 38px;
            min-width: 38px;
            padding: 0;
          }

          .btn-text {
            display: none;
          }
        }

        @media (max-width: 380px) {
          .report-actions-inner {
            padding: 7px 8px;
            gap: 6px;
          }

          .report-name {
            max-width: 30vw;
            font-size: 12px;
          }

          .report-buttons {
            gap: 5px;
          }

          .report-btn {
            width: 36px;
            min-width: 36px;
            height: 36px;
          }
        }

        @media print {
          .report-actions {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}