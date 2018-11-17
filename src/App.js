import React, {Component} from 'react';
import {render} from 'react-dom';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
        }
    }
   handleClick(){
       this.setState({
           count: this.state.count+1
       })
   }
    render(){
       console.log(this.state.count);
        
        return <div>
            这是APP组件了第5次，
           设置hotmodulereplacement
           <button onClick={this.handleClick.bind(this)}>测试断点{this.state.count}</button>
           <button onClick={this.handleClick.bind(this)}>其他BTN{this.state.count}</button>
            </div>
    }
}
