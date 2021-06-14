# Velocity
Building mathematical functions and software to visualize and understand market behavior between crypto securities.

## Problem Statement:
Presently, there is a great deal of confusion regarding crypto assets. Are they speculative in nature, or do they hold intrinsic utility beyond trading? The goal of this application will be to provide an easy-to-understand data portal for individuals to better understand crypto assets. In particular, we can think of the Velocity of Money as being a fundamental indicator of the intrinsic value of a currency. In words, the velocity of money is the productive capacity of money divided by its current monetary supply (i.e. GDP divided by the amount of money presently in circulation). For cryptocurrencies, we can think of this as analogous to the current market capitalization of the crypto currency divided by its total volume in circulation. 
## App Title: Velocity
## App description: 
The purpose of this application is to enable the user to select a crypto asset and return four key metrics: the coin’s current price, its 24-hour price change, its velocity, and its social score. The user will then be able to compare this value with metrics from a different coin side by side.
## API: LunarCrush API
## API Snippet: 
![API Call](/images/API-example.png)


## Wireframe:
### Web Application
![Wireframe Web Home](/images/wireframe-homepage.png)
![Wireframe Web About](/images/wireframe-about-page.png)
### Mobile Application
![Wireframe Mobile Home](/images/wireframe-mobile-home.png)
![Wireframe Mobile About](/images/wireframe-mobile-about.png)

## MVP:
1. Two HTML pages, one primary page and another about page
2. Primary content should include a header, a navigation tag with two elements, two input bars with submit buttons, and divs containing img tags and p tags
3. The About Page needs a header, a navigation bar, and two divs outlining ‘What is Velocity? And ‘About Me’.
4. CSS page to style both sheets
5. Both pages will have dark blue / purple backgrounds with white text. The main layout will be a grid with two columns and five rows.
### JavaScript page with the following functionality:
6. Enables user to interactive with page, including input and submit button
7. Calls LunarCrush API via Axios
8. Calculates velocity of money and 24-hour price change  using simple mathematical operators
9. Sets elements inner text equal to the value of the API call and the velocity of money for each call
10. Upon submitting a new request, delete the old inner text and replace it with the new inner text
## Post-MVP:
1. Build in more advanced mathematical functions to enable users to understand and compare concepts including volatility of price change over time period T, volatility of social velocity over time period T, and volatility of velocity over time period T.
2. Build in options to allow users to compare and contrast different APIs for cryptocurrency to understand / gauge how accurate the information is
3. Make the website responsive to various screen sizes → maximize accessibility
## Project Schedule:
1. June 7th: Prompt / Wireframes / Priority Matrix / Timeframes → Complete
2. June 8th: Project Approval + Core HTML, 15% CSS (just enough to give it reasonable styling)
3. June 9th: Build in API calls to Javascript, define mathematical functions, and create initial clickable model
4. June 10th: MVP
5. June 11th: Post-MVP + Deployment
6. June 12th: CSS Styling + Practice Project Presentation
7. June 13th: CSS Styling + Practice Project Presentation
8. June 14th: Project Presentation
## Priority Matrix:
![Priority Matrix](/images/priority-matrix.png)

## Timeframes: 
![Timeframe](/images/timeframe-new.png)



