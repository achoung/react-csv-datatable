import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CsvReader from 'react-csv-reader';
import './styles.css';

export default class CsvImporter extends PureComponent {
    static propTypes = {
        onFileLoaded: PropTypes.func,
        onFileError: PropTypes.func,
    };

    static defaultProps = {
        onFileLoaded: () => {},
        onFileError: () => {},
    };

    render() {
        const { onFileLoaded, onFileError } = this.props;

        return (
            <div className="csvImporterContainer">
                <CsvReader
                    cssClass="csv-input"
                    label="Upload a CSV (*.csv) file"
                    onFileLoaded={onFileLoaded}
                    onError={onFileError}
                    inputId="csvImporter"
                />
            </div>
        );
    }
}
