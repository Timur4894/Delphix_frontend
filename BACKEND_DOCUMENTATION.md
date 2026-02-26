# Delphix Backend API

## Project Summary

Delphix Backend is a robust RESTful API service built with NestJS that powers the Delphix mobile application—a comprehensive stock trading and portfolio management platform. The backend provides secure authentication, real-time financial data management, and AI-powered forecasting capabilities through OpenAI API integration.

The system serves as the core infrastructure for managing user portfolios, processing transactions, analyzing market data, and generating intelligent investment recommendations. It handles user authentication and authorization, manages portfolio data, processes buy/sell transactions, aggregates financial news, and leverages OpenAI's advanced language models to provide personalized stock forecasts and market analysis.

Key functionalities include secure user registration and authentication with JWT tokens, comprehensive portfolio management with real-time position tracking, transaction history management, company and stock data retrieval with search capabilities, financial news aggregation and filtering, and AI-powered forecasting that analyzes user portfolios and market conditions to generate personalized investment recommendations.

The backend architecture follows RESTful principles and implements a modular structure with clear separation of concerns, ensuring scalability, maintainability, and security. It integrates with external financial data providers for real-time stock information and utilizes OpenAI's API to process market data, news, and user portfolio information to deliver actionable insights.

---

## Technology Stack

**Core Framework:**
- NestJS - Progressive Node.js framework for building efficient and scalable server-side applications
- TypeScript - Type-safe JavaScript for enhanced code quality and developer experience
- Node.js - JavaScript runtime environment

**Database & ORM:**
- PostgreSQL - Relational database for structured data storage
- TypeORM / Prisma - Object-Relational Mapping for database operations

**Authentication & Security:**
- JWT (JSON Web Tokens) - Secure token-based authentication
- bcrypt - Password hashing and encryption
- Passport.js - Authentication middleware for NestJS

**AI Integration:**
- OpenAI API - Integration with GPT models for generating stock forecasts, market analysis, and investment recommendations
- OpenAI SDK - Official Node.js SDK for OpenAI API interactions

**API & Communication:**
- RESTful API - Standard HTTP methods for API endpoints
- Axios - HTTP client for external API calls
- Swagger/OpenAPI - API documentation and testing

**Validation & Error Handling:**
- class-validator - Decorator-based validation for DTOs
- class-transformer - Object transformation utilities
- NestJS Exception Filters - Centralized error handling

**Development Tools:**
- ESLint - Code linting and quality assurance
- Prettier - Code formatting
- Jest - Unit and integration testing framework
- Docker - Containerization for development and deployment

**External Services:**
- Financial Data APIs - Integration with stock market data providers (e.g., Alpha Vantage, Yahoo Finance, or custom providers)
- News Aggregation APIs - Financial news sources for market analysis

**DevOps & Deployment:**
- Environment Variables - Configuration management via .env files
- CORS - Cross-Origin Resource Sharing configuration
- Rate Limiting - API request throttling and protection

---

# Delphix Frontend Mobile Application

## Project Summary

Delphix Frontend is a cross-platform mobile application built with React Native that provides an intuitive and feature-rich interface for stock trading and portfolio management. The application delivers a seamless user experience across iOS and Android platforms, enabling users to track their investments, analyze market data, receive AI-powered forecasts, and manage their portfolios on the go.

The frontend application implements a comprehensive navigation system with bottom tab navigation for main features and stack navigation for detailed views. It features secure authentication flows, real-time portfolio tracking, advanced search capabilities for stocks and companies, AI-powered forecasting displays, transaction management, and user profile customization. The app integrates seamlessly with the NestJS backend API to fetch real-time financial data, user portfolios, market news, and AI-generated investment recommendations.

Key features include user authentication with persistent sessions using JWT tokens stored securely in AsyncStorage, a comprehensive portfolio dashboard showing current positions, profit/loss calculations, and performance metrics, an intelligent search system for discovering stocks by company name, ticker symbol, or sector, AI forecasts screen displaying personalized investment recommendations based on user portfolios and market analysis, transaction management for recording buy/sell operations with detailed history tracking, and a user profile system with customizable settings and preferences.

The application architecture follows React Native best practices with component-based structure, context API for global state management, Redux Toolkit for complex state handling, and TypeScript for type safety. It implements responsive design principles, handles network errors gracefully, and provides smooth animations and transitions using Lottie and native React Native animations.

---

## Technology Stack

**Core Framework:**
- React Native 0.82.1 - Cross-platform mobile framework for iOS and Android
- React 19.1.1 - JavaScript library for building user interfaces
- TypeScript 5.8.3 - Type-safe JavaScript for enhanced code quality and developer experience

**Navigation:**
- React Navigation 7.x - Navigation library for React Native applications
  - @react-navigation/native - Core navigation library
  - @react-navigation/native-stack - Stack navigator for hierarchical navigation
  - @react-navigation/bottom-tabs - Bottom tab navigator for main app sections
- react-native-screens - Native screen components for better performance
- react-native-safe-area-context - Safe area handling for different device screens
- react-native-gesture-handler - Native gesture handling system

**State Management:**
- Redux Toolkit 2.10.1 - Modern Redux with simplified API for state management
- React Redux 9.2.0 - React bindings for Redux
- React Context API - Built-in React state management for authentication and global app state

**API & Networking:**
- Axios 1.13.2 - Promise-based HTTP client for API requests
- Custom API layer with interceptors for token management and error handling

**Storage & Persistence:**
- @react-native-async-storage/async-storage 2.2.0 - Asynchronous, persistent key-value storage for token and user data

**UI Components & Styling:**
- React Native StyleSheet - Built-in styling system
- Custom theme system with color constants and typography utilities
- Custom reusable components (Header, GradientBtn, StockItem, SelectableStockItem)

**Media & Assets:**
- react-native-image-picker 8.2.1 - Image selection and upload functionality
- react-native-svg 15.15.0 - SVG rendering library for custom icons and graphics
- Custom SVG components (AISvg, BackSvg, EditSvg, PortfolioSvg, etc.)
- Lottie React Native 7.3.4 - Animation library for smooth, vector-based animations

**Development Tools:**
- ESLint 8.19.0 - Code linting and quality assurance
- Prettier 2.8.8 - Code formatting
- Jest 29.6.3 - JavaScript testing framework
- React Native CLI - Command-line tools for development and building
- Babel - JavaScript compiler for transpiling modern JavaScript/TypeScript
- Metro Bundler - JavaScript bundler for React Native

**Platform-Specific:**
- iOS - Xcode, CocoaPods for native iOS dependencies
- Android - Android Studio, Gradle for native Android dependencies

**Type Definitions:**
- @types/react - TypeScript definitions for React
- @types/jest - TypeScript definitions for Jest
- @types/react-test-renderer - TypeScript definitions for React Test Renderer

**Build & Configuration:**
- TypeScript configuration (tsconfig.json)
- Babel configuration (babel.config.js)
- Metro configuration (metro.config.js)
- React Native config (react-native.config.js)

---
