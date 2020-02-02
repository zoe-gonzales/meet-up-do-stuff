import React from "react";

const ContentContainer = ({ children, color, width }) => {
    return <section className="border-wrapper" style={{ backgroundColor: color, width }}>{children}</section>;
}

export default ContentContainer;