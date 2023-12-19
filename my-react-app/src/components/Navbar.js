import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const DynamicMenu = () => {
  const [mainItems, setMainItems] = useState([]);
  const [moreItems, setMoreItems] = useState([]);

  useEffect(() => {
    const allItems = [
      { id: 1, label: 'Home', link: '/' },
      { id: 2, label: 'IT services', link: '/' },
      { id: 3, label: 'Services', link: '/' },
      { id: 4, label: 'Jobs', link: '/' },
      { id: 5, label: 'ContactUs', link: '/' },
      { id: 6, label: 'About', link: '/' },
    ];

    setMainItems(allItems.slice(0, 2));
    setMoreItems(allItems.slice(2));
  }, []);

  const updateMenuItems = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      const itemsToMove = mainItems.slice(-1);
      setMoreItems((prevMoreItems) => [...prevMoreItems, ...itemsToMove]);
      setMainItems((prevMainItems) => prevMainItems.slice(0, -1));
    } else {
      const itemsToMove = moreItems.slice(0, 1);
      setMainItems((prevMainItems) => [...prevMainItems, ...itemsToMove]);
      setMoreItems((prevMoreItems) => prevMoreItems.slice(1));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateMenuItems);
    return () => {
      window.removeEventListener('resize', updateMenuItems);
    };
  }, [mainItems, moreItems]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {mainItems.map((item) => (
            <Nav.Link key={item.id} href={item.link}>
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
        {moreItems.length > 0 && (
          <Nav>
            <NavDropdown title="More" id="collapsible-nav-dropdown">
              {moreItems.map((item) => (
                <NavDropdown.Item key={item.id} href={item.link}>
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DynamicMenu;
