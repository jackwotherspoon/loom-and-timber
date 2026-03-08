# Feature Specification: Interactive Room Builder

## 1. Executive Summary
The Loom & Timber storefront currently offers a static viewing experience. To increase conversion rates and engagement, we are introducing the **Interactive Room Builder**. This feature allows customers to visually plan their spaces by dragging and dropping 2D representations of our furniture onto a customizable floor plan canvas.

## 2. Scope & Objectives
*   **Goal:** Provide a seamless, intuitive tool for spatial planning directly within the browser.
*   **Target Audience:** Customers deciding between multiple pieces or unsure about sizing.
*   **Out of Scope (V1):** 3D rendering, saving floor plans to user accounts, complex room shapes (L-shaped rooms, etc.), rotation of items.

## 3. User Interface Requirements

### 3.1. Entry & Exit
*   **Entry:** A primary "Try Room Builder" button should be added to the Hero section of the homepage, sitting alongside the existing "Shop Collection" button.
*   **Transition:** Clicking the button should smoothly transition the view, hiding the hero section and product grid, and revealing the Builder Interface.
*   **Exit:** A clear "Exit Builder" or "Back to Store" button must be present in the header to return the user to the standard shopping experience.

### 3.2. Layout
The Builder Interface should adopt a split-pane layout:
*   **Left Pane (Inventory Sidebar):** Fixed width (e.g., 300px), scrollable, containing Draggable Product Cards.
*   **Right Pane (Canvas Area):** Takes up the remaining viewport width and height. Must feature a visible grid background to indicate scale.

### 3.3. Inventory Sidebar
*   Must display all available products (currently Chair, Dining Table, Sofa, Coffee Table).
*   Each product requires a "Draggable Card" component showing a small thumbnail and the product name.
*   Users can drag the *same* product multiple times from the sidebar onto the canvas (infinite supply).

### 3.4. The Canvas
*   **Background:** A repeating grid pattern (e.g., using CSS `background-image` with linear gradients or an SVG pattern) to provide a sense of scale (e.g., 1 grid square = 1 sq ft).
*   **Droppable Area:** The entire canvas must accept dropped items from the sidebar.
*   **Placed Items:** Items dropped on the canvas must render as absolute-positioned elements corresponding to the mouse coordinates at the time of the drop.

### 3.5. Interaction Mechanics
*   **Initial Drop:** When an item is dragged from the sidebar and released over the canvas, it should appear exactly at the cursor's location.
*   **Repositioning:** Items already on the canvas must be draggable to new locations within the canvas bounds.
*   **Selection & Deletion:**
    *   Clicking a placed item selects it (indicated by a visual border/highlight).
    *   When an item is selected, a "Delete" button (trash icon) should appear floating near the item, or the user can press the `Backspace`/`Delete` key to remove it from the canvas.

## 4. Technical Architecture Guidelines

### 4.1. Libraries
*   **Drag and Drop:** Use `@hello-pangea/dnd` for managing the drag contexts, droppables, and draggables. This provides the necessary accessibility and touch support.
*   **Icons:** Use `lucide-react` for UI icons (e.g., Trash, X/Close).
*   **Styling:** Continue using Tailwind CSS v4.

### 4.2. State Management
The core state must reside at the parent Builder component level to orchestrate the drag-and-drop flow.

**Required State Variables:**
1.  `isBuilderActive` (boolean): Controls whether the standard storefront or the Room Builder is visible.
2.  `placedItems` (Array of Objects): The master record of items on the canvas.
    *   *Schema:* `{ uniqueId: string, productId: number, name: string, image: string, x: number, y: number }`
    *   *Note:* `uniqueId` is critical (e.g., generated via `crypto.randomUUID()` or a counter) because multiple instances of the same `productId` can exist on the canvas.
3.  `selectedItemId` (string | null): Tracks which placed item is currently selected for deletion.

### 4.3. Coordinate Handling (Critical Path)
*   Translating the screen coordinates provided by the `onDragEnd` event of `@hello-pangea/dnd` into relative coordinates (`x`, `y`) within the Canvas container is the most complex part of this feature.
*   The `onDragEnd` handler must calculate the drop position relative to the bounding client rect (`getBoundingClientRect()`) of the Canvas HTML element to ensure items don't jump when dropped.

### 4.4. Component Structure (Suggested)
*   `RoomBuilder` (Main orchestrator, holds state, handles `DragDropContext`)
    *   `Sidebar` (Contains `Droppable` for inventory - though usually inventory isn't a strict droppable, it's the source of draggables)
        *   `DraggableProductCard`
    *   `Canvas` (The main `Droppable` area)
        *   `PlacedFurnitureItem` (Absolute positioned, draggable within the canvas, handles selection state)

## 5. Implementation Phases (For Plan Mode)
1.  **Phase 1: UI Scaffold & State:** Create the split-pane layout and implement the view toggling logic (`isBuilderActive`).
2.  **Phase 2: Drag & Drop Setup:** Wrap the builder in `<DragDropContext>`, set up the Sidebar draggables and the Canvas droppable.
3.  **Phase 3: Coordinate Math:** Implement the `onDragEnd` logic to accurately calculate and store the `x, y` positions of dropped items in the `placedItems` array.
4.  **Phase 4: Reposition & Delete:** Make items already on the canvas draggable, and implement the selection/deletion logic.