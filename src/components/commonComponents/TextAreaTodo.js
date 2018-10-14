import React from 'react';

export default (props) => {
    return(
        <div style={{ width: '100%', height: 400, marginTop: 30,marginBottom: 30, justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
            <textarea 
                name="todo-content" 
                id="todo-content" 
                placeholder="Todo Content" 
                style={{width: '80%', hieght: '90%', resize: 'none'}}
                {...props}
            />
        </div>
    )
}