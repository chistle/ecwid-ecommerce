Lightspeed E-commerce Test Project
This project is a Vue.js-based e-commerce application developed as a test task for Lightspeed. It demonstrates the implementation of a basic online store with product listings, category navigation, shopping cart functionality, and more.
Features

Product listing with category filtering
Product detail view
Shopping cart functionality
Responsive design
Category tree navigation
Breadcrumb navigation
State management with Pinia
Routing with Vue Router
TypeScript support
SCSS styling

Tech Stack

Vue 3
TypeScript
Vite
Pinia for state management
Vue Router for navigation
Axios for API requests
SCSS for styling

Project Structure
The project follows a standard Vue.js application structure:

src/components: Reusable Vue components
src/views: Page components
src/router: Route definitions
src/stores: Pinia stores for state management
src/services: API services
src/types: TypeScript type definitions
src/assets: Static assets and global styles

Setup and Running

Clone the repository:
Copygit clone https://github.com/your-username/lightspeed-ecommerce-test.git
cd lightspeed-ecommerce-test

Install dependencies:
Copynpm install

Run the development server:
Copynpm run dev

Build for production:
Copynpm run build

Preview the production build:
Copynpm run preview


API Integration
This project uses the Ecwid API for product and category data. The API credentials are stored in the src/services/api.ts file. In a real-world scenario, these should be stored securely and not committed to the repository.
Improvements and Future Work

Implement user authentication
Add product search functionality
Improve error handling and loading states
Implement unit and integration tests
Optimize performance with lazy loading and code splitting
Enhance accessibility features

Contributing
This is a test project and is not open for contributions. However, feedback and suggestions are welcome.
License
This project is not licensed for use or distribution. It is a demonstration project for Lightspeed's evaluation purposes only.