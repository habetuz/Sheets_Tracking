# Sheets_Tracking

> Add this little tracker to your website without any server costs!

## Installation

### 1. Create Google Sheets file

1. Open [this Google sheets](https://docs.google.com/spreadsheets/d/138qLZNoickrhUjsVePpv-xgFBD7p0JMgv-JWefqZdyI/edit?usp=sharing) and copy it.
2. Open the copied sheets file and go to `Add-ons`>`App Script`.
3. Copy the code from [`sheets_tracking.gs`](https://github.com/habetuz/Sheets_Tracking/blob/v1.0.0/sheets_tracking.gs) to the Apps Script project.

### 2. Deploy the project

1. Go to `Deploy`>`New deployment` in the top right corner.
2. Choose `Web app` as type.
3. Set `Who has access` to `Anyone`.
4. Click deploy and grant permission in the next screen.
5. Go to `Deploy`>`Manage deployments` and copy the `Web-App` URL (looks like this: `https://script.google.com/macros/s/[deployment-id]/exec`)

### 3. Add js file

Add `sheets_tracking.js` to your HTML.

``` html
<body>
  <!-- Your html -->
  <script src="https://cdn.jsdelivr.net/gh/habetuz/sheets_tracking@1.0.0/sheets_tracking.js"></script>
  <script src="index.js"></script>
<body>
```

### 4. Setup Sheets_Tracking

Open your `index.js` file and setup sheets_tracking.

``` js
// Add the url copied from step 2 here
SHEETS_TRACKING.sheetsURL = "https://script.google.com/macros/s/[deployment-id]/exec"

// Add the name of your spreadsheet here
SHEETS_TRACKING.sheetName = "Tracking"
SHEETS_TRACKING.start()
```

## Post custom updates

To log custom updates like button clicks or inputs use the `SHEETS_TRACKING.updateValue(name, value, type)` function.

- `name` specifies the display name of the value.
- `value` specifies the value you want to post.
- `type` specifies the type of `value`. Currently supported are `number`, `string`, `boolean`, `number_increment` and `string_append`.

### Special types

- `number_increment` increments the value in the spreadsheet by the given value.
- `string_append` appends the given value to the value in the spreadsheet (with a new line separator).
