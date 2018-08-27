/**
 * Copyright (c) 2018 Andrew Choung
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

const styles = {
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

/**
 * Toolbar component that always displays to the top of the page.
 *
 * @class AppBar
 * @extends PureComponent
 */
class AppBar extends PureComponent {
    static propTypes = {
        // props from HOCs
        classes: PropTypes.object.isRequired,

        // component props
        title: PropTypes.string,
        toolbarItems: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
        title: '',
        toolbarItems: PropTypes.arrayOf(PropTypes.object),
    };

    /**
     * Renders the component in JSX syntax
     * 
     * @returns {JSX} the component view
     */
    render() {
        const { classes, title, toolbarItems } = this.props;

        return (
            <MuiAppBar position="static">
                <Toolbar>
                    <Typography variant="title" className={classes.title}>{title}</Typography>
                    {toolbarItems.map((item) => {
                        return (
                            <div key={item.id}>
                                <Tooltip TransitionComponent={Zoom} title={item.name}>
                                    <IconButton href={item.url} className={classes.menuButton} color="inherit" aria-label={item.name}>
                                        {item.icon}
                                    </IconButton>
                                </Tooltip>
                            </div>
                        );
                    })}
                </Toolbar>
            </MuiAppBar>
        );
    }
}

export default withStyles(styles)(AppBar);
