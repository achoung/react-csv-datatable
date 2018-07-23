import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

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

    render() {
        const { classes, tableColumns, tableRows } = this.props;

        return (
            <div className="datatable">
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {tableColumns.map(column => {
                                    return (
                                        <TableCell key={column}>
                                            {column}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows.map(row => {
                                const { id } = row;
                                return (
                                    <TableRow key={id}>
                                        {tableColumns.map(columnKey => {
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
            </div>
        );
    }
}

export default withStyles(styles)(Datatable);
