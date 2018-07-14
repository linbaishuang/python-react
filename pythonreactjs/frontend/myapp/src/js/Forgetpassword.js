import React from 'react'
import axios from 'axios'
import qs from 'qs'
import '../css/index.css'

class Forgetpassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            newpassword : "",
            newpass:"",
        }
    }
    handle(e, names){
        let obj = {};
        obj[names] = e.target.value;
        this.setState(obj);
    }
    submit(){
        if(this.state.name === "" || this.state.newpassword === "" || this.state.newpass === ""){
            alert("请将信息填写完整！");
        } else if(this.state.newpassword !== this.state.newpass){
            alert("两次密码不一致！");
        } else if(this.state.newpassword.length < 6){
            alert("密码不能少于6位！");
        } else {
            let obj = {
                oldname: this.state.name,
                newpass: this.state.newpassword,   
            }
            axios.post('http://127.0.0.1:8000/forgetPass', qs.stringify(obj))
            .then(function(response){
                if(response.data === 1){
                    alert("密码修改成功！");
                    window.location.href = '/index';
                } else if(response.data === 0){
                    alert("用户不存在!");
                    window.location.reload();
                } else{
                    alert("系统错误！");
                    window.location.reload();
                }
            })
            .catch(function(error){
                alert(error);
            })
        }
    }
    render(){
        let allCss = {
            marginLeft: 800,
            marginTop: 150,
        }
        return(
            <div className="form" style={allCss}>
                <lable>账户：</lable>
                <input type="text" id="Username" placeholder="已有用户名" onChange={(e) => {this.handle(e, 'name')}}/>
                <br/><br/>
                <lable>密码：</lable>
                <input type="password" id="password1" placeholder="密码位数最少6位" onChange={(e) => {this.handle(e, 'newpassword')}}/>
                <br/><br/>
                <lable>确认密码：</lable>   
                <input type="password" id="password2" placeholder="密码位数最少6位" onChange={(e) => {this.handle(e, 'newpass')}}/>
                <br/><br/>
                <input type="button" value="提交" style={{marginLeft:180}} onClick={this.submit.bind(this)}/>
            </div>
        )
        
    }
}

export default Forgetpassword   