import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  Collapse,
  Icon,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

function SideBarLinks({
  activeRoute,
  routes,
  openCollapse,
  getCollapseInitialState,
  collapseState,
  classes,
  miniActive,
}) {
  const itemText = cx({
    [classes.itemText]: true,
    [classes.itemTextMini]: miniActive,
  });
  const collapseItemText = cx({
    [classes.collapseItemText]: true,
    [classes.collapseItemTextLinkView]: true,
    [classes.collapseItemTextMini]: miniActive,
  });

  const { itemIcon } = classes;
  const { collapseItemMini } = classes;
  const listClasses = cx(classes.list, classes.collapseList);

  const getRoutes = (checkRoutes) =>
    checkRoutes.map(
      (
        {
          display,
          redirect,
          collapse,
          views,
          icon: RouteIcon,
          mini,
          name,
          state,
          layout,
          path,
        },
        key,
      ) => {
        const navLinkClasses = cx({
          [classes.itemLink]: true,
          [classes.collapseActive]: getCollapseInitialState(views),
        });
        const innerNavLinkClasses = cx({
          [classes.collapseItemLink]: true,
          [classes.primary]: activeRoute(`${layout}${path}`),
        });
        if (redirect) return null;
        if (collapse) {
          const caretClasses = cx({
            [classes.caret]: true,
            [classes.caretActive]: collapseState[state],
          });
          return (
            <ListItem
              key={key}
              className={cx(
                { [classes.item]: RouteIcon !== undefined },
                { [classes.collapseItem]: RouteIcon !== undefined },
              )}
            >
              <NavLink
                to="#"
                className={navLinkClasses}
                onClick={(e) => {
                  e.preventDefault();
                  openCollapse(state);
                }}
              >
                {RouteIcon !== undefined ? (
                  typeof RouteIcon === 'string' ? (
                    <Icon className={itemIcon}>{RouteIcon}</Icon>
                  ) : (
                    <RouteIcon className={itemIcon} />
                  )
                ) : (
                  <span className={collapseItemMini}>{mini}</span>
                )}
                <ListItemText
                  primary={name}
                  secondary={<b className={caretClasses} />}
                  disableTypography
                  className={cx(
                    { [itemText]: RouteIcon !== undefined },
                    { [collapseItemText]: RouteIcon !== undefined },
                  )}
                />
                <Collapse in={collapseState[state]} unmountOnExit>
                  <List className={listClasses}>{getRoutes(views)}</List>
                </Collapse>
              </NavLink>
            </ListItem>
          );
        }

        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: RouteIcon !== undefined },
              { [classes.collapseItem]: RouteIcon !== undefined },
            )}
          >
            <Link
              component={NavLink}
              to={`${layout}${path}`}
              className={cx(
                { [navLinkClasses]: RouteIcon !== undefined },
                { [innerNavLinkClasses]: RouteIcon !== undefined },
              )}
            >
              {RouteIcon !== undefined ? (
                typeof RouteIcon === 'string' ? (
                  <Icon className={itemIcon}>{RouteIcon}</Icon>
                ) : (
                  <RouteIcon className={itemIcon} />
                )
              ) : (
                <span className={collapseItemMini}>{mini}</span>
              )}
              <ListItemText
                primary={name}
                disableTypography
                className={cx(
                  { [itemText]: RouteIcon !== undefined },
                  { [collapseItemText]: RouteIcon !== undefined },
                )}
              />
            </Link>
          </ListItem>
        );
      },
    );
  return <List>{getRoutes(routes)}</List>;
}

SideBarLinks.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.bool,
      redirect: PropTypes.bool,
      path: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.object,
      component: PropTypes.func,
      layout: PropTypes.string,
      collapse: PropTypes.bool,
      state: PropTypes.string,
      views: PropTypes.arrayOf(
        PropTypes.shape({
          display: PropTypes.bool,
          redirect: PropTypes.bool,
          path: PropTypes.string,
          name: PropTypes.string,
          icon: PropTypes.object,
          component: PropTypes.func,
          layout: PropTypes.string,
          collapse: PropTypes.bool,
          state: PropTypes.string,
        }),
      ),
    }),
  ),
  getCollapseInitialState: PropTypes.func,
  collapseState: PropTypes.object,
  openCollapse: PropTypes.func,
  classes: PropTypes.object,
  miniActive: PropTypes.bool,
};

export default SideBarLinks;
