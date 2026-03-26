import "./globals.css";

export const metadata = {
  title: "Yash Chandankhede | Cybersecurity & Frontend Developer",
  description: "Engineering student passionate about ethical hacking, cybersecurity, and frontend development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#000", color: "#00ff41", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}