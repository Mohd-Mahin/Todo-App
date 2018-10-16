import React from 'react';

export default (props) => {
    let opacity = props.setopacity;
    return(
        <div style={{ width: '100%', height: 400, marginTop: 30,marginBottom: 30, justifyContent: 'center', display: 'flex', flexDirection: 'row', opacity }}>
            <textarea 
                name="todo-content" 
                id="todo-content" 
                placeholder="Todo Content" 
                style={{width: '80%', hieght: '90%', resize: 'none'}}
                {...props}
                disabled={opacity == 0.4 ? true : false }
            />
        </div>
    )
}