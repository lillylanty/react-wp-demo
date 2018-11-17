import React, {Component} from 'react';
import {render} from 'react-dom';
export default class App extends Component {
    render(){
        return <div>
            这是APP组件了第3次，
            引入静态服务器，在bin/dev-server.js中配置后，可以通过localhost:9090访问
            </div>
    }
}
