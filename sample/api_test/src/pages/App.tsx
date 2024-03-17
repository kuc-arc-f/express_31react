import * as React from 'react';

console.log("env=", process.env.NODE_ENV)
//
export default function Page() { 
    return (
    <html>
        <head>
            <title>welcome</title>
            {(process.env.NODE_ENV === "develop") ? (
                <link href="/static/main.css" rel="stylesheet" /> 
            ): (
                <link href="/public/static/main.css" rel="stylesheet" /> 
            )} 
        </head>
        <div id="root"></div>
        {(process.env.NODE_ENV === "develop") ? (
            <script type="module" src="/static/client.js"></script>
        ): (
            <script type="module" src="/public/static/client.js"></script>
        )}
    </html>
    );
}
/*
*/
