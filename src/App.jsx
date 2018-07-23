import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import isNil from 'lodash/isNil';
import Datatable from './components/datatable';
import CsvImporter from './components/import-csv';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tableColumns: [],
            tableRows: [],
        };
    }

    onCsvFileImported = (data) => {
        const dataRows = Array.isArray(data) ? data : [data];
        let tableColumns = [];
        const tableRows = [];

        if (dataRows.length) {
            dataRows.forEach((rowValue, rowIndex) => {
                // do not include the column names as data as they will be used as object keys
                if (rowIndex > 0) {
                    const fmtRowObject = {};
                    
                    rowValue.forEach((columnValue, columnIndex) => {
                        const headerName = tableColumns[columnIndex];
                        fmtRowObject[headerName] = columnValue;
                    });

                    // check if it has an id before assigning a unique one to it
                    fmtRowObject.id = isNil(fmtRowObject.id) ? uniqueId() : fmtRowObject.id;

                    tableRows.push(fmtRowObject);
                } else {
                    tableColumns = rowValue;
                }
            });
        }

        this.setState({
            tableColumns,
            tableRows,
        });
    };

    render() {
        const { tableColumns, tableRows } = this.state;

        let viewComponent = null;
        if (tableColumns.length && tableRows.length) {
            viewComponent = (
                <Datatable
                    tableColumns={tableColumns}
                    tableRows={tableRows}
                />
            );
        } else {
            viewComponent = (
                <CsvImporter
                    onFileLoaded={this.onCsvFileImported}
                />
            )
        }

        return (
            <div className="App">
                {viewComponent}
            </div>
        );
    }
}

export default App;
