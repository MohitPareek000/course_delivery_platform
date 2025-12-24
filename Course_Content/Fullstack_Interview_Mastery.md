
Course Type: role-specific
 Role: Full Stack Developer
 Course Title: Full Stack Interview Mastery
Course Description:
 A comprehensive interview-focused full stack curriculum covering HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. The course emphasizes strong fundamentals, low-level design thinking, and machine coding readiness aligned with real-world interview expectations at product-based companies.

Module 1
Title: LLD1: HTML & CSS Foundations
 Description: Build strong frontend foundations by mastering semantic HTML, CSS core concepts, layout systems, responsive design, and UI-focused machine coding patterns.
 Order: 1
Learning Outcomes:
Write accessible and semantic HTML


Understand browser rendering and CSS fundamentals


Build responsive layouts using modern CSS techniques


Solve UI-focused machine coding problems



Topic 1.1
Title: HTML Foundations
 Order: 1
Class 1.1.1
Title: Semantic HTML
 Description: Learn how to structure HTML using semantic elements for accessibility, SEO, and maintainability.
 Content Type: Text
 Duration: 420
 Order: 1
Text Content: 
# Semantic HTML

## What is Semantic HTML?

Semantic HTML means using elements that describe their meaning and purpose clearly to both the browser and the developer.

Examples:  
`<header>`~, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`

A semantic element answers the question:

> “What role does this content play in the page?”

---

## Non-semantic example

```html
<div id="top"></div>
```

## Semantic example

```html
<header></header>
```

---

## Why Semantic HTML Matters

### Accessibility

Screen readers use semantic structure to announce content meaningfully.

For example:
- `<nav>` indicates navigation links
- `<main>` declares central content

---

### SEO

Search engines prioritize well-structured documents.

Semantic sections help crawlers understand:
- Hierarchy
- Relevance

---

### Maintainability

Developers understand layout faster when markup directly reflects purpose.

---

### Browser Behavior

Certain tags come with built-in roles, tab ordering, and ARIA defaults.

---

## Common Semantic Elements

### Structural Elements

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<aside>`
- `<footer>`

---

### Text-Level Semantics

- `<strong>` (indicates importance)
- `<em>` (emphasis)
- `<time>` (date/time)
- `<mark>` (highlighting)
- `<code>` (computer code)

---

### Media Semantics

- `<figure>`
- `<figcaption>`

---

## When to Use `<section>` vs `<article>`

### `<section>`

Use for grouping related content under a theme.  
Cannot stand alone outside the page context.

---

### `<article>`

Represents a complete, independent piece of content.  
Examples: blog post, forum thread, news article.

**Interview rule of thumb:**  
If the content can be syndicated independently → use `<article>`.

---

## Page Layout Example

```html
<header>
  <nav>...</nav>
</header>

<main>
  <section>
    <article>
      <h1>Title</h1>
      <p>Content...</p>
    </article>
  </section>
</main>

<footer></footer>
```

---

## Common Interview Questions

- What is semantic HTML and why is it used?
- Difference between `<section>` and `<div>`?
- When do you use `<article>` vs `<section>`?
- How does semantic HTML help SEO and accessibility?
- Why should you avoid overusing `<div>`?

---

## Quick Practice

Convert the following non-semantic structure into a semantic one:

```html
<div class="top"></div>
<div class="content"></div>
<div class="bottom"></div>
```

### Expected transformation

```html
<header></header>
<main></main>
<footer></footer>
```

---

## Questions

255804, 255805, 255806, 259490

Class 1.1.2
Title: Forms & Inputs
 Description: Understand form semantics, input types, validation, and accessibility considerations.
 Content Type: Text
 Duration: 480
 Order: 2
Text Content: 

# Forms and Input Types

## Overview

Forms are the primary way web applications capture user input. A well-structured form improves accessibility, prevents errors, and simplifies client-side and server-side handling.

Interview questions often focus on form attributes, input types, validation, and browser defaults.

---

## Basic Form Structure

```html
<form action="/submit" method="post">
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required>
  <button type="submit">Submit</button>
</form>
```

### Key characteristics

- Everything inside `<form>` is submitted together.
- `action` defines where the data is sent.
- `method` defines how data is sent (`GET` or `POST`).
- Inputs must have a `name` attribute for data to be captured.

---

## Common Form Attributes

### 1. `method`

- `GET` → Appends data to URL (safe, used for search, filters)
- `POST` → Sends data in body (used for sensitive data)

### 2. `action`

Defines the endpoint to which the form submits.

### 3. `autocomplete`

```html
autocomplete="on"
autocomplete="off"
```

Controls browser autofill behavior.

### 4. `novalidate`

Skips HTML5 validation.

```html
<form novalidate>
```

---

## Input Types (Interview-Focused List)

### 1. Text Inputs

```html
type="text"
type="password"
type="email"
type="number"
type="tel"
type="url"
```

### 2. Date & Time

```html
type="date"
type="time"
type="datetime-local"
type="month"
type="week"
```

### 3. Choosers

```html
type="checkbox"
type="radio"
type="range"
type="color"
```

**Important note:**  
Radio buttons become mutually exclusive when they share the same `name`.

### 4. File Uploads

```html
<input type="file" multiple accept="image/*">
```

**Key attributes**

- `multiple` allows multiple file selection.
- `accept` restricts file type.

### 5. Hidden Field

```html
<input type="hidden" name="token" value="123">
```

Used for CSRF tokens, flags, metadata.

---

## Select, Textarea, and Labels

### Select

```html
<select name="country">
  <option value="in">India</option>
  <option value="us">USA</option>
</select>
```

### Textarea

```html
<textarea rows="4"></textarea>
```

### Label

Always connect a label to input for accessibility.

```html
<label for="email"></label>
<input id="email" ... >
```

---

## Required & Built-In Validation

HTML5 includes default validation:

```html
<input type="email" required>
<input type="number" min="1" max="10">
<input type="text" pattern="[A-Za-z]+">
```

- `required` ensures the field is not empty.
- `min` and `max` restrict numeric range.
- `pattern` enforces regex validation.

---

## Form Submission Buttons

### Types of buttons

```html
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<button type="button">Click</button>
```

If `type` is omitted, default is `submit`.

---

## Preventing Default

In JavaScript-based apps:

```js
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
```

---

## `enctype` (for file uploads)

```html
<form method="POST" enctype="multipart/form-data">
```

Required whenever files are submitted.

---

## GET vs POST (Common Interview Question)

| Feature | GET | POST |
|------|-----|------|
| Data visible in URL? | Yes | No |
| Data length limit? | Yes | No practical limit |
| Cacheable? | Yes | No |
| Idempotent? | Yes | Depends |
| Used for sensitive data? | No | Yes |

---

## Common Interview Questions

- What are different input types in HTML5?
- How does browser validation work?
- Why must inputs have a `name` attribute?
- Difference between `<button>` and `<input type="submit">`?
- What does `enctype="multipart/form-data"` do?
- How do radio buttons work under the same name?

---

## Quick Practice

Given this HTML, fix the accessibility issues:

```html
<div>
  <input type="text">
</div>
```

### Improved version

```html
<label for="username">Username</label>
<input id="username" type="text" name="username">
```

---

## Questions

51348, 51359, 238698, 268795, 191209

Class 1.1.3
Title: Critical Rendering Path
 Description: Learn how browsers parse HTML, CSS, and JavaScript to render pages efficiently.
 Content Type: Text
 Duration: 600
 Order: 3
Text Content: 


# How the Browser Renders a Page

## Overview

The Critical Rendering Path (CRP) describes the sequence of steps a browser takes to convert HTML, CSS, and JavaScript into pixels on the screen.

Interviewers test this to check whether a developer understands performance, reflow costs, and why certain patterns make pages slow.

The browser performs these major steps:

- Parse HTML → Build the DOM  
- Parse CSS → Build the CSSOM  
- Combine DOM + CSSOM → Build the Render Tree  
- Compute Layout  
- Paint  
- Composite layers  

Understanding each step helps diagnose and optimize rendering performance.

---

## Step 1: DOM Construction

The browser reads HTML from top to bottom and converts it into the Document Object Model (DOM).

### Example HTML

```html
<body>
  <p>Hello</p>
</body>
```

Converted into a node tree:

- Document  
  - html  
    - body  
      - p  

**Important:**

- Blocked by invalid markup  
- Blocked by external scripts (`<script>` without `defer` or `async`)

---

## Step 2: CSSOM Construction

CSS is parsed separately into the CSS Object Model (CSSOM).

### Example CSS

```css
p {
  color: black;
}
```

Becomes a structured set of rules with selectors, properties, and values.

**Important:**

- CSS parsing is render-blocking  
- The browser cannot render anything until CSS is downloaded and parsed  
- More CSS means longer CSSOM build time  

---

## Step 3: Render Tree Construction

DOM + CSSOM are combined to form the Render Tree, which represents the visual structure of the page.

**Render Tree excludes:**

- Elements with `display: none`
- Elements not affecting layout (e.g., `<script>`)

**Includes:**

- Every visible element  
- Their computed styles  

### Example

DOM:

```html
<p>Hello</p>
```

CSSOM:

```css
p { color: black; }
```

Render Tree node:

```
RenderParagraph(color=black)
```

---

## Step 4: Layout (Reflow)

The browser determines the exact size and position of each element.

**Key outcomes:**

- Width  
- Height  
- Position relative to viewport  

Layout depends on:

- Box model  
- Display type  
- Positioning  
- Flexbox/Grid calculations  

**Expensive operations:**

- Changing layout-affecting properties  
- Adding/removing DOM nodes  
- Computing layout in deeply nested structures  

This stage is also called **reflow**.

---

## Step 5: Paint

The browser fills pixels: colors, borders, shadows, text, images.

**Examples of paint operations:**

- Drawing text  
- Filling backgrounds  
- Applying box-shadows  
- Rendering images  

Paint is less expensive than layout but can still be heavy for complex UI.

---

## Step 6: Compositing

Modern browsers break the page into layers (e.g., fixed headers, animated elements).  
The GPU composites these layers into the final frame.

Certain CSS properties create new layers:

- `transform`
- `opacity`
- `will-change`

Creating too many layers increases memory usage; too few slows animations.

---

## Why JavaScript Can Block Rendering

JavaScript can block DOM construction if it:

- Appears without `defer` / `async`
- Modifies DOM while it's being parsed
- Requests synchronous layout information (e.g., `offsetHeight`)

JS can also cause layout thrashing:

```js
element.style.width = "200px";
console.log(element.offsetWidth);   // forces layout

element.style.width = "300px";
console.log(element.offsetWidth);   // forces layout
```

This forces the browser to recalculate layout repeatedly.

---

## Summary Table

| Stage | Output | Notes |
|------|-------|-------|
| DOM | Structure of HTML | Blocked by JS |
| CSSOM | Structure of CSS | CSS is render-blocking |
| Render Tree | Visible DOM + computed styles | Excludes `display: none` |
| Layout (Reflow) | Size & position | Expensive |
| Paint | Pixels | Heavy for shadows, gradients |
| Composite | Merge layers | GPU optimized |

---

## Common Interview Questions

- What are the steps of the Critical Rendering Path?
- Why is CSS render-blocking?
- Difference between reflow and repaint.
- Why does reading layout information (`offsetWidth`) cost performance?
- What properties trigger layout vs paint vs composite?
- How do `defer` and `async` affect CRP?

---

## Quick Practice

Identify which operations trigger reflow:

- Changing width  
- Changing background-color  
- Accessing `scrollHeight`  
- Changing `transform: scale(1.2)`

### Answers

- **1 and 3** trigger reflow  
- **2** triggers paint  
- **4** triggers composite only




Topic 1.2
Title: CSS Core Concepts
 Order: 2
Class 1.2.1
Title: Box Model, Display & Position
 Description: Master the CSS box model and positioning schemes used in real-world layouts.
 Content Type: Text
 Duration: 720
 Order: 1
Text Content: 


# Box Model, Display, and Position

## Overview

Every element on a page is represented as a box.  
Understanding how its size, space, and placement are determined is foundational for layout, debugging, and interview LLD tasks.

This topic covers three pillars of CSS layout:

- The Box Model – how size is calculated  
- Display – how the box participates in layout  
- Position – how the box is placed relative to others  

These three concepts drive almost every UI implementation.

---

## 1. The CSS Box Model

Every element’s rectangular box consists of:

### Box Model Components

- **Content** — text or media inside the box  
- **Padding** — space between content and border  
- **Border** — outline around the padding  
- **Margin** — space outside the border, separating this element from others  

### Size Calculation (Standard Model)

Total Width = content + padding + border + margin  
Total Height = content + padding + border + margin  

---

### `box-sizing` (Very Important for Interviews)

Default:

```css
box-sizing: content-box;
```

In this model, padding and border increase total size.

Modern layouts typically use:

```css
box-sizing: border-box;
```

Here, padding and border are included inside the declared width and height.

**Why developers prefer `border-box`:**  
It simplifies layout math and reduces overflow bugs.

---

## 2. Display Types

The `display` property determines how an element participates in normal flow.  
Most interview layout problems boil down to display behavior.

### a) `display: block`

- Takes full width of container  
- Starts on a new line  
- Supports width and height  

Examples: `div`, `section`, `p`, `h1`

---

### b) `display: inline`

- Flows within a line  
- Cannot set width or height  
- Respects only horizontal padding and margin  

Examples: `span`, `strong`, `em`

---

### c) `display: inline-block`

- Flows inline  
- Supports width and height  
- Useful for aligning small boxes in a line  

---

### d) `display: none`

- Removed from layout (not in render tree)  
- Does not occupy any space  

---

### e) `display: flex` and `display: grid`

Covered fully in later modules.  
Key point: they create new formatting contexts.

---

### f) Formatting Contexts (Interview Angle)

Certain display types create layout contexts:

- Block formatting context (BFC)  
- Inline formatting context  
- Flex formatting context  
- Grid formatting context  

A BFC is created by elements with:

```css
overflow: hidden;
display: flow-root;
float: left;
float: right;
position: absolute;
position: fixed;
```

Used to contain floats, prevent margin collapse, and isolate layout.

---

## 3. Position Property

`position` controls how an element is placed in the layout.  
This affects stacking, flow, and offset behavior.

### a) `position: static`

- Default  
- No offset (`top`, `left`) works  
- Participates in normal flow  

---

### b) `position: relative`

- Stays in normal flow  
- Shifts visually using offsets  
- Space in the layout is preserved  

Used commonly for:
- Anchoring absolutely positioned children  
- Minor visual adjustments  

---

### c) `position: absolute`

- Removed from flow  
- Positioned relative to nearest ancestor with a non-static position  
- Otherwise positioned relative to the document  

Key behavior:

Parent with `position: relative` → absolute child is placed inside it.

---

### d) `position: fixed`

- Sticks to viewport  
- Does not move when scrolled  

Used for navbars, modals, floating buttons.

---

### e) `position: sticky`

Hybrid of relative and fixed.

```css
position: sticky;
top: 0;
```

Acts relative until a threshold, then acts fixed.  
Used for sticky headers.

---

## Margin Collapsing (Frequently Asked Interview Concept)

Adjacent vertical margins collapse into a single margin.

### Cases where margins collapse

- Parent and first/last child  
- Two siblings  
- Empty block with no padding or border  

### Margins do not collapse when

- Elements are inline-block, flex, or grid  
- Parent has padding or border  
- Parent is a block formatting context (BFC)  

Example:

```css
div { margin-top: 20px; }
p { margin-top: 10px; }
```

Effective margin = `20px` (not `30px`)

---

## How Positioning Affects Flow

- Static and relative → participate in normal flow  
- Absolute and fixed → removed from flow  
- Sticky → dynamic participation  

Flow affects:

- Stacking context  
- Reflow boundaries  
- Overlapping behavior  

---

## Quick Comparisons

### Relative vs Absolute

| Feature | Relative | Absolute |
|------|---------|---------|
| In normal flow? | Yes | No |
| Offsets | Move visually | Set actual position |
| Base coordinate | Itself | Nearest positioned ancestor |
| Use case | Small nudge | Overlays, tooltips |

---

## Common Interview Questions

- Explain the CSS box model  
- Difference between `content-box` and `border-box`  
- Difference between inline, block, and inline-block  
- How does margin collapsing work?  
- Explain relative vs absolute vs fixed vs sticky positioning  
- How does an absolutely positioned element find its reference point?  
- What creates a new block formatting context?

---

## Quick Practice

Given:

```css
div {
  width: 200px;
  padding: 20px;
  border: 5px solid;
  box-sizing: content-box;
}
```

Total width = `200 + 40 + 10 = 250px`

---

In this structure:

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 10px;
  left: 20px;
}
```

Where will `.child` be placed?  
Answer: `10px / 20px` from the `.parent`’s top-left corner.

---

Predict margin behavior:

```css
h1 { margin-bottom: 30px; }
p  { margin-top: 10px; }
```

Effective space = `30px`

---

## Questions

256345, 256342, 255807, 76090, 51500, 51387


Class 1.2.2
Title: Cascade, Specificity & Inheritance
 Description: Understand how CSS rules are resolved and applied in complex stylesheets.
 Content Type: Text
 Duration: 900
 Order: 2
Text Content: 


# Specificity, Cascade, and Inheritance

## Overview

When multiple CSS rules apply to the same element, the browser must decide which one wins.  
This decision is governed by three concepts:

- Specificity  
- Cascade  
- Inheritance  

A strong understanding of these is necessary for debugging layout issues, writing predictable CSS, and clearing interview rounds confidently.

---

## 1. Specificity

Specificity determines the strength of a CSS selector.  
Each selector is assigned a numeric score in the format:

```
(a, b, c, d)
```

- **a** = inline styles  
- **b** = IDs  
- **c** = classes, pseudo-classes, attributes  
- **d** = tags, pseudo-elements  

Higher numbers take priority.  
Comparison starts from left to right.

---

### Selector Scores

| Selector Type | Score |
|---------------|-------|
| Inline styles | (1, 0, 0, 0) |
| ID selector | (0, 1, 0, 0) |
| Class selector | (0, 0, 1, 0) |
| Attribute selector | (0, 0, 1, 0) |
| Pseudo-class (`:hover`, `:focus`) | (0, 0, 1, 0) |
| Tag selector | (0, 0, 0, 1) |
| Pseudo-element (`::before`) | (0, 0, 0, 1) |

---

### Examples

#### Example 1

```css
p { color: blue; }                /* (0,0,0,1) */
.text { color: red; }             /* (0,0,1,0) */
#intro { color: green; }          /* (0,1,0,0) */
```

Winner for:

```html
<p id="intro" class="text"></p>
```

Final color: **green**

---

#### Example 2: Combining selectors

```css
ul.menu li.item a:hover { color: orange; }
```

Specificity:
- Tag selectors: 3  
- Class selectors: 2  
- Pseudo-class: 1  

Score = **(0, 0, 3, 3)**

---

#### Example 3: Inline styles

```html
<div style="color: black"></div>
```

Score = **(1, 0, 0, 0)**  
Inline styles beat all normal selectors.

---

#### Common Confusion Example

```css
#header p { color: red; }            /* (0,1,0,1) */
.content .text p { color: blue; }   /* (0,0,2,1) */
```

Even though the second looks more complex, the first wins because IDs are more powerful than multiple classes.

---

## 2. The Cascade

The cascade determines the final result when specificity scores are equal.

The browser follows this order:

1. Importance  
2. Specificity  
3. Source order (later wins)

---

### 1. Importance

```css
p { color: blue !important; }
```

`!important` overrides specificity.  
Although it should be avoided in real codebases, interviewers expect you to understand its effect.

---

### 2. Specificity

Already covered above.

---

### 3. Source Order

If two selectors have equal specificity, the one that appears later in the stylesheet wins.

Example:

```css
p { color: red; }
p { color: blue; }
```

Final color: **blue**

Example with identical specificity but different order:

```css
.text p { color: black; }    /* earlier */
.text p { color: brown; }    /* later */
```

Final result: **brown**

---

## 3. Inheritance

Some CSS properties are naturally inherited from parent to child.  
Some are not.

---

### Properties That Inherit

- color  
- font-family  
- font-size  
- line-height  
- visibility  
- text-align  

Example:

```css
div {
  color: red;
}

p {
  /* no color defined */
}
```

`<p>` will get color red from the `div`.

---

### Properties That Do Not Inherit

- margin  
- padding  
- border  
- background  
- width  
- height  
- position  

This is why defining margin on a parent does not apply to children automatically.

---

### Forcing Inheritance Manually

```css
p {
  color: inherit;
}
```

---

### Reverting to Default

```css
p {
  color: initial;
}
```

---

### Matching Parent Explicitly

```css
p {
  color: inherit;
}
```

---

## 4. Putting All Three Concepts Together

### Example 1

```html
<div id="box" class="card primary">
  <p>Hello</p>
</div>
```

```css
p { color: black; }                      /* (0,0,0,1) */
.card p { color: red; }                  /* (0,0,1,1) */
.primary p { color: blue; }              /* (0,0,1,1) */
#box p { color: green; }                 /* (0,1,0,1) */
```

Final color: **green**  
Reason: ID selector wins.

---

### Example 2: Cascade After Specificity Tie

```css
.text { color: red; }     /* earlier */
.text { color: blue; }    /* later */
```

Final color: **blue**

---

### Example 3: Inheritance Conflict

```html
<div class="wrapper">
  <p>Hello</p>
</div>
```

```css
.wrapper { color: brown; }
p { color: black; }
```

Final color: **black**  
Reason: Direct rule overrides inherited value.

---

### Example 4: Cascade vs Specificity vs Important

```css
p { color: red !important; }
#intro { color: blue; }
.intro-text { color: green; }
```

```html
<p id="intro" class="intro-text">Text</p>
```

Final color: **red**

---

## 5. Common Interview Questions

- Explain CSS specificity with examples  
- How does the cascade decide the final applied rule?  
- What is the specificity of `#id .class p`?  
- What properties are inherited by default?  
- How do you override inherited properties?  
- When does source order matter?  
- What is the difference between `inherit`, `initial`, and `unset`?  
- Why is `!important` considered harmful?

---

## 6. Quick Practice

### Predict the color

```css
p { color: black; }
div p { color: blue; }
#container p { color: green; }
p { color: orange !important; }
```

Final color: **orange**

---

### Predict Specificity Order (Highest → Lowest)

a. `#hero .title p`  
b. `.title p`  
c. `p`  
d. `div#hero p.title`

Specificity:

- `div#hero p.title` = (0,1,1,2)  
- `#hero .title p` = (0,1,1,1)  
- `.title p` = (0,0,1,1)  
- `p` = (0,0,0,1)  

---

### Will Color Inherit?

```html
<div style="color: brown">
  <span>Hello</span>
</div>
```

Answer: **Yes**, spans inherit color by default.

---

## Questions

257586, 257582, 255812, 51368, 51985, 51986

Topic 1.3
Title: Layout Systems
 Order: 3
Class 1.3.1
Title: Flexbox
 Description: Build one-dimensional layouts using Flexbox with practical patterns.
 Content Type: Text
 Duration: 1200
 Order: 1
Text Content : 


# Flexbox Deep Dive

## Overview

Flexbox is a one-dimensional layout system that makes it easy to arrange elements in a row or column.

It excels at spacing, alignment, centering, and responsive components.

Frontend interviews commonly test Flexbox through layout reasoning, card alignment questions, and LLD machine coding questions.

Flexbox is based on two main components:

- The Flex Container  
- The Flex Items  

---

## 1. The Flex Container

To activate Flexbox:

```css
.container {
  display: flex;
}
```

The moment a container becomes flex, its children become flex items and follow Flexbox rules.

---

## Main Axis and Cross Axis

This is the most important Flexbox concept.

```css
flex-direction: row;      /* main axis is horizontal */
flex-direction: column;   /* main axis is vertical */
```

The cross axis is always perpendicular to the main axis.

### flex-direction values

- `row` – left to right  
- `row-reverse` – right to left  
- `column` – top to bottom  
- `column-reverse` – bottom to top  

Example:

```css
.container {
  display: flex;
  flex-direction: row;
}
```

Items line up horizontally.

---

## 2. justify-content (along the main axis)

Controls how space is distributed along the main axis.

- `flex-start` – items packed at start  
- `center` – centered  
- `flex-end` – items packed at end  
- `space-between` – even gaps, edges tight  
- `space-around` – equal space around each item  
- `space-evenly` – equal space between all items including edges  

Example:

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

---

## 3. align-items (along the cross axis)

Controls how items line up perpendicular to the main axis.

- `flex-start`  
- `center`  
- `flex-end`  
- `stretch` (default)  
- `baseline`  

Example:

```css
.container {
  display: flex;
  align-items: center;
}
```

---

## 4. Flex Wrap

By default, flex items do not wrap.

- `nowrap` – default  
- `wrap` – items wrap to next line  
- `wrap-reverse`  

Useful for responsive card layouts.

Example:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
```

---

## 5. Flex Shorthand Properties (Very Important for Interviews)

Each flex item controls how it grows, shrinks, and sets its base width.

```css
flex-grow: number;
flex-shrink: number;
flex-basis: length | auto;
```

### flex-grow

Defines how items take up extra space.

```css
.item1 { flex-grow: 1; }
.item2 { flex-grow: 2; }
```

Item2 will get twice as much extra space as item1.

---

### flex-shrink

Defines how items shrink when space is insufficient.

- `flex-shrink: 0` – do not shrink  
- `flex-shrink: 1` – default  

---

### flex-basis

Defines the starting size before space distribution.

```css
flex-basis: 200px;
```

Often used for card widths.

---

### flex shorthand

```css
flex: grow shrink basis;
```

Examples:

```css
flex: 1;            /* 1 1 0 */
flex: 0 0 auto;
flex: 2 1 200px;
```

---

## 6. align-content (Multi-line Flex Containers)

Only applies when items wrap into multiple lines.

- `flex-start`  
- `center`  
- `space-between`  
- `space-around`  
- `stretch`  

---

## 7. Common Interview Patterns

### A. Perfect Centering

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

### B. Evenly Spaced Navigation Menu

```css
nav {
  display: flex;
  justify-content: space-between;
}
```

---

### C. Fixed Sidebar with Fluid Content

```css
.layout {
  display: flex;
}

.sidebar {
  flex: 0 0 250px;
}

.content {
  flex: 1;
}
```

---

### D. Responsive Cards

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 200px;
}
```

---

### E. Prevent Item from Shrinking

```css
.item {
  flex-shrink: 0;
}
```

---

## 8. Flex Item Order

You can reorder items without changing HTML.

```css
.item {
  order: 2;
}

.item.special {
  order: 1;
}
```

This affects only visual order, not DOM order.

---

## 9. Flexbox vs Grid (Interview Summary)

| Feature | Flexbox | Grid |
|------|--------|------|
| Axis | One dimensional | Two dimensional |
| Best for | Navigation, alignment, small layouts | Complex page and card layouts |
| Content driven | Yes | No (structure driven) |

---

## 10. Common Interview Questions

- Explain main axis and cross axis  
- Difference between `justify-content` and `align-items`  
- What does `flex: 1` mean  
- What is the `order` property  
- How do you prevent an item from shrinking  
- Why does `flex-wrap` matter for responsive design  
- How does `flex-basis` differ from `width`  
- Explain `flex-grow` with an example  

---

## 11. Quick Practice

### What is the final distribution?

```css
.item1 { flex-grow: 1; }
.item2 { flex-grow: 3; }
```

Item2 gets three times more space.

---

### Concept Check

In a row direction, what does `align-items` control?  
Answer: Vertical alignment (cross axis).

---

### Layout Challenge

Create a layout where the last item is always pushed to the right.

```css
.container {
  display: flex;
}

.spacer {
  flex: 1;
}
```

---

## Questions

256355, 256352, 58580, 58579


Class 1.3.2
Title: Grid
 Description: Create two-dimensional layouts using CSS Grid for modern UIs.
 Content Type: Text
 Duration: 1350
 Order: 2
Text Content: 


# CSS Grid Deep Dive

## Overview

CSS Grid is a two-dimensional layout system that allows you to control rows and columns simultaneously.

It is ideal for complex page layouts, dashboards, cards, galleries, and responsive UIs.

Most interview tasks that require multi-row or multi-column alignment are solved cleanly using Grid.

Flexbox is one dimensional.  
Grid is two dimensional.  
That is the core difference.

---

## 1. Enabling Grid

To activate Grid:

```css
.container {
  display: grid;
}
```

The container becomes a grid context.  
Children become grid items.

---

## 2. Defining Rows and Columns

### grid-template-columns

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

Creates 3 fixed columns.

Using fr units (fractional space):

```css
grid-template-columns: 1fr 2fr;
```

Column 2 gets twice the space of column 1.

Responsive example:

```css
grid-template-columns: repeat(3, 1fr);
```

Creates 3 equal columns.

---

### grid-template-rows

Same concept for rows.

```css
grid-template-rows: 100px auto 150px;
```

---

## 3. Grid Gap

```css
gap: 16px;          /* shorthand */
row-gap: 10px;
column-gap: 20px;
```

Gap is preferred over using margins on grid items because it does not affect outer boundaries.

---

## 4. Implicit vs Explicit Grid

### Explicit Grid

Defined via `grid-template-columns` or `grid-template-rows`.

### Implicit Grid

Created when items overflow defined tracks.

Example:

```css
grid-template-columns: 200px 200px;
```

If there are 5 items, items 3 to 5 go into the implicit grid.

Control implicit grid sizing:

```css
grid-auto-rows: 100px;
grid-auto-columns: 100px;
```

---

## 5. repeat, auto-fill, auto-fit (Interview Critical)

### repeat syntax

```css
grid-template-columns: repeat(4, 1fr);
```

Creates 4 equal columns.

---

### auto-fill

Fills the row with as many columns as fit the container width, leaving empty tracks if space remains.

```css
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

Behavior: items wrap but empty slots may appear.

---

### auto-fit

Similar to auto-fill but collapses empty tracks, allowing items to stretch.

```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

This is one of the most commonly asked Grid interview topics.

---

## 6. minmax Function

Ensures responsive sizing within a range.

```css
minmax(minimum, maximum)
```

Example:

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

Each card is at least 250px, but can grow to fill available space.

---

## 7. Placing Items on the Grid

### grid-column

```css
.item {
  grid-column: 1 / 3;   /* from line 1 to line 3 */
}
```

### grid-row

```css
.item {
  grid-row: 2 / 4;
}
```

### Spanning

```css
.item {
  grid-column: span 2;
  grid-row: span 3;
}
```

---

### Example: Simple Layout

```css
header {
  grid-column: 1 / -1;   /* spans full width */
}

sidebar {
  grid-column: 1 / 2;
}

content {
  grid-column: 2 / 4;
}
```

---

## 8. Named Areas (High Value for Large Layouts)

Define areas:

```css
grid-template-areas:
  "header header"
  "sidebar content"
  "footer footer";
```

Assign items:

```css
header  { grid-area: header; }
sidebar { grid-area: sidebar; }
content { grid-area: content; }
footer  { grid-area: footer; }
```

Ideal for dashboards or admin panel layouts.

---

## 9. Alignment in Grid

### Item alignment (inside cells)

```css
justify-items: start | center | end | stretch;
align-items: start | center | end | stretch;
```

### Track alignment

```css
justify-content: start | center | space-between;
align-content: center | space-around;
```

---

## 10. Common Interview Layouts

### A. Responsive Card Grid

```css
.container {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

---

### B. Two Column Layout with Fixed Sidebar

```css
.container {
  display: grid;
  grid-template-columns: 250px 1fr;
}
```

---

### C. Full-width Header, Sidebar + Content

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar content";
}
```

---

### D. Masonry-like Layout Using Auto-placement

```css
grid-auto-flow: dense;
```

Fills gaps more tightly.  
Often asked as a trick question: Grid can simulate masonry to an extent.

---

## 11. Grid vs Flexbox (Interview Summary)

| Feature | Grid | Flexbox |
|------|------|--------|
| Dimension | Two dimensional | One dimensional |
| Best for | Complex layouts | Component-level alignment |
| Track control | Yes | No |
| Gaps handling | Natural | Manual or gap |
| Reordering | Yes | Yes |

---

## 12. Common Interview Questions

- What is the difference between grid and flexbox?
- Explain auto-fit vs auto-fill.
- What does minmax allow you to do?
- How does repeat work?
- What is the difference between track alignment and item alignment?
- How do you make a responsive card layout?
- What is an implicit grid?
- How does `grid-auto-flow: dense` work?
- When would you prefer grid over flexbox?

---

## 13. Quick Practice

Predict the number of columns:

```css
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

Answer: As many 200px columns as can fit.  
Remaining space becomes empty tracks.

Predict behavior of auto-fit in the same example.  
Answer: Tracks collapse and items stretch to fill space.

Span an item across an entire row:

```css
.item {
  grid-column: 1 / -1;
}
```
---
## Questions

238699, 51917, 51916
Topic 1.4
Title: Responsive Design
 Order: 4
Class 1.4.1
Title: Media Queries
 Description: Design responsive layouts that adapt across devices and screen sizes.
 Content Type: Text
 Duration: 1300
 Order: 1
Text Content: 


# Responsive Design

## Overview

Responsive design ensures that a layout adapts to different screen sizes such as mobile, tablet, laptop, and large desktops.

This requires understanding:

- CSS units
- Media queries
- Breakpoints
- Fluid layout patterns
- Common responsive interview problems

Interviewers frequently test the ability to reason about layout changes across screen widths.

---

## 1. CSS Units

### Absolute units

- px
- cm
- mm

Do not scale based on viewport.

---

### Relative units

#### 1. em

Relative to the font size of the element itself.

```css
padding: 2em;
```

Based on the element’s own font-size.

---

#### 2. rem

Relative to the root html font size.  
Consistent and preferred.

```css
html { font-size: 16px; }

p { margin-bottom: 1.5rem; }
```

---

#### 3. %

Relative to parent size.

---

#### 4. vh and vw

Viewport height and width.

- 100vh = full screen height
- 100vw = full screen width

---

#### 5. min, max and clamp

Modern responsive units.

```css
font-size: clamp(1rem, 2vw, 2rem);
```

Explanation:  
Minimum 1rem, fluid until max 2rem using viewport width.

---

## 2. Media Queries

Media queries apply CSS rules conditionally based on viewport characteristics.

### Basic syntax

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

Meaning:  
If the screen width is less than or equal to 768px, apply these styles.

---

### Common parameters

- width and height
- orientation
- aspect-ratio
- prefers-color-scheme

---

### max-width vs min-width

#### max-width

Mobile first logic: styles for small screens.

#### min-width

Desktop first logic: styles for large screens.

---

### Best practices

Mobile first approach is now industry standard:

- Write default styles for mobile.
- Add min-width queries for larger screens.

Example:

```css
.card {
  width: 100%;
}

@media (min-width: 768px) {
  .card {
    width: 50%;
  }
}
```

---

## 3. Breakpoints

Breakpoints are specific screen widths where layout changes.

Common values:

- Mobile: 0 to 480px
- Small tablet: 481px to 768px
- Tablet: 769px to 1024px
- Laptop: 1025px to 1440px
- Large screens: 1441px and above

In interviews, reasoning matters more than memorizing numbers.

Example breakpoint usage:

```css
@media (min-width: 600px) {
  .nav {
    display: flex;
  }
}
```

---

## 4. Fluid Layout Patterns (Interview Focus)

### A. Fluid typography

```css
font-size: clamp(1rem, 2vw, 2rem);
```

Useful for headings.

---

### B. Responsive images

```css
img {
  max-width: 100%;
  height: auto;
}
```

---

### C. Percentage based layout

```css
.col {
  width: 50%;
}
```

---

### D. Grid with auto-fit

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

Best approach for responsive card layouts.

---

### E. Flex wrap pattern

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.item {
  flex: 1 1 250px;
}
```

---

## 5. Common Responsive Components

### A. Hamburger menu

Desktop:

```css
.nav-items {
  display: flex;
}

.hamburger {
  display: none;
}
```

Mobile:

```css
@media (max-width: 768px) {
  .nav-items {
    display: none;
  }

  .hamburger {
    display: block;
  }
}
```

---

### B. Responsive two column layout

Default mobile:

```css
.container {
  display: flex;
  flex-direction: column;
}
```

Tablet and above:

```css
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

---

### C. Responsive cards

```css
.container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

---

## 6. How Browsers Handle Layout Changes

When a media query is triggered:

- CSSOM partially updates
- Render tree recalculates
- Layout recalculates
- Paint or composite updates

This is why responsive design must minimize layout thrashing.

---

## 7. Common Interview Questions

- Difference between px, em, rem and vh units.
- Explain mobile first vs desktop first design.
- What is clamp and where is it used.
- How do auto-fit and auto-fill differ.
- Show how to make a responsive navbar.
- What are typical breakpoints and why do they matter.
- How do you create a responsive card layout without media queries.
- How do viewport units help create full screen sections.

---

## 8. Quick Practice

### Question 1

What does this media query represent?

```css
@media (min-width: 1024px)
```

Answer: Apply styles when screen width is 1024px or more (desktop view).

---

### Question 2

Predict the result:

```css
.card {
  width: clamp(200px, 50vw, 400px);
}
```

If viewport width is 600px:

- 50vw = 300px
- Clamped between 200px and 400px  
Final width = 300px

---

### Question 3

Transform this layout to responsive.

Default:

```css
.item {
  width: 300px;
}
```

Make it mobile friendly:

```css
@media (max-width: 480px) {
  .item {
    width: 100%;
  }
}
```
---
## Questions
259489, 59114, 256347
Topic 1.5
Title: Machine Coding UI Patterns
 Order: 5
Class 1.5.1
Title: Centering Techniques
 Description: Explore multiple techniques to center elements in CSS for different scenarios.
 Content Type: Text
 Duration: 600
 Order: 1
Text Content: 


# Centering Techniques

## Overview

Centering is one of the most common requirements in frontend machine coding rounds.  
Interviewers test not only whether you know the correct technique but also if you can pick the most appropriate one for a given layout.

Below are the most stable and modern ways to center elements.

---

## 1. Horizontal Centering

### A. Using margin auto (block elements)

```css
.box {
  width: 200px;
  margin: 0 auto;
}
```

**Requirements:**

- The element must have a defined width.
- The element must be block or `display: block`.

---

### B. Using text-align (for inline or inline-block)

```css
.container {
  text-align: center;
}

.box {
  display: inline-block;
}
```

---

## 2. Vertical Centering

### A. Using Flexbox

```css
.container {
  display: flex;
  align-items: center;
}
```

This vertically centers items along the cross axis.

---

### B. Using line-height (only for single-line text)

```css
.box {
  height: 100px;
  line-height: 100px;
}
```

This works only when text is single-line and height is fixed.

---

## 3. Centering Both Horizontally and Vertically

### A. Flexbox perfect centering (most recommended)

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
```

This is the modern standard and the expected approach in interviews.

---

### B. Grid perfect centering

```css
.container {
  display: grid;
  place-items: center;
  height: 300px;
}
```

Very clean and readable.

---

### C. Position plus transform

Works even without flex or grid.

```css
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

This centers the element based on its own dimensions.

---

## 4. Centering Text Inside a Box

```css
.box {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 5. Common Interview Traps

### Trap 1: Using margin auto without width

Auto margins require defined width for centering.

---

### Trap 2: Using line-height for multi-line text

This breaks as soon as content wraps.

---

### Trap 3: Forgetting that justify-content and align-items depend on direction

In a column flex container:

- `justify-content` controls vertical alignment
- `align-items` controls horizontal alignment

---

## 6. Quick Practice

### Question 1

Center a login card both horizontally and vertically in the viewport using the simplest modern method.

**Solution:**

```css
body {
  margin: 0;
  height: 100vh;
  display: grid;
  place-items: center;
}

.card {
  width: 300px;
  padding: 20px;
  background: white;
}
```

---

### Question 2

Center an inline-block element inside a div.

```css
.container {
  text-align: center;
}

.box {
  display: inline-block;
}
```

---

### Question 3

Center a loader using position.

```css
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

---
## Questions
256353, 256346

Class 1.5.2
Title: Responsive Cards
 Description: Build responsive card layouts commonly asked in UI machine coding rounds.
 Content Type: Text
 Duration: 700
 Order: 2
Text Content: 


# Responsive Card Layouts

## Overview

Responsive card layouts appear in almost every frontend machine coding round.  
Interviewers want to see clean, modern CSS solutions that work across screen sizes without complicated media queries.

This class covers the three most reliable ways to build responsive cards:

- Grid with auto-fit and minmax  
- Flexbox with wrap  
- Percentage and mobile-first layouts  

---

## 1. The Best Modern Pattern: Grid with auto-fit and minmax

This is the most expected solution in interviews.

```css
.cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
  background: white;
  padding: 16px;
  border-radius: 8px;
}
```

### Why this pattern is ideal

- Cards shrink until 250px width  
- After that, they wrap to a new row  
- Columns expand fluidly using 1fr  
- No media queries required  
- Works for any number of cards  

### Behavior across devices

- Mobile: 1 card per row  
- Tablet: 2 cards per row  
- Desktop: 3 or 4 depending on width  

This is the most recommended solution for revision.

---

## 2. Flexbox Responsive Cards (Wrap-based Layout)

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 250px;
}
```

### Explanation

The shorthand `flex: 1 1 250px` means:

- grow: 1 (can expand)  
- shrink: 1 (can shrink)  
- basis: 250px (preferred width)  

### Result

- Cards wrap automatically  
- Cards try to maintain 250px width  
- Remaining space is distributed evenly  

This is good when you want the flexibility of Flexbox rather than grid placement.

---

## 3. Media Query Based Pattern

Useful when you want strict control over exact breakpoints.

### Default mobile layout

```css
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
```

### Tablet

```css
@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Desktop

```css
@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

Gives more control but is more verbose than auto-fit solutions.

---

## 4. Equal Height Cards (Common Interview Requirement)

Flexbox solution:

```css
.cards {
  display: flex;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;
}
```

This ensures card content stretches to fill available height, making all cards uniform.

---

## 5. Adding Spacing Inside Cards

```css
.card {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
```

---

## 6. Real Interview Pattern: Card With Fixed Image Height

```css
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
```

Often required in product listing machine coding rounds.

---

## 7. Common Interview Traps

### Trap 1: Forgetting gap  
Using margins causes alignment issues. Grid and Flexbox support gap directly.

### Trap 2: Using fixed pixel widths  
Cards become non-responsive.

### Trap 3: Not using minmax  
Cards either shrink too much or break layout.

### Trap 4: Overusing media queries  
Modern CSS avoids heavy breakpoint logic.

---

## 8. Quick Practice

### Question 1

Create a card layout that shows:

- 1 card per row on mobile  
- 2 cards per row on tablet  
- 4 cards per row on desktop  

**Solution:**

```css
.cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

---

### Question 2

Make a card that keeps its image centered and cropped regardless of aspect ratio.

```css
.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
```

---

### Question 3

Create equal height cards using Flexbox.

```css
.card {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;
}
```

---
## Questions
256354, 59112

Class 1.5.3
Title: Hamburger Menu
 Description: Implement a responsive hamburger menu using HTML, CSS, and JavaScript.
 Content Type: Text
 Duration: 850
 Order: 3
Text Content: 


# Responsive Navbar (Hamburger Menu)

## Overview

A responsive navigation bar is a common requirement in frontend machine coding rounds.  
Interviewers test two core skills:

- Ability to build a clean desktop navbar using Flexbox  
- Ability to collapse it into a mobile hamburger menu  

This section covers the most expected patterns and the minimal JavaScript required in interviews.

---

## 1. Desktop First Structure

### HTML

```html
<nav class="navbar">
  <div class="logo">Brand</div>

  <ul class="nav-links">
    <li>Home</li>
    <li>Products</li>
    <li>Contact</li>
  </ul>

  <button class="hamburger">☰</button>
</nav>
```

**Key idea:**  
The hamburger button is present in HTML but hidden on desktop.

---

## 2. Base Navbar Styling

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
```

### Desktop behavior

- Logo on the left  
- Links aligned in a row  
- Hamburger hidden  

---

## 3. Mobile Collapsed State (Media Query)

**Goal:** hide nav links and show hamburger.

```css
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0;
  }

  .hamburger {
    display: block;
  }
}
```

### On mobile

- nav-links are hidden  
- hamburger is visible  

---

## 4. Showing Nav Links on Hamburger Click

### Minimal JavaScript

```js
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display =
    navLinks.style.display === "flex" ? "none" : "flex";
});
```

### Mobile result

- First click opens the nav vertically  
- Second click collapses it  

### Supporting CSS

```css
@media (max-width: 768px) {
  .nav-links {
    width: 100%;
  }
}
```

---

## 5. Improved Pattern Using a Class Toggle

Instead of inline styles, toggle a class.

### JavaScript

```js
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
```

### CSS

```css
.nav-links {
  display: none;
}

.nav-links.open {
  display: flex;
}
```

This is the expected code quality in real interviews.

---

## 6. Full Mobile Navbar Example

```css
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    gap: 16px;
    border-top: 1px solid #ddd;
    padding: 16px 0;
  }

  .nav-links.open {
    display: flex;
  }
}
```

---

## 7. Advanced Pattern: Overlay Mobile Menu

Some interviews expect a drawer-style overlay menu.

```css
.nav-links {
  position: fixed;
  top: 0;
  right: -100%;
  height: 100vh;
  width: 250px;
  background: white;
  transition: right 0.3s ease;
  flex-direction: column;
  padding: 40px 20px;
}

.nav-links.open {
  right: 0;
}
```

This creates a sliding menu from the right.  
Useful to show when the interviewer asks how to improve UX.

---

## 8. Common Interview Traps

- Forgetting to hide the hamburger on desktop  
- Using inline JavaScript for toggling  
- Not switching to `flex-direction: column` on mobile  
- Leaving nav items horizontally aligned on mobile  
- Incorrect viewport handling  
- Forgetting to remove list-style and default padding  

---

## 9. Quick Practice

### Question 1

Implement a navbar where:

- Desktop: links inline  
- Mobile: links appear in a column on hamburger click  

**Answer outline:**

- `display: flex` layout  
- Media query to hide nav links  
- JavaScript to toggle `.open` class  

---

### Question 2

Convert this to mobile friendly without using JavaScript:

```css
.nav-links:hover {
  display: flex;
}
```

**Answer:**  
Not possible reliably. Hamburger menus require JavaScript toggling.

---

### Question 3
How would you position the hamburger on the extreme right?
**Answer:**  
Use `justify-content: space-between`.

Class 1.5.4:
  Title: HTML/ CSS Contest
  Description: Apply semantic HTML and core CSS concepts to build real-world layouts and resolve styling
  Content Type: contest
  Duration: 3600
  Order: 4
  Contest URL: https://www.scaler.com/test/a/htmlseta
  Contest Questions: 6
  Contest Syllabus: 
    - Semantic HTML and forms
    - CSS Flexbox and layouts
    - CSS specificity and stacking context

Module 2
Title: LLD2: JavaScript
 Description: Develop deep JavaScript expertise covering language fundamentals, internals, async programming, browser APIs, and interview-focused machine coding problems.
 Order: 2
Learning Outcomes:
Understand JavaScript execution and memory model


Write robust asynchronous code


Work effectively with browser APIs


Solve JavaScript machine coding problems



Topic 2.1
Title: JS Foundations
 Order: 1

Class 2.1.1
Title: Variables, Scope & TDZ
 Description: Understand variable declarations, scope rules, and the temporal dead zone.
 Content Type: Text
 Duration: 300
 Order: 1
Text Content:
# Variables, Scope, Hoisting, and the Temporal Dead Zone

## Overview

Understanding variables and scope is the foundation of JavaScript.  
Interviews frequently test `var`, `let`, `const`, hoisting, block scope, function scope, and the temporal dead zone because these concepts determine how code executes long before runtime logic.

This topic explains each idea step by step with minimal theory and maximum clarity.

---

## 1. Variable Declaration Types

JavaScript provides three ways to declare variables:

- `var`
- `let`
- `const`

They differ in scope, hoisting behavior, and reassignment rules.

### var

- Function scoped  
- Can be redeclared  
- Hoisted with a default value of `undefined`

### let

- Block scoped  
- Cannot be redeclared in the same block  
- Hoisted but not initialized  

### const

- Block scoped  
- Must be initialized at declaration  
- Cannot be reassigned  

---

## 2. Scope Types in JavaScript

### Global Scope

Declared outside any block or function. Accessible everywhere.

---

### Function Scope

Created by functions. Variables declared with `var` are function scoped.

```js
function test() {
  var x = 10;
}

console.log(x); // error
```

---

### Block Scope

Created by curly braces in `if`, `for`, `while`, `switch`, and plain blocks.

```js
if (true) {
  let a = 5;
}

console.log(a); // error
```

- `let` and `const` are block scoped  
- `var` ignores block boundaries  

---

## 3. Hoisting

Hoisting means variable declarations are moved to the top of their scope before execution.

### var hoisting

```js
console.log(x); // undefined
var x = 10;
```

The declaration is hoisted, but initialization remains where it is.

---

### let and const hoisting

```js
console.log(y); // ReferenceError
let y = 10;
```

They are hoisted but not initialized, which leads to the temporal dead zone.

---

## 4. Temporal Dead Zone (TDZ)

The TDZ is the region between the start of a scope and the time the variable is declared.

Accessing a `let` or `const` variable in its TDZ results in a `ReferenceError`.

```js
{
  console.log(x); // ReferenceError, x is in TDZ
  let x = 10;
}
```

TDZ ensures safer and more predictable code by preventing accidental use of variables before their declaration.

---

## 5. Redeclaration and Reassignment Rules

### var

```js
var a = 10;
var a = 20; // allowed
```

---

### let

```js
let b = 10;
let b = 20; // error
```

Reassignment is allowed:

```js
let b = 10;
b = 20;
```

---

### const

```js
const c = 10;
c = 20; // error
```

However, const objects can have properties modified:

```js
const user = { name: "A" };
user.name = "B"; // allowed
user = {};       // not allowed
```

---

## 6. Shadowing

Shadowing happens when a variable declared inside a block or function has the same name as one outside it.

```js
let x = 10;

function test() {
  let x = 20;  // shadows outer x
  console.log(x); // 20
}
```

Valid shadowing uses `let` or `const` inside blocks.

Invalid shadowing occurs when `let` shadows `var` in the same scope:

```js
var z = 10;
let z = 20; // SyntaxError
```

---

## 7. var Scoping Pitfalls

### Case 1: var in loops

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

Output:

```
3
3
3
```

Reason: `var` is function scoped, all callbacks share the same `i`.

### Solution using let

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

Output:

```
0
1
2
```

---

## 8. const and the Immutability Myth

`const` does not make values immutable.  
It only prevents reassignment.

```js
const arr = [1, 2];
arr.push(3);  // allowed
arr = [];     // not allowed
```

---

## 9. Examples Combining All Concepts

### Example 1: TDZ in action

```js
console.log(a); // ReferenceError
let a = 5;
```

---

### Example 2: var hoisting

```js
console.log(b); // undefined
var b = 5;
```

---

### Example 3: Shadowing

```js
let x = 10;

{
  let x = 20;
  console.log(x); // 20
}

console.log(x); // 10
```

---

### Example 4: Illegal shadowing

```js
var y = 10;
let y = 20; // SyntaxError
```

---

## 10. Common Interview Questions

- Explain the difference between `var`, `let`, and `const`.
- What is block scope and which declarations are block scoped?
- What is hoisting and how does it differ for `var`, `let`, and `const`?
- What is the temporal dead zone?
- Explain variable shadowing and illegal shadowing.
- Why does `var` leak out of blocks?
- Why does `let` inside a loop behave differently from `var`?

---

## 11. Quick Practice

### Question 1

Predict the output:

```js
console.log(a);
var a = 10;
```

Answer: `undefined`

---

### Question 2

Predict the output:

```js
console.log(b);
let b = 10;
```

Answer: `ReferenceError` due to TDZ

---

### Question 3

Correct this code so each log prints `0, 1, 2`:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

Answer:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

---
## Questions

259132, 259135, 259131, 259129, 259130, 46058


Class 2.1.2
Title: Primitive vs Reference Types
 Description: Learn how JavaScript handles memory, copying, and mutation.
 Content Type: Text
 Duration: 300
 Order: 2
Text Content:

# Primitive vs Reference Types

## Overview

JavaScript has two major categories of data types:

- Primitive types  
- Reference types  

Understanding how they behave in memory is essential for debugging, interview coding rounds, and concepts like immutability, copying, equality, and closures.

Most JavaScript bugs arise from misunderstanding how reference types behave when assigned, copied, or mutated.

---

## 1. Primitive Types

Primitive types are:

- string  
- number  
- boolean  
- null  
- undefined  
- bigint  
- symbol  

### Characteristics

- Stored directly in memory as fixed values  
- Immutable  
- Compared by value  
- Copying creates a new independent value  

### Example

```js
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

Changing `b` does not affect `a`.

---

## 2. Reference Types

Reference types include:

- object  
- array  
- function  

### Characteristics

- Stored in heap memory  
- The variable holds a reference (pointer) to the value  
- Compared by reference, not by value  
- Copying a reference does not duplicate the object  

### Example

```js
let obj1 = { n: 1 };
let obj2 = obj1;

obj2.n = 5;

console.log(obj1.n); // 5
console.log(obj2.n); // 5
```

Both variables point to the same object.

---

## 3. Memory Model

### Primitives

- Stored directly in the stack (or a region treated like stack)  
- Assignment copies the value itself  

### References

- The variable stores a reference  
- The actual object lives in the heap  

### Visual model

```js
let a = { x: 1 };
let b = a;
```

`a` and `b` both store something like:

```
0x0012ffac
```

Which points to the same object in memory.

---

## 4. Equality Checks

### Primitive comparison

Compared by value:

```js
5 === 5        // true
"hi" === "hi"  // true
```

---

### Reference comparison

Compared by reference identity:

```js
{} === {}  // false
[] === []  // false
```

Explanation: two different objects even if they look identical.

### Example

```js
let x = {};
let y = x;

x === y // true
```

---

## 5. Copying Behavior

### Copying primitives

Creates a new value.

```js
let a = "hello";
let b = a;

b = "world";

console.log(a); // "hello"
```

---

### Copying reference types

Copies only the reference.

```js
let arr1 = [1, 2, 3];
let arr2 = arr1;

arr2.push(4);

console.log(arr1); // [1, 2, 3, 4]
```

---

## 6. Shallow Copy vs Deep Copy

### Shallow copy

- Copies top level only  
- Nested objects still share references  

Example:

```js
let a = { x: 1, y: { z: 2 } };

let shallow = { ...a };
shallow.y.z = 100;

console.log(a.y.z); // 100
```

---

### Deep copy

- Recursively copies all levels  
- Values no longer share references  

Example of a simplified deep clone function:

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  let result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
}
```

---

## 7. The Identity Trap in Interviews

Interviewers often ask:

```js
let a = [];
let b = [];

console.log(a === b);
```

Answer: `false`  
They are two different references.

Another classic:

```js
let obj = {};
let arr = [obj];

console.log(arr.includes({}));
```

Answer: `false`  

Because `{}` is a new object with a different reference.

---

## 8. Passing Values into Functions

### Primitives are passed by value

```js
function test(x) {
  x = 100;
}

let a = 10;
test(a);

console.log(a); // 10
```

---

### Objects are passed by reference (pass by sharing)

```js
function modify(obj) {
  obj.n = 99;
}

let o = { n: 1 };
modify(o);

console.log(o.n); // 99
```

---

## 9. Mutation vs Reassignment

Objects can be mutated even if declared with `const`.

```js
const user = { age: 20 };
user.age = 30; // allowed
```

Reassignment is not allowed:

```js
user = {}; // error
```

---

## 10. Common Interview Questions

- Why are primitives immutable in JavaScript?
- What is the difference between value and reference?
- Why does an array equal to itself but not to another identical array?
- How do shallow and deep copies differ?
- What happens when you pass an object to a function?
- Does `const` make an object immutable?
- Predict the output of reference vs primitive comparisons.

---

## 11. Quick Practice

### Question 1

Predict output:

```js
let a = { n: 1 };
let b = { n: 1 };

console.log(a === b);
```

Answer: `false` (different references)

---

### Question 2

Predict output:

```js
let a = [1, 2];
let b = a;

b.push(3);

console.log(a);
```

Answer: `[1, 2, 3]`

---

### Question 3

Fix this so the original object does not change:

```js
let user = { name: "A", address: { city: "Pune" } };
let copy = user;

copy.address.city = "Mumbai";
```

Solution (deep copy):

```js
let copy = JSON.parse(JSON.stringify(user));
```

---

## Questions

61276, 259127, 186751, 259125, 259126, 259128

Class 2.1.3
Title: Functions & Execution Context
 Description: Explore how functions are executed and contexts are created in JavaScript.
 Content Type: Text
 Duration: 300
 Order: 3
Text Content:

# Functions, Execution Context, and Lexical Scope

## Overview

Functions are at the heart of JavaScript.  
Understanding how functions create execution contexts and how lexical scope works is essential before learning closures, event loop, async behavior, and hoisting details.

This topic connects multiple JavaScript internals into a simple mental model.

---

## 1. What is a Function in JavaScript

A function is a reusable block of code defined using:

- Function declaration  
- Function expression  
- Arrow function  

### Function Declaration

```js
function add(a, b) {
  return a + b;
}
```

### Function Expression

```js
const add = function(a, b) {
  return a + b;
};
```

### Arrow Function

```js
const add = (a, b) => a + b;
```

Function declarations are hoisted.  
Function expressions and arrow functions are not initialized during hoisting.

---

## 2. Execution Context

When JavaScript runs any code, it creates an execution context.

There are two main contexts:

- Global Execution Context  
- Function Execution Context  

Each execution context has two phases.

### Phase 1: Memory Creation

- Allocate memory for variables and functions  
- Set up scope chain  
- Hoist declarations  

### Phase 2: Execution Phase

- Assign values  
- Run code line by line  
- Evaluate expressions  

### Example

```js
function greet() {
  let x = 10;
  console.log(x);
}

greet();
```

When `greet` is called, a new execution context is created with its own memory.

---

## 3. Call Stack

JavaScript uses a call stack to manage execution contexts.

### Example

```js
function a() { b(); }
function b() { console.log("Hello"); }

a();
```

### Flow

- Global context on the stack  
- `a()` context pushes  
- `b()` context pushes  
- `b` finishes, pops  
- `a` finishes, pops  
- Program ends  

Understanding this is crucial for recursion and debugging.

---

## 4. Lexical Environment

A lexical environment is created whenever a new block or function is defined.

It contains:

- Local variables  
- References to outer lexical environments  

This structure creates the scope chain.

### Example

```js
let a = 10;

function outer() {
  let b = 20;

  function inner() {
    console.log(a, b);
  }

  inner();
}

outer();
```

`inner` can access `a` and `b` because of lexical scoping.

---

## 5. Lexical Scope

Lexical scope means scope is determined by where a function is written in code, not where it is called.

### Example

```js
let x = 1;

function parent() {
  let y = 2;

  function child() {
    console.log(x, y);
  }

  return child;
}

const fn = parent();
fn(); // prints 1, 2
```

Even though `fn` is called outside `parent`, it still remembers its lexical scope.

---

## 6. Function Hoisting

Function declarations are hoisted.

```js
hello(); // works

function hello() {
  console.log("Hi");
}
```

Function expressions are not initialized during hoisting.

```js
hello(); // TypeError

var hello = function() {
  console.log("Hi");
};
```

The variable `hello` is hoisted but assigned `undefined`.

---

## 7. Function Parameters and Arguments

Parameters behave like local variables inside a function.

```js
function sum(a, b) {
  console.log(a, b);
}

sum(5, 10);
```

Arguments are passed by value for primitives and by reference for objects.

---

## 8. Return Behavior

A function always returns something.  
If no return is provided, it returns `undefined`.

```js
function test() {}
console.log(test()); // undefined
```

---

## 9. The Function Lifecycle (Interview Summary)

When a function is invoked:

- A new execution context is created  
- Memory creation happens  
- Local variables and parameters are allocated  
- Scope chain is linked to outer scope  
- The function executes  
- Execution context is removed from the stack  

---

## 10. Classic Interview Traps

### Trap 1: Variable resolution

```js
let x = 1;

function a() {
  let x = 2;

  function b() {
    console.log(x);
  }

  b();
}

a(); // outputs 2
```

Because `b` looks up `x` in its lexical scope.

---

### Trap 2: Function inside loop with var

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

Output:

```
3
3
3
```

Reason: one shared function-scoped variable.

---

### Trap 3: Function expression hoisting confusion

```js
console.log(fn); // undefined
fn();            // TypeError

var fn = function() {};
```

---

## 11. Quick Practice

### Question 1

Predict output:

```js
let x = 5;

function outer() {
  let x = 10;

  function inner() {
    console.log(x);
  }

  return inner;
}

const fn = outer();
fn();
```

Answer: `10`  
Reason: lexical scope is preserved.

---

### Question 2

Why does this throw an error?

```js
myFunc();

const myFunc = () => {};
```

Answer: `const` variable is in TDZ and not initialized.

---

### Question 3

What does this print?

```js
function a() {
  console.log("A");
  return function() {
    console.log("B");
  };
}

a()();
```

Answer:

```
A
B
```

---

## Questions

61128, 61130, 259134, 259135, 259131, 259130, 259136


Class 2.1.4
Title: Closures & Practical Use Cases
 Description: Understand closures and their real-world applications.
 Content Type: Text
 Duration: 300
 Order: 4
Text Content:


# Closures and the Scope Chain

## Overview

A closure is one of the most important concepts in JavaScript.  
Understanding closures connects many ideas:

- lexical scope  
- execution context  
- memory retention  
- higher order functions  
- callbacks  
- event handlers  
- async functions  

Every JavaScript interview contains at least one closure question.

---

## 1. What is a Closure

A closure is formed when a function remembers variables from the scope in which it was created, even after that outer function has finished executing.

Simple definition:

A closure is a function plus its surrounding lexical environment.

### Example

```js
function outer() {
  let x = 10;

  function inner() {
    console.log(x);
  }

  return inner;
}

const fn = outer();
fn(); // prints 10
```

`outer` has finished executing, but `inner` still has access to `x`.

---

## 2. Why Closures Work

Closures work because of lexical scoping.

`inner` is physically written inside `outer`, so it carries `outer`’s scope with it.

When `outer` returns, JavaScript does not delete the variable `x` because `inner` still references it.  
The memory is kept alive.

---

## 3. Scope Chain and Closures

Each function has a link to its outer lexical environment.

### Example

```js
let a = 1;

function first() {
  let b = 2;

  function second() {
    let c = 3;
    console.log(a, b, c);
  }

  second();
}

first();
```

The lookup chain for variables is:

- `c` → local  
- `b` → parent scope  
- `a` → global scope  

This chain is called the **scope chain**.

---

## 4. Closures in Real Code

Closures are used in:

- Event handlers  
- `setTimeout`  
- Functions returned from functions  
- Private variables  
- Memoization  
- Currying  
- Iterators  
- Debounce and throttle  

---

## 5. Classic Closure Example: Counter Function

```js
function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
```

The variable `count` stays in memory because the returned function uses it.

---

## 6. Closures in Loops

### Interview classic

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

Output:

```
3
3
3
```

### Fix using closures

```js
for (var i = 0; i < 3; i++) {
  (function(i) {
    setTimeout(() => console.log(i), 100);
  })(i);
}
```

### Modern solution using `let`

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

---

## 7. Private Data Using Closures

```js
function createBankAccount() {
  let balance = 0;

  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
```

`balance` is private and cannot be accessed directly.

---

## 8. Closures with setTimeout

```js
function greet() {
  let name = "A";

  setTimeout(function() {
    console.log("Hello " + name);
  }, 1000);
}

greet();
```

The callback function remembers `name`.

---

## 9. Common Interview Traps

### Trap 1: Expecting variables to reset

```js
function test() {
  let x = 0;
  return function() {
    x++;
    console.log(x);
  };
}

const fn = test();
fn(); // 1
fn(); // 2
fn(); // 3
```

The variable `x` persists.

---

### Trap 2: Using `var` in loops with async callbacks

Always results in a shared final value unless a closure is created.

---

### Trap 3: Closures inside objects do not capture `this`

Closures capture lexical scope, not dynamic context.

---

## 10. What Closures Do Not Do

Closures do not copy variables.  
They reference live variables.

### Example

```js
function outer() {
  let x = 0;
  return function() {
    console.log(x);
  };
}

const fn = outer();
```

If `x` is modified inside `outer`, `inner` will see the updated value.

---

## 11. Practical Examples

### 1. Debounce function

```js
function debounce(fn, delay) {
  let timer;

  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
```

`timer` is preserved by closure.

---

### 2. Currying

```js
function sum(a) {
  return function(b) {
    return a + b;
  };
}

sum(5)(3); // returns 8
```

---

## 12. Quick Practice

### Question 1

Predict output:

```js
function outer() {
  let x = 5;
  function inner() {
    console.log(x);
  }
  x = 10;
  return inner;
}

const fn = outer();
fn();
```

Answer: `10`  
Reason: closure holds a reference, not a copy.

---

### Question 2

Predict output:

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(10));
```

Answer: `15`

---

### Question 3

Fix this code so it prints `0, 1, 2`:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

Solution:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

---

## Questions

90602, 259140, 259139, 259138, 186739, 186734, 186740



Class 2.1.5
Title: Call, Apply, Bind & Function Borrowing
 Description: Master function invocation patterns and context manipulation.
 Content Type: Text
 Duration: 300
 Order: 5
Text Content:


# call, apply, bind and Function Borrowing

## Overview

In JavaScript, functions behave like objects.  
Because they are objects, they have built-in methods such as `call`, `apply`, and `bind` that allow explicit control over the value of `this`.

This topic is critical for interviews.  
It appears in low-level design questions, browser behavior questions, event handling, and async code reasoning.

---

## 1. Why call, apply, and bind exist

In JavaScript, the value of `this` depends on **how a function is called**, not where it is defined.

### Example where `this` is lost

```js
const user = {
  name: "Rahul",
  greet() {
    console.log("Hello " + this.name);
  }
};

const greetFn = user.greet;
greetFn(); // undefined or TypeError in strict mode
```

The function `greetFn` is no longer called on `user`, so `this` is incorrect.

### Fix using call

```js
greetFn.call(user);
// Hello Rahul
```

---

## 2. call

`call` immediately invokes the function and sets the value of `this`.

### Syntax

```js
fn.call(context, arg1, arg2, ...)
```

### Example

```js
function introduce(city) {
  console.log(this.name + " from " + city);
}

const person = { name: "Rahul" };

introduce.call(person, "Delhi");
// Rahul from Delhi
```

### When to use call

- When you want to invoke the function immediately  
- When arguments are passed individually  

---

## 3. apply

`apply` works exactly like `call`, except arguments are passed as an array.

### Syntax

```js
fn.apply(context, [arg1, arg2, ...])
```

### Example

```js
introduce.apply(person, ["Delhi"]);
```

### Classic use case

```js
const numbers = [4, 7, 1];

const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // 7
```

Reason: `Math.max` expects individual arguments, not an array.

---

## 4. bind

`bind` does **not** execute the function.  
It returns a new function with `this` permanently set.

### Syntax

```js
const newFn = fn.bind(context, arg1, arg2);
```

### Example

```js
function introduce(city) {
  console.log(this.name + " from " + city);
}

const person = { name: "Rahul" };

const introFn = introduce.bind(person, "Mumbai");

introFn(); // Rahul from Mumbai
introFn(); // still Rahul from Mumbai
```

`bind` is most useful when passing callbacks where `this` may be lost.

---

## 5. Losing `this` in Callbacks

Very common interview problem:

```js
const user = {
  name: "Anita",
  show() {
    console.log(this.name);
  }
};

setTimeout(user.show, 1000);
```

Output: `undefined`  
Reason: `this` is lost.

### Fix using bind

```js
setTimeout(user.show.bind(user), 1000);
```

---

## 6. Function Borrowing

Objects can borrow functions from other objects using `call` or `apply`.

### Example

```js
const person1 = { name: "Rahul" };
const person2 = { name: "Anita" };

function greet() {
  console.log("Hi " + this.name);
}

greet.call(person1); // Hi Rahul
greet.call(person2); // Hi Anita
```

### Borrowing array methods

```js
const obj = { 0: "x", 1: "y", length: 2 };

console.log(Array.prototype.join.call(obj, "-"));
// x-y
```

This is useful when working with array-like objects.

---

## 7. Deep Comparison: call vs apply vs bind

| Feature | call | apply | bind |
|------|------|-------|------|
| Executes immediately | yes | yes | no |
| Arguments | individual | array | stored |
| Returns | function result | function result | new function |
| Use case | quick invocation | array arguments | async callbacks |

---

## 8. Arrow Functions Ignore call, apply, and bind

Arrow functions do not have their own `this`.  
They use lexical `this`.

### Example

```js
const f = () => console.log(this);

f.call({ a: 1 });
// still logs outer this
```

Important interview concept.

---

## 9. Polyfills (Interview Favorite)

### call polyfill

```js
Function.prototype.myCall = function(context, ...args) {
  if (context === null || context === undefined) {
    context = globalThis;
  }

  context.tempFn = this;
  const result = context.tempFn(...args);
  delete context.tempFn;

  return result;
};
```

---

### apply polyfill

```js
Function.prototype.myApply = function(context, argsArray) {
  if (context === null || context === undefined) {
    context = globalThis;
  }

  if (!Array.isArray(argsArray)) {
    throw new Error("Second argument must be an array");
  }

  context.tempFn = this;
  const result = context.tempFn(...argsArray);
  delete context.tempFn;

  return result;
};
```

---

### bind polyfill

```js
Function.prototype.myBind = function(context, ...args) {
  const originalFn = this;

  return function(...laterArgs) {
    return originalFn.call(context, ...args, ...laterArgs);
  };
};
```

---

## 10. Common Interview Traps

### Trap 1  
Thinking `bind` executes the function. It does not.

### Trap 2  
Extracting a method and calling it:

```js
const m = obj.method;
m(); // this lost
```

### Trap 3  
Trying to change `this` of arrow functions using `call` or `bind`.

---

## 11. Quick Practice

### Question 1

Predict output:

```js
function show() {
  console.log(this.x);
}

const a = { x: 10 };
const b = { x: 20 };

show.call(a);
show.call(b);
```

Answer:

```
10
20
```

---

### Question 2

Predict output:

```js
const person = {
  name: "Rahul",
  getName() {
    return this.name;
  }
};

const fn = person.getName;
console.log(fn());
```

Answer: `undefined`

Fix:

```js
const boundFn = person.getName.bind(person);
```

---

### Question 3

Which method should you use when passing arguments as an array?

Answer: `apply`

---

## Questions

61280, 61331, 61143, 259144, 259143, 259142, 259141


Class 2.1.6
Title: this Keyword
 Description: Understand implicit, explicit, and hard binding of this.
 Content Type: Text
 Duration: 300
 Order: 6
Text Content:

# Understanding the `this` Keyword

## Overview

The value of `this` in JavaScript is one of the most misunderstood topics.  
Beginners expect `this` to work like Java or Python, but JavaScript uses a very different model.

The key idea is simple:

The value of `this` depends on how a function is called, not where it is defined.

This topic explains all the binding rules of `this` that interviews test.

---

## 1. Global Context

In the global environment:

```js
console.log(this);
```

In browsers: `this` refers to the `window` object.  
In strict mode: `this` is `undefined`.

---

## 2. Function Invocation (Default Binding)

```js
function show() {
  console.log(this);
}

show();
```

In non-strict mode: `this` is `window`.  
In strict mode: `this` is `undefined`.

Important: a plain function call never binds `this` to the caller.

---

## 3. Implicit Binding (Object Method Call)

When a function is called as a method on an object, `this` refers to that object.

```js
const user = {
  name: "Rahul",
  show() {
    console.log(this.name);
  }
};

user.show(); // Rahul
```

Rule:

The object to the left of the dot becomes `this`.

---

## 4. Losing `this` (Very Important Interview Concept)

```js
const user = {
  name: "Rahul",
  greet() {
    console.log(this.name);
  }
};

const fn = user.greet;
fn(); // undefined
```

Why this happens:

- The method is detached from the object  
- There is no implicit binding  
- It becomes a plain function call  

This is why `call`, `apply`, and `bind` exist.

---

## 5. Explicit Binding (call, apply, bind)

```js
function greet() {
  console.log(this.name);
}

const person = { name: "Anita" };

greet.call(person); // Anita
```

`bind` permanently sets `this`:

```js
const greetPerson = greet.bind(person);
greetPerson(); // Anita
```

---

## 6. Constructor Function Binding (`new` keyword)

When a function is called with `new`:

```js
function Person(name) {
  this.name = name;
}

const p = new Person("Rahul");
console.log(p.name); // Rahul
```

Rules:

- A new empty object is created  
- `this` is set to that object  
- The object is returned  

---

## 7. `this` in Arrow Functions (Lexical `this`)

Arrow functions do not create their own `this`.  
They inherit `this` from their surrounding lexical environment.

```js
const user = {
  name: "Rahul",
  show: () => {
    console.log(this.name);
  }
};

user.show(); // undefined
```

Reason:  
`this` inside an arrow function refers to the outer scope, not the object `user`.

Correct solution:

```js
const user = {
  name: "Rahul",
  show() {
    console.log(this.name);
  }
};
```

Important note:

`call`, `apply`, and `bind` cannot change the value of `this` for arrow functions.

---

## 8. `this` Inside Event Listeners

```js
button.addEventListener("click", function() {
  console.log(this); // button element
});
```

Arrow functions break this behavior:

```js
button.addEventListener("click", () => {
  console.log(this); // not the button
});
```

---

## 9. Precedence Rules for `this` (Interview Summary)

When determining `this`:

- If function is called with `new`  
  `this` is the new object  

- Else if called with `bind`, `call`, or `apply`  
  `this` is explicitly set  

- Else if function is called as `obj.method()`  
  `this` is the object left of the dot  

- Else if in global context  
  `this` is `window` or `undefined` in strict mode  

- Arrow functions ignore all the above  
  `this` is taken from the lexical environment  

---

## 10. Classic Interview Traps

### Trap 1: Extracting a method and calling it separately

```js
const obj = { x: 10, show() { console.log(this.x); } };

const fn = obj.show;
fn(); // undefined
```

---

### Trap 2: Arrow function inside object literal

```js
const obj = {
  x: 10,
  show: () => console.log(this.x)
};

obj.show(); // undefined
```

---

### Trap 3: Losing `this` inside `setTimeout`

```js
const person = {
  name: "Anita",
  show() { console.log(this.name); }
};

setTimeout(person.show, 1000);
// undefined
```

Fix:

```js
setTimeout(person.show.bind(person), 1000);
```

---

## 11. Quick Practice

### Question 1

Predict output:

```js
const data = {
  value: 50,
  getValue() {
    return this.value;
  }
};

const fn = data.getValue;
console.log(fn());
```

Answer: `undefined`

---

### Question 2

Predict output:

```js
const obj = {
  value: 20,
  show: function() {
    console.log(this.value);
  }
};

const bound = obj.show.bind({ value: 100 });
bound();
```

Answer: `100`

---

### Question 3

Predict output:

```js
const obj = {
  value: 5,
  show: () => console.log(this.value)
};

obj.show();
```

Answer: `undefined`  
Reason: arrow functions do not bind their own `this`.

---

## Questions

89281, 100476, 91335, 89279, 89270

Topic 2.2
Title: JS Internals
 Order: 2
Class 2.2.1
Title: Call Stack & Execution Model
 Description: Learn how JavaScript executes code using the call stack.
 Content Type: Text
 Duration: 300
 Order: 1
Text Content:

# Call Stack and the JavaScript Execution Model

## Overview

JavaScript is a single threaded language.  
It can execute only one piece of code at a time.

To manage this execution, JavaScript uses a structure called the **call stack**.

The call stack controls how functions start, pause, resume, and end.

Understanding the call stack gives clarity to recursion, errors, asynchronous behavior, and the event loop.

---

## 1. What is the Call Stack

The call stack is a data structure that follows the **Last In, First Out (LIFO)** principle.

- The last function pushed onto the stack is the first one to finish.
- Each function invocation creates a **stack frame**.
- When the function finishes, its frame is removed from the stack.

---

## 2. Example: Simple Execution Flow

```js
function a() {
  console.log("inside a");
}

function b() {
  a();
  console.log("inside b");
}

b();
```

### Execution steps

- Global Execution Context is created
- `b()` is called, so `b`’s frame is pushed
- Inside `b`, `a()` is called, so `a`’s frame is pushed
- `a` logs output and finishes, so `a`’s frame is popped
- `b` logs output and finishes, so `b`’s frame is popped
- Control returns to the global context

### Call stack at peak

```
| a      |
| b      |
| global |
```

---

## 3. Visual Walkthrough

Initial state:

```
| global |
```

Call `b()`:

```
| b      |
| global |
```

Inside `b`, call `a()`:

```
| a      |
| b      |
| global |
```

`a` finishes:

```
| b      |
| global |
```

`b` finishes:

```
| global |
```

When global code ends, the stack becomes empty.

---

## 4. Nested Function Calls

```js
function one() {
  two();
}

function two() {
  three();
}

function three() {
  console.log("done");
}

one();
```

### Call stack evolution

- `one` pushed
- `two` pushed
- `three` pushed
- `three` popped
- `two` popped
- `one` popped

This pattern is frequently tested in interviews.

---

## 5. Recursion and the Call Stack

Recursive functions keep adding new stack frames until a base condition stops execution.

```js
function count(n) {
  if (n === 0) return;
  count(n - 1);
}

count(5);
```

Each recursive call adds a new frame.  
If the base case is missing, the stack keeps growing.

---

## 6. Stack Overflow

If too many frames are pushed without completing, JavaScript throws:

```
RangeError: Maximum call stack size exceeded
```

### Example

```js
function run() {
  run();
}

run();
```

This error occurs because the call stack cannot grow indefinitely.

---

## 7. Why Async Code Does Not Block the Stack

JavaScript is single threaded, but it can still handle asynchronous tasks because:

- Long running operations are handed off to browser APIs or Node.js APIs
- These APIs do not block the call stack
- JavaScript is notified later via the event loop

### Example

```js
console.log("start");

setTimeout(() => {
  console.log("timeout done");
}, 0);

console.log("end");
```

### Synchronous flow

- `start` is logged
- `setTimeout` is handed to browser APIs
- `end` is logged
- Callback runs later when the stack is empty

### Output

```
start
end
timeout done
```

Even with a delay of zero, callbacks wait for the call stack to clear.

This will be expanded further in the Event Loop topic.

---

## 8. Call Stack and Errors

When an error occurs, JavaScript prints a **stack trace**.

### Example

```js
function a() { b(); }
function b() { c(); }
function c() { throw new Error("Problem occurred"); }

a();
```

### Stack trace shows

```
c
b
a
global
```

This helps developers trace the execution path that led to the error.

---

## 9. Important Interview Questions

### Question 1  
Why is JavaScript called single threaded?

Expected understanding:  
JavaScript has only one call stack. Only one function executes at a time.

---

### Question 2  
What happens if a recursive function has no base case?

Expected:  
Infinite stack growth leading to a stack overflow error.

---

### Question 3  
Why do async callbacks run later even with zero delay?

Expected:  
The callback is placed in the task queue and waits until the call stack is empty.

---

### Question 4  
Given the code:

```js
function x() {
  y();
}

function y() {
  z();
}

function z() {
  console.log("out");
}

x();
```

Expected call stack sequence:

```
global
x
y
z
```

Then reversed as functions return.

---

## 10. Summary

- Call stack runs synchronous code
- Each function call creates a stack frame
- JavaScript is single threaded because it has one call stack
- Recursion grows the stack
- Stack overflow occurs when the stack grows without clearing
- Async tasks wait for the call stack to empty

This topic lays the foundation for understanding execution context, event loop, promises, and async/await.

---

## Questions

100464, 55149, 80872, 231039, 100522, 93797, 93790, 93792


Class 2.2.2
Title: Prototype & OOP
 Description: Understand prototypal inheritance and object-oriented patterns in JavaScript.
 Content Type: Text
 Duration: 300
 Order: 2
Text Content:

# Prototype, Prototype Chain, and Object Oriented Patterns

## Overview

JavaScript does not have classical inheritance like Java or C++.  
Instead, it uses **prototypal inheritance**, a system where objects can directly inherit from other objects.

Every object in JavaScript has an internal reference called `[[Prototype]]`.  
This reference forms a **prototype chain**, which JavaScript uses to look up properties and methods.

Understanding prototypes is essential for interviews, especially for questions related to inheritance, method lookup, constructor functions, ES6 classes, and performance.

---

## 1. What Is a Prototype

A prototype is simply another object that acts as a fallback source of properties.

Example:

```js
const user = { name: "Asha" };

console.log(user.toString);
```

Even though `toString` is not defined on `user`, JavaScript finds it on `Object.prototype`.

This happens because:

```
user → Object.prototype → null
```

The lookup continues up the prototype chain until the property is found or the chain ends.

---

## 2. The Prototype Chain

When accessing a property:

1. JavaScript looks on the object itself  
2. If not found, it looks on the object's prototype  
3. It continues up the chain  
4. The chain ends at `null`  

Example:

```js
const obj = {};

console.log(obj.__proto__);           // Object.prototype
console.log(obj.__proto__.__proto__); // null
```

Visual representation:

```
obj → Object.prototype → null
```

This chain is used for all method and property lookups.

---

## 3. How Prototype Links Are Created

Prototype links are created when objects are made using:

- Object literals  
- Constructor functions  
- Classes  
- `Object.create`  

### Object literal example

```js
const user = { name: "Asha" };
```

Internally:

```
user → Object.prototype → null
```

---

## 4. Constructor Functions and Prototypes

Before ES6 classes, JavaScript used constructor functions.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log("Hello " + this.name);
};

const p = new Person("Ravi");
p.sayHello();
```

### What `new` does

- Creates a new empty object  
- Links it to `Person.prototype`  
- Binds `this` to the new object  
- Returns the object  

Prototype chain:

```
p → Person.prototype → Object.prototype → null
```

All instances share methods defined on `Person.prototype`.

---

## 5. Why Put Methods on the Prototype

If methods are defined inside the constructor:

```js
function Person(name) {
  this.name = name;
  this.say = function() {
    console.log(this.name);
  };
}
```

Each instance gets its own copy of `say`, wasting memory.

Better approach:

```js
Person.prototype.say = function() {
  console.log(this.name);
};
```

Now the method is shared across all instances.

---

## 6. Checking Prototype Links

Ways to inspect prototypes:

```js
obj.__proto__;
Object.getPrototypeOf(obj);
```

Check inheritance:

```js
user instanceof Person;
```

Returns `true` if `Person.prototype` exists in the prototype chain of `user`.

---

## 7. Object.create for Direct Inheritance

`Object.create` creates a new object with a specified prototype.

```js
const parent = {
  greet() {
    console.log("Hello");
  }
};

const child = Object.create(parent);
child.name = "Asha";

child.greet();
```

Prototype chain:

```
child → parent → Object.prototype → null
```

This is pure prototypal inheritance and frequently appears in interviews.

---

## 8. Method Lookup Rule (Very Important)

When calling:

```js
child.greet();
```

JavaScript checks in this order:

1. `child`  
2. `child.__proto__` (parent)  
3. `Object.prototype`  
4. `null`  

The first match is used.

---

## 9. Shadowing in the Prototype Chain

```js
const parent = { value: 10 };
const child = Object.create(parent);

child.value = 20;

console.log(child.value);  // 20
console.log(parent.value); // 10
```

The property on `child` hides the one on `parent`.  
This is called **shadowing**.

---

## 10. Modifying Prototypes Affects All Linked Objects

```js
const a = {};
const b = {};

Object.prototype.shared = "available";

console.log(a.shared); // available
console.log(b.shared); // available
```

Because both objects inherit from `Object.prototype`.

This is why modifying `Object.prototype` in production code is discouraged.

---

## 11. Prototype in ES6 Classes

ES6 classes are syntactic sugar over prototype-based inheritance.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log("Hello " + this.name);
  }
}

const p = new Person("Ravi");
```

Internally, this works the same as constructor functions with prototypes.

---

## 12. Common Interview Traps

### Trap 1: Confusing `prototype` and `__proto__`

- `prototype` exists on constructor functions  
- `__proto__` exists on objects  

---

### Trap 2: Replacing prototype after object creation

```js
function A() {}
const obj = new A();

A.prototype.say = function() {};
```

This works.

But replacing the prototype entirely:

```js
A.prototype = { say() {} };
```

Objects created earlier do not get the new prototype.

---

### Trap 3: Accessing prototype incorrectly

```js
p.prototype   // incorrect
p.__proto__   // correct
```

---

## 13. Quick Practice

### Question 1

```js
function A() {}
A.prototype.x = 10;

const obj = new A();
console.log(obj.x);
```

Answer: `10`

---

### Question 2

```js
const parent = { value: 1 };
const child = Object.create(parent);

console.log(child.value);
```

Answer: `1`

---

### Question 3

```js
function A() {}
A.prototype.x = 10;

const obj = new A();
A.prototype.x = 20;

console.log(obj.x);
```

Answer: `20`  
Reason: prototype is shared.

---

### Question 4

```js
class User {
  greet() {}
}

const u = new User();
console.log(typeof u.greet);
```

Answer: `function`

---

## Questions

61278, 259145, 259148, 259147, 259149, 259146


Class 2.2.3
Title: Classes & Inheritance
 Description: Use ES6 classes and inheritance effectively.
 Content Type: Text
 Duration: 300
 Order: 3
Text Content:

# Classes and Inheritance in JavaScript

## Overview

JavaScript introduced the `class` keyword to make object oriented code easier to read and reason about.  
Internally, JavaScript still uses prototypes, but interviews and real codebases expect developers to work confidently with class syntax.

This topic focuses on writing, understanding, and debugging class-based code from an interview perspective, without re-explaining prototype internals.

---

## 1. Basic Class Syntax

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }
}

const u = new User("Amit");
u.greet();
```

### Key points

- `constructor` runs when a new instance is created  
- Methods are shared across instances  
- Methods are placed on the prototype internally  

---

## 2. Constructor Rules (Interview Critical)

### Rule 1: Constructor is optional

```js
class A {}
```

---

### Rule 2: Constructor name must be `constructor`

Only one constructor is allowed per class.

---

### Rule 3: `super()` is mandatory in derived classes

```js
class A {
  constructor(x) {
    this.x = x;
  }
}

class B extends A {
  constructor(x, y) {
    super(x);
    this.y = y;
  }
}
```

Failing to call `super()` before using `this` throws a runtime error.

---

## 3. Inheritance Using `extends`

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log("Hello " + this.name);
  }
}

class Employee extends Person {
  constructor(name, role) {
    super(name);
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}
```

### What happens conceptually

- `Employee` inherits methods from `Person`  
- `Person` constructor runs first  
- `Employee` constructor runs next  

---

## 4. Method Overriding

A child class can override a parent method.

```js
class Admin extends Person {
  speak() {
    console.log("Admin access");
  }
}

const a = new Admin("Ravi");
a.speak(); // Admin access
```

---

## 5. Using `super.method()`

A child class can explicitly call the parent method.

```js
class Admin extends Person {
  speak() {
    super.speak();
    console.log("Admin access");
  }
}
```

### Execution order

- Parent method executes  
- Child logic executes  

This pattern is frequently tested in interviews.

---

## 6. Static Methods and Properties

Static members belong to the class, not to instances.

```js
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}

MathUtils.add(2, 3); // 5
```

Incorrect usage:

```js
const m = new MathUtils();
m.add(2, 3); // error
```

### Use static when

- Functionality does not depend on instance state  
- Utility or helper logic  

---

## 7. `this` Inside Classes

Inside instance methods, `this` refers to the instance.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  show() {
    console.log(this.name);
  }
}
```

### Common pitfall with callbacks

```js
class User {
  constructor(name) {
    this.name = name;
  }

  showLater() {
    setTimeout(this.show, 1000);
  }

  show() {
    console.log(this.name);
  }
}
```

Output: `undefined`

### Fix using `bind`

```js
setTimeout(this.show.bind(this), 1000);
```

---

## 8. Arrow Functions in Classes

Arrow functions capture lexical `this`.

```js
class User {
  constructor(name) {
    this.name = name;
    this.show = () => {
      console.log(this.name);
    };
  }
}
```

### Tradeoff

- Solves `this` binding issues  
- Creates a new function per instance  
- Uses more memory  

Interviewers often ask you to reason about this tradeoff.

---

## 9. `instanceof` Checks

```js
const e = new Employee("Ravi", "Engineer");

console.log(e instanceof Employee); // true
console.log(e instanceof Person);   // true
```

`instanceof` checks the prototype chain.

### Common trap

`instanceof` can fail across different execution contexts (for example, iframes).

---

## 10. Common Interview Traps

### Trap 1: Forgetting `super()` in derived class

```js
class B extends A {
  constructor() {
    this.x = 10; // error
  }
}
```

---

### Trap 2: Assuming methods are copied per instance

Methods are shared via the prototype.

---

### Trap 3: Using arrow functions blindly for methods

Leads to unnecessary memory usage.

---

### Trap 4: Calling static methods on instances

Static methods belong to the class, not the object.

---

### Trap 5: Assuming classes introduce true private variables

They do not, except with `#` syntax.

---

## 11. Private Fields

```js
class User {
  #id = 10;

  getId() {
    return this.#id;
  }
}
```

### Notes

- Truly private  
- Not accessible outside the class  
- Not widely tested yet, but good to know  

---

## 12. Quick Practice

### Question 1

```js
class A {
  constructor() {
    console.log("A");
  }
}

class B extends A {
  constructor() {
    console.log("B");
  }
}

new B();
```

Answer: Runtime error because `super()` is missing.

---

### Question 2

```js
class A {
  say() {
    console.log("A");
  }
}

class B extends A {
  say() {
    super.say();
    console.log("B");
  }
}

new B().say();
```

Answer:

```
A
B
```

---

### Question 3

Can static methods access instance variables?

Answer: No. Static methods do not have access to instance state.

---

## Summary

- Classes are syntax sugar over prototypes  
- `extends` and `super` control inheritance  
- Methods are shared across instances  
- Static members belong to the class  
- `this` behaves the same as normal functions  
- Interviews test correct usage, not internals  

---

## Questions

90596, 90595, 90585, 89279, 91335

Class 2.2.4:
  Title: JavaScript Core Concepts & Internals Contest
  Description: Test your understanding of JavaScript execution, scope, context, and core language internals through focused coding challenges.
  Content Type: contest
  Duration: 3600
  Order: 4
  Contest URL: https://www.scaler.com/test/a/jssetb
  Contest Questions: 6
  Contest Syllabus: 
    - Hoisting and lexical scope
    - Function context and prototypes
    - Encapsulation in JavaScript
    - Polyfills: call and bind



Topic 2.3
Title: Async Programming
 Order: 3
Class 2.3.1
Title: Event Loop
 Description: Understand microtasks, macrotasks, and async execution order.
 Content Type: Text
 Duration: 300
 Order: 1
Text Content:

# Event Loop, Microtasks, and Macrotasks

## Overview

JavaScript is single threaded, yet it can handle asynchronous operations like timers, network calls, and promises.  
This is made possible by the Event Loop, which coordinates between the call stack, browser or runtime APIs, and task queues.

The event loop is one of the most frequently tested JavaScript topics in interviews, especially through output prediction questions.

---

## 1. The Big Picture

At a high level, JavaScript execution involves:

- Call Stack  
- Browser or Node.js APIs  
- Task Queues  
- Event Loop  

The event loop continuously checks whether the call stack is empty and decides what should run next.

---

## 2. Call Stack Recap

- The call stack executes synchronous code  
- Only one function runs at a time  
- Async callbacks do not run directly on the stack  

### Example

```js
console.log("A");
console.log("B");
```

Output:

```
A
B
```

---

## 3. Web APIs and Asynchronous Tasks

When JavaScript encounters async operations, they are delegated to runtime APIs.

### Examples of async operations

- setTimeout  
- setInterval  
- fetch  
- DOM events  

### Example

```js
console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 1000);

console.log("end");
```

### Execution flow

- start logged  
- setTimeout handed to Web API  
- end logged  
- After delay, callback is queued  
- Callback waits until stack is empty  

---

## 4. Task Queues

There are two main task queues:

- Macrotask Queue  
- Microtask Queue  

The event loop decides which queue to process first.

---

## 5. Macrotasks

Macrotasks include:

- setTimeout  
- setInterval  
- setImmediate (Node.js)  
- UI rendering tasks  

### Example

```js
setTimeout(() => {
  console.log("timer");
}, 0);
```

Even with zero delay, the callback does not run immediately.

---

## 6. Microtasks

Microtasks have higher priority than macrotasks.

Microtasks include:

- Promise.then  
- Promise.catch  
- Promise.finally  
- queueMicrotask  

### Example

```js
Promise.resolve().then(() => {
  console.log("promise");
});
```

Microtasks are executed:

- After the current call stack finishes  
- Before any macrotask is executed  

---

## 7. Execution Order Rule (Very Important)

The event loop follows this rule:

1. Execute synchronous code  
2. Empty the microtask queue completely  
3. Execute one macrotask  
4. Repeat  

This rule explains almost all output based interview questions.

---

## 8. Microtask vs Macrotask Example

```js
console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");
```

### Step by step

- start logged  
- setTimeout callback registered  
- promise callback registered  
- end logged  
- microtask queue executes promise  
- macrotask queue executes timeout  

Output:

```
start
end
promise
timeout
```

---

## 9. Nested Microtasks

Microtasks can schedule more microtasks.

```js
Promise.resolve().then(() => {
  console.log("A");
  return Promise.resolve();
}).then(() => {
  console.log("B");
});
```

Output:

```
A
B
```

The microtask queue is fully drained before moving on.

---

## 10. Starvation of Macrotasks

If microtasks keep adding more microtasks, macrotasks can be delayed.

```js
function loop() {
  Promise.resolve().then(loop);
}

loop();
```

This can block timers and UI updates.

Interviewers may ask why timers stop working in such cases.

---

## 11. setTimeout vs Promise Timing

```js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
```

Output:

```
promise
timeout
```

Reason: microtasks run before macrotasks.

---

## 12. Event Loop and Rendering

In browsers:

- Rendering happens between macrotasks  
- Microtasks run before rendering  

This is why heavy microtask chains can block UI updates.

---

## 13. Common Interview Traps

### Trap 1  
Assuming setTimeout with 0 runs immediately

### Trap 2  
Forgetting microtasks have priority over timers

### Trap 3  
Mixing promises and timers without understanding order

### Trap 4  
Thinking async makes code multi threaded

JavaScript still has one call stack.

---

## 14. Interview Output Prediction Practice

### Question 1

```js
console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => console.log(3));

console.log(4);
```

Answer:

```
1
4
3
2
```

---

### Question 2

```js
Promise.resolve().then(() => {
  console.log("A");
  setTimeout(() => console.log("B"), 0);
});

setTimeout(() => console.log("C"), 0);
```

Answer:

```
A
B
C
```

Explanation:

- A runs in microtask  
- B is scheduled first macrotask  
- C is scheduled after  

---

## 15. Summary

- JavaScript is single threaded  
- Async tasks are handled via the event loop  
- Microtasks have higher priority than macrotasks  
- Promise callbacks run before timers  
- Understanding execution order is critical for interviews  

---

## Questions

259508, 100464, 93817, 231039, 93790, 100522


Class 2.3.2
Title: Promises & Chaining
 Description: Write and reason about promise-based asynchronous code.
 Content Type: Text
 Duration: 300
 Order: 2
Text Content:

# Promises, States, and Chaining Patterns

## Overview

Promises are the foundation of modern asynchronous JavaScript.  
They represent a value that may be available now, later, or never.

Interviews heavily test:

- Promise states  
- Chaining behavior  
- Error propagation  
- Interaction with `then`, `catch`, `finally`  
- Output based reasoning  

Understanding promises deeply makes `async` and `await` trivial later.

---

## 1. What Is a Promise

A Promise is an object that represents the eventual result of an asynchronous operation.

A promise can be in one of three states:

- pending  
- fulfilled  
- rejected  

Once a promise is fulfilled or rejected, it is **settled** and cannot change state again.

---

## 2. Creating a Promise

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("done");
  } else {
    reject("failed");
  }
});
```

Key points:

- The executor function runs immediately  
- `resolve` moves the promise to fulfilled  
- `reject` moves the promise to rejected  

---

## 3. Consuming a Promise

```js
promise
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  });
```

- `then` handles the fulfilled state  
- `catch` handles the rejected state  

---

## 4. `then` Always Returns a New Promise

This is the most important concept for chaining.

```js
const p = Promise.resolve(10);

const p2 = p.then(value => {
  return value * 2;
});

p2.then(result => {
  console.log(result);
});
```

Output:

```
20
```

Every `then` creates and returns a **new promise**.

---

## 5. Promise Chaining

Chaining allows sequential async operations.

```js
Promise.resolve(5)
  .then(value => value * 2)
  .then(value => value * 3)
  .then(result => console.log(result));
```

Output:

```
30
```

Each `then` receives the return value of the previous `then`.

---

## 6. Returning a Promise Inside `then`

If a `then` callback returns a promise, the chain waits for it.

```js
Promise.resolve()
  .then(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(10), 1000);
    });
  })
  .then(value => {
    console.log(value);
  });
```

The second `then` waits until the inner promise resolves.

---

## 7. Error Handling in Promises

Errors propagate down the chain until caught.

```js
Promise.resolve()
  .then(() => {
    throw new Error("something went wrong");
  })
  .then(() => {
    console.log("will not run");
  })
  .catch(err => {
    console.log(err.message);
  });
```

Output:

```
something went wrong
```

---

## 8. `catch` Is Just `then` With a Rejection Handler

```js
promise.catch(err => console.log(err));
```

Is equivalent to:

```js
promise.then(null, err => console.log(err));
```

`catch` also returns a promise, so chaining continues.

---

## 9. `finally`

`finally` runs regardless of success or failure.

```js
Promise.resolve("ok")
  .finally(() => {
    console.log("cleanup");
  })
  .then(value => {
    console.log(value);
  });
```

Output:

```
cleanup
ok
```

Important points:

- `finally` does not receive the resolved value  
- `finally` does not modify the chain unless it throws  

---

## 10. Promise Resolution Rules (Interview Critical)

If a promise resolves with:

- a value → fulfilled with that value  
- a promise → adopts that promise’s state  

Example:

```js
Promise.resolve(
  Promise.resolve(5)
).then(console.log);
```

Output:

```
5
```

Promises flatten automatically.

---

## 11. Common Interview Traps

### Trap 1: Forgetting to return in `then`

```js
Promise.resolve(5)
  .then(value => {
    value * 2;
  })
  .then(console.log);
```

Output:

```
undefined
```

Reason: nothing is returned from the first `then`.

---

### Trap 2: `catch` placement

```js
Promise.reject("error")
  .then(() => console.log("A"))
  .catch(() => console.log("B"))
  .then(() => console.log("C"));
```

Output:

```
B
C
```

`catch` handles the error and the chain continues.

---

### Trap 3: `throw` vs `reject`

```js
.then(() => {
  throw new Error("fail");
});
```

Is equivalent to:

```js
.then(() => {
  return Promise.reject("fail");
});
```

---

## 12. Promise and Event Loop Interaction

Promise callbacks go to the **microtask queue**.

```js
console.log("start");

Promise.resolve().then(() => console.log("promise"));

console.log("end");
```

Output:

```
start
end
promise
```

This explains why promises run before timers.

---

## 13. Converting Callback Code to Promises

Callback-based version:

```js
function getData(callback) {
  setTimeout(() => callback("data"), 1000);
}
```

Promise-based version:

```js
function getData() {
  return new Promise(resolve => {
    setTimeout(() => resolve("data"), 1000);
  });
}
```

---

## 14. Interview Practice Questions

### Question 1

```js
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => Promise.resolve(x + 1))
  .then(x => { throw x; })
  .catch(x => console.log(x));
```

Answer:

```
3
```

---

### Question 2

```js
Promise.resolve()
  .then(() => console.log("A"))
  .then(() => Promise.reject("B"))
  .catch(err => console.log(err))
  .then(() => console.log("C"));
```

Answer:

```
A
B
C
```

---

## 15. Summary

- Promises represent future values  
- `then` always returns a new promise  
- Returning a value resolves the next promise  
- Returning a promise pauses the chain  
- Errors propagate until caught  
- `finally` runs regardless of outcome  

---

## Questions

93808, 93816, 93817, 259508


Class 2.3.3
Title: Promise.all, allSettled, race & any
 Description: Use Promise combinators for concurrent async workflows.
 Content Type: Text
 Duration: 300
 Order: 3
Text Content:

# Promise Combinators: all, allSettled, race, and any

## Overview

In real applications, we often deal with multiple asynchronous operations at the same time.  
Promise combinators help coordinate these operations.

Interviews frequently test:

- when to use each combinator  
- what happens on failure  
- execution order  
- returned values  

Understanding these correctly avoids subtle bugs.

---

## 1. Promise.all

`Promise.all` waits for all promises to fulfill.

```js
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);

Promise.all([p1, p2]).then(values => {
  console.log(values);
});
```

Output:

```
[10, 20]
```

### Key points

- Resolves with an array of values  
- Order is preserved  
- Rejects immediately if any promise rejects  

---

## 2. Promise.all Failure Case

```js
const p1 = Promise.resolve(10);
const p2 = Promise.reject("error");

Promise.all([p1, p2])
  .then(console.log)
  .catch(console.log);
```

Output:

```
error
```

Even if `p1` succeeds, the combined promise rejects.

---

## 3. Order Guarantee in Promise.all

```js
const p1 = new Promise(res => setTimeout(() => res(1), 100));
const p2 = new Promise(res => setTimeout(() => res(2), 10));

Promise.all([p1, p2]).then(console.log);
```

Output:

```
[1, 2]
```

Order depends on the input array, not completion time.

---

## 4. When to Use Promise.all

Use when:

- All operations must succeed  
- Results are required together  
- Failure of one means failure of the whole task  

Common use case:

- Fetching user, orders, and settings together  

---

## 5. Promise.allSettled

`Promise.allSettled` waits for all promises to settle, regardless of success or failure.

```js
const p1 = Promise.resolve("ok");
const p2 = Promise.reject("fail");

Promise.allSettled([p1, p2]).then(results => {
  console.log(results);
});
```

Output:

```
[
  { status: "fulfilled", value: "ok" },
  { status: "rejected", reason: "fail" }
]
```

### Key points

- Never rejects  
- Provides status for each promise  
- Order preserved  

---

## 6. When to Use Promise.allSettled

Use when:

- You need results of all operations  
- Partial failures are acceptable  
- You want error reporting per task  

Common interview example:

- Batch uploads where some can fail  

---

## 7. Promise.race

`Promise.race` settles as soon as any promise settles.

```js
const p1 = new Promise(res => setTimeout(() => res("slow"), 100));
const p2 = new Promise(res => setTimeout(() => res("fast"), 10));

Promise.race([p1, p2]).then(console.log);
```

Output:

```
fast
```

If the first settled promise rejects, the race rejects.

---

## 8. Promise.race Failure Case

```js
const p1 = new Promise((_, rej) => setTimeout(() => rej("fail"), 10));
const p2 = new Promise(res => setTimeout(() => res("ok"), 50));

Promise.race([p1, p2])
  .then(console.log)
  .catch(console.log);
```

Output:

```
fail
```

---

## 9. When to Use Promise.race

Use when:

- You want the fastest response  
- You want to implement timeouts  
- First result matters  

### Example: timeout wrapper

```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject("timeout"), ms)
  );

  return Promise.race([promise, timeout]);
}
```

---

## 10. Promise.any

`Promise.any` resolves when any promise fulfills.

```js
const p1 = Promise.reject("error");
const p2 = Promise.resolve("success");

Promise.any([p1, p2]).then(console.log);
```

Output:

```
success
```

### Key points

- Ignores rejected promises  
- Resolves on first success  
- Rejects only if all promises reject  

---

## 11. Promise.any Failure Case

```js
Promise.any([
  Promise.reject("A"),
  Promise.reject("B")
]).catch(console.log);
```

Output:

```
AggregateError: All promises were rejected
```

`AggregateError` contains all rejection reasons.

---

## 12. Comparison Summary (Interview Gold)

| Method        | Resolves When        | Rejects When        |
|---------------|----------------------|---------------------|
| Promise.all   | All fulfill          | Any rejects         |
| allSettled    | All settle           | Never               |
| race          | First settles        | First settles       |
| any           | First fulfills       | All reject          |

---

## 13. Common Interview Traps

### Trap 1  
Thinking `Promise.race` waits for all promises.

### Trap 2  
Expecting `Promise.any` to reject on first failure.

### Trap 3  
Assuming `Promise.all` preserves completion order.

### Trap 4  
Using `Promise.all` where partial failure is acceptable.

---

## 14. Output Prediction Practice

### Question 1

```js
Promise.all([
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3)
]).catch(console.log);
```

Answer:

```
2
```

---

### Question 2

```js
Promise.any([
  new Promise(res => setTimeout(() => res("A"), 50)),
  new Promise(res => setTimeout(() => res("B"), 10))
]).then(console.log);
```

Answer:

```
B
```

---

## 15. Summary

- `Promise.all` requires all to succeed  
- `Promise.allSettled` captures all outcomes  
- `Promise.race` returns the first settled result  
- `Promise.any` returns the first successful result  
- Choosing the correct combinator is frequently tested  

---

## Questions

80858, 80868, 93817, 93808


Class 2.3.4
Title: Async/Await & Error Handling
 Description: Simplify asynchronous code using async/await and proper error handling.
 Content Type: Text
 Duration: 300
 Order: 4
Text Content:

# Async and Await with Error Handling

## Overview

`async` and `await` are syntax features built on top of promises.  
They make asynchronous code easier to read and reason about by writing it in a synchronous style.

Interviews test:

- how async and await work internally  
- execution order  
- error handling  
- common misuse patterns  

Understanding async and await requires a strong promise foundation, which we have already covered.

---

## 1. What Does `async` Do

Declaring a function as `async` means:

- the function always returns a promise  
- returning a value resolves the promise  
- throwing an error rejects the promise  

### Example

```js
async function getValue() {
  return 10;
}

getValue().then(console.log);
```

Output:

```
10
```

Internally, returning `10` is equivalent to resolving a promise with `10`.

---

## 2. What Does `await` Do

`await` pauses execution of the async function until the promise settles.

```js
async function fetchData() {
  const data = await Promise.resolve("data");
  console.log(data);
}
```

Important points:

- `await` can be used only inside async functions  
- it pauses only the current async function, not the entire program  

---

## 3. `async` and `await` Are Syntax Over Promises

Promise-based code:

```js
function getData() {
  return Promise.resolve(5);
}

getData().then(value => {
  console.log(value);
});
```

Equivalent async-await version:

```js
async function getData() {
  return 5;
}

const value = await getData();
```

Understanding this equivalence is important for interviews.

---

## 4. Sequential Execution with `await`

```js
async function process() {
  const a = await Promise.resolve(1);
  const b = await Promise.resolve(2);
  console.log(a + b);
}
```

Execution behavior:

- second `await` waits for first to complete  
- total time is the sum of both async operations  

This is a common performance pitfall.

---

## 5. Parallel Execution Using `Promise.all`

```js
async function process() {
  const [a, b] = await Promise.all([
    Promise.resolve(1),
    Promise.resolve(2)
  ]);

  console.log(a + b);
}
```

Both promises execute in parallel.

Interviewers often ask candidates to optimize sequential `await` code using this pattern.

---

## 6. Error Handling with `try` and `catch`

```js
async function fetchData() {
  try {
    const result = await Promise.reject("error");
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
```

`try catch` handles:

- rejected promises  
- thrown errors inside async functions  

---

## 7. Error Propagation Without `try catch`

```js
async function run() {
  await Promise.reject("fail");
}

run().catch(console.log);
```

If an error is not caught inside the async function, it propagates to the caller.

---

## 8. Mixing `await` and `then` (Interview Trap)

```js
async function run() {
  return await Promise.resolve(5);
}
```

This is equivalent to:

```js
async function run() {
  return 5;
}
```

Using `return await` is usually unnecessary unless you want to catch errors inside `try catch`.

---

## 9. Async Function Execution Order

```js
console.log("start");

async function test() {
  console.log("inside");
  await Promise.resolve();
  console.log("after await");
}

test();
console.log("end");
```

Output:

```
start
inside
end
after await
```

Reason:

- `await` pauses the async function  
- remaining code runs as a microtask  

---

## 10. Multiple `await` and the Event Loop

```js
async function run() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
  await Promise.resolve();
  console.log("C");
}

run();
```

Output:

```
A
B
C
```

Each `await` yields control back to the event loop.

---

## 11. Common Interview Traps

### Trap 1: Forgetting `await`

```js
const data = fetchData();
console.log(data);
```

Output:

```
Promise { <pending> }
```

---

### Trap 2: Using `await` at top level (older environments)

`await` works only inside async functions unless top-level await is supported.

---

### Trap 3: Sequential awaits causing performance issues

Using `await` inside loops without `Promise.all`.

---

### Trap 4: `try catch` not catching async errors

```js
try {
  setTimeout(() => {
    throw new Error("fail");
  }, 0);
} catch (e) {
  console.log(e);
}
```

The error is not caught because it occurs asynchronously.

---

## 12. Converting Promise Chains to `async await`

Promise-based version:

```js
getUser()
  .then(user => getOrders(user))
  .then(orders => processOrders(orders))
  .catch(console.log);
```

Async-await version:

```js
async function run() {
  try {
    const user = await getUser();
    const orders = await getOrders(user);
    processOrders(orders);
  } catch (e) {
    console.log(e);
  }
}
```

---

## 13. Interview Practice

### Question 1

```js
async function test() {
  return Promise.resolve(10);
}

test().then(console.log);
```

Answer:

```
10
```

---

### Question 2

```js
async function test() {
  throw "error";
}

test().catch(console.log);
```

Answer:

```
error
```

---

### Question 3

```js
async function test() {
  await Promise.reject("fail");
  console.log("A");
}

test().catch(console.log);
```

Answer:

```
fail
```

---

## 14. Summary

- async functions always return promises  
- await pauses the async function, not the program  
- try catch handles rejected promises  
- Promise.all is required for parallel execution  
- async and await simplify promise chains but do not replace understanding  

---

## Questions

80872, 93817, 80858, 259508


Class 2.3.5
Title: Timers, Debounce & Throttle
 Description: Control function execution timing in performance-sensitive scenarios.
 Content Type: Text
 Duration: 300
 Order: 5
Text Content:

# Timers, Debounce, and Throttle in JavaScript

## Overview

Timers and rate limiting patterns are used to control **when** and **how often** code executes.  
They are extremely common in UI interactions, performance optimization, and machine coding rounds.

Interviews test:

- understanding of timers  
- ability to implement debounce and throttle  
- correct choice between debounce and throttle  
- edge cases and cleanup  

---

## 1. Timers in JavaScript

JavaScript provides two primary timer APIs:

- `setTimeout`
- `setInterval`

These APIs schedule callbacks to run later via the **event loop**.  
They do not block the call stack.

---

## 2. setTimeout

`setTimeout` schedules a function to run **once** after a delay.

```js
setTimeout(() => {
  console.log("executed");
}, 1000);
```

### Important points

- Delay is a **minimum** time, not an exact guarantee  
- Callback runs only after the call stack is empty  
- Returns a timer id  

### Canceling a timeout

```js
const id = setTimeout(() => console.log("run"), 1000);
clearTimeout(id);
```

---

## 3. setInterval

`setInterval` runs a function repeatedly at a fixed interval.

```js
const id = setInterval(() => {
  console.log("tick");
}, 1000);
```

### Stopping the interval

```js
clearInterval(id);
```

### Important notes

- If callback execution takes longer than the interval, delays accumulate  
- Not suitable for precise timing  
- Can cause overlapping executions  

---

## 4. setTimeout vs setInterval (Interview Favorite)

Using recursive `setTimeout` instead of `setInterval`:

```js
function poll() {
  setTimeout(() => {
    console.log("tick");
    poll();
  }, 1000);
}

poll();
```

### Why this is preferred

- Next execution starts only after the previous one completes  
- Prevents overlapping executions  
- Gives better control over timing  

Interviewers frequently ask why this pattern is safer.

---

## 5. Why Debounce and Throttle Are Needed

Without rate limiting, events like:

- scroll  
- resize  
- keypress  

can fire **hundreds of times per second**.

Problems caused:

- unnecessary API calls  
- performance issues  
- UI lag  

Debounce and throttle solve this by controlling execution frequency.

---

## 6. Debounce

Debounce delays execution until activity stops for a specified time.

### Typical use cases

- search input  
- resize handling  
- auto save  

### Behavior

- timer resets on every call  
- function executes only after delay passes with no new calls  

---

## 7. Debounce Implementation

```js
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### Usage

```js
const onSearch = debounce((text) => {
  console.log(text);
}, 300);
```

---

## 8. Debounce Behavior Illustration

User types:

```
a → ab → abc
```

Only after the user stops typing for `300ms` does the function execute **once**.

---

## 9. Throttle

Throttle ensures a function runs **at most once** in a given interval.

### Typical use cases

- scroll tracking  
- button click protection  
- window resize events  

### Behavior

- executes immediately or at fixed intervals  
- ignores calls in between  

---

## 10. Throttle Implementation

```js
function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```

### Usage

```js
const onScroll = throttle(() => {
  console.log("scroll");
}, 200);
```

---

## 11. Debounce vs Throttle Comparison

| Aspect | Debounce | Throttle |
|------|---------|----------|
| Execution | After inactivity | At fixed rate |
| Use case | Search, resize | Scroll, click |
| Calls | One final call | Periodic calls |

This comparison table is frequently expected in interviews.

---

## 12. Leading and Trailing Options (Advanced)

Debounce with immediate execution:

```js
function debounce(fn, delay, immediate = false) {
  let timer;

  return function (...args) {
    const callNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);

    if (callNow) fn.apply(this, args);
  };
}
```

Interviewers may ask about **leading** and **trailing** behavior.

---

## 13. Common Interview Traps

### Trap 1  
Confusing debounce with throttle.

### Trap 2  
Forgetting to preserve `this` and arguments.

### Trap 3  
Not clearing timers, leading to memory leaks.

### Trap 4  
Using debounce for scroll events where throttle is required.

---

## 14. Machine Coding Expectations

In machine coding rounds, interviewers expect:

- clean debounce or throttle implementation  
- correct usage in event handlers  
- no global variables  
- proper cleanup  

---

## 15. Practice Questions

### Question 1  
Implement a debounce function.

Expected:

- closure  
- timer reset logic  

---

### Question 2  
When would throttle be preferred over debounce?

Answer:

- when continuous feedback is required, such as scroll position  

---

### Question 3  
Why is recursive `setTimeout` preferred over `setInterval`?

Answer:

- avoids overlapping execution  
- better control over timing  

---

## 16. Summary

- Timers schedule callbacks via the event loop  
- `setTimeout` runs once, `setInterval` runs repeatedly  
- Debounce delays execution until inactivity  
- Throttle limits execution rate  
- Choosing correctly improves performance and user experience  

---

## Questions

66275, 66277, 259515, 93792, 93790


Topic 2.4
Title: Browser & DOM APIs
 Order: 4
Class 2.4.1
Title: DOM Manipulation
 Description: Read and update the DOM using JavaScript APIs.
 Content Type: Text
 Duration: 300
 Order: 1
Text Content:

# DOM Manipulation in JavaScript

## Overview

The DOM (Document Object Model) is a tree representation of an HTML document.  
JavaScript interacts with web pages by reading from and writing to the DOM.

Interviews and machine coding rounds frequently test:

- selecting elements  
- updating content  
- handling attributes and styles  
- understanding performance implications  

---

## 1. What Is the DOM

When a browser loads an HTML page:

- it parses HTML  
- creates a tree of nodes  
- exposes this tree as the DOM  

JavaScript uses the DOM API to:

- read elements  
- modify structure  
- respond to user interactions  

---

## 2. Selecting DOM Elements

### getElementById

```js
const title = document.getElementById("title");
```

Returns:

- a single element  
- or `null` if not found  

---

### getElementsByClassName

```js
const items = document.getElementsByClassName("item");
```

Returns:

- an `HTMLCollection`  
- a live collection that updates automatically  

---

### querySelector

```js
const firstItem = document.querySelector(".item");
```

Returns:

- first matching element  
- supports full CSS selectors  

---

### querySelectorAll

```js
const allItems = document.querySelectorAll(".item");
```

Returns:

- a static `NodeList`  
- does not auto update  

Interview trap:  
`HTMLCollection` is live, `NodeList` is static.

---

## 3. Reading and Updating Content

### innerText

```js
element.innerText = "Hello";
```

- respects CSS  
- triggers layout recalculation  

---

### textContent

```js
element.textContent = "Hello";
```

- faster  
- ignores styling  
- preferred for performance  

---

### innerHTML

```js
element.innerHTML = "<strong>Hello</strong>";
```

- parses HTML  
- security risk if used with user input  
- slower  

Interviewers often ask when **not** to use `innerHTML`.

---

## 4. Creating and Inserting Elements

```js
const div = document.createElement("div");
div.textContent = "New Item";

document.body.appendChild(div);
```

Common methods:

- `appendChild`  
- `append`  
- `prepend`  
- `remove`  

---

## 5. Removing Elements

```js
element.remove();
```

Or using parent:

```js
parent.removeChild(child);
```

---

## 6. Working with Attributes

### getAttribute and setAttribute

```js
element.setAttribute("data-id", "123");
console.log(element.getAttribute("data-id"));
```

---

### Direct Property Access

```js
input.value = "text";
img.src = "image.png";
```

Preferred when the property exists.

---

## 7. Class Manipulation

```js
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("open");
```

`classList` is safer than modifying `className` directly.

---

## 8. Styling Elements

```js
element.style.backgroundColor = "red";
```

Notes:

- inline styles override CSS  
- not recommended for large scale styling  

Better approach:

- toggle CSS classes  

---

## 9. Traversing the DOM

Common properties:

- `parentElement`  
- `children`  
- `firstElementChild`  
- `nextElementSibling`  

Example:

```js
element.parentElement.children;
```

Used heavily in event delegation.

---

## 10. DOM Updates and Performance

DOM operations are expensive.

Problems:

- frequent reflows  
- layout thrashing  

### Bad pattern

```js
for (let i = 0; i < 1000; i++) {
  element.innerHTML += "<div></div>";
}
```

---

### Better pattern

```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  fragment.appendChild(div);
}

element.appendChild(fragment);
```

Batching updates improves performance.

---

## 11. Reflow and Repaint

Reflow happens when layout changes.  
Repaint happens when visual appearance changes.

Examples:

- width change triggers reflow  
- color change triggers repaint  

Minimizing reflow improves performance.

---

## 12. DOM Manipulation in Machine Coding

Interview expectations:

- clean selectors  
- minimal DOM access  
- use `classList`  
- avoid `innerHTML` for logic  
- batch DOM updates  

---

## 13. Common Interview Traps

### Trap 1  
Using `innerHTML` with user input.

### Trap 2  
Querying the DOM repeatedly inside loops.

### Trap 3  
Not understanding live vs static collections.

### Trap 4  
Inline styling instead of CSS classes.

---

## 14. Quick Practice

### Question 1

Select all list items and change text.

```js
document.querySelectorAll("li").forEach(li => {
  li.textContent = "Updated";
});
```

---

### Question 2

Add a class only if not present.

```js
element.classList.add("active");
```

---

### Question 3

Remove all children of an element.

Simple approach:

```js
element.innerHTML = "";
```

Better approach:

```js
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

---

## 15. Summary

- DOM is a tree representation of HTML  
- `querySelector` APIs are preferred  
- `textContent` is safer and faster  
- `classList` is the correct way to manage classes  
- DOM operations are expensive and should be minimized  

---

## Questions

55127, 55133, 55126, 65296, 55151, 55148, 55147, 81343, 55150, 65297


Class 2.4.2
Title: Event Delegation
 Description: Handle events efficiently using delegation patterns.
 Content Type: Text
 Duration: 300
 Order: 2
Text Content:

# Event Delegation in JavaScript

## Overview

Event delegation is a pattern where a single event listener is attached to a parent element to handle events from its child elements.

This works because of **event bubbling**, where events propagate from the target element up through its ancestors.

Event delegation is heavily tested in:

- interviews  
- machine coding rounds  
- performance discussions  

---

## 1. Event Flow in the Browser

When an event occurs, it goes through three phases:

1. Capturing phase  
2. Target phase  
3. Bubbling phase  

### Default behavior

- Most events bubble up  
- Capturing is optional  

---

## 2. Event Bubbling

In bubbling, the event starts from the target element and moves upward through its ancestors.

```html
<div id="parent">
  <button id="child">Click</button>
</div>
```

```js
document.getElementById("child").addEventListener("click", () => {
  console.log("child");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("parent");
});
```

Clicking the button prints:

```
child
parent
```

---

## 3. Event Capturing

Capturing moves from the outer element to the inner element.

```js
parent.addEventListener(
  "click",
  () => {
    console.log("parent capture");
  },
  true
);
```

Using `true` enables capturing.

### Order

```
parent capture
child
parent bubble
```

Capturing is rarely used in practice.

---

## 4. What Is Event Delegation

Instead of attaching event listeners to many child elements, attach a single listener to the parent.

### Bad approach

```js
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", handleClick);
});
```

### Better approach

```js
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log(e.target.textContent);
  }
});
```

This pattern is called **event delegation**.

---

## 5. Why Event Delegation Works

Event delegation works because:

- events bubble up  
- the parent receives events from its children  
- the event object contains the original target  

Key properties:

- `event.target`  
- `event.currentTarget`  

---

## 6. target vs currentTarget (Interview Favorite)

```js
parent.addEventListener("click", (e) => {
  console.log(e.target);
  console.log(e.currentTarget);
});
```

- `target` is the actual element that was clicked  
- `currentTarget` is the element where the listener is attached  

Confusing these two is a very common interview mistake.

---

## 7. Handling Dynamic Elements

Event delegation works perfectly when elements are added dynamically.

```js
const list = document.getElementById("list");

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    console.log("item clicked");
  }
});
```

Items added later automatically work without adding new listeners.

---

## 8. Stopping Event Propagation

```js
e.stopPropagation();
```

Stops the event from bubbling further.

```js
e.preventDefault();
```

Prevents the default browser behavior.

Interviewers often ask the difference between these two.

---

## 9. Delegation with Nested Elements

Clicks may happen on nested elements.

```html
<li>
  <span>Item</span>
</li>
```

Robust approach using `closest`:

```js
const item = e.target.closest("li");

if (item) {
  console.log(item.textContent);
}
```

This ensures delegation works even with nested markup.

---

## 10. Performance Benefits

Without delegation:

- many event listeners  
- higher memory usage  

With delegation:

- a single event listener  
- better performance  
- easier cleanup  

This is critical for large lists and tables.

---

## 11. Events That Do Not Bubble

Some events do not bubble:

- focus  
- blur  
- mouseenter  
- mouseleave  

Alternatives:

- `focusin` and `focusout`  
- `mouseover` and `mouseout`  

This is commonly tested in interviews.

---

## 12. Event Delegation in Machine Coding

Common use cases:

- todo lists  
- table row actions  
- dropdown menus  
- tabs  
- pagination  

Interviewers expect:

- one listener  
- clean conditional checks  
- no inline event handlers  

---

## 13. Common Interview Traps

### Trap 1  
Using `event.target` without validating the element type.

### Trap 2  
Attaching listeners to every child unnecessarily.

### Trap 3  
Breaking delegation by using `stopPropagation` unintentionally.

### Trap 4  
Forgetting that some events do not bubble.

---

## 14. Practice Questions

### Question 1  
Why is event delegation better than multiple listeners?

Expected points:

- performance  
- memory efficiency  
- dynamic element handling  

---

### Question 2  
What is the difference between `target` and `currentTarget`?

Expected:

- `target` is the origin element  
- `currentTarget` is the listener element  

---

### Question 3  
How do you handle clicks on nested elements?

Expected:

- use `closest`  

---

## 15. Summary

- Events flow through capture, target, and bubble phases  
- Event delegation uses bubbling to handle child events  
- `target` and `currentTarget` are different  
- Delegation improves performance and scalability  
- Essential for machine coding rounds  

---

## Questions

259517, 55151, 81344, 56086, 84477


Class 2.4.3
Title: LocalStorage & SessionStorage
 Description: Persist data in the browser using Web Storage APIs.
 Content Type: Text
 Duration: 300
 Order: 3
Text Content:

# LocalStorage and SessionStorage in JavaScript

## Overview

Browsers provide simple key value storage mechanisms to persist data on the client side.  
`localStorage` and `sessionStorage` are part of the **Web Storage API**.

They are frequently tested in interviews to check:

- understanding of client side persistence  
- differences between storage options  
- correct use cases  
- security awareness  

---

## 1. What Is Web Storage

Web Storage allows storing data in the browser as key value pairs.

### Characteristics

- data is stored as strings  
- storage is synchronous  
- data is scoped per origin  

### Types

- localStorage  
- sessionStorage  

---

## 2. localStorage

`localStorage` stores data with **no expiration**.

### Data persists

- across page reloads  
- across browser restarts  

### Example

```js
localStorage.setItem("theme", "dark");
```

### Reading data

```js
const theme = localStorage.getItem("theme");
```

### Removing data

```js
localStorage.removeItem("theme");
```

### Clearing all data

```js
localStorage.clear();
```

---

## 3. sessionStorage

`sessionStorage` stores data for a **single browser session**.

### Data persists

- across page reloads  
- until the tab or window is closed  

### Example

```js
sessionStorage.setItem("token", "abc123");
```

Once the tab is closed, the data is removed automatically.

---

## 4. Key Differences (Interview Favorite)

| Feature | localStorage | sessionStorage |
|------|-------------|----------------|
| Lifetime | Permanent | Per tab |
| Scope | Same origin | Same origin + tab |
| Storage limit | ~5MB | ~5MB |
| Auto clear | No | Yes on tab close |

This table is often expected in interviews.

---

## 5. Storing Objects

Only strings can be stored.

### Writing objects

```js
const user = { name: "Asha", role: "admin" };
localStorage.setItem("user", JSON.stringify(user));
```

### Reading objects

```js
const user = JSON.parse(localStorage.getItem("user"));
```

Forgetting `JSON.parse` is a very common mistake.

---

## 6. Storage Events

Storage events fire when storage changes in **another tab**.

```js
window.addEventListener("storage", (e) => {
  console.log(e.key, e.newValue);
});
```

### Notes

- fires only across tabs  
- does not fire in the same tab  

Useful for multi tab synchronization.

---

## 7. Common Use Cases

### localStorage

- theme preference  
- user settings  
- cached UI state  

### sessionStorage

- form state  
- temporary tokens  
- multi step flows  

Interviewers often ask when to choose which.

---

## 8. What Not to Store

Do not store:

- sensitive data  
- passwords  
- auth tokens without encryption  

### Reasons

- accessible via JavaScript  
- vulnerable to XSS attacks  

This is an important security discussion point.

---

## 9. localStorage vs Cookies (High Level)

| Aspect | localStorage | Cookies |
|------|-------------|---------|
| Size | Larger | Smaller |
| Sent with requests | No | Yes |
| Expiry control | Manual | Built in |
| Security flags | No | Yes |

Interviewers may ask why cookies are still used for authentication.

---

## 10. Performance Considerations

- storage APIs are synchronous  
- excessive reads and writes can block the main thread  
- avoid frequent operations inside loops  

For large data, **IndexedDB** is preferred.

---

## 11. Common Interview Traps

### Trap 1  
Assuming storage is shared across domains.

### Trap 2  
Forgetting data is stored as strings.

### Trap 3  
Using localStorage for sensitive information.

### Trap 4  
Expecting storage events in the same tab.

---

## 12. Machine Coding Expectations

In machine coding rounds:

- use storage to persist state  
- restore state on reload  
- handle JSON parsing safely  
- clean up unused keys  

---

## 13. Practice Questions

### Question 1  
What happens to sessionStorage on page reload?

Answer:  
Data persists.

---

### Question 2  
What happens on closing the tab?

Answer:  
`sessionStorage` is cleared.

---

### Question 3  
Can localStorage store numbers directly?

Answer:  
No. Values are stored as strings.

---

## 14. Summary

- Web Storage stores key value pairs as strings  
- localStorage persists indefinitely  
- sessionStorage lasts per tab  
- JSON.stringify and JSON.parse are required for objects  
- Storage APIs are synchronous and origin scoped  

---

## Questions

84478, 84480, 84482, 84483, 81343

Class 2.4.4
Title: Fetch API
 Description: Make HTTP requests using the Fetch API.
 Content Type: Text
 Duration: 300
 Order: 4
Text Content:

# Fetch API for Interview Preparation

## Overview

The Fetch API is the standard way to make HTTP requests in modern browsers.

Interviewers do not test Fetch deeply, but they use it to evaluate a candidate’s understanding of:

- promises and async await  
- error handling  
- HTTP basics  
- real world coding readiness  

This topic focuses only on what is expected in interviews.

---

## 1. Basic Fetch Usage

Fetch returns a promise that resolves to a `Response` object.

```js
fetch("/api/data")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```

### Key points

- `fetch` returns a promise  
- response body is read separately  
- `response.json()` also returns a promise  

---

## 2. Fetch with async and await

Preferred in interviews.

```js
async function getData() {
  const res = await fetch("/api/data");
  const data = await res.json();
  return data;
}
```

This looks synchronous but is fully async.

---

## 3. Fetch Error Handling (Very Important)

Fetch does **not** reject on HTTP errors like 404 or 500.

```js
async function getData() {
  const res = await fetch("/api/data");

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
}
```

### Interviewers often ask  
Why do we check `res.ok`?

Expected answer:  
Because fetch resolves even on HTTP errors.

---

## 4. Sending Data with Fetch (POST)

```js
fetch("/api/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "test"
  })
});
```

### Key points

- body must be stringified  
- `Content-Type` header is required  

---

## 5. Fetch and Promises Relationship

```js
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data));
```

This is just promise chaining.

Understanding this shows mastery of promises and async flow.

---

## 6. Cancelling a Fetch Request

Using `AbortController`.

```js
const controller = new AbortController();

fetch("/api/data", {
  signal: controller.signal
});

controller.abort();
```

`AbortController` is impressive in interviews but not mandatory.

---

## 7. Fetch vs Axios (High Level)

Interview level comparison:

| Aspect | Fetch | Axios |
|------|------|-------|
| Built in | Yes | No |
| Auto JSON parse | No | Yes |
| Error handling | Manual | Automatic |
| Interceptors | No | Yes |

### Answer focus

- Axios is a wrapper over fetch or XHR  
- Fetch is lower level  

---

## 8. Common Interview Traps

### Trap 1  
Assuming fetch rejects on 404 or 500.

### Trap 2  
Forgetting `await` on `response.json()`.

### Trap 3  
Not stringifying request body.

### Trap 4  
Using fetch inside loops without `Promise.all`.

---

## 9. Machine Coding Expectations

In machine coding:

- basic fetch usage is enough  
- correct error handling matters  
- async await is preferred  
- clean separation of logic is expected  

---

## 10. Interview Practice Questions

### Question 1  
Why does fetch not reject on HTTP errors?

Expected:

- network errors reject  
- HTTP errors still return a response  

---

### Question 2  
How do you handle API errors properly with fetch?

Expected:

- check `res.ok`  
- throw error manually  

---

### Question 3  
How do you cancel an API request?

Expected:

- `AbortController`  

---

## Summary

- Fetch is promise based  
- `response.json()` is async  
- HTTP errors must be handled manually  
- async await is preferred  
- minimal fetch knowledge is sufficient for interviews


Topic 2.5
Title: JS Interview Machine Coding
 Order: 5

Class 2.5.1
Title: Tabs
 Description: Build a tab-based UI using JavaScript.
 Content Type: Text
 Duration: 300
 Order: 1
Text Content:

# Tabs Component (Machine Coding)

## Overview

Tabs are a very common machine coding problem.  
They test multiple fundamentals together:

- DOM manipulation  
- event handling  
- state management  
- clean code structure  
- edge case handling  

Interviewers expect a **working, readable solution**, not a UI-heavy implementation.

---

## 1. Problem Statement (Typical)

Build a tabs component where:

- clicking a tab shows its content  
- only one tab is active at a time  
- active tab is visually highlighted  

Optional follow ups:

- default active tab  
- keyboard navigation  
- dynamic tabs  

---

## 2. Basic HTML Structure

Keep structure simple and semantic.

```html
<div class="tabs">
  <div class="tab-buttons">
    <button data-tab="tab1">Tab 1</button>
    <button data-tab="tab2">Tab 2</button>
    <button data-tab="tab3">Tab 3</button>
  </div>

  <div class="tab-content">
    <div id="tab1" class="content">Content 1</div>
    <div id="tab2" class="content">Content 2</div>
    <div id="tab3" class="content">Content 3</div>
  </div>
</div>
```

Key idea:

- data attributes map buttons to content  

---

## 3. Minimal CSS (Focus on Logic)

```css
.content {
  display: none;
}

.content.active {
  display: block;
}

button.active {
  font-weight: bold;
}
```

CSS is not the focus. Logic is.

---

## 4. JavaScript Implementation (Core Logic)

```js
const tabs = document.querySelector(".tab-buttons");
const contents = document.querySelectorAll(".content");

tabs.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const targetId = e.target.dataset.tab;

  document.querySelectorAll(".tab-buttons button")
    .forEach(btn => btn.classList.remove("active"));

  contents.forEach(content => {
    content.classList.remove("active");
  });

  e.target.classList.add("active");
  document.getElementById(targetId).classList.add("active");
});
```

Why this works:

- event delegation  
- clean state reset  
- single active tab  

---

## 5. Default Active Tab

Set initial state:

```js
document.querySelector(".tab-buttons button").classList.add("active");
document.querySelector(".content").classList.add("active");
```

Interviewers often ask for default behavior.

---

## 6. State Management Explanation (Interview Angle)

State here is:

- which tab is active  

State is represented in:

- DOM classes  
- not a separate variable  

This is acceptable and preferred in simple components.

---

## 7. Accessibility Basics (Bonus Points)

Minimal ARIA additions:

```html
<button role="tab" aria-selected="true">Tab 1</button>
```

And update `aria-selected` when switching tabs.

Mentioning accessibility earns brownie points.

---

## 8. Keyboard Navigation (Optional Follow Up)

Interviewers may ask:

- how to handle arrow keys  

High level answer:

- listen to `keydown`  
- move focus to next or previous button  

Full implementation is not mandatory.

---

## 9. Common Interview Pitfalls

### Trap 1  
Adding click listeners to every button instead of delegation.

### Trap 2  
Not removing active class from previous tab.

### Trap 3  
Hardcoding logic instead of using data attributes.

### Trap 4  
Mixing UI logic and business logic.

---

## 10. How Interviewers Evaluate This Problem

They look for:

- correctness  
- clean DOM selection  
- event delegation  
- readable code  
- ability to explain decisions  

They do not expect:

- animations  
- frameworks  
- perfect CSS  

---

## 11. Follow Up Questions You May Be Asked

- How would you make tabs dynamic?  
- How would you add deep linking?  
- How would you persist selected tab?  
- How would you improve accessibility?  

Prepare conceptual answers.

---

## 12. Summary

- Tabs test core DOM and JS fundamentals  
- Event delegation simplifies code  
- State can live in DOM classes  
- Clean structure matters more than styling  
- Explaining your approach is as important as coding  

---

## Questions

65297, 55148, 83710, 56493, 55601


Class 2.5.2
Title: Collapsible Sidebar
 Description: Implement a collapsible sidebar component.
 Content Type: Text
 Duration: 300
 Order: 2
Text Content:

# Collapsible Sidebar (Machine Coding)

## Overview

A collapsible sidebar is a very common UI pattern in dashboards and admin panels.  
In interviews, this problem tests:

- DOM manipulation  
- state handling  
- CSS layout understanding  
- event handling  
- clean separation of concerns  

Interviewers focus more on **logic and structure** than on visual polish.

---

## 1. Problem Statement (Typical)

Build a sidebar that:

- can be expanded and collapsed  
- toggles when a button is clicked  
- adjusts the main content area accordingly  

Optional follow ups:

- smooth transition  
- persist collapsed state  
- keyboard accessibility  

---

## 2. Basic HTML Structure

Keep the structure simple and readable.

```html
<div class="layout">
  <aside id="sidebar" class="sidebar">
    Sidebar Content
  </aside>

  <main class="main">
    <button id="toggle">Toggle Sidebar</button>
    <div>Main Content</div>
  </main>
</div>
```

Key idea:

- sidebar and main content are siblings  
- toggle button controls sidebar state  

---

## 3. Minimal CSS Layout

```css
.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 0;
  overflow: hidden;
}

.main {
  flex: 1;
  padding: 16px;
}
```

Notes:

- flexbox simplifies layout  
- transition improves UX  
- overflow hidden prevents content spill  

---

## 4. JavaScript Toggle Logic

```js
const toggleBtn = document.getElementById("toggle");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});
```

Why this works:

- state is stored in a CSS class  
- logic is minimal and readable  
- no extra variables needed  

---

## 5. State Management Explanation (Interview Angle)

State here is:

- expanded or collapsed  

Represented by:

- presence or absence of the `collapsed` class  

This is sufficient for simple UI components and preferred in interviews.

---

## 6. Persisting Sidebar State (Bonus)

Persist state using localStorage.

```js
const isCollapsed = localStorage.getItem("collapsed") === "true";

if (isCollapsed) {
  sidebar.classList.add("collapsed");
}

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");

  localStorage.setItem(
    "collapsed",
    sidebar.classList.contains("collapsed")
  );
});
```

This follow up often impresses interviewers.

---

## 7. Accessibility Considerations

Basic improvements:

- use a button element for toggle  
- add `aria-expanded` attribute  

```js
toggleBtn.setAttribute(
  "aria-expanded",
  !sidebar.classList.contains("collapsed")
);
```

Mentioning accessibility earns bonus points.

---

## 8. Alternative CSS Approach (Translate)

Instead of width, use transform.

```css
.sidebar {
  transform: translateX(0);
  transition: transform 0.3s;
}

.sidebar.collapsed {
  transform: translateX(-100%);
}
```

This avoids layout shifts and can perform better.

---

## 9. Common Interview Pitfalls

### Trap 1  
Hardcoding widths inside JavaScript.

### Trap 2  
Manipulating styles directly instead of classes.

### Trap 3  
Forgetting overflow handling.

### Trap 4  
Tightly coupling sidebar logic with main content.

---

## 10. Follow Up Questions Interviewers Ask

- How would you animate smoothly?  
- How would you persist state?  
- How would you make it responsive?  
- How would you close sidebar on outside click?  

Prepare conceptual answers.

---

## 11. Machine Coding Evaluation Criteria

Interviewers look for:

- clean DOM access  
- simple toggle logic  
- readable CSS  
- ability to explain design choices  

They do not expect:

- frameworks  
- perfect design  
- pixel perfection  

---

## 12. Summary

- Collapsible sidebar tests layout and state handling  
- Flexbox simplifies structure  
- CSS classes are ideal for state  
- localStorage is a good enhancement  
- Clear explanation matters in interviews  

---

## Questions

84579, 81788, 255365, 186740


Class 2.5.3
Title: Search & Filter
 Description: Implement client-side search and filtering logic.
 Content Type: Text
 Duration: 300
 Order: 3
Text Content:

# Search and Filter (Machine Coding)

## Overview

Search and filter is a very common machine coding problem.  
It tests the ability to:

- handle user input  
- manipulate lists dynamically  
- manage state  
- write clean and efficient logic  

Interviewers focus on correctness, performance awareness, and clarity.

---

## 1. Problem Statement (Typical)

Given a list of items:

- show only items matching the search query  
- update results as the user types  
- handle empty input gracefully  

Optional follow ups:

- case insensitive search  
- debouncing  
- multiple filters  

---

## 2. Basic HTML Structure

```html
<input type="text" id="search" placeholder="Search" />

<ul id="list">
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
  <li>Mango</li>
</ul>
```

Simple structure keeps the focus on logic.

---

## 3. Basic Search Logic

```js
const input = document.getElementById("search");
const items = document.querySelectorAll("#list li");

input.addEventListener("input", () => {
  const query = input.value.toLowerCase();

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? "" : "none";
  });
});
```

### Key points

- `input` event enables real time search  
- case insensitive matching  
- no DOM re creation  

---

## 4. State Management Explanation

State here is:

- search query  

Derived state:

- visible list items  

State is **not stored separately**.  
It is derived from input value and DOM.

This is acceptable for simple machine coding problems.

---

## 5. Handling No Results

```js
const noResult = document.getElementById("no-result");

if (![...items].some(item => item.style.display !== "none")) {
  noResult.style.display = "block";
}
```

Interviewers may ask how to handle empty states gracefully.

---

## 6. Debouncing Search Input (Important)

Without debounce, filtering runs on every keystroke.

```js
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Usage

```js
input.addEventListener(
  "input",
  debounce(() => {
    // filter logic
  }, 300)
);
```

Mentioning debounce shows performance awareness.

---

## 7. Filtering from Data Instead of DOM (Better Pattern)

Instead of filtering DOM nodes, filter data and re render.

```js
const data = ["Apple", "Banana", "Orange", "Mango"];
const ul = document.getElementById("list");

function render(list) {
  ul.innerHTML = "";

  list.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}
```

Interviewers prefer this approach for scalability.

---

## 8. Multiple Filters (Follow Up)

Example:

- search + category  

Approach:

- apply filters sequentially  
- use array filter chaining  

```js
data
  .filter(item => item.includes(query))
  .filter(item => categoryMatch(item));
```

---

## 9. Performance Considerations

- avoid frequent DOM updates  
- debounce input  
- minimize reflows  
- do not query DOM repeatedly  

Mentioning these earns points.

---

## 10. Common Interview Pitfalls

### Trap 1  
Using `keyup` instead of `input`.

### Trap 2  
Rebuilding DOM unnecessarily.

### Trap 3  
Case sensitive search.

### Trap 4  
Not handling empty input.

---

## 11. Follow Up Questions Interviewers Ask

- How would you handle large datasets?  
- How would you add server side search?  
- How would you persist search state?  

Prepare conceptual answers.

---

## 12. Summary

- Search and filter tests input handling and DOM updates  
- `input` event is preferred  
- Debounce improves performance  
- Filtering data is better than filtering DOM  
- Clean code matters more than UI  

---

## Questions

259515, 55148, 55601, 259140, 186735


Class 2.5.4
Title: Pagination
 Description: Implement pagination for large datasets.
 Content Type: Text
 Duration: 300
 Order: 4
Text Content:

# Pagination (Machine Coding)

## Overview

Pagination is a very common machine coding and UI logic problem.  
It tests whether a candidate can:

- manage derived state  
- slice data correctly  
- update UI predictably  
- keep logic clean and scalable  

Interviewers focus on correctness and clarity, not visual design.

---

## 1. Problem Statement (Typical)

Given a list of items:

- show a fixed number of items per page  
- provide next and previous controls  
- highlight current page  

Optional follow ups:

- dynamic page size  
- server side pagination  
- disable navigation at boundaries  

---

## 2. Basic HTML Structure

```html
<ul id="list"></ul>

<div class="pagination">
  <button id="prev">Prev</button>
  <span id="page-info"></span>
  <button id="next">Next</button>
</div>
```

Simple structure keeps the focus on logic.

---

## 3. Sample Data

```js
const data = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
```

---

## 4. Pagination State

State required:

- `currentPage`  
- `itemsPerPage`  

```js
let currentPage = 1;
const itemsPerPage = 5;
```

Derived state:

```js
const totalPages = Math.ceil(data.length / itemsPerPage);
```

Interviewers often check whether candidates separate **state** from **derived state**.

---

## 5. Render Logic

```js
const list = document.getElementById("list");
const pageInfo = document.getElementById("page-info");

function renderPage() {
  list.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const pageItems = data.slice(start, end);

  pageItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}
```

Key ideas:

- slice the data array  
- render only visible items  
- derive indexes from page number  

---

## 6. Navigation Logic

```js
document.getElementById("next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});
```

Boundary checks are critical and often missed.

---

## 7. Initial Render

```js
renderPage();
```

Always render the initial state.

---

## 8. Disabling Buttons at Boundaries (Bonus)

```js
prev.disabled = currentPage === 1;
next.disabled = currentPage === totalPages;
```

Interviewers appreciate attention to UX edge cases.

---

## 9. Page Number Buttons (Optional Follow Up)

High level approach:

- compute page numbers  
- render buttons dynamically  
- update `currentPage` on click  

A full implementation is not mandatory unless explicitly asked.

---

## 10. Pagination with Filtered Data

If pagination follows search or filter:

- reset `currentPage` to `1`  
- recalculate `totalPages`  
- re render  

This integration question is commonly asked.

---

## 11. Performance Considerations

- paginate data, not DOM  
- avoid rendering the entire list  
- use document fragments if needed  

---

## 12. Common Interview Pitfalls

### Trap 1  
Off by one errors in index calculation.

### Trap 2  
Not resetting page on filter change.

### Trap 3  
Re rendering entire UI unnecessarily.

### Trap 4  
Hardcoding page size.

---

## 13. Follow Up Questions Interviewers Ask

- How would you handle server side pagination?  
- How would you implement infinite scroll?  
- How would you sync pagination with URL?  

Prepare conceptual answers.

---

## 14. Summary

- Pagination tests data slicing and state handling  
- `currentPage` is core state  
- `totalPages` is derived state  
- Boundary handling is important  
- Clean logic matters more than UI  

---

## Questions

js-machine-pagination

Class 2.5.5:
  Title: JavaScript DOM, State & Performance Contest
  Description: Build interactive UI features using DOM manipulation, browser APIs, and performance optimization techniques.
  Content Type: contest
  Duration: 3600
  Order: 6
  Contest URL: https://www.scaler.com/test/a/jssetc
  Contest Questions: 6
  Contest Syllabus: 
    - DOM manipulation and form handling
    - UI state and LocalStorage
    - Fetch API and dynamic rendering
    - Debouncing and performance optimization


Module 3
Title: LLD3: React Interview Revision
 Description: Strengthen React fundamentals, hooks, state management, performance optimization, and low-level design patterns with an interview-first mindset.
 Order: 3
Learning Outcomes:
Understand React’s rendering and reconciliation model


Use hooks correctly and avoid common interview traps


Design scalable component architectures


Solve React-focused machine coding problems


Topic 3.1
Title: React Core Foundations
 Order: 1
Class 3.1.1
Title: Component Architecture
 Description: Understand how to structure React components for clarity, reuse, and scalability.
 Content Type: Text
 Duration: 900
 Order: 1
Text Content:

# Component Architecture in React

## Overview

In React interviews, many candidates know how to write components.  
Very few know how to **design** components.

Interviewers are not judging JSX.

They are judging:

- how you break UI into components  
- how you decide responsibilities  
- how you reason about data flow  

This topic builds the mental model needed to confidently answer:

“Why did you design it this way?”

---

## 1. What Is a Component in React (Interview Lens)

A React component is **not**:

- just a function returning JSX  
- just a reusable UI block  

A React component **is**:

A unit of responsibility that maps data to UI.

Strong candidates think in terms of:

- responsibility  
- ownership of state  
- boundaries  

Weak candidates think in terms of:

- files  
- JSX chunks  
- copying patterns  

---

## 2. Why Component Architecture Matters in Interviews

Interviewers look for signals like:

- Are components too large?  
- Is state scattered randomly?  
- Is logic mixed with UI?  
- Is the component reusable or tightly coupled?  

Even if the UI works, poor architecture is a red flag.

---

## 3. The Core Question to Ask While Designing Components

Before writing JSX, ask:

- What does this component own?  
- What does it receive?  
- What does it control?  
- What should it not know about?  

This question matters more than React APIs.

---

## 4. Common Component Design Mistake

A very common mistake:

- One large component  
- Handles fetching, state, rendering, events  
- Hard to test  
- Hard to explain  

Example mental mistake:

“Let me just put everything in App.jsx for now.”

This immediately signals lack of architectural thinking.

---

## 5. Good Component Architecture Pattern

A good React component:

- has a single clear purpose  
- owns minimal state  
- delegates rendering where possible  
- communicates via props  

Think in layers:

- data handling  
- state  
- presentation  

This layering will repeat throughout React LLD topics.

---

## 6. Interview Example Question

“How would you break this UI into components?”

Weak answer:

- lists components by visual chunks only  

Strong answer:

- explains responsibilities  
- explains data ownership  
- explains interaction points  

The explanation matters more than the final diagram.

---

## 7. Component Boundaries (Important)

A good boundary:

- reduces prop complexity  
- localizes state  
- improves reusability  

A bad boundary:

- causes excessive prop drilling  
- duplicates logic  
- tightly couples unrelated concerns  

Interviewers listen very closely to this reasoning.

---

## 8. Stateless vs Stateful Components (Preview)

At this stage, understand:

- not every component needs state  
- most components should be driven by props  
- state should live as high as necessary, but no higher  

This will be formalized in the **Props vs State** topic.

---

## 9. How This Topic Is Evaluated in Interviews

You are evaluated on:

- how you reason, not how fast you code  
- whether you can justify design choices  
- whether your architecture scales  

Even machine coding rounds silently judge architecture.

---

## 10. What Comes Next

Once component boundaries are clear, the next natural question is:

What data flows through these components?

That leads directly to:

**Props vs State**

Class 3.1.2
Title: Props vs State
 Description: Learn the difference between props and state and when to use each.
 Content Type: Text
 Duration: 800
 Order: 2
Text Content:

# Props vs State in React (Interview Perspective)

## Overview

“Props vs State” is one of the most deceptively simple React interview topics.

Most candidates can define them.  
Many candidates still misuse them.

Interviewers are not testing definitions here.  
They are testing data ownership and reasoning clarity.

---

## 1. Core Mental Model (Very Important)

At a high level:

- Props represent data coming into a component  
- State represents data owned by a component  

But this definition alone is not enough.

The deeper distinction is about **control and responsibility**.

---

## 2. How Interviewers Actually Think About Props vs State

When an interviewer asks about props vs state, they are silently evaluating:

- Who owns the data?  
- Who is allowed to change it?  
- Where does the source of truth live?  
- Is the data derived or primary?  

Strong candidates answer these questions even if they are not explicitly asked.

---

## 3. Props Explained

Props:

- are read-only inside a component  
- are passed from parent to child  
- represent external input  

Mental model:

Props are configuration given to a component.

A component should never modify its props.

If a candidate says “props can be changed”, it is an immediate red flag.

---

## 4. State Explained

State:

- is owned by the component  
- can change over time  
- triggers re-renders when updated  

Mental model:

State represents what the component remembers.

Only the component that owns the state should update it.

---

## 5. The Most Important Question

Before deciding between props and state, ask:

Who should control this data?

- If the answer is “this component itself” → state  
- If the answer is “parent or external logic” → props  

This single question solves most React design problems.

---

## 6. Very Common Interview Mistakes

### Mistake 1: Copying props into state

Example mental mistake:

“I’ll take props and put them into state.”

This is almost always wrong.

Interviewers often follow up with:

“Why did you put props into state?”

If there is no strong reason, it shows poor understanding.

---

### Mistake 2: Using state for derived values

Examples:

- storing filtered list in state  
- storing computed totals in state  

Interview expectation:

Derived data should be computed, not stored.

---

### Mistake 3: Overusing state

New learners often use state everywhere.

Strong candidates minimize state and maximize props.

---

## 7. Interview Articulation Framework (Very Important)

When asked:

“What is the difference between props and state?”

A strong structured answer sounds like:

- Props are inputs to a component and are read-only  
- State is owned and managed by the component  
- Props represent external control, state represents internal control  
- Choosing between them depends on data ownership  

This shows clarity, not memorization.

---

## 8. Sample Strong Interview Answer

“Props are used to pass data from parent to child and are immutable from the child’s perspective. State represents data that the component owns and can change over time. The key difference is ownership and control. If data needs to be modified by the component, it should be state. If it is controlled externally, it should be props.”

This answer consistently scores well.

---

## 9. How This Appears in Machine Coding

In React machine coding:

- interviewers watch where you place state  
- incorrect state placement leads to messy code  
- correct prop usage makes the solution scalable  

Even if the UI works, poor data flow is penalized.

---

## 10. Rapid Revision Points (Pre-Interview)

- Props are read-only  
- State is mutable via setState or hooks  
- Do not copy props into state  
- Derived data should not be stored  
- Data ownership determines choice  

These bullets are ideal for last-day revision.

---

## 11. What Comes Next

Once props and state are clear, the next natural question is:

When does React re-render?

That leads directly to the **Rendering Model**.

Class 3.1.3
Title: Rendering Model
 Description: Understand how React renders components and updates the UI.
 Content Type: Text
 Duration: 900
 Order: 3
Text Content:

# React Rendering Model and Re-rendering Behavior

## Overview

The React rendering model explains how and when React updates the UI.

In interviews, this topic is used to check:

- whether you understand how React works internally  
- whether you can reason about re-renders and performance  
- whether you can debug common UI bugs  

Many candidates know what React renders.  
Fewer understand when and why it renders.

---

## What Does Rendering Mean in React

In React, rendering means:

- React calls a component function  
- The function returns a description of the UI (JSX)  
- React compares this with the previous output  

Important clarification:

Rendering does **not** directly mean DOM updates.

Rendering means computing what the UI should look like.

---

## Core Mental Model

A useful way to think about React rendering:

```
UI = f(props, state)
```

Whenever props or state change:

- React re-executes the component  
- A new UI description is produced  

If this equation is clear, most rendering questions become easy.

---

## What Triggers a Re-render

A React component re-renders when:

- Its state changes  
- Its props change  
- Its parent component re-renders  

The third point is frequently missed in interviews.

---

## Parent Re-render Behavior (Very Important)

If a parent component re-renders:

- All child components re-render by default  

Even if:

- child props have not changed  

This is expected React behavior.

Interviewers often ask:

“Will a child re-render if parent re-renders?”

Correct answer:

Yes, unless optimized using memoization.

---

## What Does NOT Trigger a Re-render

These do not cause a re-render:

- updating a normal variable  
- mutating an object without changing its reference  
- updating values outside React state  

Example:

```js
let count = 0;
count++;
```

UI will not update because React is unaware of this change.

---

## Re-render vs DOM Update

This distinction is critical.

### Re-render

- React re-executes the component function  
- Produces a new virtual UI representation  

### DOM update

- React compares old and new UI  
- Updates only the changed DOM nodes  

This comparison process is called reconciliation.

You are not expected to explain the diffing algorithm in detail, but you must know this distinction.

---

## Common Interview Traps

### Trap 1  
“React re-renders only the changed component”

Incorrect.

If a parent re-renders, children re-render too.

---

### Trap 2  
“Re-render means full page repaint”

Incorrect.

React minimizes DOM updates using reconciliation.

---

### Trap 3  
“Changing an object property updates UI”

Incorrect.

React relies on reference changes, not deep mutations.

---

### Trap 4  
“Using state always improves performance”

Incorrect.

State updates can cause unnecessary re-renders if placed poorly.

---

## Practical Impact on Component Design

Understanding rendering helps you:

- decide where state should live  
- avoid unnecessary re-renders  
- reason about performance issues  
- understand why memoization is needed  

This topic connects directly to:

- useState behavior  
- useEffect execution  
- useCallback and useMemo  

---

## Interview Questions You Should Be Ready For

- When does a React component re-render  
- Does a child re-render when parent re-renders  
- What is the difference between rendering and DOM update  
- Why does updating a variable not update UI  
- What is reconciliation at a high level  

---

## Strong Interview Answer (Example)

“A React component re-renders when its state changes, its props change, or when its parent re-renders. Re-rendering means React re-executes the component function to compute the UI. React then compares the new output with the previous one and updates only the required DOM nodes through reconciliation.”

---

## Summary (Revision Ready)

- Rendering means computing UI, not updating DOM  
- State or props change trigger re-render  
- Parent re-render triggers child re-render  
- Normal variables do not trigger re-render  
- Reconciliation minimizes DOM updates  

---

## Next Topic

Section B: Hooks → useState & state batching


Topic 3.2
Title: Hooks
 Order: 2
Class 3.2.1
Title: useState & State Batching
 Description: Learn how state updates are batched and applied in React.
 Content Type: Text
 Duration: 900
 Order: 1
Text Content:

# useState Hook and State Batching in React

## Overview

`useState` is the most commonly used React hook and also one of the most misunderstood.

In interviews, this topic checks:

- whether you understand how state updates work  
- whether you can reason about re-renders  
- whether you know why state updates behave unexpectedly  

Many candidates know the syntax.  
Fewer understand **why** React behaves the way it does.

---

## What is useState

`useState` allows a component to:

- store internal state  
- update that state  
- trigger a re-render when state changes  

Basic usage:

```js
const [count, setCount] = useState(0);
```

Here:

- `count` is the current state value  
- `setCount` is the function used to update state  

---

## Key Mental Model (Very Important)

Important rule:

**State updates do not update the value immediately.**

Calling `setState`:

- schedules a state update  
- does not synchronously change the variable  

This single rule explains many confusing bugs.

---

## State Update and Re-render Flow

When `setState` is called:

1. React schedules a state update  
2. React batches multiple updates (in most cases)  
3. React re-renders the component  
4. The component function runs again with the new state  

Understanding this sequence is critical for interviews.

---

## Example: State Update Confusion

```js
setCount(count + 1);
console.log(count);
```

What gets logged?

- the **old value**, not the updated one  

Reason:

- state updates are async with respect to the render cycle  

This is a very common interview trap.

---

## State Batching (Very Important)

React batches multiple state updates into a single re-render.

Example:

```js
setCount(count + 1);
setCount(count + 1);
```

What beginners expect:

- count increases by 2  

What actually happens:

- count increases by 1  

Why:

- both updates use the same stale `count` value  
- updates are batched  

---

## Correct Way: Functional Updates

To avoid stale state:

```js
setCount(prevCount => prevCount + 1);
setCount(prevCount => prevCount + 1);
```

Now:

- each update uses the latest state  
- final value increases by 2  

Interviewers expect you to know this pattern.

---

## When Does React Batch State Updates

React batches updates:

- inside event handlers  
- inside lifecycle effects  
- inside React controlled code paths  

Batching improves performance by reducing unnecessary re-renders.

---

## Common Interview Traps

### Trap 1: Assuming state updates are synchronous

Incorrect.  
State updates are scheduled, not immediate.

---

### Trap 2: Using current state inside multiple setState calls

Leads to stale state bugs.

---

### Trap 3: Mutating state directly

```js
count++;
setCount(count);
```

This breaks React’s expectations and causes unpredictable behavior.

---

### Trap 4: Using state when a normal variable is enough

Overusing state leads to unnecessary re-renders.

---

## Practical Impact on LLD and Machine Coding

In React machine coding rounds:

- incorrect state updates lead to buggy UI  
- stale state bugs are very common under time pressure  
- functional updates are often required  

Interviewers closely observe:

- where you place state  
- how you update it  
- whether you understand batching  

---

## Interview Questions You Should Be Ready For

1. Why does `setState` not update immediately  
2. What is state batching  
3. Why does calling `setState` twice not increment twice  
4. When should you use functional updates  
5. What triggers a re-render after a state update  

---

## Strong Interview Answer (Example)

“`useState` allows a component to store internal state. Calling the state setter schedules an update and triggers a re-render. React batches multiple state updates together for performance, which is why using the current state value inside multiple `setState` calls can cause stale state issues. Functional updates help avoid this problem.”

---

## Summary (Revision Ready)

- `useState` stores component state  
- `setState` schedules an update  
- state updates are batched  
- multiple updates may use stale state  
- functional updates solve this issue  

---

## Next Topic

useEffect ( interview traps)

Class 3.2.2
Title: useEffect (Interview Traps)
 Description: Master useEffect behavior, dependencies, cleanup, and common interview pitfalls.
 Content Type: Text
 Duration: 1000
 Order: 2
Text Content:

# useEffect Hook and Common Interview Traps

## Overview

`useEffect` is one of the most frequently asked and most frequently misunderstood React topics.

In interviews, this topic tests:

- understanding of React’s lifecycle  
- reasoning about side effects  
- ability to debug infinite loops and stale data  
- clarity on dependency arrays  

Many candidates can write `useEffect`.  
Few can explain **why** it behaves the way it does.

---

## What is useEffect

`useEffect` is used to perform **side effects** in a React component.

Side effects include:

- API calls  
- subscriptions  
- timers  
- DOM interactions  

Basic syntax:

```js
useEffect(() => {
  // side effect
}, []);
```

---

## When Does useEffect Run (Very Important)

`useEffect` runs:

- **after the render is committed to the DOM**

This means:

- component renders first  
- DOM updates happen  
- effect runs later  

In interviews, the expected phrase is:

**“useEffect runs after render.”**

---

## Dependency Array Behavior

The dependency array controls **when the effect re-runs**.

---

### 1. No dependency array

```js
useEffect(() => {
  // runs after every render
});
```

Runs:

- after initial render  
- after every re-render  

---

### 2. Empty dependency array

```js
useEffect(() => {
  // runs once
}, []);
```

Runs:

- once after initial render  

Common use cases:

- initial API calls  
- subscriptions  

---

### 3. With dependencies

```js
useEffect(() => {
  // runs when count changes
}, [count]);
```

Runs:

- after initial render  
- whenever `count` changes  

---

## The Most Common Interview Trap: Infinite Loops

Example:

```js
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

What happens:

- effect runs  
- state updates  
- component re-renders  
- effect runs again  

Result:

**infinite loop**

Interviewers frequently show this snippet and ask why it breaks.

---

## Stale Closure Problem (Senior-Level Question)

Example:

```js
useEffect(() => {
  setInterval(() => {
    console.log(count);
  }, 1000);
}, []);
```

Issue:

- `count` inside the effect is frozen to its initial value  

Reason:

- the effect captures variables from the render in which it was created  

This is called a **stale closure**.

---

## Fixing Stale State Issues

Common solutions:

- include dependencies  
- use functional updates  
- use refs  

Example using functional update:

```js
setCount(prev => prev + 1);
```

Or by adding dependencies:

```js
useEffect(() => {
  console.log(count);
}, [count]);
```

---

## Cleanup Function (Very Important)

Effects can return a cleanup function.

```js
useEffect(() => {
  const id = setInterval(() => {
    // logic
  }, 1000);

  return () => {
    clearInterval(id);
  };
}, []);
```

Cleanup runs:

- before the effect re-runs  
- when the component unmounts  

Interviewers expect this exact explanation.

---

## Common Interview Traps

### Trap 1: Missing dependencies

- causes stale data bugs  

---

### Trap 2: Adding everything to dependency array

- leads to unnecessary re-runs  

---

### Trap 3: Using async directly in useEffect

Incorrect:

```js
useEffect(async () => {});
```

Correct approach:

```js
useEffect(() => {
  async function fetchData() {}
  fetchData();
}, []);
```

---

### Trap 4: Thinking useEffect replaces lifecycle methods

Incorrect mental model.

`useEffect` combines behavior of multiple lifecycle methods.  
It is not a one-to-one replacement.

---

## Practical Impact on LLD and Machine Coding

In React LLD and machine coding:

- misuse of `useEffect` leads to bugs  
- incorrect dependencies cause performance issues  
- missing cleanup causes memory leaks  

Interviewers observe:

- understanding of effect timing  
- clarity on dependency arrays  

---

## Interview Questions You Should Be Ready For

- When does `useEffect` run  
- How does the dependency array work  
- Why does this effect cause an infinite loop  
- What is a stale closure  
- Why do we need cleanup functions  

---

## Strong Interview Answer (Example)

“`useEffect` runs after the component renders. The dependency array controls when the effect re-runs. Missing dependencies can cause stale data bugs, while incorrect dependencies can cause infinite loops. Cleanup functions are used to clear subscriptions or timers when effects re-run or when components unmount.”

---

## Summary (Revision Ready)

- `useEffect` runs after render  
- dependency array controls re-execution  
- missing dependencies cause stale closures  
- cleanup prevents memory leaks  
- infinite loops are a common trap  

---

## Next Topic

useRef

Class 3.2.3
Title: useRef
 Description: Use refs for mutable values and DOM access without re-renders.
 Content Type: Text
 Duration: 800
 Order: 3
Text Content:

# useRef Hook and Its Interview Use Cases

## Overview

`useRef` is a hook that many candidates either:

- avoid completely  
- misuse as a replacement for state  

In interviews, `useRef` is used to test:

- understanding of re-renders  
- difference between mutable data and reactive data  
- clarity on when React should and should not update UI  

---

## What is useRef

`useRef` creates a mutable container that persists across renders.

Basic usage:

```js
const countRef = useRef(0);
```

Important points:

- `countRef.current` holds the value  
- updating `.current` does not trigger a re-render  
- the same ref object persists across renders  

---

## Core Mental Model

Think of `useRef` as:

A box that React keeps for you across renders, but does not watch for changes.

This single sentence solves most confusion.

---

## useRef vs useState (Critical Distinction)

### useState

- triggers re-render when updated  
- used for data that affects UI  

### useRef

- does not trigger re-render  
- used for values that need to persist but do not affect UI  

Interviewers expect this distinction to be very clear.

---

## Common Use Cases for useRef

### 1. Accessing DOM Elements

```js
const inputRef = useRef(null);

<input ref={inputRef} />

inputRef.current.focus();
```

This is the most common and valid use case.

---

### 2. Storing Mutable Values Across Renders

Examples:

- previous values  
- timers  
- counters not shown in UI  

```js
const prevCount = useRef(count);

useEffect(() => {
  prevCount.current = count;
}, [count]);
```

---

### 3. Avoiding Stale Closures

`useRef` can store the latest value without re-triggering effects.

Common interview scenarios:

- intervals  
- event listeners  

---

## What useRef Should NOT Be Used For

### Trap 1: Using useRef instead of state for UI data

```js
countRef.current++;
```

UI will not update.

---

### Trap 2: Treating useRef like instance variables from class components

It is similar in behavior, but it is not a replacement for state.

---

### Trap 3: Expecting re-render on ref change

Refs are invisible to React’s rendering system.

---

## Interview Trap Example

**Question:**  
Why doesn’t updating `useRef` re-render the component?

**Correct explanation:**

- React does not track changes to `.current`  
- refs are meant for mutable values outside the render flow  

---

## Practical Impact on LLD and Machine Coding

In machine coding:

- refs are useful for focus management  
- refs help store timers or intervals  
- refs help avoid unnecessary state  

Interviewers observe:

- whether you misuse state  
- whether you understand re-render triggers  

---

## Interview Questions You Should Be Ready For

1. Difference between `useRef` and `useState`  
2. When would you use `useRef` over state  
3. Does updating a ref cause re-render  
4. How do refs help with stale closures  
5. Common use cases of `useRef`  

---

## Strong Interview Answer (Example)

“`useRef` provides a mutable container that persists across renders but does not trigger re-renders when updated. It is useful for accessing DOM elements, storing mutable values like timers, and avoiding stale closures. State should be used when changes affect UI, while refs are used when changes should not cause re-render.”

---

## Summary (Revision Ready)

- `useRef` stores mutable values  
- updating a ref does not trigger re-render  
- useful for DOM access and timers  
- not a replacement for state  
- helps avoid stale closures  

---

## Next Topic

useCallback and useMemo

Class 3.2.4
Title: useCallback & useMemo
 Description: Optimize React applications by memoizing functions and values.
 Content Type: Text
 Duration: 1000
 Order: 4
Text Content:

# useCallback and useMemo for Performance Optimization

## Overview

`useCallback` and `useMemo` are performance optimization hooks.

In interviews, they are used to test:

- understanding of re-renders  
- reference equality  
- component re-render chains  
- whether optimization is applied correctly or blindly  

Many candidates:

- overuse them everywhere  
- cannot explain what problem they solve  

Both are red flags.

---

## The Core Problem They Solve

React compares **references**, not values.

On every render, React creates:

- new function references  
- new object references  

Even if the logic is identical, the references are different.

This can cause:

- unnecessary child re-renders  
- broken memoization  

---

## Problem Example (Before Optimization)

### Parent Component

```js
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child onClick={handleClick} />
    </>
  );
}
```

### Child Component

```js
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});
```

### What Happens

- Parent re-renders when count changes  
- `handleClick` is recreated  
- Child receives a new function reference  
- Child re-renders despite `React.memo`  

This surprises many candidates.

---

## Why This Happens

This expression is always true:

```js
() => {} !== () => {}
```

Functions are objects.

New render means new reference.

---

## useCallback: Fixing Function Reference Issues

`useCallback` memoizes a **function reference**.

### Corrected Example

```js
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child onClick={handleClick} />
    </>
  );
}
```

Now:

- `handleClick` reference stays the same  
- Child does not re-render unnecessarily  

---

## Important Rule for useCallback

`useCallback` does **not** prevent re-renders by itself.

It only helps when:

- passed as a prop to a memoized child  
- used inside dependency arrays  

Interviewers often test this explicitly.

---

## useMemo: Memoizing Computed Values

`useMemo` memoizes the **result of a computation**, not a function.

---

## Problem Example (Expensive Calculation)

```js
function Component({ items }) {
  const [count, setCount] = useState(0);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <p>Total: {total}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

### Issue

- expensive calculation runs on every render  
- even when `items` do not change  

---

## Fix Using useMemo

```js
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);
```

Now:

- calculation runs only when `items` change  
- unrelated re-renders are cheaper  

---

## useCallback vs useMemo (Clear Difference)

| Aspect | useCallback | useMemo |
|-----|-----------|--------|
| What it memoizes | Function | Computed value |
| Returns | Function reference | Value |
| Use case | Prevent function recreation | Prevent expensive recalculation |

Important interview line:

**useCallback is just useMemo for functions.**

---

## Common Interview Traps

### Trap 1  
Using `useCallback` everywhere.

Unnecessary and harmful.

---

### Trap 2  
Using `useMemo` for cheap calculations.

Over-optimization.

---

### Trap 3  
Forgetting dependencies.

Causes stale closures and bugs.

---

### Trap 4  
Thinking these hooks prevent re-renders automatically.

They only help with reference stability.

---

## When Interviewers Expect useCallback or useMemo

Expected use cases:

- passing callbacks to memoized children  
- expensive computations  
- dependency-heavy effects  

Not expected:

- wrapping every function blindly  

---

## Interview Questions You Should Be Ready For

1. Why does `React.memo` not prevent re-render here  
2. Difference between `useCallback` and `useMemo`  
3. When should you not use these hooks  
4. What problem do they solve  
5. Can misuse cause bugs  

---

## Strong Interview Answer (Example)

“`useCallback` memoizes a function reference to prevent unnecessary re-renders when passing callbacks to memoized components. `useMemo` memoizes the result of expensive computations. Both help with reference equality issues but should be used selectively, not everywhere.”

---

## Summary (Revision Ready)

- new renders create new references  
- React compares references, not values  
- `useCallback` stabilizes function references  
- `useMemo` stabilizes computed values  
- overuse is an interview red flag  

---

## Next Topic

Custom Hooks



Class 3.2.5
Title: Custom Hooks
 Description: Encapsulate reusable logic using custom hooks.
 Content Type: Text
 Duration: 900
 Order: 5
Text Content:

# Custom Hooks and Reusable Logic in React

## Overview

Custom hooks are a way to reuse logic, not UI.

In interviews, this topic tests:

- understanding of hooks rules  
- ability to separate logic from components  
- code organization and reusability  
- clarity in explaining abstractions  

Many candidates can write a custom hook.  
Fewer can explain **why** it should exist.

---

## What Is a Custom Hook

A custom hook is:

- a function that uses one or more React hooks  
- starts with the prefix `use`  
- encapsulates reusable logic  

Example signature:

```js
function useSomething() {
  // hook logic
}
```

Important points:

- custom hooks do not return JSX  
- they return data and functions  

---

## Why Custom Hooks Exist

Before custom hooks:

- logic was duplicated across components  
- logic sharing relied on HOCs or render props  

Custom hooks solve:

- duplication of logic  
- tangled components  
- poor readability  

Interviewers expect this reasoning, not just syntax.

---

## Simple Example: useCounter

### Without Custom Hook

```js
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return (
    <>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </>
  );
}
```

Logic is embedded inside the component.

---

### With Custom Hook

```js
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return { count, increment, decrement };
}
```

Usage:

```js
function Counter() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </>
  );
}
```

Benefits:

- logic is reusable  
- component stays clean  
- behavior is testable  

---

## Example: Extracting Data Fetching Logic

### Without Custom Hook

```js
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return users.map(u => <div key={u.id}>{u.name}</div>);
}
```

Logic is mixed with UI.

---

### With Custom Hook: useFetch

```js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
```

Usage:

```js
function Users() {
  const { data, loading, error } = useFetch("/api/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return data.map(u => <div key={u.id}>{u.name}</div>);
}
```

This pattern is very interview-friendly.

---

## Rules of Custom Hooks (Very Important)

Custom hooks must follow the rules of hooks:

- hooks must be called at the top level  
- hooks must not be called conditionally  
- hooks must be called only from React functions  

Breaking these rules causes runtime errors.

Interviewers often test this indirectly.

---

## What Custom Hooks Should Contain

Good custom hooks:

- contain reusable logic  
- do not depend on component structure  
- expose a clean API  

Bad custom hooks:

- mix UI and logic  
- depend on specific component markup  
- are created prematurely  

---

## Common Interview Traps

### Trap 1: Creating custom hooks too early  
Premature abstraction.

### Trap 2: Returning JSX from custom hooks  
Custom hooks are not components.

### Trap 3: Using hooks conditionally inside custom hooks  
Breaks rules of hooks.

### Trap 4: Over-generalizing hooks  
Makes them hard to understand and debug.

---

## Interview Questions You Should Be Ready For

- Why do we need custom hooks  
- Difference between custom hooks and components  
- Rules of hooks and why they exist  
- When should you create a custom hook  
- Can custom hooks use other custom hooks  

---

## Strong Interview Answer (Example)

“Custom hooks allow us to extract and reuse stateful logic across components without duplicating code. They follow the same rules as built-in hooks and return data and functions, not JSX. They help keep components clean and improve maintainability.”

---

## Summary (Revision Ready)

- custom hooks reuse logic, not UI  
- they start with `use`  
- they can use other hooks  
- they must follow rules of hooks  
- they improve readability and reuse  

---

## Next

Section C: State Management


Topic 3.3
Title: State Management
 Order: 3
Class 3.3.1
Title: Lifting State
 Description: Share state between components using lifting patterns.
 Content Type: Text
 Duration: 900
 Order: 1
Text Content:

# Lifting State Up in React

## Overview

Lifting state up is one of the most important React design concepts.

In interviews, this topic tests:

- understanding of data ownership  
- ability to design component hierarchy  
- correctness of data flow  
- clarity in explaining architectural decisions  

Many bugs in React applications are caused by incorrect state placement.

---

## What Does Lifting State Mean

Lifting state means:

- moving state to the closest common parent  
- passing data and handlers down via props  

### Purpose

- allow multiple components to share and stay in sync with the same data  

---

## When Lifting State Is Needed

You need to lift state when:

- two or more sibling components need the same data  
- state updates in one component must reflect in another  
- a parent component needs control over child behavior  

If components need to coordinate, state should not live separately.

---

## Incorrect Approach: Duplicated State

### Example Problem

Two components manage their own copy of the same state.

```js
function InputA() {
  const [value, setValue] = useState("");
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

function InputB() {
  const [value, setValue] = useState("");
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
```

### Issue

- both inputs look similar  
- but they are not synced  
- changes in one do not reflect in the other  

This is a very common beginner mistake.

---

## Correct Approach: Lift State to Parent

### Step 1: Move State to Parent

```js
function Parent() {
  const [value, setValue] = useState("");

  return (
    <>
      <InputA value={value} onChange={setValue} />
      <InputB value={value} onChange={setValue} />
    </>
  );
}
```

---

### Step 2: Make Children Controlled by Props

```js
function InputA({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

function InputB({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
```

### Result

- single source of truth  
- both inputs stay in sync  
- data flow is predictable  

---

## Key Mental Model (Very Important)

A very important rule:

State should live at the **lowest common ancestor** that needs it.

This single line solves many React LLD and interview questions.

---

## Lifting State vs Prop Drilling

Lifting state does not automatically mean prop drilling is bad.

- passing props one or two levels is normal  
- excessive deep prop passing may require Context  

Interviewers expect you to distinguish clearly between these two ideas.

---

## Common Interview Traps

### Trap 1: Duplicated state in multiple components  
Leads to inconsistent UI.

### Trap 2: Lifting state too high  
Causes unnecessary re-renders and complexity.

### Trap 3: Using global state too early  
Context or Redux is not always required.

### Trap 4: Mutating lifted state in children  
Children should update state only via callbacks.

---

## Practical Impact on LLD and Machine Coding

In React machine coding:

- interviewers observe where you place state  
- wrong placement leads to messy logic  
- lifting state simplifies coordination  

Common interview scenarios:

- synced inputs  
- filters and lists  
- tabs and content  
- shared counters  

---

## Interview Questions You Should Be Ready For

1. When should state be lifted  
2. Where should shared state live  
3. What problems does lifting state solve  
4. Difference between lifting state and global state  
5. How does lifting state affect re-renders  

---

## Strong Interview Answer (Example)

“Lifting state means moving state to the closest common parent so that multiple components can share and stay in sync. It ensures a single source of truth and predictable data flow. State should be lifted only when coordination is required and should live as low as possible in the component tree.”

---

## Summary (Revision Ready)

- lift state to share data  
- avoid duplicated state  
- maintain a single source of truth  
- lift to the closest common parent  
- do not lift state unnecessarily  

---

## Next Topic

Context API


Class 3.3.2
Title: Context API
 Description: Manage global state using React Context.
 Content Type: Text
 Duration: 950
 Order: 2
Text Content:

# Context API in React

## Overview

The Context API is often misunderstood as a state management replacement.

In interviews, this topic tests:

- understanding of data flow  
- ability to avoid unnecessary complexity  
- clarity on when Context is appropriate  
- awareness of performance implications  

Many candidates either:

- avoid Context completely, or  
- use it everywhere like Redux  

Both approaches are incorrect.

---

## What Problem Does Context Solve

Context solves **prop drilling**, not state management.

Prop drilling happens when:

- data needs to pass through many intermediate components  
- those components do not actually need the data  

Context allows:

- data to be provided once  
- consumed anywhere in the subtree  

---

## Basic Context Setup

### Step 1: Create Context

```js
const ThemeContext = React.createContext(null);
```

---

### Step 2: Provide Context

```js
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}
```

---

### Step 3: Consume Context

```js
function Header() {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}
```

This avoids passing `theme` through every intermediate component.

---

## Core Mental Model

Think of Context as:

A dependency injection mechanism for React components.

Important clarification:

- Context does not store state by itself  
- It only passes data  
- State may live outside or inside the provider  

---

## Context With State (Common Pattern)

```js
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

This is a very common real-world pattern.

---

## What Happens When Context Value Changes

When the value passed to a Provider changes:

- all consuming components re-render  

This is very important for performance discussions.

---

## Common Interview Trap: Using Context for Everything

Context is not meant for:

- frequently changing values  
- large, complex global state  
- high-frequency updates  

Using Context for these leads to:

- unnecessary re-renders  
- performance issues  

Interviewers often ask:

“Why not use Context everywhere?”

Correct reasoning matters here.

---

## Context vs Props vs Redux

### Context

- solves prop drilling  
- good for global configuration  
- limited performance control  

### Props

- explicit data flow  
- best for local and shared state  

### Redux

- complex global state  
- predictable updates  
- better debugging tools  

Interviewers expect you to position Context correctly.

---

## Performance Consideration (Important)

Problem example:

```jsx
<Context.Provider value={{ theme, setTheme }}>
```

Issue:

- new object created on every render  
- triggers re-render of all consumers  

Fix:

```js
const value = useMemo(() => ({ theme, setTheme }), [theme]);
```

```jsx
<Context.Provider value={value}>
```

This is a strong interview point.

---

## Common Interview Traps

### Trap 1  
Using Context instead of lifting state.  
Over-engineering.

---

### Trap 2  
Forgetting that context updates re-render consumers.  
Leads to performance issues.

---

### Trap 3  
Putting too much logic inside Context.  
Makes code hard to test and debug.

---

### Trap 4  
Using Context without clear ownership.  
Leads to unclear data flow.

---

## Practical Impact on LLD and Machine Coding

In LLD rounds:

- interviewers observe whether you choose Context correctly  
- misuse of Context is penalized  

In machine coding:

- Context is rarely required  
- lifting state is often enough  

Mentioning this shows maturity.

---

## Interview Questions You Should Be Ready For

- What problem does Context solve  
- Difference between Context and Redux  
- When should Context not be used  
- How does Context affect re-renders  
- How to optimize Context performance  

---

## Strong Interview Answer (Example)

“Context is used to avoid prop drilling by allowing data to be accessed anywhere in a component subtree. It does not replace state management libraries. Context updates cause all consumers to re-render, so it should be used for low-frequency global data like themes or user settings.”

---

## Summary (Revision Ready)

- Context avoids prop drilling  
- It does not store state by itself  
- Provider value changes trigger re-renders  
- Not a replacement for Redux  
- Use selectively  

---

## Next Topic

Redux Toolkit (interview version)



Class 3.3.3
Title: Redux Toolkit (Interview Version)
 Description: Understand Redux Toolkit essentials relevant for interviews.
 Content Type: Text
 Duration: 1000
 Order: 3
Text Content:

# Redux Toolkit (Interview Version)

## Overview

Redux is not tested for syntax depth in interviews.  
Redux is tested for **decision making and architectural clarity**.

Interviewers use Redux questions to check:

- whether you understand global state problems  
- whether you know when Redux is justified  
- whether you can explain predictable data flow  
- whether you avoid over-engineering  

Redux Toolkit is the **recommended way** to use Redux today.

---

## What Problem Redux Solves

Redux solves problems related to:

- complex global state  
- multiple unrelated components sharing data  
- unpredictable state changes  
- debugging state updates  

Redux is useful when:

- state is used across many parts of the app  
- updates come from many sources  
- tracing state changes matters  

Redux is **not needed** for small or local state.

---

## Core Redux Mental Model

At a high level:

- Store holds the global state  
- Actions describe what happened  
- Reducers describe how state changes  
- Components dispatch actions and read state  

Important principle:

State updates must be **predictable and traceable**.

---

## Why Redux Toolkit Exists

Old Redux required:

- lots of boilerplate  
- manual immutability  
- complex setup  

Redux Toolkit:

- reduces boilerplate  
- uses Immer for immutability  
- enforces best practices  

Interviewers expect **Redux Toolkit**, not legacy Redux.

---

## Basic Redux Toolkit Setup

### Step 1: Create a Slice

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

Important notes:

- code looks like mutation  
- Immer handles immutability internally  

---

### Step 2: Create Store

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default store;
```

---

### Step 3: Provide Store to App

```js
import { Provider } from "react-redux";

<Provider store={store}>
  <App />
</Provider>
```

---

### Step 4: Use Redux in Components

#### Reading State

```js
import { useSelector } from "react-redux";

const count = useSelector(state => state.counter.value);
```

#### Dispatching Actions

```js
import { useDispatch } from "react-redux";
import { increment } from "./counterSlice";

const dispatch = useDispatch();
dispatch(increment());
```

---

## Data Flow Summary (Very Important)

Redux follows **one-way data flow**:

1. Component dispatches an action  
2. Reducer updates state  
3. Store holds new state  
4. UI re-renders  

Interviewers often ask you to explain this flow verbally.

---

## Redux vs Context (Interview Framing)

### Use Context when:

- data is global but simple  
- updates are infrequent  
- performance impact is acceptable  

### Use Redux when:

- state is complex  
- many actions modify state  
- debugging and predictability matter  

This comparison is commonly asked.

---

## Common Interview Traps

### Trap 1  
Using Redux for local component state.  
Over-engineering.

### Trap 2  
Mutating state outside reducers.  
Breaks Redux guarantees.

### Trap 3  
Putting UI logic in reducers.  
Reducers should be pure.

### Trap 4  
Not understanding why Redux exists.  
Syntax without reasoning is penalized.

---

## Redux in LLD and Machine Coding

In interviews:

- Redux is rarely required in machine coding  
- Redux is discussed more in LLD or project rounds  

Interviewers care about:

- your justification for using Redux  
- not how fast you write reducers  

---

## Interview Questions You Should Be Ready For

1. When do you need Redux  
2. Difference between Redux and Context  
3. What problem does Redux solve  
4. What is Redux Toolkit  
5. Explain Redux data flow  

---

## Strong Interview Answer (Example)

“Redux is used to manage complex global state where many components need access and updates must be predictable. Redux Toolkit simplifies Redux by reducing boilerplate and handling immutability internally. I would use Redux only when state complexity and scale justify it, not for local or simple shared state.”

---

## Summary (Revision Ready)

- Redux manages complex global state  
- Redux Toolkit is the modern standard  
- Slices define state and reducers  
- One-way predictable data flow  
- Avoid Redux unless justified  

---

## Next

Section D: React LLD & Patterns

Class 3.3.4:
  Title: React Hooks, State & Lifecycle Contest
  Description: Apply core React hooks, state management, and lifecycle concepts to solve practical UI problems.
  Content Type: contest
  Duration: 3600
  Order: 6
  Contest URL: https://www.scaler.com/test/a/reacta
  Contest Questions: 6
  Contest Syllabus: 
    - React state and lifecycle
    - useEffect and dependencies
    - Custom hooks and reuse
    - Hook-based UI patterns


Topic 3.4
Title: React LLD & Patterns
 Order: 4
Class 3.4.1
Title: Component Composition
 Description: Build flexible UIs using composition over inheritance.
 Content Type: Text
 Duration: 800
 Order: 1
Text Content:

# Component Composition in React

## Overview

Component composition is a core React design principle and a frequent interview discussion topic.

Interviewers use this topic to test:

- architectural thinking  
- ability to build flexible and reusable components  
- understanding of React’s design philosophy  
- preference for composition over inheritance  

Strong candidates explain *why* composition is preferred, not just *how* to use it.

---

## What Is Component Composition

Component composition means:

- building components by combining smaller components  
- passing components or JSX as children or props  
- sharing behavior through structure, not inheritance  

In simple terms:

Components are assembled, not extended.

---

## Composition Over Inheritance (Core Principle)

React explicitly encourages:

**Composition over inheritance**

Reasons:

- JavaScript has limited class inheritance benefits  
- UI varies more by structure than by type  
- Composition keeps components flexible  

Interviewers often ask:

“Why doesn’t React use inheritance heavily?”

Expected answer:

UI reuse is better solved by composition than rigid hierarchies.

---

## Basic Composition Using children

The most common form of composition uses `children`.

```js
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

Usage:

```js
<Card>
  <h2>Title</h2>
  <p>Description</p>
</Card>
```

Here:

- `Card` controls layout  
- content is injected via composition  

This pattern is extremely common and interview-friendly.

---

## Why children Is Powerful

Using `children` allows:

- flexible content  
- reusable wrappers  
- decoupling layout from content  

Interview insight:

A component that accepts `children` is usually more reusable than one that hardcodes content.

---

## Composition via Props (Slots Pattern)

Composition is not limited to `children`.

```js
function Layout({ header, sidebar, content }) {
  return (
    <>
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{content}</main>
    </>
  );
}
```

Usage:

```js
<Layout
  header={<Header />}
  sidebar={<Sidebar />}
  content={<Dashboard />}
/>
```

This is often called the **slots pattern**.

Interviewers like candidates who know this pattern.

---

## When Composition Beats Conditional Logic

Bad pattern:

```js
function Button({ type }) {
  if (type === "primary") return <button className="primary" />;
  if (type === "secondary") return <button className="secondary" />;
}
```

Better with composition:

```js
function Button({ children, className }) {
  return <button className={className}>{children}</button>;
}
```

Composition reduces:

- branching  
- rigid APIs  
- tightly coupled logic  

---

## Specialization via Composition

Instead of inheritance:

```js
class PrimaryButton extends Button {}
```

React approach:

```js
function PrimaryButton(props) {
  return <Button className="primary" {...props} />;
}
```

This keeps components:

- explicit  
- easy to reason about  
- easy to refactor  

Interviewers prefer this explanation.

---

## Higher-Level Composition Example

```js
function Modal({ children }) {
  return (
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>
  );
}
```

Usage:

```js
<Modal>
  <Form />
</Modal>
```

Modal controls structure.  
Form controls behavior.

This separation is a strong architectural signal.

---

## Common Interview Traps

### Trap 1: Overusing inheritance mental models  
React is not class-hierarchy driven.

---

### Trap 2: Hardcoding UI inside reusable components  
Reduces flexibility.

---

### Trap 3: Passing too many configuration props  
Composition is often cleaner than flags.

---

### Trap 4: Confusing composition with prop drilling  
They solve different problems.

---

## Interview Questions You Should Be Ready For

- What is component composition  
- Why is composition preferred over inheritance in React  
- Difference between composition and configuration  
- How does `children` help composition  
- Examples where composition improves design  

---

## Strong Interview Answer (Example)

“Component composition is a pattern where we build complex UIs by combining smaller components instead of extending them through inheritance. React encourages composition over inheritance because it results in more flexible, reusable, and predictable components. Patterns like `children` and slot-based props allow layout and behavior to be decoupled cleanly.”

---

## Summary (Revision Ready)

- composition builds UIs by combining components  
- preferred over inheritance in React  
- `children` enables flexible layouts  
- slot-based props support advanced composition  
- reduces rigidity and improves reuse  

---

## Next Topic

Controlled vs Uncontrolled Components


Class 3.4.2
Title: Controlled vs Uncontrolled Inputs
 Description: Understand form control patterns in React.
 Content Type: Text
 Duration: 720
 Order: 4

Text Content:

# Controlled vs Uncontrolled Inputs in React

## Overview

Controlled vs uncontrolled inputs is a classic React interview topic that appears simple on the surface but reveals a lot about a candidate’s understanding of data flow and state ownership.

Interviewers use this topic to evaluate:

- understanding of form handling  
- clarity on state control  
- ability to choose the right pattern  
- awareness of tradeoffs  

Most candidates can define both.  
Fewer can justify **when to use which**.

---

## What Is a Controlled Input

A controlled input is an input element whose value is controlled by React state.

Key characteristics:

- value comes from state  
- updates happen via `onChange`  
- React is the single source of truth  

Example:

```js
function Form() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}
```

Here:

- input value is always in sync with state  
- React controls what appears in the UI  

---

## Core Mental Model (Controlled)

For controlled inputs:

**UI → event → state → UI**

Every keystroke:

- triggers an event  
- updates state  
- causes re-render  
- updates input value  

Interviewers expect this flow to be clearly articulated.

---

## What Is an Uncontrolled Input

An uncontrolled input manages its own internal state.

React does not control the value on every change.

Instead, the value is read only when needed.

Example using `useRef`:

```js
function Form() {
  const inputRef = useRef(null);

  function handleSubmit() {
    console.log(inputRef.current.value);
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

Here:

- the DOM owns the input state  
- React accesses the value imperatively  

---

## Core Mental Model (Uncontrolled)

For uncontrolled inputs:

**UI → DOM state → React reads on demand**

React does not re-render on every keystroke.

This distinction is very important in interviews.

---

## Key Differences (Interview Favorite)

| Aspect | Controlled | Uncontrolled |
|-----|-----------|-------------|
| Value source | React state | DOM |
| Re-render on change | Yes | No |
| Validation | Easy | Harder |
| Form control | Fine-grained | Limited |
| Performance | Slightly heavier | Slightly lighter |

Interviewers often ask candidates to compare these explicitly.

---

## Why Controlled Inputs Are Preferred

Controlled inputs:

- keep state predictable  
- enable instant validation  
- make conditional UI easy  
- integrate well with React logic  

Most production React apps use controlled inputs by default.

Interviewers generally expect this as the primary pattern.

---

## When Uncontrolled Inputs Make Sense

Uncontrolled inputs can be useful when:

- quick prototyping  
- simple forms  
- integrating non-React libraries  
- avoiding frequent re-renders for very large forms  

Strong candidates mention these cases without overselling them.

---

## Common Interview Traps

### Trap 1: Mixing controlled and uncontrolled behavior

```js
<input value={name} />
```

Without `onChange`, this creates a **read-only input**.

Very common mistake.

---

### Trap 2: Switching between controlled and uncontrolled

```js
value={someCondition ? value : undefined}
```

This causes React warnings and unstable behavior.

---

### Trap 3: Using uncontrolled inputs for complex validation

Makes logic harder and error-prone.

---

### Trap 4: Assuming uncontrolled inputs are “not React”

They are still valid, just used selectively.

---

## Validation and Controlled Inputs

Controlled inputs make validation straightforward.

Example:

```js
const isValid = name.length > 3;
```

UI can react immediately:

- show errors  
- disable submit button  

Interviewers often connect this topic with form validation.

---

## Performance Discussion (Senior Signal)

Interview-level insight:

- controlled inputs re-render on every keystroke  
- this is usually fine  
- premature optimization is unnecessary  

Only in extreme cases should uncontrolled inputs be preferred for performance.

Mentioning this shows maturity.

---

## Interview Questions You Should Be Ready For

- What is a controlled input  
- Difference between controlled and uncontrolled inputs  
- Why are controlled inputs preferred  
- When would you use uncontrolled inputs  
- What happens if value is set without onChange  

---

## Strong Interview Answer (Example)

“A controlled input is one where React state controls the input value, making React the single source of truth. An uncontrolled input lets the DOM manage the value and React reads it using refs when needed. Controlled inputs are preferred for predictable data flow and validation, while uncontrolled inputs can be useful for simple or performance-sensitive cases.”

---

## Summary (Revision Ready)

- controlled inputs use React state  
- uncontrolled inputs use DOM state  
- controlled inputs re-render on change  
- preferred for validation and logic  
- uncontrolled inputs are situational  

---



Topic 3.5
Title: Performance Optimization
 Order: 5
Class 3.5.1
Title: Memoizing Heavy Components
 Description: Prevent unnecessary renders of expensive components.
 Content Type: Text
 Duration: 780
 Order: 1
Text Content:

# Memoizing Heavy Components in React

## Overview

Memoizing heavy components is a performance optimization technique used to prevent unnecessary re-renders of expensive UI trees.

In interviews, this topic tests:

- understanding of React’s rendering behavior  
- ability to identify performance bottlenecks  
- correct usage of memoization tools  
- restraint in applying optimizations  

Interviewers are less interested in syntax and more interested in **when and why** memoization is needed.

---

## What Is a “Heavy” Component

A heavy component is one that is expensive to re-render due to:

- complex JSX trees  
- large lists or tables  
- expensive calculations  
- frequent re-renders caused by parent updates  

Key insight:

A component is not heavy because it *looks big*,  
it is heavy because it *re-renders often and does real work*.

---

## The Core Problem

By default, when a parent component re-renders:

- all child components re-render  

Even if:

- child props have not changed  

This behavior is correct but can be inefficient for expensive components.

---

## Example Problem Scenario

```js
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <HeavyComponent />
    </>
  );
}
```

Issue:

- clicking the button updates `count`  
- Parent re-renders  
- `HeavyComponent` re-renders unnecessarily  

Interviewers often ask:

“How would you prevent this?”

---

## React.memo: The Primary Tool

`React.memo` memoizes a component based on its props.

```js
const HeavyComponent = React.memo(function HeavyComponent() {
  // expensive rendering logic
  return <div>Heavy UI</div>;
});
```

Behavior:

- component re-renders only if its props change  
- shallow comparison is used  

This is the most important concept in this topic.

---

## Memoizing Components with Props

```js
const HeavyComponent = React.memo(function HeavyComponent({ data }) {
  return <ExpensiveList items={data} />;
});
```

Now:

- re-render happens only when `data` reference changes  

Interview insight:

Reference equality matters more than value equality.

---

## Why Memoization Sometimes “Doesn’t Work”

Common interview trap:

```js
<HeavyComponent data={[1, 2, 3]} />
```

Problem:

- new array created on every render  
- props reference changes  
- memoization breaks  

Fix:

```js
const data = useMemo(() => [1, 2, 3], []);
<HeavyComponent data={data} />
```

Interviewers often test this exact scenario.

---

## Memoizing vs useCallback and useMemo

Clarify responsibilities:

- `React.memo` memoizes **components**  
- `useCallback` memoizes **function references**  
- `useMemo` memoizes **computed values**  

All three often work together.

Misunderstanding this relationship is a common red flag.

---

## Custom Comparison Function (Advanced)

```js
React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
```

Notes:

- allows fine-grained control  
- increases complexity  
- rarely required  

Interview expectation:

Know it exists.  
Do not overuse it.

---

## When You Should NOT Memoize

Important interview signal.

Do not memoize when:

- component is cheap to render  
- props change frequently  
- memoization logic is more expensive than render  

Overusing memoization is considered poor judgment.

---

## Common Interview Traps

### Trap 1: Memoizing everything  
Leads to complexity without benefit.

---

### Trap 2: Memoizing without fixing prop references  
Results in no performance gain.

---

### Trap 3: Using memo to “fix” bad architecture  
Memoization is not a design replacement.

---

### Trap 4: Forgetting child dependencies  
Memoized parent does not prevent child re-renders.

---

## How Interviewers Evaluate This Topic

Interviewers look for:

- ability to identify unnecessary re-renders  
- correct use of `React.memo`  
- understanding of reference equality  
- restraint and judgment  

Being able to explain **why** memoization helps is more important than writing it.

---

## Interview Questions You Should Be Ready For

- When does `React.memo` prevent re-render  
- Why does memo sometimes not work  
- Difference between `React.memo` and `useMemo`  
- When should memoization be avoided  
- How do props affect memoization  

---

## Strong Interview Answer (Example)

“To prevent unnecessary re-renders of expensive components, we can memoize them using `React.memo`, which re-renders only when props change. Memoization works based on reference equality, so it’s important to ensure stable prop references using `useMemo` or `useCallback`. Memoization should be applied selectively, only where performance issues actually exist.”

---

## Summary (Revision Ready)

- parent re-renders cause child re-renders  
- `React.memo` memoizes components  
- reference stability is critical  
- memoization must be selective  
- overuse is a performance and design smell  

---


Class 3.5.2
Title: Avoiding Re-renders
 Description: Identify and eliminate common causes of re-renders.
 Content Type: Text
 Duration: 840
 Order: 2
Text Content:

# Avoiding Unnecessary Re-renders in React

## Overview

Avoiding unnecessary re-renders is one of the clearest signals of React maturity in interviews.

Interviewers use this topic to evaluate:

- understanding of React’s rendering model  
- ability to identify performance bottlenecks  
- clarity on reference equality  
- correct and restrained use of optimization hooks  

Strong candidates do not try to “stop all re-renders”.  
They focus on **eliminating avoidable ones**.

---

## First Principle (Very Important)

Re-renders are **not bad by default**.

React is designed to re-render.

The goal is to avoid:

- re-renders that do no useful work  
- re-renders caused by unstable references  
- re-renders caused by poor state placement  

Interviewers penalize candidates who try to over-optimize blindly.

---

## Common Causes of Unnecessary Re-renders

### Cause 1: Parent Re-rendering

When a parent component re-renders:

- all child components re-render by default  

Even if:

- child props did not change  

This is expected React behavior.

Optimization is required only when child components are expensive.

---

## Cause 2: Inline Functions (Very Common)

```js
<Child onClick={() => handleClick()} />
```

Problem:

- a new function is created on every render  
- child receives a new prop reference  
- memoization breaks  

This is one of the most common interview examples.

---

## Fix: useCallback

`useCallback` memoizes a function reference.

```js
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

Usage:

```js
<Child onClick={handleClick} />
```

Now:

- function reference is stable  
- memoized child does not re-render unnecessarily  

Interview insight:

`useCallback` only helps when the function is passed as a prop or used in dependencies.

---

## Cause 3: Inline Objects and Arrays

```js
<Child config={{ theme: "dark" }} />
```

Problem:

- new object created on every render  
- reference changes every time  

Even if the content is identical, React sees it as different.

---

## Fix: useMemo

```js
const config = useMemo(() => ({ theme: "dark" }), []);
<Child config={config} />
```

This stabilizes the object reference.

---

## Cause 4: Derived State Stored Incorrectly

```js
const [filteredItems, setFilteredItems] = useState([]);
```

Problem:

- derived state stored separately  
- extra state updates  
- unnecessary re-renders  

Better approach:

```js
const filteredItems = useMemo(
  () => items.filter(item => item.active),
  [items]
);
```

Derived data should usually be computed, not stored.

---

## Cause 5: Incorrect State Placement

```js
function Parent() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <HeavyComponent />
      <div onMouseEnter={() => setHovered(true)} />
    </>
  );
}
```

Problem:

- hover state triggers parent re-render  
- heavy component re-renders unnecessarily  

Fix:

Move state closer to where it is needed.

```js
function HoverArea() {
  const [hovered, setHovered] = useState(false);
  return <div onMouseEnter={() => setHovered(true)} />;
}
```

This is a **design fix**, not a memoization fix.

Interviewers value this reasoning highly.

---

## Cause 6: Missing React.memo on Heavy Components

```js
function HeavyComponent() {
  // expensive render
}
```

Fix:

```js
const HeavyComponent = React.memo(function HeavyComponent() {
  // expensive render
});
```

Memoization should be applied **only after identifying cost**.

---

## Combining Techniques (Realistic Example)

```js
const HeavyList = React.memo(function HeavyList({ items, onSelect }) {
  return items.map(item => (
    <div key={item.id} onClick={() => onSelect(item.id)}>
      {item.name}
    </div>
  ));
});
```

Problem:

- inline arrow function inside map  
- breaks memoization  

Improved version:

```js
function Parent({ items }) {
  const handleSelect = useCallback((id) => {
    console.log(id);
  }, []);

  return <HeavyList items={items} onSelect={handleSelect} />;
}
```

This stabilizes the callback and preserves memoization.

---

## When useCallback Is NOT Needed (Important)

Do not use `useCallback` when:

- function is not passed as a prop  
- function is cheap and local  
- component is not memoized  

Example where it is unnecessary:

```js
<button onClick={() => setCount(c => c + 1)}>+</button>
```

Using `useCallback` here adds complexity with no benefit.

Interviewers expect you to say this explicitly.

---

## Common Interview Traps

### Trap 1  
Trying to prevent all re-renders.  
Re-renders are normal.

---

### Trap 2  
Using `useCallback` everywhere.  
Over-optimization.

---

### Trap 3  
Memoizing without stabilizing props.  
No performance gain.

---

### Trap 4  
Fixing design problems with memoization.  
Wrong approach.

---

## How Interviewers Evaluate This Topic

They look for:

- ability to identify the real cause of re-renders  
- preference for design fixes before memoization  
- correct, selective use of `React.memo`, `useCallback`, `useMemo`  
- clear explanation of reference equality  

---

## Interview Questions You Should Be Ready For

- Why does this component re-render  
- How would you prevent unnecessary re-renders  
- When should you use `useCallback`  
- Why did memo not work here  
- How does state placement affect re-renders  

---

## Strong Interview Answer (Example)

“Unnecessary re-renders usually happen due to parent re-renders, unstable function or object references, or poor state placement. I first try to fix design issues like moving state closer to where it’s needed. For expensive components, I use `React.memo` along with `useCallback` or `useMemo` to stabilize props. I avoid overusing memoization unless there is a real performance issue.”

---

## Summary (Revision Ready)

- re-renders are normal  
- avoid unstable references  
- fix state placement first  
- use `React.memo` for heavy components  
- use `useCallback` only when needed  

---

Class 3.5.3
Title: Virtualization
 Description: Render large lists efficiently using virtualization techniques.
 Content Type: Text
 Duration: 780
 Order: 3
Text Content:

# Virtualization in React

## Overview

Virtualization is a performance technique used to efficiently render very large lists or grids.

In interviews, this topic tests:

- understanding of browser rendering costs  
- ability to reason about performance bottlenecks  
- familiarity with real-world optimization techniques  
- awareness of when React alone is not enough  

Strong candidates clearly explain **why rendering everything is expensive** and **how virtualization solves it**.

---

## The Core Problem with Large Lists

Rendering large lists is expensive because:

- each DOM node consumes memory  
- layout and paint costs increase  
- re-renders become slow  
- scrolling performance degrades  

Example problem:

Rendering 10,000 list items at once, even if only 20 are visible.

This is inefficient and unnecessary.

---

## What Is Virtualization

Virtualization means:

- rendering only the items that are currently visible  
- plus a small buffer around them  
- dynamically updating items as the user scrolls  

The full dataset exists in memory, but:

**only a window of items exists in the DOM.**

---

## Core Mental Model (Very Important)

Think of virtualization as:

A moving window over a large dataset.

As the user scrolls:

- items leaving the viewport are removed  
- new items entering the viewport are rendered  

This keeps DOM size small and performance stable.

---

## Why Virtualization Works

Virtualization improves performance by:

- limiting DOM node count  
- reducing layout and paint work  
- avoiding unnecessary re-renders  
- keeping scroll smooth  

Interviewers often expect candidates to mention **DOM cost**, not just “performance”.

---

## Naive Approach (What Not to Do)

```js
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

Problem:

- renders all items  
- slow initial render  
- poor scrolling performance  

Interviewers often start with this example.

---

## Virtualized Approach (Conceptual)

Key ideas:

- fixed or predictable item height  
- calculate visible range  
- render only that range  

Pseudocode:

```js
const startIndex = Math.floor(scrollTop / itemHeight);
const endIndex = startIndex + visibleCount;
```

Only render items between `startIndex` and `endIndex`.

---

## Using a Library (Interview-Expected)

In real projects and interviews, you are not expected to implement virtualization from scratch.

Common libraries:

- `react-window`  
- `react-virtualized`  

Example using `react-window`:

```js
import { FixedSizeList as List } from "react-window";

<List
  height={400}
  itemCount={items.length}
  itemSize={35}
  width={300}
>
  {({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  )}
</List>
```

Interviewers are happy if you:

- explain the concept  
- mention a popular library  
- know basic usage  

---

## Key Concepts Interviewers Listen For

- only visible items are rendered  
- offscreen items are not in the DOM  
- scrolling updates the rendered window  
- item height consistency matters  

Mentioning these clearly is a strong signal.

---

## Fixed vs Variable Height Items

### Fixed height

- simpler  
- faster calculations  
- preferred  

### Variable height

- more complex  
- requires measurement  
- supported by advanced libraries  

Interviewers may ask which is easier and why.

---

## When Virtualization Is Needed

Virtualization is needed when:

- list size is large (hundreds or thousands)  
- scrolling performance degrades  
- initial render is slow  

Virtualization is **not required** for small lists.

Mentioning this restraint is important.

---

## Common Interview Traps

### Trap 1  
Trying to optimize small lists.  
Over-engineering.

---

### Trap 2  
Thinking virtualization reduces data size.  
It only reduces DOM size.

---

### Trap 3  
Implementing virtualization from scratch unnecessarily.  
Libraries are preferred.

---

### Trap 4  
Ignoring accessibility concerns.  
Virtualized lists still need keyboard and screen reader support.

---

## Interview Questions You Should Be Ready For

- Why are large lists slow to render  
- What is virtualization  
- How does virtualization improve performance  
- Difference between pagination and virtualization  
- Have you used react-window or react-virtualized  

---

## Virtualization vs Pagination (Common Comparison)

- Pagination limits data shown per page  
- Virtualization keeps all data but limits DOM nodes  

Both solve performance issues differently.

Strong candidates explain this distinction.

---

## Strong Interview Answer (Example)

“Virtualization is a technique where only the visible portion of a large list is rendered in the DOM, along with a small buffer. This significantly reduces DOM size, layout, and paint costs, leading to smooth scrolling. Libraries like react-window handle this efficiently, and virtualization should be used only when list size is large enough to cause performance issues.”

---

## Summary (Revision Ready)

- large lists are expensive to render  
- virtualization limits DOM nodes  
- uses a moving window over data  
- improves scroll and render performance  
- libraries like react-window are preferred  

---

Class 3.5.4
Title: Suspense & Concurrent Mode (Lightweight)
 Description: Get an interview-level understanding of React Suspense and concurrent features.
 Content Type: Text
 Duration: 720
 Order: 4
Text Content:

# Suspense & Concurrent Mode in React (Lightweight)

## Overview

Suspense and Concurrent features represent React’s evolution toward smoother, more responsive user experiences.

In interviews, this topic evaluates:

- clarity of mental models  
- understanding of async UI handling  
- awareness of modern React direction  
- restraint in claiming production usage  

Interviewers expect **conceptual correctness**, not deep internal details.

---

## The Problem React Is Solving

Traditional React apps often suffer from:

- blocking renders during data or code loading  
- scattered loading flags across components  
- UI freezes during expensive updates  

These issues hurt perceived performance and user trust.

---

## What Is Suspense (Conceptually)

Suspense allows a component subtree to:

- pause rendering until something is ready  
- display a fallback UI while waiting  
- resume automatically when ready  

Basic usage:

```js
<Suspense fallback={<Loader />}>
  <SomeComponent />
</Suspense>
```

This centralizes loading behavior.

---

## What Suspense Works With Today

Important interview clarification:

Suspense works reliably today with:

- code splitting using `React.lazy`

Example:

```js
const Profile = React.lazy(() => import("./Profile"));

<Suspense fallback={<Spinner />}>
  <Profile />
</Suspense>
```

Data fetching with Suspense is still evolving and not universally adopted.

Mentioning this shows realism.

---

## What Suspense Does NOT Do

Suspense does not:

- fetch data on its own  
- replace `useEffect`  
- eliminate the need for data libraries  

It coordinates rendering, not networking.

---

## Concurrent Rendering (Mental Model)

Concurrent rendering allows React to:

- interrupt long renders  
- prioritize urgent updates  
- pause and resume work  

Key idea:

Rendering becomes **interruptible**, not blocking.

This improves responsiveness, not necessarily raw speed.

---

## Why Concurrent Rendering Matters

Without concurrency:

- long renders block the main thread  
- typing and interactions feel laggy  

With concurrency:

- urgent updates (typing, clicks) are prioritized  
- non-urgent work is deferred  
- UI remains responsive  

This is especially important for large or complex UIs.

---

## Interview-Level Concurrent APIs

### useTransition

Marks updates as non-urgent.

```js
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setResults(newResults);
});
```

React can delay this update to keep the UI responsive.

---

### startTransition (Concept)

- signals low-priority updates  
- avoids blocking urgent interactions  
- may show pending UI  

Interviewers care about **priority management**, not syntax memorization.

---

## How Suspense and Concurrency Work Together

Suspense defines:

- what to show while waiting  

Concurrent rendering decides:

- when rendering work should happen  

Together they enable:

- smoother loading states  
- fewer UI freezes  
- better perceived performance  

---

## What Interviewers Want to Hear

Correct framing includes:

- Suspense simplifies loading UI  
- Concurrent rendering improves responsiveness  
- Both focus on user experience  
- Adoption should be incremental  

Avoid claiming full-scale production usage unless true.

---

## Common Interview Traps

### Trap 1  
Saying Suspense replaces data-fetching libraries.

---

### Trap 2  
Claiming Concurrent Mode makes apps faster by default.

---

### Trap 3  
Overexplaining internals without use-case clarity.

---

### Trap 4  
Using advanced APIs without justification.

---

## Interview Questions You Should Be Ready For

- What is Suspense  
- What problems does Suspense solve  
- How does Suspense work with lazy loading  
- What is concurrent rendering  
- Why is useTransition useful  

---

## Strong Interview Answer (Example)

“Suspense allows React to declaratively handle loading states by showing fallback UI while parts of the tree aren’t ready, such as lazy-loaded components. Concurrent rendering lets React interrupt and prioritize rendering work to keep the UI responsive. Both aim to improve user experience rather than raw performance and are typically adopted incrementally.”

---

## Summary (Revision Ready)

- Suspense centralizes loading states  
- works reliably with code splitting  
- concurrent rendering enables interruptible work  
- focus is responsiveness  
- interview-level understanding is sufficient  

---

**Duration:** 720


Topic 3.6
Title: React Machine Coding
 Order: 6
Class 3.6.1
Title: Search & Filter UI
 Description: Build a searchable and filterable UI in React.
 Content Type: Text
 Duration: 900
 Order: 1
Text Content:

# Search & Filter UI (Machine Coding)

## Overview

Search and filter UIs are among the most common React machine coding questions.

Interviewers use this problem to evaluate:

- state management fundamentals  
- controlled inputs  
- data transformation logic  
- component structure and clarity  
- ability to reason step by step under time pressure  

This problem is not about UI polish.  
It is about **correct data flow and clean logic**.

---

## Problem Statement (Typical Interview Framing)

Build a UI that:

- displays a list of items  
- allows searching by text  
- allows filtering by one or more criteria  
- updates results in real time  

Common examples:

- product list with search and category filter  
- user list with name search and role filter  
- movies list with title search and rating filter  

---

## Core Mental Model (Very Important)

The key idea:

**Search and filters do not change data.  
They change what is displayed.**

Therefore:

- original data should remain unchanged  
- filtered data should be derived, not stored  

This single principle avoids many bugs.

---

## Basic Component Structure

Typical breakdown:

- SearchInput  
- FilterControls  
- ResultsList  

Parent component owns the data and filter state.

---

## Step 1: Base Data Setup

```js
const items = [
  { id: 1, name: "Apple", category: "Fruit" },
  { id: 2, name: "Carrot", category: "Vegetable" },
  { id: 3, name: "Banana", category: "Fruit" }
];
```

This data should be treated as immutable.

---

## Step 2: State Placement

```js
const [searchText, setSearchText] = useState("");
const [category, setCategory] = useState("all");
```

Key interview insight:

- search text and filters are state  
- filtered list is **derived**, not state  

---

## Step 3: Controlled Search Input

```js
function SearchInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

This tests:

- controlled inputs  
- prop passing  
- event handling  

---

## Step 4: Filter Controls

```js
function CategoryFilter({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="all">All</option>
      <option value="Fruit">Fruit</option>
      <option value="Vegetable">Vegetable</option>
    </select>
  );
}
```

Interviewers check:

- controlled selects  
- simple, readable logic  

---

## Step 5: Deriving Filtered Results

```js
const filteredItems = useMemo(() => {
  return items.filter(item => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      category === "all" || item.category === category;

    return matchesSearch && matchesCategory;
  });
}, [items, searchText, category]);
```

Key points interviewers listen for:

- no mutation  
- derived data  
- correct dependency usage  

---

## Step 6: Rendering Results

```js
function ResultsList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name} ({item.category})
        </li>
      ))}
    </ul>
  );
}
```

Simple, readable, predictable.

---

## Putting It All Together

```js
function App() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        category === "all" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [searchText, category]);

  return (
    <>
      <SearchInput value={searchText} onChange={setSearchText} />
      <CategoryFilter value={category} onChange={setCategory} />
      <ResultsList items={filteredItems} />
    </>
  );
}
```

This solution is **machine-coding ready**.

---

## Common Interview Traps

### Trap 1  
Storing filtered data in state.  
Leads to sync bugs.

---

### Trap 2  
Mutating the original list.  
Breaks predictability.

---

### Trap 3  
Applying filters inside render without memoization for large lists.

---

### Trap 4  
Overengineering with Context or Redux.

---

## Follow-up Variations Interviewers Ask

- debounce search input  
- multiple filters  
- case-insensitive search  
- server-side search discussion  
- performance for large datasets  

You are not expected to implement all.  
You are expected to **discuss tradeoffs**.

---

## Strong Interview Explanation (Example)

“I keep the original data immutable and store only the search text and filter values in state. The filtered list is derived using a pure function. This ensures a single source of truth, predictable updates, and makes the UI easy to extend.”

---

## Summary (Revision Ready)

- original data stays unchanged  
- search and filters are state  
- filtered list is derived  
- controlled inputs are key  
- simplicity beats overengineering  

---

**Duration:** 900

Class 3.6.2
Title: Infinite Scroll
 Description: Implement infinite scrolling behavior in React.
 Content Type: Text
 Duration: 1020
 Order: 2
Text Content:

# Infinite Scroll (Machine Coding)

## Overview

Infinite scroll is a common machine coding and LLD follow-up question focused on performance, pagination strategy, and user experience.

Interviewers evaluate:

- understanding of incremental data loading  
- event handling and side effects  
- performance awareness  
- clean separation of concerns  
- ability to discuss tradeoffs  

This problem is not about fancy UI.  
It is about **correct loading logic and stability**.

---

## What Is Infinite Scroll

Infinite scroll means:

- loading data in chunks  
- fetching more data as the user scrolls  
- appending results to the existing list  

Unlike pagination:

- users do not manually switch pages  
- content loads seamlessly  

---

## Core Mental Model (Very Important)

Key idea:

**Data is loaded incrementally, not all at once.**

You must manage:

- current page or offset  
- loading state  
- end-of-data condition  

Failing to track these leads to duplicate requests or infinite loops.

---

## Why Scroll Events Are Not Ideal

A naive approach is to listen to scroll events.

Problems with scroll listeners:

- fire frequently  
- require manual calculations  
- harder to optimize  
- easy to introduce bugs  
- can hurt performance  

Interview insight:

Scroll listeners shift complexity to the developer and the browser.

---

## What Is Intersection Observer

Intersection Observer is a browser API that allows you to:

- observe when an element enters or leaves the viewport  
- react only when visibility changes  
- avoid manual scroll position calculations  

It answers one question:

**Is this element visible on the screen right now?**

---

## Why Intersection Observer Is Ideal for Infinite Scroll

For infinite scroll, we need to know:

“When the user is close to the bottom, load more data.”

Intersection Observer solves this cleanly by:

- watching a sentinel element at the bottom  
- triggering a callback only when it becomes visible  
- avoiding continuous scroll polling  

Benefits:

- better performance  
- simpler logic  
- cleaner separation of concerns  

Interviewers strongly prefer this approach.

---

## The Sentinel Pattern (Key Concept)

A sentinel is:

- an empty element placed at the bottom of the list  
- observed using Intersection Observer  

When the sentinel becomes visible:

- the next page of data is loaded  

This pattern is simple, reliable, and interview-friendly.

---

## Data Model Example

```js
// server returns paginated data
{
  items: [...],
  hasMore: true
}
```

Client must track:

- loaded items  
- page number or cursor  
- whether more data exists  

---

## State Setup

```js
const [items, setItems] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);
```

Each piece of state has a single responsibility.

---

## Fetching Data Incrementally

```js
async function fetchItems(page) {
  setLoading(true);

  const res = await fetch(`/api/items?page=${page}`);
  const data = await res.json();

  setItems(prev => [...prev, ...data.items]);
  setHasMore(data.hasMore);
  setLoading(false);
}
```

Key points:

- append data  
- do not overwrite existing items  
- track `hasMore`  

---

## Triggering Load with Intersection Observer

```js
const observerRef = useRef(null);

useEffect(() => {
  if (!hasMore || loading) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setPage(prev => prev + 1);
    }
  });

  if (observerRef.current) {
    observer.observe(observerRef.current);
  }

  return () => observer.disconnect();
}, [hasMore, loading]);
```

This effect:

- observes the sentinel  
- triggers page increment only when visible  
- prevents unnecessary work  

---

## Sentinel Element

```js
<div ref={observerRef} />
```

Placed at the bottom of the list.

When it enters the viewport:

- next page is requested  

---

## Fetch on Page Change

```js
useEffect(() => {
  fetchItems(page);
}, [page]);
```

This cleanly separates:

- visibility detection  
- data fetching logic  

Interviewers value this separation.

---

## Full Rendering Example

```js
function InfiniteList() {
  return (
    <>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}

      {loading && <p>Loading...</p>}
      {hasMore && <div ref={observerRef} />}
    </>
  );
}
```

---

## Common Interview Traps

### Trap 1  
Triggering multiple fetches while loading.

---

### Trap 2  
Ignoring `hasMore`.  
Leads to endless API calls.

---

### Trap 3  
Using scroll listeners instead of Intersection Observer.

---

### Trap 4  
Over-fetching data.  
Infinite scroll still requires pagination.

---

## Infinite Scroll vs Pagination

- pagination gives user control  
- infinite scroll improves browsing flow  
- infinite scroll complicates navigation and SEO  

Strong candidates discuss tradeoffs.

---

## Strong Interview Explanation (Example)

“I use Intersection Observer to detect when a sentinel element at the bottom of the list enters the viewport. This avoids scroll listeners and allows data to be fetched only when needed. I track page, loading, and hasMore state to ensure stable and predictable infinite scrolling behavior.”

---

## Summary (Revision Ready)

- infinite scroll loads data incrementally  
- Intersection Observer detects visibility efficiently  
- sentinel pattern simplifies logic  
- loading and hasMore guards are essential  
- design matters more than UI polish  

---

**Duration:** 1020

Class 3.6.3
Title: Debounced Search
 Description: Implement debounced search to optimize performance.
 Content Type: Text
 Duration: 840
 Order: 3
Text Content:

# Debounced Search (Machine Coding)

## Overview

Debounced search is a common follow-up to search and filter problems and is frequently tested in machine coding and performance discussions.

Interviewers evaluate:

- understanding of unnecessary work during rapid input  
- ability to optimize user-driven events  
- correct use of timers or hooks  
- clarity on UX vs performance tradeoffs  

This problem is less about syntax and more about **controlling execution frequency**.

---

## The Core Problem

In a naive search implementation:

- every keystroke triggers logic  
- API calls fire repeatedly  
- filtering runs too often  
- performance degrades  

Example issue:

Typing “react” triggers 5 searches:
`r → re → rea → reac → react`

This is wasteful and unnecessary.

---

## What Is Debouncing

Debouncing means:

- delaying execution until user stops typing  
- resetting the timer on every new input  
- running the action only after a pause  

Key idea:

**Execute only after inactivity, not on every event.**

---

## Debounce vs Throttle (Interview Favorite)

Debounce:
- waits for silence  
- ideal for search inputs  

Throttle:
- limits execution rate  
- ideal for scroll or resize  

Interviewers often ask you to distinguish these.

---

## Basic Debounce Using setTimeout

```js
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
```

This is the classic debounce implementation.

---

## Using Debounce in React (Conceptual)

Naive approach:

```js
<input onChange={handleSearch} />
```

Problem:

- `handleSearch` runs on every keystroke  

We want to debounce the effect of typing, not the input itself.

---

## Debounced Search with useEffect

```js
function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

Key interview insights:

- debounce logic lives in `useEffect`  
- cleanup prevents stale executions  
- controlled input remains responsive  

---

## Why This Pattern Is Preferred in React

Advantages:

- no custom debounce utility required  
- lifecycle is managed by React  
- cleanup is automatic  
- easy to reason about  

Interviewers prefer this approach over manual debounce wrappers.

---

## Debouncing API Calls (Common Scenario)

```js
useEffect(() => {
  const timer = setTimeout(async () => {
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setResults(data);
  }, 500);

  return () => clearTimeout(timer);
}, [query]);
```

Important points:

- debounce happens before API call  
- reduces server load  
- improves perceived performance  

---

## Guarding Against Edge Cases

Common guards:

- ignore empty queries  
- cancel in-flight requests if needed  
- handle loading and error states  

Example:

```js
if (!query.trim()) return;
```

Mentioning guards shows interview maturity.

---

## When Debouncing Is NOT Needed

Do not debounce when:

- filtering small in-memory lists  
- immediate feedback is required  
- delay harms UX  

Debouncing should improve experience, not degrade it.

---

## Common Interview Traps

### Trap 1  
Debouncing the input `onChange` handler directly.

---

### Trap 2  
Forgetting to clear timers.  
Leads to stale updates.

---

### Trap 3  
Debouncing everything.  
Only debounce expensive operations.

---

### Trap 4  
Confusing debounce with throttle.

---

## Follow-up Questions Interviewers Ask

- debounce vs throttle  
- how to debounce API calls  
- handling fast typing + slow network  
- cancelling previous requests  
- debouncing with custom hooks  

You are expected to **explain**, not overbuild.

---

## Strong Interview Explanation (Example)

“I debounce the search effect so that the expensive operation runs only after the user pauses typing. In React, I prefer implementing debounce inside a `useEffect` with a timeout and cleanup function. This keeps the input responsive while avoiding unnecessary API calls or filtering.”

---

## Summary (Revision Ready)

- debouncing delays execution  
- prevents unnecessary work  
- ideal for search inputs  
- implemented cleanly with `useEffect`  
- improves performance and UX  

---

**Duration:** 840

Class 3.6.4
Title: Paginated Tables
 Description: Build paginated data tables in React.
 Content Type: Text
 Duration: 900
 Order: 4
Text Content:

# Paginated Tables (Machine Coding)

## Overview

Paginated tables are a staple machine coding problem that tests data flow, state management, and UI correctness under constraints.

Interviewers evaluate:

- understanding of pagination mechanics  
- clean state design  
- separation of concerns  
- correctness in edge cases  
- ability to discuss client-side vs server-side pagination  

The focus is **predictable behavior**, not UI styling.

---

## What Is Pagination

Pagination means:

- dividing a large dataset into pages  
- showing a fixed number of rows per page  
- allowing navigation between pages  

Benefits:

- improved performance  
- better readability  
- controlled data loading  

---

## Core Mental Model (Very Important)

Key idea:

**Pagination controls which slice of data is displayed.**

Therefore:

- original data remains unchanged  
- page index and page size are state  
- displayed rows are derived  

This avoids sync bugs and duplication.

---

## Pagination Types (Interview Context)

### Client-side pagination
- all data is already loaded  
- pagination slices data locally  
- simpler to implement  

### Server-side pagination
- data is fetched page by page  
- required for very large datasets  
- needs API coordination  

Interviewers often ask you to explain both.

---

## Basic Data Setup

```js
const data = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "User" },
  { id: 3, name: "Carol", role: "User" },
  // many more rows
];
```

This data should be treated as immutable.

---

## State Design

```js
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(5);
```

Interview insight:

- page is 1-based or 0-based, but be consistent  
- page size should be configurable  

---

## Deriving Paginated Rows

```js
const paginatedData = useMemo(() => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
}, [data, page, pageSize]);
```

Key points interviewers look for:

- no mutation  
- derived data  
- correct slice boundaries  

---

## Rendering the Table

```js
function Table({ rows }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

Clean and predictable rendering is preferred.

---

## Pagination Controls

```js
function Pagination({ page, totalPages, onChange }) {
  return (
    <>
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      <span>{page} / {totalPages}</span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </>
  );
}
```

Interviewers check:

- disabled states  
- boundary conditions  
- clarity of intent  

---

## Calculating Total Pages

```js
const totalPages = Math.ceil(data.length / pageSize);
```

This value should be derived, not stored.

---

## Putting It All Together

```js
function PaginatedTable() {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [page]);

  return (
    <>
      <Table rows={paginatedData} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </>
  );
}
```

This solution is machine-coding ready.

---

## Common Interview Traps

### Trap 1  
Storing paginated data in state.  
Leads to sync issues.

---

### Trap 2  
Not handling page boundaries.  
Causes empty or invalid pages.

---

### Trap 3  
Resetting page incorrectly when data changes.  
Must consider filters and sorting.

---

### Trap 4  
Overengineering with Context or Redux.

---

## Follow-up Variations Interviewers Ask

- changing page size  
- jumping to a specific page  
- sorting + pagination interaction  
- server-side pagination discussion  
- loading states for server pages  

You are expected to **discuss tradeoffs**, not implement everything.

---

## Server-side Pagination (Discussion Level)

Key differences:

- page change triggers API call  
- server returns total count  
- client renders only current page  

Strong candidates explain this without writing code.

---

## Strong Interview Explanation (Example)

“I keep pagination state minimal by storing only the current page and page size. The table rows are derived using a slice of the original data. This avoids mutation, keeps logic predictable, and makes it easy to extend pagination with sorting or filtering.”

---

## Summary (Revision Ready)

- pagination controls displayed slice  
- original data stays unchanged  
- page and page size are state  
- rows are derived using slice  
- handle boundaries carefully  

---

**Duration:** 900

Class 3.6.5:
  Title: React State, Performance & Redux Contest
  Description: Build scalable React UIs using state management, performance optimizations, and data-driven components.
  Content Type: contest
  Duration: 3600
  Order: 6
  Contest URL: https://www.scaler.com/test/a/reactb
  Contest Questions: 6
  Contest Syllabus: 
    - React state and UI patterns
    - useMemo and performance optimization
    - Filtering and pagination logic
    - Redux Toolkit fundamentals



Module 4
Title: LLD4: Node.js + Express + MongoDB
 Description: Learn backend fundamentals, API design, database modeling, authentication, and production-ready backend patterns with an interview-focused approach.
 Order: 4
Learning Outcomes:
Understand Node.js runtime behavior


Build REST APIs using Express


Design MongoDB schemas and queries


Implement secure authentication and backend LLD patterns



Topic 4.1
Title: Node.js Core
 Order: 1
Class 4.1.1
Title: Event Loop (Server-side Specifics)
 Description: Understand how the Node.js event loop differs from the browser.
 Content Type: Text
 Duration: 1080
 Order: 1
Text Content:

# Event Loop (Server-side Specifics in Node.js)

## Overview

The Node.js event loop is a high-frequency interview topic in MERN and backend roles.

Interviewers use this topic to evaluate:

- understanding of asynchronous execution  
- clarity on how Node.js handles concurrency  
- differences between browser and server runtimes  
- ability to reason about performance and scalability  

Most candidates know *what* the event loop is.  
Fewer can explain **how Node.js differs from the browser and where `setImmediate` fits in**.

---

## Core Mental Model (Very Important)

Node.js is:

- single-threaded for JavaScript execution  
- asynchronous by design  
- non-blocking through the event loop  

Key idea:

**Node.js handles many concurrent operations using a single thread + event loop, not multiple JS threads.**

---

## Why the Event Loop Exists in Node.js

Node.js is designed for:

- I/O-heavy workloads  
- network requests  
- file system operations  
- high concurrency  

Without the event loop:

- each I/O operation would block execution  
- server throughput would collapse  

The event loop enables Node.js to scale efficiently.

---

## Browser vs Node.js Event Loop (High-Level)

### Browser Event Loop

Browser event loop coordinates:

- DOM events  
- UI rendering  
- user interactions  
- network callbacks  

Rendering and responsiveness are primary concerns.

---

### Node.js Event Loop

Node.js event loop coordinates:

- network I/O  
- file system callbacks  
- timers  
- internal server tasks  

There is **no DOM** and **no rendering phase**.

Throughput and concurrency matter more than UI smoothness.

---

## Node.js Architecture (Important Context)

Node.js consists of:

- V8 engine (executes JavaScript)  
- libuv (implements the event loop and async I/O)  
- an OS-level thread pool  

Important clarification:

- JavaScript runs on a single main thread  
- libuv uses background threads for I/O  
- callbacks return to the event loop  

This is why Node.js is asynchronous but not multithreaded in JS.

---

## Event Loop Phases in Node.js (Conceptual)

Node.js event loop runs in **phases**.

Interviewers expect understanding, not memorization.

Main phases:

1. Timers  
2. I/O callbacks  
3. Poll  
4. Check  
5. Close callbacks  

The **poll** and **check** phases are most important for interviews.

---

## Timers Phase

Handles callbacks scheduled by:

```js
setTimeout
setInterval
```

Key points:

- timers do not run exactly at the delay  
- they execute when the timers phase is reached  
- delay is the *minimum* time, not a guarantee  

---

## Poll Phase (Very Important)

The poll phase:

- retrieves new I/O events  
- executes I/O callbacks  
- waits for new events if nothing is scheduled  

Most server-side async work happens here.

Interview insight:

If you block the poll phase with synchronous code, the server becomes unresponsive.

---

## setImmediate and the Check Phase (Critical Addition)

`setImmediate` callbacks run in the **check phase**, which comes **after the poll phase**.

Example:

```js
setImmediate(() => {
  console.log("setImmediate");
});
```

Key interview insight:

- `setImmediate` executes **after I/O callbacks**  
- it is designed to run once the poll phase completes  
- it is often used to run logic *after* I/O work  

This makes `setImmediate` different from `setTimeout(fn, 0)`.

---

## setTimeout(0) vs setImmediate (Interview Favorite)

```js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
```

Important clarification:

- order is **not guaranteed** in all cases  
- inside an I/O callback, `setImmediate` usually runs first  
- outside I/O, ordering can vary  

Strong candidates say:

“The order depends on the context in which they are scheduled.”

---

## Microtasks in Node.js

Microtasks include:

- `process.nextTick`  
- `Promise.then`  

Execution priority:

1. `process.nextTick`  
2. Promise microtasks  
3. Event loop phases  

Important warning:

Excessive `process.nextTick` usage can starve the event loop.

---

## process.nextTick vs Promise.then

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
```

Output order in Node.js:

- `nextTick` runs first  
- then promise microtasks  

This behavior is **Node-specific** and frequently tested.

---

## How Node.js Event Loop Differs from Browser

Key differences interviewers look for:

- no rendering phase in Node.js  
- presence of libuv and thread pool  
- `process.nextTick` and `setImmediate` are Node-specific  
- I/O throughput is prioritized over UI responsiveness  

---

## Blocking the Event Loop (Critical Concept)

Bad example:

```js
while (true) {}
```

Impact:

- blocks the poll phase  
- prevents handling of new requests  
- server becomes unresponsive  

Interviewers often ask:

“What happens if you block the event loop?”

Correct answer:

All incoming requests wait. Scalability is lost.

---

## Practical Server-Side Implications

Understanding the event loop helps you:

- avoid CPU-heavy synchronous logic  
- choose correct async APIs  
- reason about performance bottlenecks  
- debug production issues  

This is why the topic is heavily tested.

---

## Common Interview Traps

### Trap 1  
Saying Node.js runs JavaScript on multiple threads.

---

### Trap 2  
Confusing `setTimeout(0)` with `setImmediate`.

---

### Trap 3  
Ignoring `process.nextTick` priority.

---

### Trap 4  
Blocking the event loop with CPU work.

---

## Interview Questions You Should Be Ready For

- How does the Node.js event loop work  
- Difference between browser and Node event loop  
- What is libuv  
- setTimeout vs setImmediate  
- What happens if the event loop is blocked  

---

## Strong Interview Answer (Example)

“Node.js runs JavaScript on a single thread and uses an event loop implemented by libuv to handle asynchronous operations. I/O callbacks are handled in the poll phase, while `setImmediate` callbacks run in the check phase after I/O completes. Unlike the browser, Node.js has no rendering phase and is optimized for server-side throughput rather than UI responsiveness.”

---

## Summary (Revision Ready)

- Node.js is single-threaded for JS  
- libuv manages async I/O  
- poll phase handles I/O callbacks  
- `setImmediate` runs in the check phase  
- blocking the loop breaks scalability  

---

**Duration:** 1080

Class 4.1.1
Title: Event Loop ( Order of console logs ) 
 Description: Understand how the Node.js event loop works 
 Content Type: Text
 Duration: 540
 Order: 2
Text Content:

# Event Loop Ordering in Node.js (Interview-Focused Example)

## The Goal of This Example

Interviewers often give a **small code snippet** and ask:

- what will be logged  
- in what order  
- and why  

This tests **true understanding** of the Node.js event loop, not memorization.

---

## The Code Snippet (Classic Interview Question)

```js
console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

setImmediate(() => {
  console.log("immediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");
```

---

## Question

What is the **exact order** of console output?

---

## Correct Output Order

```txt
start
end
nextTick
promise
timeout
immediate
```

---

## Step-by-Step Explanation (This Is What Interviewers Want)

### 1. Synchronous Code Executes First

```js
console.log("start");
console.log("end");
```

Synchronous code always runs first.

Output so far:

```
start
end
```

---

### 2. process.nextTick Queue Executes

```js
process.nextTick(() => {
  console.log("nextTick");
});
```

Key rule:

**`process.nextTick` runs before everything else, even before promises.**

It runs immediately after the current call stack finishes.

Output:

```
nextTick
```

---

### 3. Promise Microtasks Execute

```js
Promise.resolve().then(() => {
  console.log("promise");
});
```

Promises are **microtasks**, but in Node.js they run **after `process.nextTick`**.

Output:

```
promise
```

---

### 4. Event Loop Phases Begin

Now Node.js enters the event loop.

---

### 5. Timers Phase → setTimeout(0)

```js
setTimeout(() => {
  console.log("timeout");
}, 0);
```

Important interview insight:

- `0` does **not** mean immediate  
- it means “run in the timers phase when possible”  

Output:

```
timeout
```

---

### 6. Check Phase → setImmediate

```js
setImmediate(() => {
  console.log("immediate");
});
```

`setImmediate` runs in the **check phase**, which comes **after the poll phase**.

Since there is no I/O here, it runs after timers.

Output:

```
immediate
```

---

## Final Mental Model (Very Important)

Execution priority in Node.js:

1. Synchronous code  
2. `process.nextTick`  
3. Promise microtasks  
4. Timers (`setTimeout`, `setInterval`)  
5. I/O callbacks (poll phase)  
6. `setImmediate` (check phase)  

This hierarchy explains the output.

---

## Variation Interviewers Love (Inside I/O)

Inside an I/O callback, ordering can change.

```js
fs.readFile("file.txt", () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});
```

In this case, **`setImmediate` usually runs before `setTimeout`**.

Strong interview answer:

“The order depends on the context in which they are scheduled.”

---

## Common Interview Traps

### Trap 1  
Saying promises run before `process.nextTick`.

---

### Trap 2  
Assuming `setTimeout(0)` runs immediately.

---

### Trap 3  
Claiming `setImmediate` always runs before `setTimeout`.

---

## One-Line Interview-Ready Explanation

“In Node.js, synchronous code runs first, followed by `process.nextTick`, then promise microtasks. After that, the event loop phases begin, where timers execute before the check phase, which is where `setImmediate` callbacks run. Ordering between `setTimeout(0)` and `setImmediate` depends on the execution context.”

---

## Summary (Revision Ready)

- `process.nextTick` has highest priority  
- promises run after nextTick  
- timers run before check phase  
- `setImmediate` runs in check phase  
- ordering depends on context  

---


Class 4.1.2
Title: Modules (CommonJS vs ES Modules)
 Description: Learn module systems used in Node.js applications.
 Content Type: Text
 Duration: 900
 Order: 2
Text Content:

# Modules in Node.js (CommonJS vs ES Modules)

## Overview

Module systems are a foundational Node.js interview topic and frequently appear in MERN backend discussions.

Interviewers evaluate:

- understanding of how code is organized and shared  
- clarity on Node.js defaults vs modern standards  
- ability to reason about runtime behavior  
- awareness of migration and compatibility issues  

Strong candidates can explain **both systems**, their differences, and **when to use which**.

---

## Why Modules Exist

Modules solve three core problems:

- code organization  
- reusability  
- isolation of scope  

Without modules:

- global namespace pollution occurs  
- large codebases become unmanageable  

Node.js originally shipped with **CommonJS**.  
Modern JavaScript introduced **ES Modules**.

---

## CommonJS (CJS)

### What Is CommonJS

CommonJS is the original module system used by Node.js.

Key characteristics:

- synchronous loading  
- module.exports / require syntax  
- evaluated at runtime  

---

### CommonJS Syntax

Exporting:

```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

Importing:

```js
const add = require("./add");
```

---

### How CommonJS Works Internally

Important interview insight:

- `require()` is executed at runtime  
- modules are cached after first load  
- exports are mutable  

This allows patterns like conditional imports.

---

### CommonJS Strengths

- simple mental model  
- works well for server-side code  
- historically stable in Node.js  

---

### CommonJS Limitations

- not statically analyzable  
- harder to optimize and tree-shake  
- not aligned with browser standards  

---

## ES Modules (ESM)

### What Are ES Modules

ES Modules are the official JavaScript module standard.

Key characteristics:

- static imports and exports  
- loaded asynchronously  
- analyzed at compile time  

ESM is the **future direction** of JavaScript.

---

### ES Module Syntax

Exporting:

```js
export function add(a, b) {
  return a + b;
}
```

Importing:

```js
import { add } from "./add.js";
```

Default export:

```js
export default add;
```

Import default:

```js
import add from "./add.js";
```

---

### How ES Modules Work

Important interview insight:

- imports are hoisted  
- module graph is resolved before execution  
- exports are read-only bindings  

This enables:

- tree shaking  
- better tooling  
- static analysis  

---

## Enabling ES Modules in Node.js

Node.js does not assume ESM by default.

You can enable it by:

### Option 1: package.json

```json
{
  "type": "module"
}
```

---

### Option 2: File Extension

- `.mjs` → ES Module  
- `.cjs` → CommonJS  

This is often used during gradual migration.

---

## CommonJS vs ES Modules (Key Differences)

| Aspect | CommonJS | ES Modules |
|-----|---------|-----------|
| Syntax | require / module.exports | import / export |
| Loading | synchronous | asynchronous |
| Analysis | runtime | static |
| Tree shaking | no | yes |
| Browser support | no | yes |
| Node default | yes (historically) | opt-in |

Interviewers often expect this comparison.

---

## Mixing CommonJS and ES Modules

This is a frequent real-world scenario.

### Importing CommonJS in ES Module

```js
import pkg from "some-cjs-package";
```

### Importing ES Module in CommonJS

```js
const pkg = await import("some-esm-package");
```

Key interview point:

- mixing is possible  
- but can introduce complexity  
- consistency is preferred  

---

## require vs import (Interview Favorite)

### require

- can be conditional  
- executes at runtime  

```js
if (isDev) {
  const logger = require("./logger");
}
```

---

### import

- must be at top level  
- cannot be conditional  

```js
import logger from "./logger";
```

This distinction is frequently tested.

---

## When to Use CommonJS

Use CommonJS when:

- working in older Node.js codebases  
- using legacy libraries  
- quick scripts or tooling  

---

## When to Use ES Modules

Use ES Modules when:

- building modern Node.js applications  
- sharing code with the browser  
- using bundlers and modern tooling  

Strong candidates say:

“Prefer ESM for new projects, understand CJS for legacy.”

---

## Common Interview Traps

### Trap 1  
Saying Node.js only supports CommonJS.

---

### Trap 2  
Confusing default exports with named exports.

---

### Trap 3  
Ignoring file extensions and package.json configuration.

---

### Trap 4  
Assuming require and import are interchangeable.

---

## Interview Questions You Should Be Ready For

- Difference between CommonJS and ES Modules  
- How does require work internally  
- Why are ES Modules statically analyzable  
- How do you enable ESM in Node.js  
- Can you mix CJS and ESM  

---

## Strong Interview Answer (Example)

“Node.js historically uses CommonJS, which loads modules synchronously at runtime using require. ES Modules are the modern JavaScript standard with static imports and exports, enabling better tooling and tree shaking. In Node.js, ESM must be enabled explicitly. For new projects, I prefer ES Modules, while understanding CommonJS is important for legacy systems.”

---

## Summary (Revision Ready)

- CommonJS is Node.js’s original module system  
- ES Modules are the modern standard  
- CJS loads synchronously at runtime  
- ESM enables static analysis and tree shaking  
- choose based on project context  

---


Class 4.1.3
Title: Streams & Buffers (Minimal)
 Description: Get a practical understanding of streams and buffers.
 Content Type: Text
 Duration: 720
 Order: 3
Text Content:

# Streams & Buffers in Node.js (Minimal)

## Overview

Streams and buffers are core Node.js concepts that appear frequently in backend interviews, especially when discussing performance and scalability.

Interviewers evaluate:

- understanding of how Node.js handles data  
- ability to reason about memory usage  
- awareness of efficient I/O patterns  
- practical, not theoretical, knowledge  

This topic is not about APIs depth.  
It is about **why streams exist and when to use them**.

---

## The Core Problem

When handling large data:

- reading entire files into memory is expensive  
- memory usage spikes  
- performance degrades  

Example problem:

Reading a 1 GB file using a single `readFile` call.

This does not scale well.

---

## What Is a Buffer

A buffer is:

- a chunk of raw binary data  
- stored in memory  
- used to handle data outside JavaScript strings  

Key points:

- buffers are fixed-size  
- they represent bytes, not characters  
- commonly used for file and network data  

Example:

```js
const buffer = Buffer.from("hello");
console.log(buffer);
```

Interview insight:

Buffers are the **building blocks** for streams.

---

## When Buffers Are Used

Buffers are used when:

- data arrives in chunks  
- working with files  
- handling network packets  

But handling everything as buffers manually is cumbersome.

This is where streams help.

---

## What Is a Stream

A stream is:

- a way to process data **piece by piece**  
- without loading everything into memory  
- as data becomes available  

Think of streams as:

**data flowing over time**, not all at once.

---

## Why Streams Exist

Streams allow Node.js to:

- process large files efficiently  
- reduce memory usage  
- start work before all data is available  

Interview-ready line:

“Streams enable efficient, incremental processing of data.”

---

## Types of Streams (Minimal)

Node.js has four main stream types:

- Readable  
- Writable  
- Duplex  
- Transform  

You are not expected to memorize APIs for all.

Understanding **Readable and Writable** is usually enough.

---

## Simple Stream Example

Reading a file using a stream:

```js
const fs = require("fs");

const stream = fs.createReadStream("large.txt");

stream.on("data", chunk => {
  console.log(chunk.length);
});
```

Key insight:

- data arrives in chunks  
- each chunk is a buffer  
- memory usage stays low  

---

## Streams vs readFile (Interview Comparison)

### readFile

- reads entire file into memory  
- simpler  
- not suitable for large files  

### Streams

- process data incrementally  
- memory efficient  
- scalable  

Interviewers often ask you to compare these.

---

## Real-World Stream Example

Common uses of streams:

- file uploads and downloads  
- piping data between services  
- video or audio streaming  
- large log processing  

Mentioning these shows practical understanding.

---

## The Pipe Concept (Important)

Streams can be connected using `pipe`.

```js
fs.createReadStream("input.txt")
  .pipe(fs.createWriteStream("output.txt"));
```

Benefits:

- automatic flow control  
- minimal code  
- efficient data transfer  

Interviewers like candidates who mention `pipe`.

---

## Common Interview Traps

### Trap 1  
Thinking streams load all data into memory.

---

### Trap 2  
Confusing buffers and streams.

---

### Trap 3  
Overexplaining stream internals.

---

### Trap 4  
Ignoring why streams matter for scalability.

---

## Interview Questions You Should Be Ready For

- What is a buffer  
- What is a stream  
- Why are streams used  
- Streams vs readFile  
- Real-world use cases  

---

## Strong Interview Answer (Example)

“A buffer represents raw binary data in memory, while streams allow us to process that data incrementally. Streams are used in Node.js to handle large files or network data efficiently without loading everything into memory, which improves performance and scalability.”

---

## Summary (Revision Ready)

- buffers hold raw binary data  
- streams process data incrementally  
- streams reduce memory usage  
- ideal for large files and I/O  
- pipe simplifies stream handling  

---

Topic 4.2
Title: Express.js
 Order: 2
Class 4.2.1
Title: Routing
 Description: Define and organize routes in Express applications.
 Content Type: Text
 Duration: 780
 Order: 1
Text Content:

# Routing in Express.js

## Overview

Routing is a core Express concept and a frequent backend interview topic.

Interviewers evaluate:

- understanding of request–response flow  
- ability to organize APIs cleanly  
- clarity on HTTP methods and paths  
- separation of concerns in backend design  

This topic is less about syntax and more about **API structure and correctness**.

---

## What Is Routing in Express

Routing defines:

- how an application responds to client requests  
- based on HTTP method and URL path  

A route connects:

**HTTP method + path → handler function**

Example:

```js
app.get("/users", (req, res) => {
  res.send("Users list");
});
```

---

## Core Mental Model (Very Important)

Every incoming request goes through:

1. URL matching  
2. HTTP method matching  
3. Middleware (if any)  
4. Route handler  

Understanding this flow helps debug most backend issues.

---

## HTTP Methods and Their Purpose

Common methods interviewers expect you to know:

- GET → fetch data  
- POST → create data  
- PUT / PATCH → update data  
- DELETE → remove data  

Example:

```js
app.post("/users", (req, res) => {
  res.send("Create user");
});
```

Using correct methods signals backend maturity.

---

## Route Parameters

Route parameters capture dynamic parts of the URL.

```js
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(userId);
});
```

Key points:

- parameters are strings  
- accessed via `req.params`  
- commonly used for resource identifiers  

---

## Query Parameters

Query parameters modify or filter behavior.

```js
app.get("/users", (req, res) => {
  const role = req.query.role;
  res.send(role);
});
```

Interview insight:

- params identify a resource  
- queries filter or customize results  

---

## Organizing Routes with Routers

As applications grow, routes should not live in one file.

Express provides `Router` for modular routing.

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All users");
});

router.get("/:id", (req, res) => {
  res.send("Single user");
});

module.exports = router;
```

Mounting the router:

```js
app.use("/users", router);
```

This is a strong interview signal.

---

## Route Matching Order (Critical Concept)

Express matches routes **top to bottom**.

```js
app.get("/users/:id", ...);
app.get("/users/profile", ...);
```

Problem:

- `/users/profile` may be treated as `:id`

Correct ordering:

```js
app.get("/users/profile", ...);
app.get("/users/:id", ...);
```

Interviewers often test this.

---

## Middleware and Routing

Routes can use middleware.

```js
app.get("/admin", authMiddleware, (req, res) => {
  res.send("Admin area");
});
```

Key insight:

- middleware runs before the route handler  
- can be scoped to routes or routers  

---

## RESTful Routing (Interview-Friendly Pattern)

RESTful conventions improve clarity.

Example:

```txt
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

Interviewers expect familiarity with this pattern.

---

## Handling 404 Routes

A fallback route handles unmatched requests.

```js
app.use((req, res) => {
  res.status(404).send("Not Found");
});
```

Important:

- placed after all other routes  
- catches unmatched paths  

---

## Common Interview Traps

### Trap 1  
Putting all routes in `app.js`.  
Poor organization.

---

### Trap 2  
Using wrong HTTP methods.  
Breaks REST semantics.

---

### Trap 3  
Incorrect route order.  
Causes unexpected matches.

---

### Trap 4  
Confusing params and query strings.

---

## Interview Questions You Should Be Ready For

- How does routing work in Express  
- Difference between params and query  
- What is Express Router  
- How does route matching order work  
- How do you organize routes in large apps  

---

## Strong Interview Answer (Example)

“Routing in Express maps HTTP methods and paths to handler functions. As applications grow, I use Express Router to modularize routes by feature. I follow RESTful conventions, use route parameters for resource identification, query parameters for filtering, and ensure correct route ordering to avoid conflicts.”

---

## Summary (Revision Ready)

- routes map requests to handlers  
- HTTP method + path defines a route  
- Router enables modular structure  
- route order matters  
- REST conventions improve clarity  

---


Class 4.2.2
Title: Middleware
 Description: Understand middleware execution and common use cases.
 Content Type: Text
 Duration: 840
 Order: 2
Text Content:

# Middleware in Express.js

## Overview

Middleware is one of the most important concepts in Express and a favorite backend interview topic.

Interviewers evaluate:

- understanding of request–response flow  
- clarity on middleware execution order  
- ability to design reusable logic  
- practical awareness of real-world use cases  

Most Express applications rely heavily on middleware.

---

## What Is Middleware

Middleware is a function that:

- has access to `req`, `res`, and `next`  
- runs between request receipt and response  
- can modify the request or response  
- can end the request or pass control forward  

Basic structure:

```js
function middleware(req, res, next) {
  next();
}
```

---

## Core Mental Model (Very Important)

Think of middleware as a **pipeline**.

Each request flows through:

- global middleware  
- route-level middleware  
- route handler  

Each middleware decides:

- to continue (`next()`)  
- or to end the request  

This mental model explains most Express behavior.

---

## Middleware Execution Order

Order matters in Express.

```js
app.use(middlewareA);
app.use(middlewareB);

app.get("/route", handler);
```

Execution order:

1. middlewareA  
2. middlewareB  
3. handler  

Interviewers frequently test this understanding.

---

## Global Middleware

Applies to all incoming requests.

Example:

```js
app.use(express.json());
```

Common global middleware:

- body parsing  
- logging  
- authentication checks  

---

## Route-Level Middleware

Applies to specific routes.

```js
app.get("/admin", authMiddleware, (req, res) => {
  res.send("Admin");
});
```

Useful for:

- authentication  
- authorization  
- validation  

---

## Router-Level Middleware

Middleware scoped to a router.

```js
router.use(authMiddleware);
```

All routes in that router are protected.

This shows clean API design.

---

## Built-in Middleware

Express provides built-in middleware:

- `express.json()`  
- `express.urlencoded()`  
- `express.static()`  

Interviewers expect familiarity with these.

---

## Third-Party Middleware

Common examples:

- `cors`  
- `morgan`  
- `helmet`  

Mentioning real-world usage is a strong signal.

---

## Error-Handling Middleware (Very Important)

Error middleware has a special signature:

```js
function errorMiddleware(err, req, res, next) {
  res.status(500).send("Error");
}
```

Key points:

- must have four parameters  
- placed after all routes  
- catches errors passed via `next(err)`  

Interviewers often test this explicitly.

---

## How next() Works

Calling `next()`:

- passes control to the next middleware  
- does not automatically stop execution  

Example bug:

```js
if (!authorized) {
  res.status(401).send("Unauthorized");
}
next();
```

This sends a response **and continues execution**.

Correct approach:

```js
if (!authorized) {
  return res.status(401).send("Unauthorized");
}
next();
```

This is a classic interview trap.

---

## Common Middleware Use Cases

Typical middleware responsibilities:

- authentication  
- authorization  
- logging  
- request validation  
- rate limiting  
- error handling  

Express apps become unmanageable without middleware.

---

## Blocking vs Non-blocking Middleware

Middleware should be:

- fast  
- non-blocking  
- async-safe  

Blocking middleware delays **all** requests.

Interview insight:

Heavy computation does not belong in middleware.

---

## Common Interview Traps

### Trap 1  
Forgetting to call `next()`.

---

### Trap 2  
Calling `next()` after sending a response.

---

### Trap 3  
Misplacing error-handling middleware.

---

### Trap 4  
Assuming middleware order does not matter.

---

## Interview Questions You Should Be Ready For

- What is middleware in Express  
- How does middleware execution work  
- Difference between app-level and router-level middleware  
- How does error middleware work  
- What happens if next() is not called  

---

## Strong Interview Answer (Example)

“Middleware in Express is a function that runs between receiving a request and sending a response. Requests flow through middleware in the order they are defined. Middleware can modify the request, end the response, or pass control using next(). This pattern allows clean separation of concerns like authentication, logging, and error handling.”

---

## Summary (Revision Ready)

- middleware sits in the request pipeline  
- execution order matters  
- next() controls flow  
- error middleware has a special signature  
- clean apps rely on middleware  

---


Class 4.2.3
Title: Error Handling
 Description: Implement robust error handling in Express apps.
 Content Type: Text
 Duration: 900
 Order: 3
Text Content:

# Error Handling in Express.js

## Overview

Error handling is a critical backend skill and a frequent Express interview topic.

Interviewers evaluate:

- ability to handle failures gracefully  
- understanding of Express error flow  
- correctness of HTTP status codes  
- separation of error logic from business logic  

Well-designed error handling improves reliability, debuggability, and user experience.

---

## Why Error Handling Matters

Without proper error handling:

- servers crash unexpectedly  
- clients receive inconsistent responses  
- debugging becomes difficult  
- production issues escalate quickly  

Interview insight:

Robust error handling is a sign of production-ready backend code.

---

## Types of Errors in Express Apps

Common categories:

- client errors (invalid input)  
- authentication and authorization errors  
- resource not found errors  
- server and database errors  

Each should be handled explicitly.

---

## Core Error Flow in Express (Very Important)

Express error handling works as follows:

1. an error occurs  
2. the error is passed using `next(err)`  
3. Express skips normal middleware  
4. error-handling middleware is executed  

Understanding this flow is critical.

---

## Creating Errors in Routes

Example:

```js
app.get("/users/:id", (req, res, next) => {
  if (!req.params.id) {
    const err = new Error("User ID required");
    err.status = 400;
    return next(err);
  }

  res.send("User");
});
```

Key point:

Errors are passed, not thrown blindly.

---

## Error-Handling Middleware

Error middleware has a special signature:

```js
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error"
  });
}
```

Important rules:

- must have four parameters  
- must be registered after routes  

---

## Registering the Error Handler

```js
app.use(errorHandler);
```

Placement matters.

If placed before routes, it will never be reached.

---

## Handling 404 Errors

Unmatched routes should return 404.

```js
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
```

This middleware should come before the error handler.

---

## Async Errors (Very Important)

Errors inside async functions do not automatically reach Express.

Bad example:

```js
app.get("/data", async (req, res) => {
  throw new Error("Failed");
});
```

This causes unhandled promise rejection.

---

## Correct Async Error Handling

```js
app.get("/data", async (req, res, next) => {
  try {
    throw new Error("Failed");
  } catch (err) {
    next(err);
  }
});
```

Or using a wrapper:

```js
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

This pattern is interview-friendly.

---

## Using Correct HTTP Status Codes

Interviewers expect correct status usage.

Examples:

- 400 → bad request  
- 401 → unauthorized  
- 403 → forbidden  
- 404 → not found  
- 500 → server error  

Returning 200 for errors is a red flag.

---

## Structuring Error Responses

Consistent error responses improve client-side handling.

Example:

```js
{
  "error": true,
  "message": "Invalid input"
}
```

Interview insight:

Consistency matters more than format.

---

## Logging Errors

In production:

- log errors internally  
- avoid leaking stack traces to clients  

Example:

```js
console.error(err);
```

Mentioning logging shows production awareness.

---

## Common Interview Traps

### Trap 1  
Throwing errors without handling.

---

### Trap 2  
Forgetting error middleware placement.

---

### Trap 3  
Sending stack traces to clients.

---

### Trap 4  
Ignoring async error handling.

---

## Interview Questions You Should Be Ready For

- How does error handling work in Express  
- What is error-handling middleware  
- How do you handle async errors  
- Difference between 4xx and 5xx errors  
- How do you handle 404 routes  

---

## Strong Interview Answer (Example)

“In Express, errors are passed using `next(err)` and handled by error-handling middleware defined after all routes. I use consistent status codes, structured error responses, and wrap async routes to ensure promise rejections are caught. This keeps error logic centralized and production-safe.”

---

## Summary (Revision Ready)

- errors flow via `next(err)`  
- error middleware has four parameters  
- placement after routes is critical  
- async errors must be handled explicitly  
- consistent responses improve reliability  

---

**Duration:** 900
```

Class 4.2.4
Title: File Uploads
 Description: Handle file uploads securely in Express applications.
 Content Type: Text
 Duration: 900
 Order: 4
Text Content:

# File Uploads in Express.js

## Overview

File uploads are a common backend requirement and a frequent Express interview topic.

Interviewers evaluate:

- understanding of multipart requests  
- secure handling of user-provided files  
- awareness of validation and limits  
- ability to prevent common vulnerabilities  

This topic is not about UI.  
It is about **security, correctness, and stability**.

---

## Why File Uploads Are Sensitive

File uploads can be dangerous if mishandled:

- arbitrary file execution  
- disk space exhaustion  
- malware uploads  
- overwriting critical files  

Interview insight:

Secure file handling is a backend responsibility, not a frontend one.

---

## How File Uploads Work (High-Level)

When uploading files:

- browser sends a `multipart/form-data` request  
- file data is split into parts  
- server parses and stores the file  

Express does not handle this natively.  
A middleware is required.

---

## Common Middleware: multer

`multer` is the most commonly used Express middleware for file uploads.

Key responsibilities:

- parse multipart requests  
- handle file storage  
- expose file metadata  

Interviewers expect familiarity with `multer`.

---

## Basic Setup with multer

```js
const multer = require("multer");
```

---

## Storage Configuration

### Disk Storage Example

```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
```

Key interview points:

- never trust original filenames blindly  
- avoid name collisions  

---

## Creating the Upload Middleware

```js
const upload = multer({ storage });
```

---

## Handling a Single File Upload

```js
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded");
});
```

Key concepts:

- `single("file")` matches the form field name  
- file metadata is available on `req.file`  

---

## Handling Multiple Files

```js
upload.array("files", 5);
```

This limits the number of files uploaded.

Interview insight:

Always enforce limits.

---

## File Validation (Very Important)

### Validating File Type

```js
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};
```

```js
const upload = multer({ storage, fileFilter });
```

Never rely on file extensions alone.

---

## Limiting File Size

```js
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }
});
```

This prevents disk exhaustion attacks.

---

## Accessing Uploaded File Data

```js
req.file
```

Contains:

- filename  
- path  
- mimetype  
- size  

Understanding this structure helps in debugging.

---

## Security Best Practices (Interview-Critical)

Key practices interviewers listen for:

- validate file type and size  
- rename uploaded files  
- store files outside public directories  
- never execute uploaded files  
- restrict upload routes with authentication  

Mentioning these signals backend maturity.

---

## Serving Uploaded Files Safely

Do not expose upload directories directly.

Better approach:

- serve files via controlled routes  
- apply authorization checks  

Example:

```js
app.get("/files/:id", authMiddleware, handler);
```

---

## Handling Upload Errors

Upload errors should be handled using error middleware.

```js
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(err.message);
  }
  next(err);
});
```

Interviewers often test error handling here.

---

## Common Interview Traps

### Trap 1  
Trusting client-side validation.

---

### Trap 2  
Allowing unlimited file sizes.

---

### Trap 3  
Using original filenames without sanitization.

---

### Trap 4  
Serving uploaded files directly from disk.

---

## Interview Questions You Should Be Ready For

- How do file uploads work in Express  
- What is multipart/form-data  
- How do you secure file uploads  
- How do you validate file type and size  
- How do you handle upload errors  

---

## Strong Interview Answer (Example)

“I handle file uploads in Express using middleware like multer to parse multipart requests. I always validate file type and size, rename files to avoid collisions, limit upload counts, and restrict access to upload routes. Uploaded files are never trusted or executed directly.”

---

## Summary (Revision Ready)

- file uploads use multipart/form-data  
- Express requires middleware like multer  
- validation and limits are mandatory  
- filenames must be sanitized  
- security is the primary concern  

---

**Duration:** 900

Class 4.2.5
Title: Express LLD Patterns
 Description: Apply controller-service-repository patterns in Express.
 Content Type: Text
 Duration: 900
 Order: 5
Text Content:

# Express LLD Patterns (Controller–Service–Repository)

## Overview

Low-Level Design (LLD) patterns in Express are frequently discussed in backend interviews to evaluate **code organization, scalability, and separation of concerns**.

Interviewers evaluate:

- ability to structure backend code cleanly  
- separation of business logic from HTTP concerns  
- testability and maintainability  
- readiness for real-world scale  

This topic is not about frameworks.  
It is about **clean architecture in Express apps**.

---

## The Core Problem

In small apps, everything is often written inside routes:

```js
app.post("/users", async (req, res) => {
  // validation
  // business logic
  // database logic
  // response
});
```

Problems with this approach:

- routes become bloated  
- logic is hard to test  
- code is difficult to reuse  
- scaling the codebase becomes painful  

LLD patterns solve this.

---

## The Controller–Service–Repository Pattern

This pattern splits responsibilities into layers:

- Controller → HTTP layer  
- Service → business logic  
- Repository → data access  

Each layer has **one clear responsibility**.

---

## Controller Layer

### Responsibility

Controllers handle:

- request parsing  
- response formatting  
- HTTP status codes  

Controllers should **not** contain business logic.

---

### Example Controller

```js
async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
```

Interview insight:

Controllers should be thin and readable.

---

## Service Layer

### Responsibility

Services handle:

- business rules  
- validations  
- orchestration of multiple repositories  

Services are independent of Express.

---

### Example Service

```js
async function createUser(userData) {
  if (!userData.email) {
    throw new Error("Email required");
  }

  return userRepository.create(userData);
}
```

Interviewers look for this separation explicitly.

---

## Repository Layer

### Responsibility

Repositories handle:

- database access  
- queries  
- persistence logic  

They should not contain business rules.

---

### Example Repository

```js
async function create(userData) {
  return UserModel.create(userData);
}
```

This abstraction allows:

- database swaps  
- easier testing  
- cleaner services  

---

## Folder Structure (Interview-Friendly)

```txt
src/
 ├─ controllers/
 │   └─ user.controller.js
 ├─ services/
 │   └─ user.service.js
 ├─ repositories/
 │   └─ user.repository.js
 ├─ routes/
 │   └─ user.routes.js
 └─ app.js
```

Interviewers strongly prefer this clarity.

---

## Wiring Everything Together

### Routes

```js
const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.createUser);

module.exports = router;
```

---

### App Entry

```js
app.use("/users", userRoutes);
```

Routing stays clean and readable.

---

## Why This Pattern Works Well

Benefits:

- clear separation of concerns  
- easier testing of services  
- controllers remain simple  
- repositories isolate data access  

Strong interview signal:

This pattern scales naturally as the app grows.

---

## Error Handling in This Pattern

Best practice:

- services throw errors  
- controllers catch and forward  
- centralized error middleware handles responses  

This keeps error handling consistent.

---

## Common Interview Traps

### Trap 1  
Putting business logic in controllers.

---

### Trap 2  
Letting repositories return HTTP responses.

---

### Trap 3  
Overengineering for very small apps.

---

### Trap 4  
Tightly coupling services to Express objects.

---

## When NOT to Overuse This Pattern

For:

- very small scripts  
- quick prototypes  

This pattern may be unnecessary.

Interview insight:

Patterns should serve complexity, not create it.

---

## Interview Questions You Should Be Ready For

- Why separate controller and service  
- What logic belongs in each layer  
- How does this improve testability  
- Can services be reused outside Express  
- How would you structure a large Express app  

---

## Strong Interview Answer (Example)

“I structure Express apps using a controller–service–repository pattern. Controllers handle HTTP concerns, services contain business logic, and repositories manage database access. This separation keeps routes clean, improves testability, and allows the codebase to scale without becoming tightly coupled.”

---

## Summary (Revision Ready)

- controllers handle HTTP only  
- services contain business logic  
- repositories handle data access  
- separation improves scalability  
- avoid overengineering for small apps  

---


Topic 4.3
Title: MongoDB
 Order: 3
Class 4.3.1
Title: Mongoose Schemas
 Description: Design schemas using Mongoose for MongoDB.
 Content Type: Text
 Duration: 900
 Order: 1
Text Content:

# Mongoose Schemas

## Overview

Mongoose schemas are a core MongoDB + Node.js concept and are commonly tested in MERN stack interviews.

Interviewers evaluate:

- understanding of schema design  
- data validation strategies  
- ability to model real-world entities  
- awareness of MongoDB vs Mongoose responsibilities  

This topic is about **data correctness and structure**, not just syntax.

---

## Why Schemas Matter in MongoDB

MongoDB itself is schema-less.

This means:

- documents can have different shapes  
- invalid or inconsistent data can easily creep in  

Mongoose introduces schemas to:

- enforce structure  
- validate data  
- define defaults and constraints  
- add behavior to data models  

Interview insight:

“Mongoose adds structure on top of MongoDB’s flexibility.”

---

## What Is a Mongoose Schema

A schema defines:

- the shape of documents  
- field types  
- validation rules  
- default values  
- relationships  

Schemas are used to create models.

---

## Basic Schema Example

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
```

This defines the **structure**, not the database collection itself.

---

## Creating a Model

```js
const User = mongoose.model("User", userSchema);
```

Key points:

- model name is singular  
- MongoDB collection is pluralized automatically  
- the model is used for all database operations  

---

## Defining Field Types

Common field types:

- String  
- Number  
- Boolean  
- Date  
- Array  
- ObjectId  

Example:

```js
email: {
  type: String
}
```

Interviewers expect familiarity with these.

---

## Validation Rules (Very Important)

Schemas can enforce validation.

```js
email: {
  type: String,
  required: true,
  unique: true
}
```

Key validations:

- required  
- min / max  
- enum  
- match (regex)  

Interview insight:

Validation at schema level prevents bad data at the source.

---

## Default Values

```js
isActive: {
  type: Boolean,
  default: true
}
```

Defaults simplify logic and reduce null checks.

---

## Nested Objects

```js
address: {
  city: String,
  country: String
}
```

Used for logically grouped fields.

---

## Arrays in Schemas

```js
tags: [String]
```

Or complex objects:

```js
orders: [
  {
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number
  }
]
```

Interviewers often test this.

---

## ObjectId and References

```js
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
```

This enables relationships between collections.

Key point:

MongoDB does not enforce joins.  
Mongoose enables population.

---

## Schema Options

Common options:

```js
{
  timestamps: true
}
```

This automatically adds:

- createdAt  
- updatedAt  

Interviewers like candidates who mention this.

---

## Schema Methods

Schemas can define methods.

```js
userSchema.methods.getDisplayName = function () {
  return this.name.toUpperCase();
};
```

This adds behavior to models.

---

## Virtual Fields

Virtuals are computed fields.

```js
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
```

They are not stored in the database.

Interview insight:

Virtuals are useful for derived data.

---

## Middleware (Hooks)

Schemas support lifecycle hooks.

```js
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
```

Common use cases:

- hashing passwords  
- auditing changes  

---

## Common Interview Traps

### Trap 1  
Thinking MongoDB enforces schemas.

---

### Trap 2  
Putting business logic in schemas.

---

### Trap 3  
Overusing hooks unnecessarily.

---

### Trap 4  
Ignoring validation and defaults.

---

## Interview Questions You Should Be Ready For

- What is a Mongoose schema  
- Why do we need schemas in MongoDB  
- How do validation and defaults work  
- What are ObjectId references  
- Difference between schema and model  

---

## Strong Interview Answer (Example)

“A Mongoose schema defines the structure, validation, and behavior of documents in a MongoDB collection. While MongoDB itself is schema-less, Mongoose schemas enforce consistency, enable validation, and allow us to model relationships and defaults cleanly.”

---

## Summary (Revision Ready)

- schemas define document structure  
- models are created from schemas  
- validation prevents bad data  
- ObjectId enables relationships  
- schemas improve consistency  

---

Class 4.3.2
Title: Indexing
 Description: Improve query performance using indexes. 
 Content Type: Text
 Duration: 840
 Order: 2
Text Content:

# Indexing in MongoDB (via Mongoose)

## Overview

Indexing is a high-signal backend interview topic because it directly reflects **performance awareness**.

Interviewers evaluate:

- understanding of query performance  
- ability to diagnose slow APIs  
- knowledge of database internals (at a practical level)  
- readiness for production-scale systems  

This topic is not about memorizing commands.  
It is about **why queries become slow and how indexes fix that**.

---

## The Core Problem

Without indexes, MongoDB performs a **collection scan**.

That means:

- every document is examined  
- query time grows linearly with data size  
- APIs slow down as data grows  

Interview insight:

If your API is fast with 1k records but slow with 1M, indexing is usually missing.

---

## What Is an Index

An index is:

- a data structure  
- maintained by MongoDB  
- that allows fast lookup of documents  

Think of it like:

**a book’s index vs reading every page to find a topic**

---

## How Indexes Improve Performance

With an index:

- MongoDB can jump directly to matching documents  
- fewer documents are scanned  
- query execution time drops dramatically  

Interview-ready line:

“Indexes trade storage and write speed for faster reads.”

---

## Basic Index Example

Creating an index on a field:

```js
userSchema.index({ email: 1 });
```

This creates an **ascending index** on `email`.

---

## Query Without Index (Conceptual)

```js
User.find({ email: "test@example.com" });
```

Without an index:

- MongoDB scans every document  

With an index:

- MongoDB jumps directly to matching records  

---

## Common Index Types (Interview-Relevant)

### Single Field Index

```js
{ email: 1 }
```

Used for exact lookups and filtering.

---

### Compound Index

```js
{ userId: 1, createdAt: -1 }
```

Important interview insight:

**Order matters in compound indexes.**

This index supports:

- filtering by userId  
- sorting by createdAt  

---

### Unique Index

```js
{ email: 1 }, { unique: true }
```

Ensures:

- no duplicate values  
- data integrity at database level  

---

## Indexes for Sorting

Without an index:

```js
User.find().sort({ createdAt: -1 });
```

MongoDB sorts in memory.

With an index:

```js
userSchema.index({ createdAt: -1 });
```

Sorting becomes efficient.

Interviewers often test this connection.

---

## Indexes and Write Performance

Important trade-off:

- indexes speed up reads  
- but slow down writes  

Each insert or update must update indexes.

Interview insight:

Over-indexing hurts performance.

---

## When NOT to Use Indexes

Avoid indexing:

- low-cardinality fields (boolean flags)  
- fields rarely used in queries  
- small collections  

Indexes should be intentional.

---

## Indexes in Mongoose

Indexes can be defined:

- at schema level  
- using `index()`  
- or via field options  

Example:

```js
email: {
  type: String,
  index: true
}
```

Mongoose creates indexes at startup (by default).

---

## Ensuring Index Creation

Important interview detail:

- Mongoose auto-creates indexes in development  
- often disabled in production  

Production best practice:

Create indexes manually or via migrations.

---

## Checking Index Usage (Conceptual)

MongoDB provides query plans.

Interview-ready mention:

Use `explain()` to verify index usage.

This shows maturity.

---

## Common Interview Traps

### Trap 1  
Indexing every field.

---

### Trap 2  
Ignoring compound index order.

---

### Trap 3  
Assuming indexes always improve performance.

---

### Trap 4  
Forgetting write performance impact.

---

## Interview Questions You Should Be Ready For

- What is an index  
- How do indexes improve performance  
- What is a compound index  
- Why does index order matter  
- When should you avoid indexes  

---

## Strong Interview Answer (Example)

“Indexes improve query performance by allowing MongoDB to avoid full collection scans. I create indexes based on query patterns, especially for filtering and sorting. I’m careful not to over-index because indexes slow down writes and increase storage usage.”

---

## Summary (Revision Ready)

- indexes speed up reads  
- reduce collection scans  
- compound index order matters  
- over-indexing hurts writes  
- design indexes around query patterns  

---


Class 4.3.3
Title: Aggregation Pipeline
 Description: Perform complex data transformations using aggregation pipelines ( advanced discussions ) 
 Content Type: Text
 Duration: 1200
 Order: 3
Text Content:

# Aggregation Pipeline in MongoDB (In-Depth, Interview-Ready)

## Overview

The aggregation pipeline is one of the **most important MongoDB topics** for backend and MERN interviews because it tests how well you understand **data transformation at scale**.

Interviewers evaluate:

- ability to think beyond simple CRUD  
- understanding of how data flows and transforms  
- performance awareness  
- real-world reporting and analytics use cases  

Strong candidates do not just list stages.  
They **explain why aggregation exists and how to design pipelines correctly**.

---

## Why Aggregation Exists (The Real Problem)

Simple queries (`find`) are good for:

- fetching documents  
- basic filtering  
- simple sorting  

But real-world backend APIs often need:

- grouped results  
- computed fields (totals, averages)  
- joining multiple collections  
- reshaping data for frontend consumption  

Example business questions:

- total orders per user  
- revenue per day  
- top-selling products  
- conversion funnel metrics  

These cannot be solved cleanly using `find`.

---

## What Is an Aggregation Pipeline (Mental Model)

An aggregation pipeline is:

- a **sequence of transformation stages**
- where each stage receives documents  
- modifies them  
- and passes the result forward  

Think of it as:

**Raw data → filter → group → compute → reshape → output**

Each stage has one responsibility.

---

## Pipeline Syntax (Baseline)

```js
Model.aggregate([
  { stage1 },
  { stage2 },
  { stage3 }
]);
```

Important interview note:

- order of stages matters  
- earlier stages reduce data for later stages  

---

## Stage 1: $match (Filtering Early)

`$match` filters documents, similar to `find`.

```js
{ $match: { status: "completed" } }
```

### Why $match Should Come First

Filtering early:

- reduces number of documents  
- improves performance  
- lowers memory usage  

Interview insight:

“Always push `$match` as early as possible.”

---

## Stage 2: $group (Core Aggregation Power)

`$group` combines documents based on a key.

Example problem:

**Get total orders per user**

```js
{
  $group: {
    _id: "$userId",
    totalOrders: { $sum: 1 }
  }
}
```

Explanation:

- `_id` defines the grouping key  
- `$sum: 1` increments count per document  

Result shape:

```js
{
  _id: ObjectId("..."),
  totalOrders: 5
}
```

Interviewers often test `_id` understanding.

---

## Stage 3: $project (Reshaping Output)

`$project` controls what fields appear in the output.

Example:

```js
{
  $project: {
    userId: "$_id",
    totalOrders: 1,
    _id: 0
  }
}
```

Why this matters:

- frontend-friendly responses  
- hide internal fields  
- rename computed fields  

Interview insight:

Aggregation often exists to **shape responses**, not just compute values.

---

## Full Example 1: Orders Per User (Step-by-Step)

Problem:

Return active users with their total order count.

### Pipeline

```js
User.aggregate([
  { $match: { isActive: true } },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
    }
  },
  {
    $project: {
      email: 1,
      totalOrders: { $size: "$orders" }
    }
  }
]);
```

### Explanation

- `$match` filters active users  
- `$lookup` joins orders  
- `$project` computes order count  

Interview takeaway:

Aggregation allows **joining and computing in one pipeline**.

---

## Stage: $lookup (Joins in MongoDB)

MongoDB is not relational, but `$lookup` enables joins.

```js
{
  $lookup: {
    from: "orders",
    localField: "_id",
    foreignField: "userId",
    as: "orders"
  }
}
```

Important interview insight:

- joins are possible  
- but should be used carefully  
- excessive joins hurt performance  

Mentioning this shows maturity.

---

## Stage: $unwind (Flattening Arrays)

`$unwind` breaks arrays into individual documents.

Example:

```js
{ $unwind: "$orders" }
```

Why this matters:

- enables grouping on array elements  
- allows per-item calculations  

Interview scenario:

Revenue per order, not per user.

---

## Full Example 2: Total Revenue Per User

Problem:

Calculate total revenue per user.

```js
User.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
    }
  },
  { $unwind: "$orders" },
  {
    $group: {
      _id: "$_id",
      totalRevenue: { $sum: "$orders.amount" }
    }
  }
]);
```

Explanation:

- `$lookup` joins orders  
- `$unwind` creates one document per order  
- `$group` sums revenue  

This example is commonly discussed in interviews.

---

## Stage: $sort, $limit (Ranking and Pagination)

Example:

Top 5 users by revenue.

```js
{ $sort: { totalRevenue: -1 } },
{ $limit: 5 }
```

Interview insight:

Indexes can be used to optimize sorting.

---

## Aggregation vs Application Logic

### Bad Approach

- fetch all documents  
- compute totals in JavaScript  

Problems:

- high memory usage  
- slow APIs  
- poor scalability  

### Aggregation Approach

- computation happens in database  
- less data transferred  
- better performance  

Strong interview line:

“Aggregation pushes computation closer to the data.”

---

## Performance Best Practices (Interview-Critical)

- use `$match` early  
- limit `$lookup` usage  
- project only required fields  
- index fields used in `$match` and `$sort`  

Interviewers often ask how to optimize pipelines.

---

## Common Interview Traps

### Trap 1  
Using aggregation for simple CRUD queries.

---

### Trap 2  
Placing `$match` after `$group`.

---

### Trap 3  
Returning large nested documents unnecessarily.

---

### Trap 4  
Overusing `$lookup` instead of redesigning schema.

---

## Interview Questions You Should Be Ready For

- When should you use aggregation  
- Difference between find and aggregate  
- How does $group work  
- How does $lookup differ from SQL joins  
- How do you optimize aggregation pipelines  

---

## Strong Interview Answer (Example)

“The aggregation pipeline lets MongoDB transform data through multiple stages like filtering, grouping, joining, and reshaping. I use it when business logic requires computed or grouped results. I design pipelines by filtering early, minimizing joins, and shaping the output for API responses to keep them efficient.”

---

## Summary (Revision Ready)

- aggregation handles complex transformations  
- pipelines process data stage by stage  
- $match, $group, $project are foundational  
- joins are possible via $lookup  
- performance depends on stage order  

---


Class 4.3.4
Title: Basic Transactions
 Description: Use transactions for data consistency in MongoDB.
 Content Type: Text
 Duration: 900
 Order: 4
Text Content:

# Basic Transactions in MongoDB

## Overview

Transactions are used in MongoDB to ensure **data consistency across multiple operations**.

Interviewers evaluate:

- understanding of atomicity beyond single documents  
- awareness of when transactions are required  
- ability to reason about data integrity  
- practical usage in real-world backend scenarios  

This topic is not about advanced distributed systems.  
It is about **knowing when simple operations are not enough**.

---

## Why Transactions Are Needed

MongoDB guarantees atomicity at the **single-document level** by default.

That means:

- updates to one document are atomic  
- but updates across multiple documents are not  

Problem scenario:

- create an order  
- update inventory  
- update user balance  

If one operation fails, data becomes inconsistent.

Transactions solve this.

---

## What Is a Transaction in MongoDB

A transaction is:

- a group of operations  
- executed as a single unit  
- that either fully succeeds or fully fails  

Core properties:

- atomicity  
- consistency  
- isolation  
- durability  

Interview insight:

Transactions are used **only when cross-document consistency is required**.

---

## MongoDB Transaction Requirements

Transactions require:

- replica set or sharded cluster  
- MongoDB 4.0+ (replica set)  
- MongoDB 4.2+ (sharded)  

Interviewers sometimes test this constraint.

---

## Basic Transaction Flow (Mental Model)

1. start a session  
2. start a transaction  
3. perform operations  
4. commit or abort  

If any step fails, changes are rolled back.

---

## Starting a Transaction (Example)

```js
const session = await mongoose.startSession();
session.startTransaction();
```

All operations must use the same session.

---

## Performing Operations Inside a Transaction

```js
try {
  await Order.create([{ userId, amount }], { session });
  await User.updateOne(
    { _id: userId },
    { $inc: { balance: -amount } },
    { session }
  );

  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}
```

Key interview points:

- every query includes `{ session }`  
- commit on success  
- abort on failure  

---

## What Happens on Abort

When a transaction is aborted:

- all changes are rolled back  
- database state remains unchanged  
- consistency is preserved  

Interview insight:

MongoDB handles rollback internally.

---

## Common Use Cases for Transactions

Transactions are useful when:

- updating multiple collections  
- maintaining balances or counts  
- ensuring referential integrity  
- performing financial-like operations  

They are **not needed** for simple CRUD.

---

## Transactions vs Single-Document Atomicity

Important distinction:

- single-document updates are already atomic  
- transactions are only needed across documents  

Interviewers often test this nuance.

---

## Performance Considerations

Transactions have overhead:

- increased locking  
- higher latency  
- reduced throughput  

Interview-ready line:

“Transactions should be used sparingly and only when necessary.”

---

## Error Handling in Transactions

Best practice:

- wrap transaction logic in try–catch  
- always abort on error  
- always end the session  

Forgetting cleanup is a common bug.

---

## Common Interview Traps

### Trap 1  
Using transactions for single-document updates.

---

### Trap 2  
Forgetting to pass the session to queries.

---

### Trap 3  
Ignoring performance impact.

---

### Trap 4  
Assuming transactions work on standalone MongoDB instances.

---

## Interview Questions You Should Be Ready For

- When do you need transactions in MongoDB  
- How do transactions work internally  
- What are the requirements for transactions  
- Difference between atomic updates and transactions  
- Performance trade-offs of transactions  

---

## Strong Interview Answer (Example)

“MongoDB provides atomicity at the document level by default. Transactions are needed only when operations span multiple documents or collections. I use sessions to group operations, commit on success, abort on failure, and avoid transactions unless data consistency truly requires it.”

---

## Summary (Revision Ready)

- single-document operations are atomic  
- transactions handle multi-document consistency  
- sessions are required  
- transactions have performance cost  
- use them only when necessary  

---


Topic 4.4
Title: Authentication & Security
 Order: 4
Class 4.4.1
Title: JWT Flow (Access & Refresh Tokens)
 Description: Implement authentication using JWT access and refresh tokens.
 Content Type: Text
 Duration: 1200
 Order: 1
Text Content:

# JWT Flow (Access & Refresh Tokens)

## Overview

JWT-based authentication is a core backend interview topic and a standard pattern in modern web applications.

Interviewers evaluate:

- understanding of stateless authentication  
- clarity on access vs refresh tokens  
- ability to design secure auth flows  
- awareness of real-world edge cases  

This topic is not about libraries.  
It is about **correct authentication flow and security decisions**.

---

## The Authentication Problem

HTTP is stateless.

That means:

- servers do not remember users between requests  
- each request must carry identity information  

Traditional sessions store state on the server.  
JWTs move identity to the client.

---

## What Is a JWT

A JWT (JSON Web Token) is:

- a signed token  
- containing encoded claims  
- verified by the server  

A JWT has three parts:

- header  
- payload  
- signature  

Interview insight:

JWTs are **signed, not encrypted** by default.

---

## Why Access and Refresh Tokens Exist

Using a single long-lived token is insecure.

Problems:

- token theft gives long-term access  
- difficult to revoke tokens  

Solution:

Split responsibility into two tokens.

---

## Access Token

Access tokens are:

- short-lived  
- sent with every request  
- used to access protected APIs  

Typical lifetime:

- 5–15 minutes  

Example usage:

```txt
Authorization: Bearer <access_token>
```

---

## Refresh Token

Refresh tokens are:

- long-lived  
- used to obtain new access tokens  
- stored securely  

Typical lifetime:

- days or weeks  

They are **not sent with every request**.

---

## High-Level JWT Flow (End-to-End)

1. user logs in  
2. server issues access token + refresh token  
3. client stores both tokens  
4. access token is sent with API requests  
5. access token expires  
6. client uses refresh token to get a new access token  

This cycle repeats without re-login.

---

## Login Flow Example

```js
const accessToken = jwt.sign(
  { userId },
  ACCESS_SECRET,
  { expiresIn: "15m" }
);

const refreshToken = jwt.sign(
  { userId },
  REFRESH_SECRET,
  { expiresIn: "7d" }
);
```

Important interview insight:

Access and refresh tokens must use **different secrets**.

---

## Token Storage (Security-Critical)

### Access Token Storage

Common options:

- memory  
- HTTP-only cookie  

Avoid storing access tokens in localStorage.

---

### Refresh Token Storage

Best practice:

- HTTP-only cookie  
- secure flag enabled  

Refresh tokens must be protected from XSS.

---

## Refresh Token Flow

When access token expires:

1. client calls `/refresh` endpoint  
2. refresh token is verified  
3. new access token is issued  

Example:

```js
app.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  // verify and issue new access token
});
```

---

## Token Rotation (Interview Bonus)

For higher security:

- rotate refresh tokens  
- invalidate old refresh tokens  

This limits damage if a token is stolen.

Mentioning this is a strong signal.

---

## Logout Flow

On logout:

- invalidate refresh token (DB or cache)  
- clear cookies  
- access token expires naturally  

JWTs cannot be forcefully revoked easily without state.

---

## Protecting Routes with JWT

Middleware example:

```js
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.user = payload;
    next();
  });
}
```

This pattern is commonly tested.

---

## Common Security Considerations

Interviewers expect these points:

- short-lived access tokens  
- refresh tokens stored securely  
- HTTPS always required  
- token secrets kept server-side  
- avoid storing JWTs in localStorage  

---

## Common Interview Traps

### Trap 1  
Using only one long-lived JWT.

---

### Trap 2  
Storing refresh tokens in localStorage.

---

### Trap 3  
Using same secret for both tokens.

---

### Trap 4  
Assuming JWTs are encrypted.

---

## Interview Questions You Should Be Ready For

- Why use access and refresh tokens  
- How does token expiration work  
- How do you implement logout with JWT  
- Where should tokens be stored  
- How do you secure JWT-based auth  

---

## Strong Interview Answer (Example)

“I use short-lived access tokens for API authorization and long-lived refresh tokens to reissue access tokens without forcing users to log in again. Refresh tokens are stored securely, typically in HTTP-only cookies, and access tokens expire quickly to reduce risk if compromised.”

---

## Summary (Revision Ready)

- JWTs enable stateless authentication  
- access tokens are short-lived  
- refresh tokens reissue access tokens  
- secure storage is critical  
- token rotation improves security  

---


Class 4.4.2
Title: Rate Limiting
 Description: Protect APIs using rate limiting strategies.
 Content Type: Text
 Duration: 900
 Order: 2
Text Content:

# Rate Limiting in Express Applications

## Overview

Rate limiting is a critical backend security and scalability topic and commonly appears in API design interviews.

Interviewers evaluate:

- understanding of API abuse prevention  
- ability to protect backend resources  
- awareness of real-world traffic patterns  
- clarity on implementation trade-offs  

This topic is about **defensive backend design**, not just middleware usage.

---

## Why Rate Limiting Is Needed

Without rate limiting, APIs are vulnerable to:

- brute-force attacks  
- denial-of-service attempts  
- accidental traffic spikes  
- resource exhaustion  

Interview insight:

Rate limiting protects both **security and availability**.

---

## What Is Rate Limiting

Rate limiting restricts:

- how many requests a client can make  
- within a fixed time window  

Example:

- 100 requests per minute per IP  

Requests beyond the limit are rejected.

---

## Common Rate Limiting Strategies

### Fixed Window

- counts requests in a fixed time window  
- simple to implement  
- can cause traffic bursts at window boundaries  

Example:

100 requests per minute.

---

### Sliding Window

- smooths traffic over time  
- more accurate than fixed window  
- slightly more complex  

Interviewers often ask this comparison.

---

### Token Bucket (Interview Favorite)

- tokens are added at a fixed rate  
- each request consumes a token  
- allows controlled bursts  

Commonly used in production systems.

---

## Rate Limiting Dimensions

Rate limits can be applied based on:

- IP address  
- user ID  
- API key  
- endpoint  

Strong candidates mention **per-user** limits over IP-only.

---

## Implementing Rate Limiting in Express

A common middleware is `express-rate-limit`.

```js
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100
});

app.use(limiter);
```

This applies limits globally.

---

## Route-Specific Rate Limiting

Sensitive routes need stricter limits.

```js
app.post("/login", loginLimiter, loginHandler);
```

Example use cases:

- login attempts  
- password reset  
- OTP generation  

Interview insight:

Not all routes need the same limits.

---

## Distributed Rate Limiting

In scaled systems:

- multiple server instances exist  
- in-memory limits are insufficient  

Solution:

- centralized stores like Redis  

Mentioning Redis shows real-world awareness.

---

## Handling Rate Limit Responses

When limit is exceeded:

- respond with 429 Too Many Requests  
- include retry information  

Example:

```txt
HTTP 429
```

Proper status codes matter in interviews.

---

## Balancing Security and UX

Overly strict limits:

- block legitimate users  
- hurt user experience  

Interview insight:

Rate limiting should be tuned, not blindly applied.

---

## Common Interview Traps

### Trap 1  
Applying the same limit to all routes.

---

### Trap 2  
Using in-memory limits in distributed systems.

---

### Trap 3  
Ignoring authenticated user limits.

---

### Trap 4  
Returning incorrect status codes.

---

## Interview Questions You Should Be Ready For

- Why do we need rate limiting  
- Difference between fixed and sliding window  
- How do you implement rate limiting in Express  
- How do you scale rate limiting  
- What status code is used when limits are exceeded  

---

## Strong Interview Answer (Example)

“Rate limiting protects APIs from abuse and traffic spikes by restricting request frequency. I use middleware like express-rate-limit for basic protection and Redis-backed solutions for distributed systems. I apply stricter limits on sensitive endpoints like login while keeping general APIs flexible.”

---

## Summary (Revision Ready)

- rate limiting protects APIs  
- multiple strategies exist  
- limits can be per user or IP  
- Redis is needed for scaling  
- correct status codes matter  

---

Class 4.4.3:
  Title: Node.js Middleware, Auth & Runtime Contest
  Description: Implement secure backend features using middleware, authentication, and core Node.js runtime concepts.
  Content Type: contest
  Duration: 3600
  Order: 6
  Contest URL: https://www.scaler.com/test/a/nodea
  Contest Questions: 6
  Contest Syllabus: 
    - Node.js event loop
    - Middleware execution flow
    - Authentication with JWT
    - Password hashing and security



Topic 4.5
Title: Backend LLD
 Order: 5
Class 4.5.1
Title: CRUD APIs
 Description: Design and implement CRUD APIs.
 Content Type: Text
 Duration: 1080
 Order: 1
Text Content:

# CRUD APIs (Design & Implementation)

## Overview

CRUD APIs are the foundation of most backend systems and a guaranteed interview topic for Node.js, Express, and MERN roles.

Interviewers evaluate:

- understanding of REST principles  
- correctness of HTTP methods and status codes  
- API design clarity  
- ability to handle edge cases and errors  

This topic is not about writing basic routes.  
It is about **designing clean, predictable, and production-ready APIs**.

---

## What Does CRUD Mean

CRUD stands for:

- Create  
- Read  
- Update  
- Delete  

Each operation maps naturally to HTTP methods.

---

## CRUD and REST Mapping

| Operation | HTTP Method | Endpoint Example |
|--------|-------------|------------------|
| Create | POST | /users |
| Read (all) | GET | /users |
| Read (one) | GET | /users/:id |
| Update | PUT / PATCH | /users/:id |
| Delete | DELETE | /users/:id |

Interview insight:

Correct mapping signals backend maturity.

---

## Designing a Resource

Before writing APIs, define the resource clearly.

Example: User

Key questions interviewers expect you to reason about:

- what uniquely identifies a user  
- which fields are required  
- which fields are mutable  
- which operations are allowed  

Design comes before code.

---

## Create API (POST)

### Purpose

Create a new resource.

### Example

```js
app.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});
```

### Key Interview Points

- use POST  
- return 201 Created  
- validate input  
- handle duplicate entries  

---

## Read API (GET)

### Fetch All Resources

```js
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

### Fetch Single Resource

```js
app.get("/users/:id", async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.sendStatus(404);
  res.json(user);
});
```

Interview insight:

404 must be returned if resource does not exist.

---

## Update API (PUT vs PATCH)

### PUT

- replaces the entire resource  

### PATCH

- updates specific fields  

Interviewers often test this distinction.

---

### Example (PATCH)

```js
app.patch("/users/:id", async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) return res.sendStatus(404);
  res.json(user);
});
```

Key points:

- return updated document  
- run validations  
- handle missing resource  

---

## Delete API (DELETE)

```js
app.delete("/users/:id", async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.sendStatus(404);
  res.sendStatus(204);
});
```

Interview insight:

204 No Content is preferred for successful deletes.

---

## Validation and Error Handling

CRUD APIs must:

- validate input  
- handle invalid IDs  
- catch database errors  
- return meaningful status codes  

Skipping this is a red flag.

---

## Pagination and Filtering (Bonus)

For large datasets:

```js
GET /users?page=1&limit=10
```

Mentioning pagination shows scalability awareness.

---

## Idempotency (Interview Concept)

- GET, PUT, DELETE are idempotent  
- POST is not  

Interviewers may test this.

---

## Security Considerations

CRUD APIs should:

- validate user permissions  
- protect sensitive fields  
- prevent mass assignment  

Mentioning authorization is a strong signal.

---

## Common Interview Traps

### Trap 1  
Using POST for updates.

---

### Trap 2  
Returning 200 for failed operations.

---

### Trap 3  
Ignoring validation and edge cases.

---

### Trap 4  
Leaking internal database errors.

---

## Interview Questions You Should Be Ready For

- How do you design CRUD APIs  
- Difference between PUT and PATCH  
- Correct status codes for CRUD  
- How do you handle missing resources  
- How do you secure CRUD endpoints  

---

## Strong Interview Answer (Example)

“I design CRUD APIs by mapping operations cleanly to HTTP methods, validating input, handling missing resources explicitly, and returning correct status codes. I keep endpoints predictable and scalable by following REST conventions.”

---

## Summary (Revision Ready)

- CRUD maps naturally to HTTP methods  
- status codes matter  
- validation and errors are essential  
- PATCH vs PUT is important  
- clean design improves maintainability  

---


Class 4.5.2
Title: Caching Strategies
 Description: Improve backend performance using caching techniques.
 Content Type: Text
 Duration: 960
 Order: 2
Text Content:

# Caching Strategies in Backend Systems

## Overview

Caching is a critical backend performance topic and frequently discussed in system design and Node.js interviews.

Interviewers evaluate:

- understanding of latency reduction  
- ability to identify performance bottlenecks  
- awareness of trade-offs between freshness and speed  
- practical experience with real-world caching patterns  

This topic is not about tools alone.  
It is about **choosing the right caching strategy for the problem**.

---

## Why Caching Is Needed

Without caching:

- every request hits the database  
- response times increase under load  
- databases become bottlenecks  

Interview insight:

Caching shifts load away from slow components.

---

## What Is Caching

Caching means:

- storing computed or fetched data  
- so future requests can reuse it  
- instead of recomputing or refetching  

Caches trade **freshness for speed**.

---

## Where Caching Can Be Applied

Common caching layers:

- in-memory (application level)  
- distributed cache (Redis)  
- database-level caching  
- HTTP caching  

Strong candidates discuss **multiple layers**.

---

## In-Memory Caching

### What It Is

Data stored in application memory.

Example:

```js
const cache = new Map();
```

### Pros

- very fast  
- simple to implement  

### Cons

- lost on server restart  
- not shared across instances  

Interview insight:

In-memory caching does not scale horizontally.

---

## Distributed Caching (Redis)

### Why Redis

Redis provides:

- centralized caching  
- persistence options  
- TTL support  

It is the most common interview answer.

---

### Basic Redis Cache Flow

1. check cache  
2. if hit, return cached data  
3. if miss, fetch from DB  
4. store in cache  

This is called **cache-aside**.

---

## Cache-Aside Pattern (Most Common)

```txt
Request → Cache → DB → Cache → Response
```

Key interview insight:

Cache is updated only on reads.

---

## Write Strategies (High-Level)

### Write-Through

- write to cache and DB together  
- strong consistency  
- slower writes  

### Write-Behind

- write to cache first  
- async DB update  
- eventual consistency  

Mentioning trade-offs is important.

---

## TTL and Cache Expiry

Caches must expire.

Common strategies:

- time-based TTL  
- manual invalidation  
- versioned keys  

Interview insight:

Stale data is a bigger problem than slow data.

---

## Cache Invalidation (Hardest Problem)

Common invalidation strategies:

- delete cache on update  
- update cache on write  
- use short TTL  

Strong interview line:

“There are only two hard things in computer science: naming things and cache invalidation.”

---

## What Should Be Cached

Good candidates:

- read-heavy data  
- expensive computations  
- rarely changing resources  

Bad candidates:

- highly volatile data  
- user-specific sensitive data (without care)  

---

## Caching and Authentication

Important note:

- never cache authenticated responses blindly  
- cache per-user when needed  
- include auth context in cache keys  

This shows security awareness.

---

## HTTP Caching (Bonus)

Use headers:

- Cache-Control  
- ETag  

This shifts caching responsibility to clients and CDNs.

Mentioning this is a bonus.

---

## Common Interview Traps

### Trap 1  
Caching everything.

---

### Trap 2  
Ignoring cache invalidation.

---

### Trap 3  
Using in-memory cache in distributed systems.

---

### Trap 4  
Serving stale data without awareness.

---

## Interview Questions You Should Be Ready For

- Why do we use caching  
- Difference between in-memory and Redis cache  
- What is cache-aside  
- How do you invalidate cache  
- What should not be cached  

---

## Strong Interview Answer (Example)

“I use caching to reduce latency and database load by storing frequently accessed or expensive data. I typically use the cache-aside pattern with Redis, apply TTLs carefully, and invalidate cache entries on updates to balance performance and data correctness.”

---

## Summary (Revision Ready)

- caching improves performance  
- multiple cache layers exist  
- Redis enables distributed caching  
- invalidation is critical  
- cache design requires trade-offs  

---


Class 4.5.3
Title: Node.js Performance & Scalability Techniques
Description: Learn how to improve Node.js API performance by handling CPU-intensive workloads, leveraging child processes, worker threads, and cluster-based master–worker architectures.
 Content Type: Text
 Duration: 1080
 Order: 3
Text Content:

# Improving Node.js API Performance (Beyond Basics)

## Overview

Improving Node.js API performance is a strong differentiator in backend interviews, especially for senior and full-stack roles.

Interviewers evaluate:

- understanding of Node.js execution model  
- ability to handle CPU-heavy workloads  
- awareness of scaling strategies beyond async I/O  
- practical knowledge of production bottlenecks  

This section focuses on **what to do when async alone is not enough**.

---

## The Core Limitation of Node.js

Node.js is:

- single-threaded for JavaScript execution  
- excellent for I/O-bound workloads  
- weak for CPU-bound tasks  

Problem scenarios:

- heavy computations  
- image processing  
- PDF generation  
- encryption / hashing loops  

These can **block the event loop** and degrade API performance.

---

## Rule of Thumb (Interview-Ready)

- I/O-bound → async Node.js works well  
- CPU-bound → must move work off the main thread  

This is where advanced strategies come in.

---

## Child Processes

### What Is a Child Process

A child process is:

- a separate OS process  
- with its own memory and event loop  
- spawned from a Node.js application  

Child processes allow true parallelism.

---

### When to Use Child Processes

Use them for:

- CPU-intensive computations  
- long-running background tasks  
- blocking workloads  

Interview insight:

Child processes protect the main event loop.

---

### Example (Conceptual)

```js
const { fork } = require("child_process");

const worker = fork("worker.js");

worker.send({ task: "heavyCalculation" });

worker.on("message", result => {
  console.log(result);
});
```

Explanation:

- main thread stays responsive  
- heavy work happens in another process  

---

## Worker Threads (Mention Briefly)

Worker threads:

- share memory using SharedArrayBuffer  
- lighter than child processes  
- useful for CPU-bound tasks  

Interview insight:

Worker threads are preferred over child processes for fine-grained parallelism.

---

## Cluster Module (Master–Worker / Master–Slave)

### The Problem Cluster Solves

Node.js runs on a single CPU core by default.

Modern servers have:

- multiple CPU cores  

Without clustering:

- only one core is used  

---

## What Is the Cluster Module

Cluster enables:

- spawning multiple Node.js processes  
- each handling requests  
- sharing the same server port  

Architecture:

- master process  
- multiple worker processes  

Each worker has its own event loop.

---

## Master–Worker Architecture

### Master Process

- manages workers  
- distributes incoming connections  

### Worker Processes

- handle API requests  
- crash independently  
- improve fault isolation  

Interview insight:

This is often referred to as **master–slave** or **primary–worker** architecture.

---

## Cluster Example (Conceptual)

```js
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  require("./app");
}
```

Explanation:

- master forks workers equal to CPU cores  
- OS load-balances incoming requests  

---

## Benefits of Clustering

- full CPU utilization  
- better throughput  
- isolation of crashes  

Interview insight:

If one worker crashes, others continue serving traffic.

---

## Load Balancing with Cluster

Node.js cluster uses:

- OS-level load balancing  
- round-robin (platform-dependent)  

Mentioning this shows deeper understanding.

---

## Scaling Beyond a Single Machine

Clustering helps **within one machine**.

For horizontal scaling:

- multiple machines  
- external load balancer (NGINX, ALB)  

Interviewers like candidates who clarify this boundary.

---

## Combining Strategies (Real-World Pattern)

A common production setup:

- cluster for multi-core usage  
- worker threads or child processes for CPU-heavy tasks  
- Redis for shared state  
- load balancer in front  

This demonstrates system-level thinking.

---

## Other Important Performance Techniques (Quick Hits)

- caching (Redis)  
- pagination and limits  
- indexing databases  
- streaming large responses  
- avoiding synchronous code  

Mentioning these ties concepts together.

---

## Common Interview Traps

### Trap 1  
Assuming async solves CPU bottlenecks.

---

### Trap 2  
Blocking the event loop with heavy logic.

---

### Trap 3  
Using cluster without stateless design.

---

### Trap 4  
Overusing child processes unnecessarily.

---

## Interview Questions You Should Be Ready For

- Why is Node.js slow for CPU-heavy tasks  
- Difference between child process and worker threads  
- How does cluster improve performance  
- What is master–worker architecture  
- How would you scale a Node.js API  

---

## Strong Interview Answer (Example)

“Node.js handles I/O very efficiently but struggles with CPU-bound tasks due to its single-threaded event loop. To improve API performance, I use clustering to utilize multiple CPU cores and offload heavy computation to worker threads or child processes, ensuring the main event loop remains responsive.”

---

## Summary (Revision Ready)

- Node.js is single-threaded for JS  
- CPU-heavy tasks block the event loop  
- child processes enable parallel execution  
- cluster uses multiple CPU cores  
- combine strategies for production scale  

---

Class 4.5.4:
  Title: REST APIs with Express & MongoDB Contest
  Description: Design and implement RESTful APIs using Express, MongoDB, and Mongoose with correct HTTP semantics.
  Content Type: contest
  Duration: 3600
  Order: 6
  Contest URL: https://www.scaler.com/test/a/nodeb
  Contest Questions: 6
  Contest Syllabus: 
    - REST API design and HTTP methods
    - Express routing and request handling
    - MongoDB CRUD and ID-based queries
    - Mongoose schema hooks and lifecycle
