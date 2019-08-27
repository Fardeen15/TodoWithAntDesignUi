import * as React from "react";
import { Input, message, Icon, DatePicker, Button } from 'antd';
import { db } from "../firebasecofig";
import { Link } from 'react-router-dom'
class TodoForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            number: "",
            date: "",
            allowClear: false
        }
    }
    onchange = (event, value) => {
        if (value === "name") {
            this.setState({
                name: event.target.value
            })
        } else if (value === "number") {
            this.setState({
                number: event.target.value
            })
        } else if (value === "date" && event) {
            var date = event._d
            console.log(date)
            var newdt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            this.setState({
                date: newdt
            })
        }
    }
    submit = () => {
        if (this.state.number.length === 11) {

            if (this.state.name && this.state.number && this.state.date) {

                var newDate = new Date()
                const obj = {
                    name: this.state.name,
                    number: this.state.number,
                    date: this.state.date
                }
                console.log(obj)
                db.ref().child('data').child(`${newDate.getFullYear()}${newDate.getMonth() + 1}${newDate.getDate()}${newDate.getMinutes()}${newDate.getMilliseconds()}`).set(obj).then(() => {
                    this.setState({
                        name: "",
                        number: "",
                        date: "",
                        allowClear: true
                    })
                })
                message.success('your data send');
            } else {
                message.error('please insert all field');
            }
        } else {
            message.error('please check number limit');
        }
        // console.log(obj)
    }
    update = () => {
        const obj = {
            name: this.state.name,
            number: this.state.number,
            date: this.state.date
        }
        if(this.state.number.length === 11){

        if (this.state.name && this.state.number && this.state.date) {
            db.ref().child('data').child(this.props.key1).update(obj).then(() => {
                this.setState({
                    name: "",
                    number: "",
                    date: "",
                })
                this.props.empty()
            })
            message.success('your data update');
        } else {
            message.error('please insert all field');
        }
    }else{
        message.error('please check number limit');
    }

    }
    componentWillMount() {
        if (this.props.edit && this.props.data) {
            var data = this.props.data
            this.setState({
                name: data.name,
                number: data.number,
                date: data.date,
            })
        }
    }
    render() {
        return (
            <div>
                <div className="form">
                    {this.props.edit ?
                        <div style={{ textAlign: "right" }}>
                            <Link to="/List"> <Button type="primary" onClick={this.props.empty} shape="circle" icon="close" /></Link>
                        </div>
                        : null}
                    {this.props.edit ?
                        <h1>Edit Form</h1>
                        :
                        <h1>Todo List Form</h1>
                    }
                    <div className="inputDivs">
                        <Input
                            value={this.state.name}
                            onChange={(ev) => {

                                this.onchange(ev, "name")
                            }}
                            required
                            style={{ width: 400 }}
                            placeholder="Enter your name"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            allowClear={true}
                        />
                    </div>
                    <div className="inputDivs" >

                        <Input
                            value={this.state.number}
                            required
                            onChange={(ev) => this.onchange(ev, "number")}
                            type="number"
                            style={{ width: 400 }}
                            placeholder="Enter your number"
                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            allowClear={true}

                        />
                    </div>
                    <div className="inputDivs" >
                        <DatePicker
                            selectedValue={this.state.date}
                            onChange={(ev) => this.onchange(ev, "date")}
                            required
                            style={{ width: 400 }}
                        />

                    </div>
                    {this.props.edit ?
                        <div className="inputDivs">
                            <Link to="/List">
                                <Button disabled={this.state.name ? false : true} onClick={this.update} style={{ width: 400 }} type="danger" >
                                    update
                            </Button>
                            </Link>
                        </div> :
                        <div>
                            <div className="inputDivs">

                                <Button disabled={this.state.name ? false : true} onClick={this.submit} style={this.state.name?{ width: 400 ,}:{ width: 400, border : "rgba(255,77,79,0.7)" ,background : "rgba(255,77,79,0.7)"}} type="danger" >
                                    submit
                                </Button>
                            </div>
                            <div className="inputDivs">
                                <Link to="/List">
                                    <Button style={{ width: 400 }} type="primary" >
                                        view table
                            </Button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>

        )
    }
}
export default TodoForm