const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "json-logs/",
    reportPath: "cypress/generate-reports/cucumber-report-New.json",
    metadata: {
        browser: {
            name: "chrome",
            version: "128.0.6613.113",
        },
        device: "Local test machine",
        platform: {
            name: "Mac",
            version: "Ventura 13.0",
        },
    },
    customData: {
        title: "Run info",
        data: [
            { label: "Project", value: "Open Innovation API Test report" },
            { label: "Release", value: "1.0.0" },
            { label: "Execution Start Time", value: "Aug 31th 2024" },
            { label: "Execution End Time", value: "Aug 31th 2024" },
        ],
    },
});