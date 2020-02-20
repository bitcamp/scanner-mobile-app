import { useContext } from "react";
import PropTypes from "prop-types";
import RegistrationContext from "../contexts/RegistrationContext";

/**
 * Only renders a page if its title matches the active title
 */
export default function RegistrationPage({ title, children }) {
  const {
    state: { activePage },
  } = useContext(RegistrationContext);

  return title === activePage && children;
}

RegistrationPage.propTypes = {
  title: PropTypes.string.isRequired,
  // children: PropTypes.node,
};

RegistrationPage.defaultProps = {
  children: null,
};
