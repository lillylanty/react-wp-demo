import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './App';
const renderDom = Component => {
    render (
        <Component />,
        document.getElementById('app')
    )
}
renderDom(App)
// render (
//     <div>hello, the first step from webpack bundle,auto bundle to dist/bundle.js</div>,
//     document.getElementById('app')
// )