import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import Addnewuser from "./Addnewuser"
import Forgetpassword from "./Forgetpassword"
import './static/bootstrap/css/bootstrap.min.css'
import './static/bootstrap/css/animate.css'
import './static/bootstrap/css/style.css'
import axios from 'axios'
import qs from 'qs'
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props, context){
    super(props, context);
    this.state={
      user_name:"",
      user_password:"",
    }
    
  };

  loginUser(event, key){
    let obj = {};
    obj[key] = event.target.value;
    this.setState(obj);
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  clicklogin(){
      let obj = {
        name: this.state.user_name,
        password: this.state.user_password,
      }
      var that = this;
      if(this.state.user_name === ""){
        alert("请输入用户名！");
      } else if(this.state.user_password === ""){
        alert("请输入密码！");
      } else {
        axios.post("http://127.0.0.1:8000/login", qs.stringify(obj))
        .then(function(response){
          if(response.data === 1){
            alert("登录成功！");
            that.props.history.push("/fream");
          } else if(response.data === 0) {
            alert("用户不存在！");
            window.location.reload();
          } else if(response.data === 2){
            alert("用户密码错误！");
            window.location.reload();
          } else{
            alert("系统错误！");
            window.location.reload();
          }
        })
      }
  }
  
  render() {
    return (
      <div className="middle-box text-center loginscreen  animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">R+</h1>
          </div>
          <h3>欢迎使用 R+</h3>
          <div>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="用户名" required="" onChange={(e)=>{this.loginUser(e, "user_name")}}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="密码" required="" onChange={(e)=>{this.loginUser(e, "user_password")}}/>
            </div>
            <button type="submit" className="btn btn-primary block full-width m-b" onClick={this.clicklogin.bind(this)}>登 录</button>
          </div>
        </div>
        <Link to="/forget" component={Forgetpassword}>忘记密码 | </Link>
        <Link to="/addnewuser" component={Addnewuser} >注册用户</Link>
        
      </div>
    );
  }
}

export default withRouter(Login);  
