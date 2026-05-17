import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diễn Giải Kết Quả Xét Nghiệm — Ever Việt Nam × SHB × InVivo Lab',
  description: 'Hỗ trợ đọc hiểu kết quả xét nghiệm rõ ràng, dễ hiểu, trung thực với dữ liệu gốc.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
