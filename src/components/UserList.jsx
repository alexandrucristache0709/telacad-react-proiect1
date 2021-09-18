import React from 'react';
import UserItem from './UserItem';

function UserList(props) {
    return (
        <div>
            <h2>Lista utilizatorilor:</h2>
            { props.users.map((user, index) => {
                return <UserItem
                    id={ user.id }
                    name={ user.name }
                    email={ user.email }
                    isGoldClient={ user.isGoldClient }
                    salary = { user.salary }
                    image = { user.image }
                    deleteItem = { (id) => props.deleteItem(id) }
                    key={ index }
                />
            })}
        </div>
    );
}

export default UserList;