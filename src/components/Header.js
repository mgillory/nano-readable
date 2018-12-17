import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { fetchCategories } from '../actions/categoryAction';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { categories } = this.props;
    const { isOpen } = this.state;
    return (
      <Navbar color="light" light expand="md">
        <Link to="/">readable</Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {categories.map(cat => (
              <NavItem key={cat.path}>
                <Link to={`/${cat.path}`} onClick={() => isOpen && this.toggle()}>
                  {cat.name}
                </Link>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items
});

Header.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
}

export default withRouter(connect(mapStateToProps, { fetchCategories })(Header));
