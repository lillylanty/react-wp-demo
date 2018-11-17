import React, {Component} from 'react';
import {render} from 'react-dom';
export default class App extends Component {
   handleClick(){
       debugger
       console.log(32123)
   }
    render(){
        return <div>
            这是APP组件了第4次，
           设置自动生成并注入html，
           <button onClick={this.handleClick.bind(this)}>测试断点</button>
            </div>
    }
}
