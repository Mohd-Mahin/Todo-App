import React from 'react';

export default (props) => {
    let opacity = props.setopacity;
    return(
        <div style={{ width: '100%', marginTop: 30, justifyContent: 'center', display: 'flex', flexDirection: 'row',opacity}}>
            <input 
                type="text" 
                name="todo-heading" 
                id="todo-heading" 
                placeholder="Todo Heading"
                onChange={props.handleTodoHeading}
                style={{textAlign: 'center'}}
                {...props}
                disabled={opacity == 0.4 ? true : false }
            />
        </div>
    )
}