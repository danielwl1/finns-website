// src/components/CoverPage.jsx
import React from 'react';

const CoverPage = () => {
    return (
        <div
            className="flex flex-col items-center justify-center h-full text-center px-6"
            style={{ padding: '30px' }}
        >
            <div className="tracking-tight max-w-lg mx-auto text-center text-gray-800 transition-colors">
                <h1 className="text-6xl font-extrabold mb-6">Logbuch</h1>
                <div className="text-3xl text-left pl-4">eines Pilgers</div>
            </div>
            <div style={{ padding: '30px' }}>
                <p className="text-lg md:text-xl text-gray-600">
                    Wir sind alle Pilger im Leben: Einen Tag kommen wir, den
                    anderen gehen wir. Nur auf der Durchreise.
                    <br />
                    Dieses Logbuch eines Pilgers sucht festzuhalten, was nicht
                    greifbar scheint. Alles andere mag zwischen den Seiten
                    verloren gehen.
                    <br />
                    Kannst du es begreifen?
                </p>
            </div>
        </div>
    );
};

export default CoverPage;
