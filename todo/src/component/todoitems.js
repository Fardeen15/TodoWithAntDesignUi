import React, { Component } from 'react'
import { Table, Button, Avatar, message, Popconfirm, Select } from 'antd';
import { db } from '../firebasecofig';
import { Link } from 'react-router-dom'
const { Option } = Select

let val = [];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
class Items extends Component {
    constructor() {
        super()
        this.state = {
            value: "",
            key: [],
            delkey: "",
            range : 5
        }
    }
    delete = (event) => {
        this.setState({
            delkey: event.target.name
        })
    }
    confirm = (e) => {
        console.log(e);
        db.ref().child('data').child(this.state.delkey).remove()
        message.success('User deleted');
    }

    cancel = (e) => {
        console.log(e);
        this.setState({
            delkey: ""
        })
        message.error('Click on No');
    }

    value = () => {
        db.ref().child('data').on('value', (snap) => {
            val = []

            if (snap.val()) {
                var keys = Object.keys(snap.val())
                // this.setState({
                //     key : Object.keys(snap.val())
                // })
                var data = Object.values(snap.val())

                for (var i = 0; i < data.length; i++) {
                    val.push({
                        key: i,
                        Sno: <Avatar style={{ backgroundColor: `${colorList[i]}`, verticalAlign: 'middle' }} >
                            {data[i].name[0]}
                        </Avatar>,

                        date: data[i].date,
                        name: data[i].name,
                        number: data[i].number,
                        action: <span>
                            <Popconfirm
                                title="Are you sure delete this task?"

                                onConfirm={(ev) => this.confirm(ev)}
                                onCancel={this.cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button shape="circle" icon="delete" name={keys[i]} onClick={(ev) => { this.delete(ev) }} type="danger" />
                            </Popconfirm>,
                            <Link to="/"> <Button shape="circle" icon="edit" name={i} onClick={(ev) => {
                                console.log(i)
                                this.props.edit(ev, keys, data)
                            }} type="primary" />
                                {/* edit
                            </Button> */}
                            </Link>
                        </span>
                    })
                }
            }
            this.setState({
                value: val
            })
        })
    }
    empty = () => {
        val = []
        this.setState({
            value: []
        })
    }
    componentWillMount() {
        setTimeout(() => {
            this.empty()
            this.value()
        }, 1000)
    }
    change = (ev)=>{
        console.log(ev)
        this.setState({
            range : ev
        })
    }
    render() {
        const columns = [
            {
                title: 'S.No',
                dataIndex: 'Sno',
                key: 'Sno',
            }, {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            }, {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
            }, {
                title: <Link to="/">
                    <Button shape="circle" icon="backward" type="primary" />
                </Link>,
                key: 'action',
                dataIndex: 'action',
            }, {
                title: <Select defaultValue={this.state.range} style={{ width: 120 }} onChange={(ev)=>this.change(ev)}>
                    <Option value="5">5</Option>
                    <Option value="10">10</Option>
                    <Option value="15" >
                        15
                </Option>
                    <Option value="20">20</Option>
                </Select>,
                key: 'select',
            }];

        return (
            this.state.value === "" ?
                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                :
                <Table pagination={{ pageSize: Number(this.state.range) }} columns={columns} dataSource={this.state.value} />

        )
    }
}
export default Items