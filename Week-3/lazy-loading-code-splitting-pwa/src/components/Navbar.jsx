// src/components/Navbar.jsx
import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

// Lazy-loaded components
const HeavyComponent1 = lazy(() => import("./HeavyComponent1"));
const HeavyComponent2 = lazy(() => import("./HeavyComponent2"));

const Navbar = () => (
    <nav className="navbar">
        <ul className="navbar-list">
            <li className="navbar-item">
                <Link to="/" className="navbar-link">
                    Home
                </Link>
            </li>
            <li className="navbar-item">
                <Link to="/about" className="navbar-link">
                    About
                </Link>
            </li>
        </ul>
        <Suspense fallback={<div>Loading Heavy Component 1...</div>}>
            <HeavyComponent1 />
        </Suspense>
        <Suspense fallback={<div>Loading Heavy Component 2...</div>}>
            <HeavyComponent2 />
        </Suspense>
    </nav>
);

export default Navbar;
