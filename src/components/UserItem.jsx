import React from 'react';

function UserItem(props) {
    const { id, name, email, isGoldClient, salary, image, deleteItem} = props;

    return (
        <div>
            <h3>{ name }</h3>
            <p>{ email }</p>
            { isGoldClient
                ? <h3>Client GOLD</h3>
                : null
            }
            <p>{ salary }</p>
            <img src={ image } alt=''></img>
            <button onClick={() => deleteItem(id)}>Sterge</button>
        </div>
    );
}

export default UserItem;