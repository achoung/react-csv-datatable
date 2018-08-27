/**
 * Copyright (c) 2018 Andrew Choung
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles ={
    table: {
        minWidth: 700,
    },
};

/**
 * This app renders a Datatable component using Material-UI.
 *
 * @class Datatable
 * @extends PureComponent
 */
class Datatable extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        tableColumns: PropTypes.array,
        tableRows: PropTypes.array,
    };

    static defaultProps = {
        tableColumns: [],
        tableRows: [],
    };

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
