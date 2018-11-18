import React, {Component} from 'react';
import {render} from 'react-dom';
import style from './app.css' 
import pic from './assets/邓伦.jpg'
console.log(pic)
export default class TestCss extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
  
    render(){
       console.log(this.state.count);
        
        return <div className={style.pink}>
        图片展示
                 <img src={pic} />
             </div>
    }
}
