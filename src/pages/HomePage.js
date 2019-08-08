import React from 'react';
import Page from '../layouts/Page';

function HomePage() {
    return (
        <Page>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        main
                    </div>

                    <div className="col-4">
                        sidebar
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default HomePage;