import React from "react";

const HeavyComponent1 = () => {
    return (
        <div>
            <h2>This is Heavy Component 1</h2>
            <p>Loaded lazily for better performance.</p>
        </div>
    );
};

export default HeavyComponent1;
