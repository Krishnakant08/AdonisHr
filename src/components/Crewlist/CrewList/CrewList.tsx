import 'bootstrap-icons/font/bootstrap-icons.css';
import './CrewList.css';
import BottomLeftbar from '../CrewViewList/CrewViewList';
import { useState, useEffect, useCallback } from 'react';
import TableInRight from '../CrewTable/CrewTable';
import CrewForm from '../../../common/CrewForm/CrewAddForm';
import { tableContent as initialTableContent, dummyDataByIcon } from '../../../crewdata/CrewData';
import AlertMessage from '../../../common/AlertMessage/AlertMessage';
import { useTranslation } from 'react-i18next';

interface Tab {
    id: string;
    title: string;
    icon: string;
    selectedView: string;
}

interface CrewListProps {
    activeIcon: string;
    activeLabel?: string;
    onIconChange?: (icon: string) => void;
}

function CrewList({ activeIcon, activeLabel = 'Crew List', onIconChange = () => { } }: CrewListProps) {
    const { t } = useTranslation();

    const [showBottomLeftbar, setShowBottomLeftbar] = useState(true);
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState('');
    const [tableContent, setTableContent] = useState([...initialTableContent]);
    const [showForm, setShowForm] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [formData, setFormData] = useState<string[]>([]);
    const [currentLabel, setCurrentLabel] = useState(activeLabel);
    const [searchTerm, setSearchTerm] = useState('');

    const [alert, setAlert] = useState({
        message: '',
        type: 'info' as 'info' | 'success' | 'warning' | 'error',
        show: false,
        showConfirm: false,
        onConfirm: () => { }
    });

    useEffect(() => {
        const sidebarData = dummyDataByIcon[activeIcon] || { sections: [], sectionContent: {} };
        const firstSection = sidebarData.sections?.[0];
        const firstItem = firstSection ? sidebarData.sectionContent[firstSection]?.[0] : 'Default View';

        setTabs(prevTabs => {
            const existingTab = prevTabs.find(tab => tab.icon === activeIcon);
            if (existingTab) return prevTabs;

            const newTab = {
                id: `tab-${Date.now()}`,
                title: `Tab ${prevTabs.length + 1}`,
                icon: activeIcon,
                selectedView: firstItem
            };

            return [...prevTabs, newTab];
        });

        const timer = setTimeout(() => {
            setTabs(currentTabs => {
                const tabForIcon = currentTabs.find(tab => tab.icon === activeIcon);
                if (tabForIcon) setActiveTabId(tabForIcon.id);
                return currentTabs;
            });
        }, 0);

        return () => clearTimeout(timer);
    }, [activeIcon]);

    useEffect(() => {
        if (tabs.length > 0) {
            if (!activeTabId || !tabs.some(tab => tab.id === activeTabId)) {
                const tabForCurrentIcon = tabs.find(tab => tab.icon === activeIcon);
                setActiveTabId(tabForCurrentIcon?.id || tabs[0].id);
            }
        }
    }, [tabs, activeTabId, activeIcon]);

    const activeTab = tabs.find(tab => tab.id === activeTabId);
    const selectedTable = activeTab ? tableContent.find(t => t.MenuName === activeTab.selectedView) : null;

    useEffect(() => {
        if (activeTab) {
            onIconChange(activeTab.icon);
            setCurrentLabel(activeTab.selectedView);
        }
    }, [activeTab, onIconChange]);

    const showAlert = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
        setAlert({ message, type, show: true, showConfirm: false, onConfirm: () => { } });
    }, []);

    const closeAlert = useCallback(() => {
        setAlert(prev => ({ ...prev, show: false }));
    }, []);

    const showConfirm = useCallback((message: string, onConfirm: () => void) => {
        setAlert({ message, type: 'warning', show: true, showConfirm: true, onConfirm });
    }, []);

    const getFilteredRows = useCallback(() => {
        if (!selectedTable) return [];
        if (!searchTerm.trim()) return selectedTable.Values;
        return selectedTable.Values.filter(row =>
            row.some(cell => cell.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [selectedTable, searchTerm]);

    const filteredRows = getFilteredRows();

    const handleSubItemClick = useCallback((item: string) => {
        setTabs(prevTabs =>
            prevTabs.map(tab =>
                tab.id === activeTabId ? { ...tab, selectedView: item } : tab
            )
        );
        setCurrentLabel(item);
        setSearchTerm('');
    }, [activeTabId]);

    const handleCloseTab = useCallback((idToClose: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTabs(prevTabs => {
            const filteredTabs = prevTabs.filter(tab => tab.id !== idToClose);

            if (filteredTabs.length === 0) {
                const newTab = {
                    id: `tab-${Date.now()}`,
                    title: 'Tab 1',
                    icon: 'bi-airplane',
                    selectedView: 'Default View'
                };
                setActiveTabId(newTab.id);
                return [newTab];
            }

            if (idToClose === activeTabId) {
                const newActiveTab = filteredTabs[filteredTabs.length - 1];
                setActiveTabId(newActiveTab.id);
            }

            return filteredTabs;
        });
        setSearchTerm('');
    }, [activeTabId]);

    const handleTabClick = useCallback((id: string) => {
        setActiveTabId(id);
        const tab = tabs.find(t => t.id === id);
        if (tab) setCurrentLabel(tab.selectedView);
        setSearchTerm('');
    }, [tabs]);

    const handleRowSelection = useCallback((selectedIndices: number[]) => {
        setSelectedRows(selectedIndices);
    }, []);

    const handleOpen = useCallback(() => {
        if (selectedRows.length === 0) {
            showAlert(t('crewForm.NothingIsSelected'), "warning");
            return;
        }
        if (!selectedTable) return;
        const rowIndex = selectedRows[0];
        const rowData = selectedTable.Values[rowIndex];
        setFormData(rowData.map(String));
        setShowForm(true);
    }, [selectedRows, selectedTable, showAlert, t]);

    const handleDelete = useCallback(() => {
        if (selectedRows.length === 0) {
            showAlert(t('crewForm.NothingIsSelected'), "warning");
            return;
        }
        if (!selectedTable) return;

        showConfirm(
            t('crewForm.deleteConfirmationMessage', { count: selectedRows.length }),
            () => {
                setTableContent(prevTables =>
                    prevTables.map(table => {
                        if (table.MenuName === selectedTable.MenuName) {
                            return {
                                ...table,
                                Values: table.Values.filter((_, index) => !selectedRows.includes(index))
                            };
                        }
                        return table;
                    })
                );
                setSelectedRows([]);
            }
        );
    }, [selectedRows, selectedTable, showAlert, showConfirm, t]);

    const handleSaveCrew = useCallback((row: string[]) => {
        if (!selectedTable) return;

        setTableContent(prevTables =>
            prevTables.map(table => {
                if (table.MenuName === selectedTable.MenuName) {
                    if (selectedRows.length > 0) {
                        const rowIndex = selectedRows[0];
                        const newValues = [...table.Values];
                        newValues[rowIndex] = row;
                        return { ...table, Values: newValues };
                    } else {
                        return { ...table, Values: [...table.Values, row] };
                    }
                }
                return table;
            })
        );

        setShowForm(false);
        setSelectedRows([]);
    }, [selectedRows, selectedTable]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') e.currentTarget.blur();
    }, []);

    return (
        <div className="right-sidebar">
            <div className="breadcrumb">
                {t('crewForm.breadcrumb')} <span className="highlight">{currentLabel}</span>
            </div>

            <div className="tab-bar">
                {tabs.map(({ id, icon, selectedView }) => (
                    <div
                        key={id}
                        className={`tab-item ${id === activeTabId ? 'active-tab' : ''}`}
                        onClick={() => handleTabClick(id)}
                    >
                        <div className="tab-content">
                            <i className={`bi ${icon} tab-icon`}></i>
                            <span className="tab-title">{selectedView}</span>
                        </div>
                        <i className="bi bi-x tab-close" onClick={(e) => handleCloseTab(id, e)}></i>
                    </div>
                ))}
            </div>

            <div className="filter-bar">
                <i className="bi bi-list hamburger-icon" onClick={() => setShowBottomLeftbar(prev => !prev)}></i>

                <button className="filter-button">
                    <i className="bi bi-person-badge"></i>
                    <span>{t('crewForm.employmentState')}</span>
                    <i className="bi bi-caret-down-fill dropdown-icon"></i>
                </button>

                <div className="action-buttons">
                    <button className="btn-icon open-btn" onClick={handleOpen}>
                        <i className="bi bi-folder"></i>
                        <span>{t('crewForm.openButton')}</span>
                    </button>
                    <button className="btn-icon delete-btn" onClick={handleDelete}>
                        <i className="bi bi-trash"></i>
                        <span>{t('crewForm.deleteButton')}</span>
                    </button>
                </div>

                <div className="search-section">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="search-input"
                            placeholder={t('crewForm.searchPlaceholder')}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown}
                        />
                        <i className="bi bi-search search-icon"></i>
                    </div>

                    <button className="add-button" onClick={() => {
                        setFormData([]);
                        setShowForm(true);
                    }}>
                        {t('crewForm.addCrewButton')}
                    </button>
                </div>
            </div>

            {alert.show && (
                <AlertMessage
                    message={alert.message}
                    type={alert.type}
                    onClose={closeAlert}
                    showConfirm={alert.showConfirm}
                    onConfirm={alert.onConfirm}
                />
            )}

            <div className="main-body">
                {showBottomLeftbar && (
                    <div className="left-panel">
                        <BottomLeftbar
                            onSubItemClick={handleSubItemClick}
                            activeIcon={activeTab?.icon || activeIcon}
                        />
                    </div>
                )}
                <div className="right-panel">
                    {selectedTable && (
                        <TableInRight
                            selectedView={activeTab?.selectedView || ''}
                            columns={selectedTable.ColumnName}
                            rows={filteredRows}
                            onRowSelection={handleRowSelection}
                        />
                    )}
                </div>
            </div>

            {showForm && selectedTable && (
                <CrewForm
                    fields={selectedTable.ColumnName}
                    selectedView={activeTab?.selectedView || ''}
                    onCancel={() => {
                        setShowForm(false);
                        setSelectedRows([]);
                    }}
                    onSave={handleSaveCrew}
                    initialData={formData}
                    isEdit={selectedRows.length > 0}
                />
            )}
        </div>
    );
}

export default CrewList;
