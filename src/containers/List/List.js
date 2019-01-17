import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import classes from './List.css';

class List extends Component {

    render() {
        let users = null,
            usersSorted = null,
            usersMap = null;

        if (this.props.users.length > 0) {
            users = this.props.users.map( (user, index) => {
                return {
                    index: index,
                    ...user,
                    firstName: user.firstName.toLowerCase(),
                    lastName: user.lastName.toLowerCase(),
                }
            })
                
            switch (this.props.order) {
                case "date_ascending":
                    users.sort( (a, b) => (
                        +(a.date > b.date) || +(a.date === b.date) - 1
                    ));  
                    break;
                case "date_descending":
                    users.sort( (a, b) => (
                        +(a.date < b.date) || +(a.date === b.date) - 1
                    ));   
                    break;
                case "name_ascending":
                    users.sort( (a, b) => (
                        +(a.firstName + a.lastName > b.firstName + b.lastName) || +(a.firstName + a.lastName === b.firstName + b.lastName) - 1
                    ));  
                    break;
                case "name_descending":
                    users.sort( (a, b) => (
                        +(a.firstName + a.lastName < b.firstName + b.lastName) || +(a.firstName + a.lastName === b.firstName + b.lastName) - 1
                    ));   
                    break;        
                default:
                    break;
            }
            
            usersSorted = users.map( user => {
                return {
                    ...this.props.users[user.index]
                }
            })
    
            usersMap = usersSorted.map( user => {
                let userPic,
                    userDate,
                    userDateLong,
                    userDateLongJSON,
                    pictureStyle = null;
    
                if (!user.pic) {
                    userPic = `${user.firstName[0]}${user.lastName[0]}`
                } else {
                    pictureStyle = {
                        backgroundImage: 'url(' + user.pic + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }
                }
    
                userDateLong = new Date(user.date);
                userDateLongJSON = new Date(user.date - userDateLong.getTimezoneOffset() * 60 * 1000);
                userDateLongJSON = userDateLongJSON.toJSON();
                let day = userDateLong.getDate();
                let year = userDateLong.getFullYear();
                let time = userDateLongJSON.slice(11, 16);
                let month;
    
                switch (userDateLong.getMonth()) {
                    case 0: month = "Jan"; break;
                    case 1: month = "Feb"; break;
                    case 2: month = "Mar"; break;
                    case 3: month = "Apr"; break;
                    case 4: month = "May"; break;
                    case 5: month = "Jun"; break;
                    case 6: month = "Jul"; break;
                    case 7: month = "Ago"; break;
                    case 8: month = "Sep"; break;
                    case 9: month = "Oct"; break;
                    case 10: month = "Nov"; break;
                    case 11: month = "Dec"; break;            
                    default: break;
                }
            
                userDate = `${month} ${day}, ${year}, ${time}`;
    
                return (
                    <div key={user.email} className={classes.User}>
                        <div 
                            className={classes.UserPic}
                            style={pictureStyle} >
                            {userPic}
                        </div>
                        <div className={classes.UserName}>
                            {`${user.firstName} ${user.lastName}`}
                        </div>
                        <div className={classes.UserDate}>
                            {userDate}
                        </div>
                    </div>
                )
            })
        } else {
            usersMap = (
                <div className={classes.User}>
                    No registered users
                </div>
            )
        }

        return (
            <div className={classes.List}>
                <div className={classes.Container}>
                    <div className={classes.ListHeader}>
                        <div className={classes.Title}>
                            Users
                        </div>
                        <div className={classes.AddButton}
                            onClick={() => this.props.changeScreen("register", "list")}>
                            Add new user
                        </div>
                    </div>
                    <div className={classes.ListContent}>
                        <div className={classes.ContentTitles}>
                            <div 
                                className={classes.FullName}>
                                Full Name <span onClick={() => this.props.orderList("name")}>
                                    <div className={classes.TopTriangle}><div>&#9650;</div></div>
                                    <div className={classes.BottomTriangle}><div>&#9660;</div></div>
                                </span>
                            </div>
                            <div 
                                className={classes.CreatedAt} >
                                Created at <span onClick={() => this.props.orderList("date")}>
                                    <div className={classes.TopTriangle}><div>&#9650;</div></div>
                                    <div className={classes.BottomTriangle}><div>&#9660;</div></div>
                                </span>
                            </div>
                        </div>
                        <div className={classes.UsersContainer}>
                            {usersMap}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        order: state.listOrder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeScreen: (screenTo, screenFrom) => dispatch(actions.changeScreen(screenTo, screenFrom)),
        orderList: (column) => dispatch(actions.orderList(column)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

