import React from 'react';

const DemoMenuChoice = ({title, location, backgroundColor, children}) => {

    const handleClick = () => {
        console.log('Div clicked!');
        window.location.href = location;
    };

    return (
        <div className={"demo-menu-choice"}
             style={{backgroundColor: backgroundColor}}
             onClick={handleClick}
        >
            {children}
            <span style={{marginTop: "10px"}}>{title}</span>
        </div>
    );
};

export default DemoMenuChoice;