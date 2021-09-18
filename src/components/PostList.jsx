import React from "react";
import PostItem from "./PostItem"

class PostList extends React.Component{
  constructor(){
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      data = data.filter(post => post.id < 5);
      this.setState({posts: data});
    })
  }

  render(){
    return(
      <div>
        <h2>Lista postarilor: </h2>
        {this.state.posts.map((post, index) => {
          return <PostItem 
            title = { post.title }
            body  = { post.body }
            key   = { index }
          />
        })}
     </div>
    );
  }
}

export default PostList;