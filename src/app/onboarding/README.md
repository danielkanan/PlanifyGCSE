# Onboarding Pages

This directory contains the onboarding flow for new users after signing up. The onboarding consists of 3 main steps:

## Pages Structure

### 1. Subject Selection (`/onboarding/subjects`)
- **Purpose**: Users select which GCSE subjects they are studying
- **Features**: 
  - Visual subject cards with icons
  - Multi-select functionality
  - "Add" button for each subject
  - Continue button (disabled until at least one subject is selected)

### 2. Exam Board Selection (`/onboarding/exam-boards`)
- **Purpose**: Users select exam boards for each chosen subject
- **Features**:
  - Dropdown menus for each subject
  - Form validation (all subjects must have exam boards selected)
  - Back navigation to subject selection

### 3. Topic/Module Selection (`/onboarding/topics`)
- **Purpose**: Users select specific modules and topics within subjects
- **Features**:
  - Expandable module cards
  - Individual topic checkboxes
  - "Select All" / "Remove All" functionality for modules
  - Hierarchical structure (modules contain topics)

## Data Structure

The onboarding uses data from `src/data/subjects.ts` which contains:

- **Subjects**: List of GCSE subjects with icons
- **Exam Boards**: Available exam boards for each subject (AQA, Edexcel, etc.)
- **Modules**: Major topic areas within each subject/exam board combination
- **Topics**: Specific topics within each module

## Components

### OnboardingLayout
A reusable layout component that provides:
- Consistent header with "Sherpa" branding
- Step indicator (Step X of Y)
- Back navigation button
- Consistent styling and animations

## Navigation Flow

1. **Register** → **Subject Selection** → **Exam Board Selection** → **Topic Selection** → **Dashboard**
2. Users can navigate back at any step
3. Form validation ensures required selections are made before proceeding

## Future Enhancements

- [ ] Save onboarding data to user profile
- [ ] Implement proper navigation between steps
- [ ] Add progress persistence (save state if user leaves)
- [ ] Add more subjects and exam boards
- [ ] Implement year group detection for auto-selection
- [ ] Add confirmation step before completing onboarding
