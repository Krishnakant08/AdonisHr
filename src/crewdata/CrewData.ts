// dummy.ts
export type SectionContent = Record<string, string[]>;

export interface SidebarData {
    sections: string[];
    sectionContent: SectionContent;
}

export const dummyDataByIcon: Record<string, SidebarData> = {
    // Icons from Modules
    'bi-airplane': {
        sections: [
            'Maritime Single Window',
            'Maritime Single Window without Crew Change',
            'Onboard',
            'Payroll',
            'Standard',
            'Vessel views',
        ],
        sectionContent: {
            'Maritime Single Window': ['Germany-MSW', 'Denmark-MSW', 'Sweden-MSW'],
            'Maritime Single Window without Crew Change': ['No Crew - Germany', 'No Crew - Denmark'],
            'Onboard': ['Ship Logs', 'Crew List'],
            'Payroll': ['Salary Summary', 'Bonus Report'],
            'Standard': ['Standard', 'Current Activity', 'Current Activity with Routes', 'Last Appraisal', 'Krishnaknt'],
            'Vessel views': ['Deck View', 'Cargo Status'],
        },
    },
    'bi-bullseye': {
        sections: ['Reports Section A', 'Reports Section B'],
        sectionContent: {
            'Reports Section A': ['Item 1', 'Item 2'],
            'Reports Section B': ['Item 3', 'Item 4'],
        },
    },
    'bi-clock': {
        sections: ['Clock Section'],
        sectionContent: {
            'Clock Section': ['Clock Item 1', 'Clock Item 2'],
        },
    },
    'bi-disc': {
        sections: ['GG Section A', 'DG Section B'],
        sectionContent: {
            'GG Section A': ['DG 1', 'Dg 2'],
            'DG Section B': ['dg 3', 'fh 4'],
        },
    },

   
    'bi-file-earmark-arrow-down': {
        sections: ['Datagroups Section'],
        sectionContent: {
            'Datagroups Section': ['Datagroup 1', 'Datagroup 2'],
        },
    },

    // Example from Reports
    'bi-stopwatch': {
        sections: ['Reports'],
        sectionContent: {
            Reports: ['Report 1', 'Report 2'],
        },
    },

    // Example from View
    'bi-dribbble': {
        sections: ['View Section'],
        sectionContent: {
            'View Section': ['View Item 1', 'View Item 2'],
        },
    },
};


// dummy.ts

export const tableContent = [
    {
        MenuName: "Germany-MSW",
        ColumnName: ["PIN", "Name", "Details", "Email"],
        Values: [
            ["1", "Ananya Singh", "Software Engineer", "ananya.singh@example.com"],
            ["2", "Rohan Gupta", "Product Manager", "rohan.gupta@example.com"],
            ["3", "Neha Patel", "QA Analyst", "neha.patel@example.com"],
            ["4", "Aditya Roy", "UI Designer", "aditya.roy@example.com"],
        ],
    },
    {
        MenuName: "Standard",
        ColumnName: [
            "S.No",
            "NAME",
            "TITLENAME",
            "FIRSTNAME",
            "MIDDLENAME",
            "LASTNAME",
            "MAIDENNAME",
            "CALLINGNAME",
            "SUFFIXNAME",
            "RANK",
            "NATIONALITY",
            "ORGNAME",
        ],
        Values: [
            [1, "", "Mr", "", "", "", "", "", "", "Chief Engineer", "DK", "DFDS (DK)"],
            [2, "", "Dr", "", "Wizard", "", "", "", "", "Master", "CS", "DFDS (DK)"],
            [3, "Cleark, Michael", "", "Michael", "", "Cleark", "", "", "", "Electrician", "DK", "DFDS (DK)"],
            [4, "Last, Demo", "", "Demo", "", "Last", "", "", "", "Restaurant Rat...", "SE", "DFDS (DK)"],
        ],
    },
    // New data for bi-airplane (example: Maritime Single Window)
    {
        MenuName: "Maritime Single Window",
        ColumnName: ["Vessel", "Flag", "Arrival Date", "Departure Date", "Status"],
        Values: [
            ["Evergreen", "Germany", "2025-05-15", "2025-05-18", "Arrived"],
            ["Sea Star", "Denmark", "2025-05-20", "2025-05-22", "Scheduled"],
            ["Ocean Queen", "Sweden", "2025-05-10", "2025-05-14", "Departed"],
        ],
    },
    // New data for bi-bullseye (example: Reports Section A)
    {
        MenuName: "Item 1",
        ColumnName: ["Report ID", "Title", "Created By", "Date"],
        Values: [
            ["RPT001", "Annual Sales", "Alice Johnson", "2025-01-10"],
            ["RPT002", "Employee Performance", "Bob Smith", "2025-03-05"],
            ["RPT003", "Customer Feedback", "Charlie Lee", "2025-04-12"],
        ],
    },
    // New data for bi-clock (example: Clock Section)
    {
        MenuName: "Clock Item 1",
        ColumnName: ["Employee ID", "Name", "Clock In", "Clock Out", "Hours Worked"],
        Values: [
            ["E001", "Diana Prince", "08:00 AM", "04:00 PM", "8"],
            ["E002", "Bruce Wayne", "09:00 AM", "05:30 PM", "8.5"],
            ["E003", "Clark Kent", "07:30 AM", "03:30 PM", "8"],
        ],
    },
    // New data for bi-disc (example: Disc Module)
    {
        MenuName: "Disc Module",
        ColumnName: ["Disc ID", "Name", "Category", "Release Date", "Status"],
        Values: [
            ["D001", "Jazz Classics", "Music", "2023-11-20", "Available"],
            ["D002", "Documentary 101", "Video", "2024-01-15", "Checked Out"],
            ["D003", "The Art of Coding", "E-Book", "2024-03-30", "Available"],
        ],
    },
];

