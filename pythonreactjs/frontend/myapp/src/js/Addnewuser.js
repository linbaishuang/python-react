import React from 'react'
import axios from 'axios'
import qs from 'qs'
import "../css/index.css"
import App from "./App"
import {Route, Link, Switch} from "react-router-dom"
import {Input, Button} from 'antd';

 
class Addnewuser extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newName: "",
            newPassword:"",
            newPasswordtwo: "",
        }
    }

    handle(e, name){
        let obj = {};
        obj[name] = e.target.value;
        this.setState(obj); 
    };

    AjaxFunction(){
        if(this.state.newName === "" || this.state.newPassword === "" || this.state.newPasswordtwo === ""){
            alert("请将信息填写完整！");
        }else if(this.state.newPassword !== this.state.newPasswordtwo){
            alert("两次密码不一致，请重新输入！");
        } else if(this.state.newPassword.length < 6){
            alert("密码位数过少！");
            window.location.reload();
        } else{
            let user = {
                name: this.state.newName,
                password: this.state.newPassword,
            }
            axios.post('http://127.0.0.1:8000/newUser', qs.stringify(user))
            .then(function(response){
                if(response.data === 0){
                    alert("用户已存在！");
                    window.location.reload();
                } else if(response.data === 1){
                    alert("用户创建成功！");
                    window.location.href= '/index'
                } else {
                    alert("系统错误！");
                }
            })
            .catch(function(error){
                console.log(error)
            });
        }
    }

    render(){
        let allCss = {
            marginLeft: 800,
            marginTop: 150,
        }
        let inputcss = {
            width: "20%",
        }
        return(
            <div style={allCss}>
                <lable htmlFor="name">账户：</lable>
                <Input style={inputcss} type="text" id="name" placeholder="用户名" onChange={(e) => {this.handle(e, "newName")}}  />
                <br/><br/>
                <lable htmlFor="password">密码：</lable>
                <Input style={inputcss} type="password" id="password" placeholder="密码位数最少6位" onChange={(e) => {this.handle(e, "newPassword")}}  />
                <br/><br/>
                <lable htmlFor="passwordtwo">确认密码：</lable>
                <Input style={inputcss} type="password" id="passwordtwo" placeholder="密码位数最少6位" onChange={(e) => {this.handle(e, "newPasswordtwo")}}  />
                <br/><br/>
                <Button ghost type="primary" value="" style={{marginLeft:180}} onClick={this.AjaxFunction.bind(this)}>提交</Button>
                <Link to={'/addnewuser/app'}>app</Link>
                <Switch>
                    <Route exact path="/addnewuser/app" component={App}/>
                </Switch>
            </div>
        )
    }
}

export default Addnewuser;