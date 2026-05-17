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
      <header className="report-fixed-header">
        <div className="report-fixed-inner">
          <div className="report-fixed-title">
            <div className="report-fixed-eyebrow">Phiếu diễn giải</div>
            <div className="report-fixed-name">{patientName}</div>
          </div>

          <div className="report-fixed-actions">
            {originalUrl && (
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="report-action-btn report-action-original"
                aria-label="Mở kết quả xét nghiệm gốc"
              >
                <span className="btn-icon">📄</span>
                <span className="btn-label">KQXN gốc</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleCopyLink}
              className="report-action-btn report-action-copy"
              aria-label="Sao chép link"
            >
              <span className="btn-icon">🔗</span>
              <span className="btn-label">Sao chép link</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="report-action-btn report-action-print"
              aria-label="In hoặc tải PDF"
            >
              <span className="btn-icon">🖨️</span>
              <span className="btn-label">In / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer để nội dung phiếu không bị header fixed che */}
      <div className="report-fixed-spacer" />

      <style jsx>{`
        .report-fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 999999;
          background: var(--navy);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 24px rgba(15, 30, 53, 0.22);
        }

        .report-fixed-inner {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          min-height: 76px;
          padding: calc(10px + env(safe-area-inset-top, 0px)) 16px 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .report-fixed-title {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .report-fixed-eyebrow {
          color: rgba(255, 255, 255, 0.48);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .report-fixed-name {
          color: white;
          font-size: clamp(15px, 3vw, 20px);
          font-weight: 900;
          letter-spacing: 0.03em;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .report-fixed-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .report-action-btn {
          height: 42px;
          padding: 0 18px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 850;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .report-action-original,
        .report-action-copy {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .report-action-original {
          color: var(--gold-m);
          border-color: rgba(255, 255, 255, 0.28);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
        }

        .report-action-print {
          background: var(--gold-m);
          color: var(--navy);
          border-color: rgba(255, 255, 255, 0.12);
          font-weight: 950;
          box-shadow: 0 10px 24px rgba(184, 150, 62, 0.28);
        }

        .btn-icon {
          font-size: 15px;
          line-height: 1;
          flex-shrink: 0;
        }

        .btn-label {
          line-height: 1;
        }

        .report-fixed-spacer {
          height: calc(76px + env(safe-area-inset-top, 0px));
          flex-shrink: 0;
        }

        @media (max-width: 760px) {
          .report-fixed-inner {
            min-height: 68px;
            padding: calc(8px + env(safe-area-inset-top, 0px)) 10px 8px;
            gap: 8px;
          }

          .report-fixed-eyebrow {
            display: none;
          }

          .report-fixed-name {
            font-size: 14px;
            max-width: 40vw;
          }

          .report-fixed-actions {
            gap: 6px;
          }

          .report-action-btn {
            height: 40px;
            padding: 0 12px;
            font-size: 12px;
            gap: 5px;
          }

          .report-fixed-spacer {
            height: calc(68px + env(safe-area-inset-top, 0px));
          }
        }

        @media (max-width: 540px) {
          .report-fixed-inner {
            min-height: 62px;
            padding: calc(8px + env(safe-area-inset-top, 0px)) 8px 8px;
          }

          .report-fixed-name {
            max-width: 36vw;
            font-size: 13px;
          }

          .report-action-btn {
            width: 40px;
            min-width: 40px;
            height: 40px;
            padding: 0;
          }

          .btn-label {
            display: none;
          }

          .report-fixed-spacer {
            height: calc(62px + env(safe-area-inset-top, 0px));
          }
        }

        @media (max-width: 380px) {
          .report-fixed-inner {
            min-height: 58px;
            padding: calc(7px + env(safe-area-inset-top, 0px)) 7px 7px;
            gap: 6px;
          }

          .report-fixed-name {
            max-width: 32vw;
            font-size: 12px;
          }

          .report-fixed-actions {
            gap: 5px;
          }

          .report-action-btn {
            width: 36px;
            min-width: 36px;
            height: 36px;
          }

          .report-fixed-spacer {
            height: calc(58px + env(safe-area-inset-top, 0px));
          }
        }

        @media print {
          .report-fixed-header,
          .report-fixed-spacer {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}