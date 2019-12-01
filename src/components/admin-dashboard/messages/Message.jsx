import React, {useContext, useState} from 'react';
import moment from 'moment';
import {Button, Divider, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {StyledTypography} from "../../landing-page/styles/customStyles";
import {ActionsContext} from "../../../contexts/ActionsContext";
import {useSelector} from "react-redux";
import ConfirmDialog from "../../../shared/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(1, 0)
    },
    footerStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spacing: {
        margin: theme.spacing(2)
    }
}));

function Message({message: {created_at, firstName, lastName, contact, subject, message, id, read}}) {
    const classes = useStyles();
    const actions = useContext(ActionsContext);
    const {token} = useSelector(state => state.auth);
    const [isDelete, setIsDelete] = useState(false);

    function handleDelete(messageId) {
        actions.admin.deleteMessage(token, messageId);
    }

    return (
        <>
            <Paper className={classes.root}>
                <StyledTypography noMargin variant='h4'>{subject}</StyledTypography>
                <Divider className={classes.spacing}/>
                <StyledTypography noMargin paragraph>{message}</StyledTypography>
                <Divider className={classes.spacing}/>
                <div className={classes.footerStyle}>
                    <StyledTypography variant='body2'
                                      noMargin>{`Sent by ${firstName} ${lastName} ${moment(created_at).fromNow()}`}</StyledTypography>
                    <StyledTypography variant='body2' noMargin>{`Contact Information: ${contact}`}</StyledTypography>
                    <div>
                        <Button color='primary'
                                onClick={() => actions.admin.markMessageRead(token, id, {read: !read})}>{`Mark ${read ? 'Unread' : 'Read'}`}</Button>
                        <Button color='primary' onClick={() => setIsDelete(true)}>Delete</Button>
                    </div>
                </div>
            </Paper>
            <ConfirmDialog cancel handleCancel={() => setIsDelete(false)} isSuccess={isDelete}
                           handleClose={() => handleDelete(id)} message='Are you sure you want to delete this message?'
                           title={`Delete ${subject}?`}/>
        </>
    )
}

export default Message;
