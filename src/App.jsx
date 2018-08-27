/**
 * Copyright (c) 2018 Andrew Choung
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import uniqueId from 'lodash/uniqueId';
import isNil from 'lodash/isNil';
import Datatable from 'components/Datatable';
import CsvFileImporter from 'components/CsvFileImporter';
import AppBar from 'components/AppBar';
import { APP_BAR_TITLE, TOOLBAR_ITEMS } from 'constants/appBarConstants';
import './App.css';

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

/**
 * This app renders a CSV file uploader that uploads the CSV data into a datatable.
 *
 * @class App
 * @extends PureComponent
 */
class App extends PureComponent {
    static propTypes = {
        // props from HOCs
        classes: PropTypes.object.isRequired,
    };

    state = {
        tableColumns: [],
        tableRows: [],
    };

    /**
     * Handles the event when a CSV file import is successful.
     * 
     * @param {Object[]} dataRows The CSV file data rows imported
     * @param {String} fileName The CSV file name imported
     */
    onCsvFileLoaded = (dataRows, fileName) => {
        if (dataRows.length) {
            let tableColumns = [];
            const tableRows = [];
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

            this.setState({
                tableColumns,
                tableRows,
            });
        }
    };

    /**
     * Renders the component in JSX syntax
     * 
     * @returns {JSX} the component view
     */
    render() {
        const { tableColumns, tableRows } = this.state;
        const { classes } = this.props;

        let viewComponent = null;
        if (tableColumns.length && tableRows.length) {
            viewComponent = <Datatable tableColumns={tableColumns} tableRows={tableRows} />;
        } else {
            viewComponent = <CsvFileImporter onFileLoaded={this.onCsvFileLoaded} />;
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.container}>
                    <AppBar title={APP_BAR_TITLE} toolbarItems={TOOLBAR_ITEMS} />
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
