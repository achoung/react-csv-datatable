import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import uniqueId from 'lodash/uniqueId';
import isNil from 'lodash/isNil';
import Datatable from './components/datatable';
import CsvImporter from './components/import-csv';
import AppBar from './AppBar';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        type: 'dark',
    },
});

const styles = {
    container: {
        flexGrow: 1,
    },
    componentWrapper: {
        display: 'flex',
    },
    component: {
        flex: '1 auto',
    },
};

class App extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

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
        const { classes } = this.props;

        let viewComponent = null;
        if (tableColumns.length && tableRows.length) {
            viewComponent = <Datatable tableColumns={tableColumns} tableRows={tableRows} />;
        } else {
            viewComponent = <CsvImporter onFileLoaded={this.onCsvFileImported} />;
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.container}>
                    <AppBar />
                    <div className={classes.componentWrapper}>
                        <div className={classes.component}>
                            {viewComponent}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
