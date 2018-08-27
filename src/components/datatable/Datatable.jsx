/**
 * Copyright (c) 2018 Andrew Choung
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import isEqual from 'lodash/isEqual';

const styles ={
    table: {
        minWidth: 700,
    },
};

/**
 * This app renders a Datatable component using Material-UI.
 *
 * @class Datatable
 * @extends Component
 */
class Datatable extends Component {
    static propTypes = {
        // props from HOCs
        classes: PropTypes.object.isRequired,
        
        // component props
        tableColumns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
        tableRows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
    };

    static defaultProps = {
        tableColumns: [],
        tableRows: [],
    };

    /**
     * Lifecycle method that is invoked before rendering when new props or state are being received.
     *
     * @param {Object} nextProps The next props object
     * @param {Object} nextState The next state object
     */
    shouldComponentUpdate(nextProps, nextState) {
        const { tableColumns, tableRows } = this.props;
        const { tableColumns: nextTableColumns, tableRows: nextTableRows } = nextProps;

        return !isEqual(tableColumns, nextTableColumns) || !isEqual(tableRows, nextTableRows);
    }

    /**
     * Renders the component in JSX syntax
     * 
     * @returns {JSX} the component view
     */
    render() {
        const { classes, tableColumns, tableRows } = this.props;

        return (
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {tableColumns.map((column) => {
                                return (
                                    <TableCell key={column}>
                                        {column}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows.map((row) => {
                            const { id } = row;
                            return (
                                <TableRow key={id}>
                                    {tableColumns.map((columnKey) => {
                                        return (
                                            <TableCell key={`${id}_${columnKey}`}>
                                                {row[columnKey]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(Datatable);
