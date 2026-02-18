const fs = require('fs');
const reporter = require('cucumber-html-reporter');

const jsonFile = 'reports/cucumber-report.json';
const htmlFile = 'reports/cucumber-report.html';

// Check if JSON exists
if (!fs.existsSync(jsonFile)) {
    console.error(`JSON report not found: ${jsonFile}`);
    process.exit(1);
}

// Generate HTML
reporter.generate({
    theme: 'bootstrap',
    jsonFile: jsonFile,
    output: htmlFile,
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "QA",
        "Browser": "Chromium",
        "Platform": process.platform
    }
});

console.log(`Report generated at ${htmlFile}`);
