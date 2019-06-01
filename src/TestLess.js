import React, {Component} from 'react';
import {render} from 'react-dom';
// import style from './app.css';
//之前是这样写的
import style from './notapp.less' ; //但是输出 style为空
// import './notapp.less' 
//现在直接import,写法就是字符串写法，怎么设置成对象写法
import pic from './assets/邓伦.jpg'
console.log('less style',style )
export default class TestLess extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
  
    render(){
        return <div className={style.other}>
                <h3 className={style.h3style}>图片展示</h3>
                 <img src={pic} className={style.handsome} />
             </div>
    }
}
