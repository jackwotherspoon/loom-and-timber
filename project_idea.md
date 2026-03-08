# Loom & Timber: Modern Furniture Retailer

## Project Overview
Loom & Timber is a high-end, minimalist furniture retailer (think a mix of Herman Miller and Article). The design uses lots of whitespace, elegant typography, and focuses on lifestyle imagery. The product catalog features beautiful, AI-generated photorealistic images of mid-century modern chairs, velvet sofas, and oak dining tables.

## The Demo Feature: Interactive Room Builder

This project serves as a realistic demo for a blog post highlighting Gemini CLI's Plan Mode. The scenario involves adding a complex, interactive feature to the existing application.

### The Feature Request (Simulating a GitHub Issue)
*"Customers want to visualize how items fit together. Let's add a 'Room Builder' feature where they can drag furniture thumbnails from a sidebar onto a 2D grid canvas to plan their space."*

### Implementation Spec (Simulating a Google Doc)
* **Architecture:** Plan the state management for items placed on the canvas (maintaining `x` and `y` coordinates, rotation, and z-index).
* **Drag and Drop:** Choose a robust drag-and-drop library (e.g., `@hello-pangea/dnd` or `@dnd-kit/core`) and plan its integration.
* **Canvas Logic:** Design the data structure and logic for a 2D grid canvas that supports snapping to grid lines and potentially preventing overlapping items.
* **UI Integration:** Design a clean sidebar containing draggable product thumbnails and a large, resizable canvas area.
