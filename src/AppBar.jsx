import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import GitHubIcon from './icons/GitHub';
import LinkedInIcon from './icons/LinkedIn';

const APP_BAR_TITLE = 'React CSV Datatable';
const TOOLBAR_ITEMS = [
    {
        name: 'My GitHub',
        url: 'https://github.com/achoung/react-csv-datatable',
        icon: <GitHubIcon />,
    }, {
        name: 'My LinkedIn',
        url: 'https://www.linkedin.com/in/achoung/',
        icon: <LinkedInIcon />,
    },
];

const styles = {
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class App extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" className={classes.title}>
                        {APP_BAR_TITLE}
                    </Typography>
                    {TOOLBAR_ITEMS.map((item) => {
                        return (
                            <Tooltip TransitionComponent={Zoom} title={item.name}>
                                <IconButton href={item.url} className={classes.menuButton} color="inherit" aria-label={item.name}>
                                    {item.icon}
                                </IconButton>
                            </Tooltip>
                        );
                    })}
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(App);
