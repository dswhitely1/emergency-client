import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useSectionStyles from './section.styles';

function Section({ children, className, header, inverted, ...rest }) {
  const classes = useSectionStyles();
  const sectionClasses = clsx({
    [classes.section]: true,
    [classes.header]: header,
    [classes.inverted]: inverted,
    [className]: !!className,
  });
  return (
    <section className={sectionClasses} {...rest}>
      {children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.bool,
  inverted: PropTypes.bool,
};

export default Section;
