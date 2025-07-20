# PLDG Hub - Programming Language Developer Guild Collaboration Tool

A modern web application designed to streamline collaboration in the Programming Language Developer Guild (PLDG) by summarizing GitHub discussions and highlighting issues open for contribution.

![PLDG Hub Screenshot](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=PLDG+Hub+Dashboard)

## ✨ Features

### 🤖 AI-Powered Discussion Summaries
- Enter GitHub discussion URLs or IDs to generate intelligent summaries
- Real-time AI processing with visual feedback
- Automatic tagging and categorization
- Support for both full URLs and numeric IDs

### 🔍 Issue Discovery & Filtering
- Browse issues across all PLDG repositories
- Advanced filtering by difficulty level (Easy, Moderate, Hard)
- Filter by programming language and repository
- Smart search across titles, descriptions, and labels
- Beginner-friendly issue highlighting

### 📊 Comprehensive Dashboard
- Overview statistics for discussions, issues, and contributors
- Quick access to recent discussions and available issues
- Integrated summarizer for immediate access
- Real-time activity tracking

### 🎨 Modern UI/UX
- **Light & Dark Mode**: Full theme support with system preference detection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional Styling**: Clean, modern interface with gradient accents
- **Smooth Animations**: Hover effects and loading states
- **Accessibility**: ARIA labels and keyboard navigation support

### 🚀 Advanced Functionality
- **Smart Filtering**: Multi-criteria filtering with real-time results
- **Trending Detection**: Identify hot discussions and popular issues
- **Contribution Tracking**: Monitor community participation
- **Export Ready**: Structured data ready for integration

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **State Management**: React hooks and context

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-org/pldg-hub.git
   cd pldg-hub
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
pldg-hub/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard page
│   ├── discussions/             # Discussions page
│   ├── issues/                  # Issues page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── discussion-summarizer.tsx # AI summarizer component
│   ├── theme-provider.tsx       # Theme context provider
│   └── theme-toggle.tsx         # Dark/light mode toggle
├── lib/                         # Utility functions
│   └── utils.ts                 # Common utilities
└── README.md                    # Project documentation
\`\`\`

## 🎯 Usage Guide

### Adding Discussion Summaries

1. **Navigate to Discussions**: Go to the Discussions page or use the dashboard
2. **Enter URL or ID**: Paste a GitHub discussion URL or enter just the numeric ID
   - Full URL: \`https://github.com/org/repo/discussions/123\`
   - ID only: \`123\`
3. **Generate Summary**: Click "Summarize" and wait for AI processing
4. **View Results**: The summary appears immediately in your discussions list

### Finding Issues to Contribute

1. **Browse Issues**: Visit the Issues page for comprehensive filtering
2. **Use Filters**: Filter by difficulty, language, repository, or status
3. **Search**: Use the search bar to find specific topics or keywords
4. **Claim Issues**: Click "Claim Issue" on available items

### Theme Customization

- **Toggle Themes**: Use the sun/moon icon in the header
- **System Preference**: Automatically detects your OS theme preference
- **Persistent**: Theme choice is saved across sessions

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for Supabase authentication:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a \`.env.local\` file for future API integrations:

\`\`\`env
# GitHub API (for future integration)
GITHUB_TOKEN=your_github_token_here

# OpenAI API (for real AI summarization)
OPENAI_API_KEY=your_openai_key_here

# Database (for persistence)
DATABASE_URL=your_database_url_here
\`\`\`

### Customization

#### Colors and Branding
- Edit \`tailwind.config.ts\` to customize the color scheme
- Update gradients in components for different branding
- Modify the logo and app name in the header components

#### Mock Data
- Update mock data in page components for testing
- Located in the component files as \`const mockData = [...]\`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Vercel auto-detects Next.js configuration
3. **Deploy**: Push to main branch for automatic deployment

### Other Platforms

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🔮 Future Enhancements

### Planned Features
- [ ] **Real GitHub API Integration**: Connect to live GitHub data
- [ ] **OpenAI Integration**: Actual AI-powered summarization
- [ ] **User Authentication**: GitHub OAuth login
- [ ] **Notification System**: Email and in-app notifications
- [ ] **Weekly Digest**: Automated summary emails
- [ ] **Discussion Templates**: Pre-built discussion formats
- [ ] **Export Functionality**: PDF and Markdown export
- [ ] **Advanced Analytics**: Contribution tracking and insights

### API Integration Roadmap
1. **Phase 1**: GitHub API for real discussion and issue data
2. **Phase 2**: OpenAI API for intelligent summarization
3. **Phase 3**: Database integration for persistence
4. **Phase 4**: User authentication and personalization
5. **Phase 5**: Notification and email systems

## 🤝 Contributing

We welcome contributions to PLDG Hub! Here's how to get started:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**: \`git checkout -b feature/amazing-feature\`
3. **Make your changes**: Follow the existing code style
4. **Test thoroughly**: Ensure all features work as expected
5. **Commit changes**: \`git commit -m 'Add amazing feature'\`
6. **Push to branch**: \`git push origin feature/amazing-feature\`
7. **Open a Pull Request**: Describe your changes clearly

### Code Style Guidelines

- **TypeScript**: Use strict typing throughout
- **Components**: Follow the existing component structure
- **Styling**: Use Tailwind CSS classes consistently
- **Accessibility**: Include ARIA labels and semantic HTML
- **Performance**: Optimize for loading speed and responsiveness

### Issue Reporting

Found a bug or have a feature request?

1. **Check existing issues** to avoid duplicates
2. **Use issue templates** when available
3. **Provide detailed information** including steps to reproduce
4. **Include screenshots** for UI-related issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Programming Language Developer Guild** for the inspiration
- **shadcn/ui** for the beautiful component library
- **Vercel** for the excellent Next.js framework
- **Tailwind CSS** for the utility-first styling approach
- **Lucide** for the comprehensive icon set

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Community**: Join the PLDG Discord for real-time chat

---

**Built with ❤️ for the Programming Language Developer Guild community**

*Streamlining collaboration, one discussion at a time.*
