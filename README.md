# WEDE5020-PART3
Nest Poultry Farm – WEDE5020 Part 3
1Nest Poultry Farm is a woman-owned free-range poultry business based in Zebediela, Limpopo. It was founded by Ms Selina Khaalo. The website introduces the farm, advertises its eggs and chicken, and allows customers to make enquiries or contact the business.

Live website: https://glen-khaal0.github.io/WEDE5020-PART3/

GitHub repository: https://github.com/Glen-Khaal0/WEDE5020-PART3
Website pages
Page	Description
Home	Introduces the farm, its history and main features.
About	Shares the founder's story and displays a photo gallery.
Services	Displays products with search, filtering and sorting options.
Enquiries	Allows customers to request products and receive price estimates.
Contact	Provides contact details, a message form and an interactive map.

Project structure
The website contains five HTML pages, one external CSS file for styling and one JavaScript file for functionality. It also includes an images folder, robots.txt and sitemap.xml files.
Main features
- Responsive navigation menu with a hamburger button.
- Photo gallery with captions and navigation controls.
- Interactive map using Leaflet and OpenStreetMap.
- Animations and transitions to improve the user experience.
- Products displayed dynamically using JavaScript.
- Product search, filtering and sorting.
- Enquiry form with input validation and price calculations.
- Contact form that prepares an email for the farm.
Search Engine Optimisation (SEO)
SEO improvements were added to help search engines understand and find the website. These include unique page titles, meta descriptions, relevant keywords, descriptive image names and alt text.

Internal links connect the different pages, while responsive layouts make the website suitable for mobile devices. Open Graph, Twitter tags and local business structured data were also added.

Page loading was improved through lazy-loaded images, deferred JavaScript and optimised file organisation. A future improvement would be creating a Google Business Profile and Facebook page for the farm.
Security
A Content Security Policy was added to control which external resources the website can load. User input is displayed using textContent instead of innerHTML to reduce the risk of HTML injection.

A hidden honeypot field was also added to help detect spam submissions. The .gitignore file prevents private project documents from being uploaded to GitHub.
Accessibility
Accessibility was improved by adding labels to form fields, clear error messages and visible keyboard focus indicators. The navigation menu, gallery and other interactive elements can also be operated using a keyboard.
Running and deployment
The website can be opened directly through index.html or using the Live Server extension in Visual Studio Code. The map requires an internet connection.

The website is hosted using GitHub Pages. All five pages were checked using the live website after deployment.

Changelog
Part 3 – Improvements based on Part 2 feedback
The previous submission received 89/100. The following changes were made based on the feedback:
Feedback	Improvements made
Navigation did not work well on smaller screens.	Added a responsive hamburger menu with keyboard controls.
Text did not resize properly.	Used CSS clamp() and additional breakpoints to improve text scaling.
Fonts were inconsistent.	Added Google Fonts and standardised heading styles.
Changelog lacked detail.	Added descriptions of the changes, affected files and reasons.
Some page layouts were incorrect.	Fixed the product layout, founder image placement and footer styling.

Section 2 – JavaScript functionality
A shared JavaScript file was created to manage navigation, products, dialogs, the FAQ accordion, gallery, maps and forms.

The services page now displays products dynamically and includes search, filtering, sorting and a product details modal. A six-image gallery was added to the About page.

The Google Maps iframes were replaced with interactive Leaflet maps showing the farm and central store.
Section 3 – SEO improvements
SEO features were added across all five pages, including unique titles, descriptions, keywords and social media metadata.

Image names and alt text were improved, while image dimensions and lazy loading were added. Internal links were also included to make navigation easier.

A sitemap and robots.txt file were created, and structured data was added to the home and contact pages.
Section 4 – Forms and validation
The enquiry form was redesigned to collect customer details, product choices, quantities and collection or delivery preferences.

JavaScript validation was added to check the information entered and display errors where necessary. Customers can also receive a price estimate and availability message.

The contact page now includes a message form with input validation, a character counter and a consent checkbox. Messages are prepared as emails that customers can send through their email application.

references
Agafonkin, V. 2023 Leaflet: an open-source JavaScript library for mobile-friendly interactive maps. Available at: https://leafletjs.com/ Accessed: 22 October 2026.

Anthropic 2026 Claude [AI assistant]. Available at: https://claude.ai Accessed: 29 October 2026. (Used for coding help and explanations. Follow your institution's rules for declaring AI use.)

Formspree 2026 Formspree documentation. Available at: https://formspree.io Accessed: 19 October 2026.

GitHub 2026 GitHub Pages documentation. Available at: https://docs.github.com/en/pages Accessed: 29 October 2026.

Google 2026 Google Fonts: Montserrat and Open Sans. Available at: https://fonts.google.com/ Accessed: 29 October 2026.

Google 2026 Search Engine Optimization (SEO) starter guide. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide Accessed: 27 October 2026.

Mozilla ,2026 The Dialog element and CSS clamp(). MDN Web Docs. Available at: https://developer.mozilla.org/ Accessed: 29 October 2026.

OpenStreetMap contributors 2026 OpenStreetMap. Available at: https://www.openstreetmap.org/copyright Accessed: 29 October 2026.

Sitemaps.org 2026 Sitemaps XML format. Available at: https://www.sitemaps.org/protocol.html Accessed: 28 October 2026.

W3C Web Accessibility Initiative (2026) ARIA Authoring Practices Guide: Accordion pattern. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ Accessed: 29 October 2026.
