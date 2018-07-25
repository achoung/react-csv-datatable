import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from './icons/GitHub';

const GITHUB_URL = 'https://github.com/achoung/react-csv-datatable';
const APP_BAR_TITLE = 'React CSV Datatable';

const styles = {
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
};

class App extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" className={classes.title}>
                            {APP_BAR_TITLE}
                        </Typography>
                        <IconButton href={GITHUB_URL}>
                            <GitHubIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(App);
