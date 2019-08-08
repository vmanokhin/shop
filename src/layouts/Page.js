import React from 'react';

function Page(props) {
    return (
        <main className="main">
            {props.children}
        </main>
    );
}

Page.propTypes = {};

export default Page;