# StreamSnipe 🎯

**PUBG Stream Sniper Detection & Match Analysis Tool**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)

---

## 🚀 Live Demo

**🌐 [StreamSnipe Live Website](https://enesozr.github.io/c)**

---

## 📖 About

StreamSnipe is a professional-grade tool designed for PUBG streamers and content creators to detect potential stream snipers and analyze match data. Built by **oz3R Inc**, this application provides advanced ghost detection capabilities and comprehensive match analysis features.

### ✨ Key Features

- 🔍 **Stream Sniper Detection**: Identify potential ghost players in your matches
- 📊 **Match Analysis**: Comprehensive analysis of shared matches between players
- 🎮 **Real-time Comparison**: Side-by-side match comparison with interactive iframes
- 🛡️ **Anti-Ghost System**: Advanced algorithms to detect suspicious player behavior
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Optimized for quick data retrieval and analysis

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EnesOZR/c.git
   cd c
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
c/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── compare/           # Match comparison page
│   ├── ghosts/            # Ghost detection page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── compare-page.tsx   # Comparison interface
│   ├── ghosts-page.tsx    # Ghost detection interface
│   └── index-page.tsx     # Homepage interface
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

---

## 🎯 Usage

### For Streamers

1. **Enter Your Username**: Input your PUBG Steam username
2. **Find Ghosts**: The system will analyze your recent matches
3. **Compare Matches**: View shared matches with potential snipers
4. **Analyze Data**: Use the interactive comparison tool

### For Content Creators

- Use StreamSnipe to verify suspicious encounters
- Analyze match patterns for content creation
- Document stream sniper incidents with evidence

---

## 🔧 API Endpoints

- `GET /api/matches?name={username}` - Fetch player matches
- `POST /api/ghosts` - Analyze ghost players
- `GET /api/proxy?url={target}` - Proxy for iframe content

---

## 🚀 Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run export
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch

### Manual Deployment

```bash
npm run build
npm run export
# Upload the 'out' folder to your hosting provider
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**oz3R Inc** - Professional Gaming Solutions

- **Website**: [oz3r-inc.github.io](https://oz3r-inc.github.io)
- **Contact**: Telegram @EnesOzer

---

## 🙏 Acknowledgments

- PUBG community for feedback and testing
- Next.js team for the amazing framework
- Radix UI for accessible components
- Tailwind CSS for the utility-first approach

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/EnesOZR/c/issues)
- **Contact**: Telegram @EnesOzer
- **Documentation**: [Wiki](https://github.com/EnesOZR/c/wiki)

---

<div align="center">

**Made with ❤️ by oz3R Inc**

[⭐ Star this repo](https://github.com/EnesOZR/c) | [🐛 Report Bug](https://github.com/EnesOZR/c/issues) | [💡 Request Feature](https://github.com/EnesOZR/c/issues)

</div>
