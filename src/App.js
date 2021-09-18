import React from 'react';
import UserList from './components/UserList';
import PostList from './components/PostList'
import UserAddForm from './components/UserAddForm';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: 'white',
      color: 'black',
      users: [],
      displayPosts: false
    };
  }

  componentDidMount() {
    let imageURLs = [
      'https://images.unsplash.com/photo-1588676478262-3d48b5a0c60e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80', 
      'https://images.unsplash.com/photo-1587789640776-5629ff9b107b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
       'https://images.unsplash.com/photo-1582337832132-b1df9234f9cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80', 
       'https://images.unsplash.com/photo-1528045252873-2bf37023d58b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
      ];  

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.filter(user => user.id < 5);
        data.forEach(user => {
          user.isGoldClient = false;
          user.salary = Math.round(Math.random() * 10000) + ' RON';
          user.image = imageURLs[user.id - 1];
        });
        this.setState({users: data});
      });
  }



  changeBackgroundColor(event) {
    this.setState({background: event.target.value});
  }

  changeTextColor(event) {
    this.setState({color: event.target.value});
  }

  displayPostList(){
    this.setState({displayPosts: true});
  }

  displayUserList(){
    this.setState({displayPosts: false});
  }

  deleteItem(userId){
    let newUsers = this.state.users.filter(user => user.id !== userId);
    this.setState({users: newUsers})
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  submitAddForm(event, name, email, isGoldClient) {
    event.preventDefault();
    this.setState(prevState => {
      return {
        users: [
          ...prevState.users,
          {
            id: this.getMaxId(prevState.users) + 1,
            name,
            email,
            isGoldClient
          }
        ]
      }
    });
  }

  render() {
    return(
      <div className="app" style={{background: this.state.background, color:this.state.color}}>
        <h1>Admin panel - Proiectul 1</h1>
        <UserAddForm submitAddForm={(event, name, email, isGoldClient) => this.submitAddForm(event, name, email, isGoldClient)}/>
        {this.state.displayPosts ? <PostList /> : <UserList users={this.state.users} deleteItem={(id) => this.deleteItem(id)}/>}
        <div>
          <label>Schimba culoarea de fundal: </label>
          <input type="color" onChange={(event) => this.changeBackgroundColor(event)}/>
        </div>
        <div>
          <label>Schimba culoarea textului: </label>
          <input type="color" onChange={(event) => this.changeTextColor(event)}/>
        </div>
        <div>
          <button onClick={() => this.displayPostList()}>Afiseaza postarile</button>
          <button onClick={() => this.displayUserList()}>Afiseaza utilizatorii</button>
        </div>
      </div>
    );
  }
}

export default App;