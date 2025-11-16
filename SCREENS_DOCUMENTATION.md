# Delphix App - Screens Documentation

## Overview
Delphix is a React Native stock trading and portfolio management application with AI-powered forecasting capabilities. This document provides comprehensive documentation for all screens in the application.

---

## Authentication Screens

### 1. Welcome Screen (`WelcomeScreen.tsx`)
**Location:** `src/screens/WelcomeScreen.tsx`

**Purpose:** First screen users see when opening the app. Introduces the app's main features and provides entry points for authentication.

**Features:**
- Animations or illustrations
- Brief feature highlights:
  - "Track your trades"
  - "Monitor your portfolio"
  - "Get AI forecasts"
- Action buttons:
  - **Sign Up** - Navigates to registration
  - **Login** - Navigates to login

**User Flow:** Entry point → Login or Registration

---

### 2. Login Screen (`LoginScree.tsx`)
**Location:** `src/screens/auth/LoginScree.tsx`

**Purpose:** Authenticates existing users to access their account.

**Status:** Currently empty (implementation pending)

**Expected Features:**
- Email/username input field
- Password input field
- Login button
- "Forgot password?" link
- Navigation to registration screen

**User Flow:** Welcome Screen → Login → Main App

---

### 3. Registration Screen (`RegistrationScreen.tsx`)
**Location:** `src/screens/auth/RegistrationScreen.tsx`

**Purpose:** Allows new users to create an account.

**Status:** Currently empty (implementation pending)

**Expected Features:**
- User registration form
- Email/username input
- Password input with confirmation
- Terms and conditions acceptance
- Registration button
- Navigation to login screen

**User Flow:** Welcome Screen → Registration → Main App

---

## Main Navigation Screens (Bottom Tab)

### 4. Portfolio Screen (`PortfolioScreen.tsx`)
**Location:** `src/screens/bottomNav/PortfolioScreen.tsx`

**Purpose:** Central hub displaying user's investment portfolio with real-time data and analytics.

**Features:**

**Portfolio Overview:**
- Current portfolio value
- Profit/loss percentage (+% or -%)
- Mini chart showing all assets performance
- Top market movers
- Quick AI recommendations

**Portfolio Positions List:**
For each position, displays:
- Company name + ticker symbol
- Current stock price
- Average purchase price
- Number of shares owned
- Profit/loss amount
- Mini price chart

**Additional Features:**
- **Sorting options:**
  - By price movement (gainers/losers)
  - By profitability
  - By volume
- **Filters:**
  - Filter by asset type
  - Filter by performance
  - Filter by sector

**User Flow:** Main Tab Navigation → Portfolio (default view)

---

### 5. AI Forecasts Screen (`AIForecastsScreen.tsx`)
**Location:** `src/screens/bottomNav/AIForecastsScreen.tsx`

**Purpose:** Provides AI-powered market analysis, predictions, and recommendations for the user's portfolio and individual stocks.

**Features:**

**AI Portfolio Forecast:**
- Overall portfolio forecast
- Risk level assessment
- List of companies with expected growth/decline
- **Recommendations:**
  - **Hold** - Maintain current position
  - **Buy** - Increase position
  - **Reduce Position** - Decrease or sell

**Notifications Center:**
AI-powered push notifications:
- Price movement alerts: "AAPL may drop −2.3% tomorrow based on new earnings report"
- Portfolio updates: "Your portfolio is up +3.5% this week"
- News alerts: "TSLA: high-impact news detected"

**News Feed:**
General news stream with filtering options:
- **Stock market** - General market news
- **Only my portfolio** - News related to user's holdings
- **Global news** - Worldwide financial news
- **By sector** - Filter news by industry sector

**User Flow:** Main Tab Navigation → AI Forecasts

---

### 6. Search Screen (`SearchScreen.tsx`)
**Location:** `src/screens/bottomNav/SearchScreen.tsx`

**Purpose:** Allows users to search and discover stocks, ETFs, and companies.

**Search Capabilities:**
- **By Company** - Search by company name
- **By Ticker** - Search by stock symbol (e.g., AAPL, TSLA)
- **By ETF** - Search for Exchange-Traded Funds
- **By Sector** - Filter by industry sector:
  - IT (Information Technology)
  - Energy
  - Healthcare
  - And other sectors

**User Flow:** Main Tab Navigation → Search → Stock Info Screen

---

### 7. Profile Screen (`ProfileScreen.tsx`)
**Location:** `src/screens/bottomNav/ProfileScreen.tsx`

**Purpose:** User account management and personal settings.

**Status:** Currently empty (implementation pending)

**Expected Features:**
- User profile information
- Account settings
- Preferences
- Logout functionality
- Navigation to Settings Screen

**User Flow:** Main Tab Navigation → Profile

---

## Additional Screens

### 8. Stock Info Screen (`StockInfoScreen.tsx`)
**Location:** `src/screens/StockInfoScreen.tsx`

**Purpose:** Detailed view of a specific stock with comprehensive information, charts, and trading options.

**Features:**

**Price Information:**
- Current stock price
- Percentage change (+/-)
- Large interactive chart with time periods:
  - 1D (1 Day)
  - 1W (1 Week)
  - 1M (1 Month)
  - 6M (6 Months)
  - 1Y (1 Year)
  - ALL (All time)

**Company Information:**
- Company description
- Business overview
- Key metrics

**News & Analysis:**
- Latest news related to the stock
- AI analytics specific to this company
- Market sentiment analysis

**Trading Actions:**
- **Buy** button - Purchase shares
- **Sell** button - Sell existing position

**Transaction History:**
- History of user's trades with this specific stock
- Past buy/sell transactions
- Performance tracking

**User Flow:** Search Screen → Stock Info Screen

---

### 9. Add Transaction Screen (`AddTransactionScreen.tsx`)
**Location:** `src/screens/additional/AddTransactionScreen.tsx`

**Purpose:** Allows users to record buy or sell transactions manually.

**Transaction Form Fields:**
- **Transaction Type:** Buy / Sell
- **Company:** Company name or ticker
- **Number of Shares:** Quantity to buy/sell
- **Purchase Price:** Price per share
- **Date:** Transaction date
- **Comment:** Optional notes about the transaction

**User Flow:** Portfolio Screen → Add Transaction → Transaction History

---

### 10. Transaction History Screen (`TransactionHistoryScreen.tsx`)
**Location:** `src/screens/additional/TransactionHistoryScreen.tsx`

**Purpose:** Displays a comprehensive list of all user's past transactions with filtering and sorting capabilities.

**Features:**
- Complete transaction history
- **Filtering options:**
  - **By Company** - Filter transactions for specific stocks
  - **By Date** - Filter by date range
  - **By Transaction Type** - Filter by Buy/Sell operations
- Transaction details:
  - Date and time
  - Company/ticker
  - Transaction type
  - Quantity
  - Price
  - Total value

**User Flow:** Portfolio Screen → Transaction History

---

### 11. Settings Screen (`SettingsScreen.tsx`)
**Location:** `src/screens/additional/SettingsScreen.tsx`

**Purpose:** Application settings and user preferences.

**Status:** Currently empty (implementation pending)

**Expected Features:**
- Notification preferences
- AI forecast settings
- Display preferences
- Account management
- Privacy settings
- App version information
- Support/Help section

**User Flow:** Profile Screen → Settings

---

## Screen Navigation Flow

```
Welcome Screen
    ├── Login Screen → Main App
    └── Registration Screen → Main App

Main App (Bottom Tab Navigation)
    ├── Portfolio Screen
    │   ├── Add Transaction Screen
    │   └── Transaction History Screen
    ├── AI Forecasts Screen
    ├── Search Screen
    │   └── Stock Info Screen
    └── Profile Screen
        └── Settings Screen
```

---

## Technical Notes

- **Framework:** React Native 0.82.1
- **Language:** TypeScript
- **State Management:** To be implemented (store directory exists but is empty)
- **Navigation:** To be implemented (navigation directory exists but is empty)
- **Status:** Most screens are in planning/comment phase and require full implementation

---

## Implementation Status

| Screen | Status | Notes |
|--------|--------|-------|
| Welcome Screen | Planning | Comments only |
| Login Screen | Empty | Needs implementation |
| Registration Screen | Empty | Needs implementation |
| Portfolio Screen | Planning | Detailed comments |
| AI Forecasts Screen | Planning | Detailed comments |
| Search Screen | Planning | Basic comments |
| Profile Screen | Empty | Needs implementation |
| Stock Info Screen | Planning | Detailed comments |
| Add Transaction Screen | Planning | Basic comments |
| Transaction History Screen | Planning | Basic comments |
| Settings Screen | Empty | Needs implementation |

---

## Future Enhancements

1. **Real-time Data Integration:** Connect to stock market APIs for live prices
2. **AI Integration:** Implement AI forecasting engine
3. **Push Notifications:** Set up notification system for AI alerts
4. **Chart Library:** Integrate charting library for price visualization
5. **Authentication:** Implement secure login/registration
6. **State Management:** Set up Redux or Context API for state management
7. **Navigation:** Implement React Navigation for screen routing
8. **Backend Integration:** Connect to backend API for data persistence

---

*Last Updated: Based on current codebase structure*

