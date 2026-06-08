import "./globals.css";

export const metadata = {
  title: "Taeo.Design | Industrial Design Masterclass",
  description: "현업 디자이너의 AI 활용 워크플로우를 직접 경험하는 밀착 과외",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body className="dark-mode no-scroll">
        {children}
      </body>
    </html>
  );
}
