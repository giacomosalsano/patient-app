# Patient App - Complete Documentation

## 📋 Overview

Patient App is a modern **frontend** web application for healthcare patient management that provides comprehensive patient data visualization and management capabilities. The application leverages a clean React-based architecture with real-time data visualization through interactive charts and tables, connecting to an external patient API. It offers healthcare professionals an intuitive interface to monitor patient parameters, track alarms, and analyze demographic data with a focus on user experience and data accessibility. The application is designed as a client-side interface that consumes external API services for patient data operations.

---

## 🏗️ System Architecture

### Tech Stack

- **Framework:** React 19 with Vite
- **Language:** TypeScript
- **Navigation:** Single Page Application (SPA)
- **State Management:** React Hooks with custom usePatient hook
- **Forms & Validation:** React Hook Form + Zod
- **HTTP Client:** Axios with custom request wrapper
- **Styling:** Tailwind CSS v4 with custom components
- **Storage:** Local Storage for theme preferences
- **Key Libraries/Services:** Recharts for data visualization, Radix UI for components, Lucide React for icons

<div align="center" style="display: inline_block justify-center"><br>
  <img src="https://skillicons.dev/icons?i=typescript,react,tailwind,vite,axios" alt="icons" /> </div>

### Data Flow

`1. User loads app → 2. usePatient hook fetches data → 3. API call to external patient API → 4. Data processed and stored in state → 5. UI renders table/charts → 6. User interactions trigger CRUD operations → 7. State updates → 8. UI re-renders`

---

## 🗂️ Project Structure

```
patient-app/
  ├─ src/
  │  ├─ components/     # Reusable UI components
  │  │  ├─ ui/         # Base UI components (Button, Input, etc.)
  │  │  ├─ charts/     # Data visualization components
  │  │  ├─ patients-table/ # Patient data table
  │  │  ├─ header/     # Application header
  │  │  └─ footer/     # Application footer
  │  ├─ modules/       # Feature-based modules
  │  │  └─ patient/    # Patient management module
  │  │     ├─ types/   # TypeScript interfaces
  │  │     ├─ hooks/   # Custom React hooks
  │  │     └─ service/ # API service layer
  │  ├─ core/          # Core application services
  │  │  └─ services/   # API configuration and utilities
  │  ├─ utils/         # Utility functions
  │  ├─ lib/           # Third-party library configurations
  │  └─ assets/        # Static assets
  ├─ package.json
  └─ documentation.md
```

---

## 🔐 Authentication & Security

The application uses Basic Authentication with environment variables for external API access:

- **Auth Method:** Basic Authentication (username/password)
- **Configuration:** Environment variables (`VITE_API_USER`, `VITE_API_PASS`)
- **Security:** API credentials stored in environment variables, not in client code
- **External API:** Connects to external patient management API (GET, UPDATE, CREATE operations only)
- **Key Auth Files:** `src/core/services/api/config.ts` handles authentication configuration

---

## 🧑‍💻 Main Features & Flows

### 1. Patient Data Management

- **List Patients:** Fetches and displays all patients in a sortable table
- **View Patient Details:** Individual patient information with parameters
- **Add Patient:** Form-based patient creation with validation
- **Update Patient:** Edit existing patient information
- **Parameter Monitoring:** Track patient vital signs and alarms

### 2. Data Visualization Dashboard

- **Interactive Charts:** Age distribution, alarm statistics, and parameter trends
- **Real-time Metrics:** Total patients, parameters, alarms, and average age
- **Toggle Views:** Switch between table and chart views seamlessly
- **Recent Activity:** Mocked activity data with potential for real-time implementation when API supports it

### 3. Theme Management

- **Dark/Light Mode:** User preference stored in localStorage
- **System Preference:** Automatically detects user's system theme
- **Persistent Settings:** Theme choice persists across sessions

---

## 🧩 Components

- **Header:** Navigation and theme toggle with patient app branding
- **PatientsTable:** Sortable data table with CREATE, READ and UPDATE operations
- **Charts:** Interactive data visualization with Recharts
- **DataTable:** Reusable table component with TanStack Table
- **Button:** Customizable button with multiple variants
- **Dialog:** Modal dialogs for patient forms
- **Card:** Information display cards for metrics
- **Toggle:** Theme switching component

---

## 🧮 Core Logic / Key Algorithms

### Patient Age Calculation

The application calculates patient ages using a simple but effective algorithm:

```typescript
export function formatAge(date: string) {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}
```

### Alarm Detection System

The system tracks patient parameters and identifies alarms:

```typescript
const alarmsCount = patients.reduce(
  (acc, patient) =>
    acc + patient.parameters.filter((parameter) => parameter.alarm).length,
  0,
);
```

### Data Aggregation

Real-time calculation of patient statistics including total parameters, average age, and alarm counts for dashboard metrics.

---

## 📦 Dependencies

### Production

- `react` (^19.1.1) - Core React library
- `react-dom` (^19.1.1) - React DOM rendering
- `axios` (^1.11.0) - HTTP client for API calls
- `@tanstack/react-table` (^8.21.3) - Table component library
- `recharts` (^2.15.4) - Chart visualization library
- `react-hook-form` (^7.62.0) - Form management
- `zod` (^4.1.1) - Schema validation
- `@radix-ui/react-*` - UI component primitives
- `lucide-react` (^0.541.0) - Icon library
- `tailwindcss` (^4.1.12) - CSS framework
- `sonner` (^2.0.7) - Toast notifications
- `vaul` (^1.1.2) - Drawer component

### Development

- `typescript` (~5.8.3) - TypeScript compiler
- `@types/react` (^19.1.10) - React type definitions
- `@vitejs/plugin-react` (^5.0.0) - Vite React plugin
- `vite` (^7.1.2) - Build tool and dev server
- `eslint` (^9.33.0) - Code linting
- `prettier` (^3.6.2) - Code formatting

---

## 🎨 Design & Styling

- **Colors:** Defined through Tailwind CSS classes and CSS variables
- **Global Styles:** Tailwind CSS v4 with custom component styling
- **Fonts:** System fonts with Tailwind's font stack
- **Icons:** Lucide React icon library for consistent iconography
- **Theme:** Dark/light mode support with CSS custom properties

---

## 🛠️ Utilities

- **formatDate:** Formats dates for display in various formats
- **formatAge:** Calculates age from birth date
- **request:** HTTP request wrapper with error handling
- **cn:** Utility for merging CSS classes (clsx + tailwind-merge)

---

## 🌟 Strengths

1. **Modern React Architecture** - Uses latest React 19 with hooks and functional components
2. **Type Safety** - Comprehensive TypeScript implementation with proper interfaces
3. **Modular Design** - Feature-based module structure for scalability
4. **Real-time Data Visualization** - Interactive charts and metrics dashboard
5. **Responsive Design** - Mobile-first approach with Tailwind CSS
6. **Clean API Integration** - Well-structured service layer with error handling
7. **User Experience** - Intuitive navigation between table and chart views
8. **Theme Support** - Dark/light mode with system preference detection

---

## 🔧 Suggested Improvements

### High Priority

1. **Add comprehensive unit and integration tests** using Jest and React Testing Library
2. **Implement proper error boundaries** for better error handling
3. **Improve loading states and skeleton components** for better UX

### Medium Priority

1. **Implement pagination** for large datasets
2. **Add export functionality** (PDF, CSV) for patient data
3. **Implement real-time updates** with WebSocket connections

### Low Priority

1. **Add CI/CD pipeline** with GitHub Actions
2. **Add accessibility improvements** (ARIA labels, keyboard navigation)
3. **Create comprehensive API documentation** with OpenAPI/Swagger

---

## 🎯 Conclusion

Patient App is a robust, well-engineered **frontend** healthcare management application that demonstrates modern React development practices. The application successfully combines data management with visualization, providing healthcare professionals with an intuitive interface for patient monitoring through external API integration. The modular architecture, comprehensive TypeScript implementation, and modern UI components make it ready for the next phase of development, focusing on testing, monitoring, and additional feature enhancements. The codebase is well-structured and maintainable, making it an excellent foundation for future healthcare technology solutions that can adapt to various backend APIs.
