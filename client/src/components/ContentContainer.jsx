import React from "react";

const ContentContainer = ({ children, color }) => {
    return <section className="border-wrapper" style={{ backgroundColor: color }}>{children}</section>;
}

export default ContentContainer;