# Implementation Plan - Navbar Component

Build the vertical `navbar` component as seen in the provided image, utilizing existing design system variables and the shared `Button` component.

## 1. Enhance `Button` Component
To support the Material Symbols icons shown in the design, the current `Button` component needs to be enhanced to support both image paths and Material Symbol names.

- **Modify `lib/components/shared/buttons/src/lib/button/button.html`**:
  - Add logic to check if `icon()` is a path/filename or a symbol name.
  - Render `<span class="material-symbols-outlined">` if it's a symbol.
- **Modify `lib/components/shared/buttons/src/lib/button/button.scss`**:
  - Add styles for `.material-symbols-outlined` within the button to match icon sizing.
  - Add a `ghost` or `nav-item` color/type if needed, or use existing ones if they fit.

## 2. Implement Navbar Component
- **Modify `lib/components/shared/navbar/src/lib/navbar/navbar.ts`**:
  - Define `menuItems` array with label, icon, and route.
  - Add current route detection for active state.
  - Import `Button` component.
- **Modify `lib/components/shared/navbar/src/lib/navbar/navbar.html`**:
  - Create a `<nav>` container.
  - Loop through `menuItems` and render `lib-button` for each.
- **Modify `lib/components/shared/navbar/src/lib/navbar/navbar.scss`**:
  - Set sidebar width (~280px) and full height (100vh).
  - Use `brand-400` for background.
  - Style navigation list with appropriate spacing (`map.get($spacing, 'xl')`).

## 3. Visual Details (Based on Image)
- **Background**: `brand-400` blue.
- **Active Item**: `brand-500` or `brand-600` with rounded corners.
- **Typography**: White color, bold weights.
- **Icons**: White color, Material Symbols.

## 4. Verification
- Ensure the navbar is responsive or fixed based on current app requirements.
- Verify that icons align correctly with text.
- Check active state toggle logic.
