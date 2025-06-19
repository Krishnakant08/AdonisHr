// src/components/TablesInRight/CrewTable.tsx
import "./CrewTable.css";
import { useState } from "react";

interface Props {
    selectedView: string;
    columns?: string[];
    rows?: (string | number)[][];
    onRowSelection: (selectedIndices: number[]) => void;
}

function TableInRight({ selectedView, columns, rows, onRowSelection }: Props) {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const handleCheckboxChange = (rowIndex: number) => {
        setSelectedRows(prev => {
            const newSelection = prev.includes(rowIndex)
                ? prev.filter(i => i !== rowIndex)
                : [...prev, rowIndex];
            onRowSelection(newSelection);
            return newSelection;
        });
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!rows) return;

        const newSelection = e.target.checked
            ? rows.map((_, index) => index)
            : [];
        setSelectedRows(newSelection);
        onRowSelection(newSelection);
    };

    if (!columns || !rows)
        return (
            <div style={{ padding: "1rem" }}>
                No data available for "{selectedView}".
            </div>
        );

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={rows.length > 0 && selectedRows.length === rows.length}
                                onChange={handleSelectAll}
                            />
                        </th>
                        {columns.map((col, idx) => (
                            <th key={idx}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(rowIndex)}
                                    onChange={() => handleCheckboxChange(rowIndex)}
                                />
                            </td>
                            {row.map((value, colIndex) => (
                                <td key={colIndex}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableInRight;