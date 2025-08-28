# BPMN Editor

## Overview

This project is a visual BPMN diagram editor built with React, TypeScript, Vite, and TailwindCSS. It allows you to create, view, modify, and download BPMN diagrams, including custom extensions and color tools.

## Technologies Used

- **React**: UI construction and state management.
- **TypeScript**: Static typing for safer development.
- **Vite**: Fast modern bundler for development and production.
- **TailwindCSS**: Utility-first CSS framework for modern, responsive styles.
- **bpmn-js**: Library for rendering and manipulating BPMN diagrams in the browser.
- **PNPM**: Efficient package manager.

## Design Pattern: Bridge

The Bridge pattern was used to decouple the BPMN engine logic (implementation) from the React interface and context (abstraction). This allows the BPMN engine and service to evolve or change without affecting the UI or the rest of the application.

**Why Bridge?**

- Separates business logic (BPMN engine) from presentation and React context.
- Makes the codebase easier to extend and maintain, allowing new features or engine changes without modifying the UI.
- Enables integration of different BPMN engines or services in the future, keeping the same abstraction in the UI.

## Project Structure

- **public/**: Public files and assets.
- **src/**: Main source code.
  - **diagram/**: BPMN editor components and context.
    - `DiagramProvider.tsx`: Initializes the BPMN engine and provides context to the app.
    - `DiagramComponent.tsx`: Floating menu for downloading images and diagrams, main UI.
    - `DiagramContext.tsx`: React context for accessing the BPMN service.
  - **lib/TBpmn/**: Custom BPMN extensions.
    - `colors/ColorPopupProvidet.ts`: Color menu provider for BPMN elements.
    - `palette/`, `renders/`, `resize/`: Custom renderers and shapes.
    - `moddleDefinition.json`: Custom BPMN type definitions.
  - **ports/**: Services and APIs for interacting with the BPMN engine.
    - `engine.ts`: Implements the BPMN engine, methods for mounting, exporting, and destroying the modeler.
    - `diagramService.ts`: Service exposing engine methods to the context.
    - `diagramApi.ts`: Types and interfaces for the service.
  - **utils/**: General utilities.
    - `utils.ts`: Function for downloading files in the browser.
  - **types/**: Global types and definitions for the project.
  - **index.html, package.json, vite.config.ts, tsconfig.json**: Project configuration.

## Features

### 1. Visual BPMN Editor

- Renders BPMN diagrams in the browser.
- Allows creating and modifying diagrams with custom extensions.

### 2. Custom Extensions

- Support for new BPMN element types (Document, Diamond, Terminal, etc.).
- Color menu for changing BPMN element colors.

### 3. Diagram Download

- Floating menu in the top-right corner with options to download:
  - SVG image of the diagram.
  - BPMN (XML) file of the diagram.
- Utility `downloadFile` for downloading any generated file.

### 4. React Context

- Uses `DiagramProvider` to initialize and provide the BPMN service.
- `useDiagram` hook to access service methods from any component.

### 5. Styles and UI

- TailwindCSS for modern, responsive styles.
- Main button and menu with Mexican pink colors and smooth transitions.
- Mexican pink border on the main canvas.

### 6. Modularity and Best Practices

- Utility functions separated in `utils.ts`.
- BPMN engine initialization inside the provider to avoid state issues.
- Refactored code to avoid duplication and ease maintenance.

# Testing

This project uses **Vitest** and **@testing-library/react** for unit and integration testing. All main modules (diagram, ports, utils) have professional tests covering their API and behavior.

## How to Run Tests

1. Run all tests:

```bash
pnpm test
# or
npm test
```

2. Run a specific test file:

```bash
pnpm test src/diagram/Diagram.integration.test.tsx
```

## Test Coverage

- **diagram/**: Integration tests for context/provider and UI menu.
- **ports/**: Unit tests for engine, service, and API interfaces, using mocks for dependencies.
- **utils/**: Unit tests for utility functions, including DOM and browser API mocking.

# How to Clone and Run the Project

1. Clone the repository:

```bash
git clone https://github.com/epsilon11101/bpmn-editor.git
cd bpmn-editor
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).
5. Create and edit BPMN diagrams visually.
6. Use the floating menu to download the diagram as an image or BPMN file.
7. Customize colors and shapes from the context menu.
