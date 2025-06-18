// src/config/config.ts
export interface TableColumn {
    key: string;
    label: string;
    icon?: string;
    className?: string;
}

export interface TableView {
    id: string;
    name: string;
    columns: TableColumn[];
}

export interface ModuleSection {
    name: string;
    views: TableView[];
}

export interface AppModule {
    id: string;
    name: string;
    icon: string;
    route: string;
    sections: ModuleSection[];
}

export interface AppConfig {
    modules: AppModule[];
}

export const appConfig: AppConfig = {
    modules: [
        {
            id: 'crew',
            name: 'Crew Management',
            icon: 'bi-airplane',
            route: '/dashboard/modules/crewlist',
            sections: [
                {
                    name: 'Maritime Single Window',
                    views: [
                        {
                            id: 'germany-msw',
                            name: 'Germany-MSW',
                            columns: [
                                { key: 'PIN', label: 'PIN', icon: 'bi-clipboard', className: 'Pin' },
                                { key: 'NAME', label: 'NAME' },
                                { key: 'TITLENAME', label: 'TITLENAME' },
                                { key: 'FIRSTNAME', label: 'FIRSTNAME' },
                                { key: 'MIDDLENAME', label: 'MIDDLENAME' },
                                { key: 'LASTNAME', label: 'LASTNAME' },
                                { key: 'MAIDENNAME', label: 'MAIDENNAME' },
                                { key: 'CALLINGNAME', label: 'CALLINGNAME' },
                                { key: 'SUFFIXNAME', label: 'SUFFIXNAME' },
                                { key: 'RANK', label: 'RANK' },
                                { key: 'NATIONALITY', label: 'NATIONALITY' },
                                { key: 'ORGNAME', label: 'ORGNAME' }
                            ]
                        },
                        {
                            id: 'denmark-msw',
                            name: 'Denmark-MSW',
                            columns: [
                                { key: 'PIN', label: 'PIN', icon: 'bi-clipboard', className: 'Pin' },
                                { key: 'NAME', label: 'NAME' },
                                { key: 'RANK', label: 'RANK' },
                                { key: 'NATIONALITY', label: 'NATIONALITY' }
                            ]
                        }
                    ]
                },
                {
                    name: 'Standard',
                    views: [
                        {
                            id: 'standard',
                            name: 'Standard',
                            columns: [
                                { key: 'PIN', label: 'PIN' },
                                { key: 'Date_of_Check', label: 'Date of Check' },
                                { key: 'Family_Name', label: 'Family Name' },
                                { key: 'Given_Name', label: 'Given Name' },
                                { key: 'Nationality', label: 'Nationality' },
                                { key: 'Date_of_birth', label: 'Date of Birth' },
                                { key: 'Place_of_Birth', label: 'Place of Birth' },
                                { key: 'Nature_of_id', label: 'Nature of ID' },
                                { key: 'Number_of_id', label: 'Number of ID' },
                                { key: 'Rank_or_rating', label: 'Rank/Rating' },
                                { key: 'Gender', label: 'Gender' }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};