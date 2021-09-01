import React, {Component} from 'react';
import  {getRepos} from '../API';
import Module from './Module'

class Homepage extends Component {
  state = {
    list:[],
    name: '',
    handlers: null
  };

  componentDidMount = async () => {
    const response  = await getRepos();
    let temptrigger = {};
    for(var repo = 0; repo < 10; repo++ ){
      temptrigger[response.repos[repo]] = false;
    }
    
    this.setState({
      list: response.repos,
      handlers: temptrigger
    });
  }

  filter = (e) => {
    const keyword = e.target.value;
    this.setState({name: keyword})
  };

  show = (name) => {
    let temp = this.state.handlers
    temp[name] = !temp[name]
    this.setState({
      handlers: temp
    })
  };

  render() {
    return (
      <div className="container">
        <input type="search"
              value={this.state.name}
              onChange={this.filter}
              className="input"
              placeholder="Filter"
        />
        <div className="module-list">
          {this.state.list.filter(module => module.includes(this.state.name)).map(filteredName => (
            <div >
              <div style={{cursor: "pointer"}}>
                <li key={filteredName} className="module" onClick={() => this.show(filteredName)}>
                  <span className="module-name"><b>{filteredName}</b></span>
                </li>
                </div>
                { this.state.handlers[filteredName]
                  ?<div><Module name={filteredName} /></div>
                  :<p></p>
                }
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default Homepage;
