// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Chhoti AI',
  description: 'Voice-driven product app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
