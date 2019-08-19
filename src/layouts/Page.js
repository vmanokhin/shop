import React from 'react';

function Page(props) {
    return (
        <div className="container">
            <main className="main">
                {props.children}
            </main>
        </div>
    );
}

export default Page;