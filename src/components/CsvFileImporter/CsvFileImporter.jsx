/**
 * Copyright (c) 2018 Andrew Choung
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CsvReader from 'react-csv-reader';

const styles = {
    container: {
        textAlign: 'center',
        padding: 15,
        margin: '10px auto',
        maxWidth: 400,
    },
    csvReaderWrapper: {
        margin: '15px 0px',
    },
    csvReader: {
        display: 'block',
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        color: '#fff',
    },
    csvReaderError: {
        borderColor: '#ff6347',
    },
    error: {
        color: '#ff6347',
    },
};

/**
 * This app renders a CSV file importer component that file uploads a CSV file.
 *
 * @class CsvFileImporter
 * @extends PureComponent
 */
class CsvFileImporter extends PureComponent {
    static propTypes = {
        // Props from HOCs
        classes: PropTypes.object.isRequired,

        // component props
        title: PropTypes.string,
        invalidFileMessage: PropTypes.string,
        fileErrorMessage: PropTypes.string,
        onFileLoaded: PropTypes.func,
        onFileError: PropTypes.func,
    };

    static defaultProps = {
        title: 'Upload a CSV (*.csv) File',
        invalidFileMessage: '*Invalid CSV (*.csv) File.',
        fileErrorMessage: '*Error Uploading CSV (*.csv) File. Please Try Again.',
        onFileLoaded: () => {},
        onFileError: () => {},
    };

    state = {
        hasInvalidFile: false,
        hasFileError: false,
    };

    /**
     * Validates whether or not a filename is a CSV file by file extension.
     *
     * @param {String} fileName The filename to validate
     */
    isValidCsvFile(fileName) {
        let isValid = false;

        if (typeof fileName === 'string') {
            const fileExtension = fileName.substring(fileName.length - 4, fileName.length);
            isValid = fileExtension.toLowerCase() === '.csv';
        }

        return isValid;
    }

    /**
     * Handles the event when a CSV file import is successful.
     * 
     * @param {Object[]} dataRows The CSV file data rows imported
     * @param {String} fileName The CSV file name imported
     */
    onFileLoaded = (dataRows, fileName) => {
        const { onFileLoaded } = this.props;
        
        // CSV reader will sometimes allow non-csv files to be successfully imports so
        // this adds another layer of validation to ensure only CSV files are read.
        if (this.isValidCsvFile(fileName)) {
            this.setState({
                hasInvalidFile: false,
                hasFileError: false,
            });
            onFileLoaded(dataRows, fileName);
        } else {
            this.setState({
                hasInvalidFile: true,
                hasFileError: false,
            });
        }
    }

    /**
     * Handles the event when a CSV file import has errored.
     * 
     * @param {Object} e The error event object data
     */
    onFileError = (e) => {
        const { onFileError } = this.props;
        onFileError(e);
        
        this.setState({
            hasFileError: true,
        });
    }

    /**
     * Renders the component in JSX syntax
     * 
     * @returns {JSX} the component view
     */
    render() {
        const { hasInvalidFile, hasFileError } = this.state;
        const { classes, title, invalidFileMessage, fileErrorMessage } = this.props;

        let csvReaderClassName = classes.csvReader;
        let errorMessage = null;

        // determine if error messages should be displayed
        if (hasInvalidFile) {
            errorMessage = <Typography className={classes.error}>{invalidFileMessage}</Typography>;
            csvReaderClassName += ` ${classes.csvReaderError}`;
        } else if (hasFileError) {
            errorMessage = <Typography className={classes.error}>{fileErrorMessage}</Typography>;
            csvReaderClassName += ` ${classes.csvReaderError}`;
        }

        return (
            <div className={classes.container}>
                <Typography variant="display1">{title}</Typography>
                <div className={classes.csvReaderWrapper}>
                    {errorMessage}
                    <CsvReader
                        cssClass={csvReaderClassName}
                        onFileLoaded={this.onFileLoaded}
                        onError={this.onFileError}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CsvFileImporter);