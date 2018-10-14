import React from 'react';

export default (props) => {
    return(
        <div style={{ width: '100%', marginTop: 30, justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
            <input 
                type="text" 
                name="todo-heading" 
                id="todo-heading" 
                placeholder="Todo Heading"
                onChange={props.handleTodoHeading}
                {...props}
            />
        </div>
    )
}