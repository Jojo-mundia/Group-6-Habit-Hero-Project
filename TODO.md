# TODO: Make AddHabitForm Cover Whole Page

- [x] Update `.addHabitContainer` in `src/custom-styles.css` to remove max-width, set width: 100vw, height: 100vh, and margin: 0
- [x] Center the entire AddHabitForm in the middle of the page with images covering the full background
- [x] Fix cycling background images by updating image URLs to higher resolution
- [x] Ensure the container covers the entire page without any white space (removed body margins and used fixed positioning)
- [x] Restore navbar for all pages including add-habit
- [x] Fix navbar navigation links to work properly
- [x] Restore clock component in navbar
- [x] Fix z-index layering so navbar is above background and form content
- [x] Create new container with 100% width and height using .formOverlay
- [x] Move AddHabitForm content to occupy the whole .formOverlay container fully
- [x] Change "Add New Habit" text color to white
- [x] Reduce background overlay opacity for better text visibility
- [x] Test the page in the browser to confirm the AddHabitForm covers the whole page with cycling background images (dev server running at http://localhost:5174/)
- [x] Ensure form content is positioned correctly and readable
