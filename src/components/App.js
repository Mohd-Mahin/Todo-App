import React, { Component } from 'react';
import $ from 'jquery';
import  '../styles/main.css';
import classNames from 'classnames';
import InputTodo from './commonComponents/getData';
import TextAreaTodo from './commonComponents/TextAreaTodo';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
           todoHeading: '',
           todoTextArea: '',
           todoList: [],
        }
        this.editObj = null
    }   

    handleTodoHeading(e) {
        let todoHeading = e.target.value;
        this.setState({
            todoHeading: todoHeading.toUpperCase()
        });
    }

    handleTodoTextArea(evt) {
        let todoTextArea = evt.target.value;
        this.setState({ 
            todoTextArea
        });
    }
    
    clearTextData () {
        this.setState({
            todoHeading: '',
            todoTextArea: ''
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.setTextIsEdit()) {
            this.setState(prevState => {
                return {
                    todoList: prevState.todoList.map(items => {
                        if (items.id == this.editObj.id) {
                            return {
                                id: this.editObj.id,
                                heading: prevState.todoHeading,
                                textArea: prevState.todoTextArea,
                                isCompleted: false
                            }
                        }
                        return items;
                    })
                }
            }, this.clearTextData.bind(this))
        } else {
            if (!this.state.todoHeading || !this.state.todoTextArea) return alert("Fields cannot be empty!!!");
            this.setState((prevState) => {
                return {
                    todoList: prevState.todoList.concat({
                        id: prevState.todoList.length + 1,
                        heading: prevState.todoHeading,
                        textArea: prevState.todoTextArea,
                        isCompleted: false
                    })
                }   
            },this.clearTextData.bind(this))
        }
    }

    handleIsComplete(evt) {
        // checkbox check
        //console.log(evt);

    }

    leftContainer() {
        return(
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <InputTodo 
                        onChange={this.handleTodoHeading.bind(this)}
                        value={this.state.todoHeading}
                        size={ this.state.todoHeading.length < 50 ? this.state.todoHeading.length + 20 : 70}
                    />
                    <TextAreaTodo 
                        onChange={this.handleTodoTextArea.bind(this)}
                        value={this.state.todoTextArea}
                    />
                    <div 
                        style={{ 
                            width: '100%', 
                            height: 'auto', 
                            marginTop: 30,
                            marginBottom: 30, 
                            justifyContent: 'center', 
                            display: 'flex', 
                            flexDirection: 'row', 
                            alignItems: 'center'
                        }}
                    >
                        <button 
                            type="submit" 
                            style={{width: 100, height: 21}}
                        > 
                            {
                                this.setTextIsEdit()
                                ?
                                'Edit'
                                :
                                'Add'
                            } 
                        </button>
                        <input 
                            type="checkbox" 
                            style={{ margin: 10, marginLeft: 20}} 
                            id="isCompleted" 
                            onChange={this.handleIsComplete.bind(this)}
                        />
                        <label htmlFor="isCompleted">Completed</label>
                    </div>
                </form>
            </div>
        )
    }

    setTextIsEdit() {
        let _this = this;
        let text = (this.editObj && this.state.todoList.find(e => e.id == _this.editObj.id));
        if (text) return (text.isCompleted)
        return false
    }

    handleEdit(index) {
        let obj = this.state.todoList.find(item => {
             return item.id == index;
        });
        this.editObj = obj;
        this.setState((prevState) => {
            return {
                todoHeading: obj.heading,
                todoTextArea: obj.textArea,
                todoList: prevState.todoList.map(item => {
                    if (item.id == obj.id) {
                        item.isCompleted = true
                    }
                    return item;
                })
            }
        });
    }

    handleDelete(index) {
        let obj = this.state.todoList.find(item => {
            return item.id == index;
        });

        this.setState(prevState => {
            return {
                todoList: prevState.todoList.filter(item => {
                    return item.id != obj.id
                })
            }
        })
        
    }

    rightContainer() {
        return this.state.todoList && this.state.todoList.map((todoItem, index )=> {
            return (
                <details key={index}>
                    <summary style={{color: 'maroon', outline: 'none'}}>
                        <span style={{ display: 'inline-block', width: '5%', verticalAlign: 'top' }}>
                            {todoItem.id})
                        </span>
                        <span style={{ display: 'inline-block', width: '65%', verticalAlign: 'top' }}>
                            {todoItem.heading}
                        </span>
                        <span style={{ display: 'inline-block', width: '25%' }}>
                            <button 
                                type="button" 
                                style={{width: '100%', height: 21, marginRight: 5, opacity: this.setTextIsEdit() ? 0.3 : 1}} 
                                onClick={this.handleEdit.bind(this, todoItem.id)}
                                disabled={this.setTextIsEdit()}
                            >
                                Edit
                            </button>
                            <button 
                                type="button" 
                                style={{width: '100%', height: 21, marginTop: 5}} 
                                onClick={this.handleDelete.bind(this, todoItem.id)}
                            >
                                Delete
                            </button>
                        </span>
                    </summary>
                    <p className="todo-content">{todoItem.textArea}</p>
              </details>
            );
        })
    }
    render() {
        return (
            <div className={classNames({'main': true})} style={{ height: $(window).height()}}>
                <h2 className="text-center">Todo Application</h2>
                <div className="inner-container">
                    <div className="left-container">
                        {this.leftContainer()}
                    </div>
                    <div className="right-container">
                        <div className="right-container-list">
                            <h2 style={{textAlign: 'center', paddingTop: 10, paddingBottom: 10}}>Todo List</h2>
                            {this.rightContainer()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}