# ZAMS - Modern Chat Interface

A modern, responsive chat interface built with Next.js, Tailwind CSS, and ShadCN UI components. This project demonstrates pixel-perfect UI recreation.

## Project Setup

### 1. Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yiqun12/zams-clone
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

### 2. Deployment

- Live Demo: [https://zams-fn9d.vercel.app/](https://zams-fn9d.vercel.app/)
- Admin Dashboard: [https://zams-fn9d.vercel.app/admin](https://zams-fn9d.vercel.app/admin)
- Basic Vercel deployment

## Pixel-Perfect Recreation

### UI Components

- HomeHeader: Gradient text with specific color values
- ChatInput: Input field with 1000 character limit and custom black send button
- MessageList: Message display with avatars, timestamps, and loading animation
- HomeFooter: Privacy notice (hidden on mobile)
- ActionButtons: Response type and attachment options
- Logo: Simple leaf icon with text

### Design Implementation

- Basic Figma design implementation
- Standard spacing and typography
- ShadCN components with minimal customization
- Basic responsive design implementation
- Custom gradient text colors

## Interactive Features

### Chat Functionality

- Message input with character limit and counter
- Simulated AI response with random templates
- Enter key support for sending messages
- Auto-scroll to latest message
- Message timestamps display
- Response type selection (UI only)
- Attachment option (UI only)
- Disabled send button when input is empty

### User Experience

- Mobile-first layout with fixed input
- Responsive design with media queries
- Message bubbles with avatars
- Loading animation with bouncing dots
- Mobile-optimized action buttons
- Character count display
- Focus states and transitions
- Disabled states for buttons
- Different input positions for mobile/desktop

## Technical Documentation

### Project Structure

```
src/
├── app/
│   ├── home/
│   │   └── page.tsx      # Main chat interface with state management
│   └── page.tsx          # Root page
├── components/
│   ├── ui/              # ShadCN UI components
│   │   ├── alert.tsx    # Alert component
│   │   ├── alert-dialog.tsx # Alert dialog component
│   │   ├── avatar.tsx   # Avatar component
│   │   ├── badge.tsx    # Badge component
│   │   ├── button.tsx   # Button with variants
│   │   ├── card.tsx     # Card container
│   │   ├── checkbox.tsx # Checkbox component
│   │   ├── dialog.tsx   # Dialog component
│   │   ├── dropdown-menu.tsx # Dropdown menu component
│   │   ├── input.tsx    # Input field
│   │   ├── label.tsx    # Label component
│   │   ├── select.tsx   # Select component
│   │   ├── slider.tsx   # Slider component
│   │   ├── switch.tsx   # Switch component
│   │   ├── table.tsx    # Table component
│   │   └── tabs.tsx     # Tabs component
│   ├── HomeHeader.tsx   # Header with gradient text
│   ├── ChatInput.tsx    # Message input with character limit
│   ├── MessageList.tsx  # Message display with avatars
│   ├── HomeFooter.tsx   # Privacy notice (hidden on mobile)
│   ├── ActionButtons.tsx # Response type and attachment options
│   └── Logo.tsx        # Leaf icon with text
├── lib/
│   └── utils.ts        # Utility functions for class merging
├── types/
│   └── filters.ts      # Type definitions for filters
└── hooks/
    └── useMediaQuery.ts # Window resize listener hook
```

### Design Decisions

1. Gradient Text Implementation

   - Custom gradient colors for text
   - Specific color values for different text elements
   - Basic Tailwind gradient implementation
   - Standard color scheme
2. Responsive Layout

   - Mobile-First Approach:
     - Fixed input on mobile
     - Standard desktop layout
     - Window resize listener for responsive design
     - Mobile-optimized action buttons
     - Hidden footer on mobile
     - Different input positions based on screen size
3. Message Display

   - Scrollable message container with auto-scroll
   - Avatar display with fallback
   - Message timestamps
   - Loading animation with bouncing dots
4. Component Architecture

   - TypeScript interfaces for props
   - Custom hook for window resize
   - Client-side components with "use client" directive
   - Lucide icons for UI elements
   - Radix UI primitives for accessibility
   - Utility functions for class name management
   - State management with React hooks
   - Extended ShadCN UI component library

### Tech Stack

- Framework: Next.js 15.2.3
- Styling: Tailwind CSS
- UI Components: ShadCN UI
- Language: TypeScript
- State Management: React Hooks
- Icons: Lucide React
- UI Primitives: Radix UI
- Utilities: clsx, tailwind-merge
- Deployment: Vercel
