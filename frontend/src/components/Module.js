import React, {Component} from 'react';
import  {getModule} from '../API';

class Module extends Component {
  state = {
    info: null, 
    url: ""
  };    

  componentDidMount = async () => {
    const response  = await  getModule(this.props.name);
    this.setState({
      info: response[this.props.name],
      url: response[this.props.name]['html url']+""
    });
  }

  openLink = () => {
    window.open(this.state.url);
  };

  render() {
    const data = this.state.info
    var htcode;
    if(data){
        htcode = Object.keys(data).map((key, id) => {
          return (
            data[key] !== Object(data[key]) 
              ?  <li key={key}> <b>{key}</b> : {data[key]+""}</li>
              : <div className="my-posts">
                  <li key={key}> <b>{key}</b> :</li>
                    <ul>
                      {
                        Object.keys(data[key]).map((keyChild, idChild) => {
                          return (
                            <li key={keyChild}> <b>{keyChild}</b> : {data[key][keyChild]}</li>
                          )
                        })
                      }
                    </ul>
                </div>
          )
        });
    }else{
      htcode = <h1>loading...</h1>
    }
    return (
      <React.Fragment>
        <div style={{width: 150}}>
          <h3 onClick={() => this.openLink()} style={{cursor: "pointer", color: 'blue'}}>Github Repository</h3>
        </div>
        <ul>{htcode}</ul>
      </React.Fragment>
    )
  }
}
export default Module;

