import React, { Component, ComponentType, } from "react";

interface Props {
  lists?: any[];
}
interface State {
  results: any[];
}

const withObjectList = (props:Props)=>(WrappedComponent: ComponentType<State>)=>{

    class withObjectList extends Component<Props, State>{

        constructor() {
          super(props);
          this.state = {
            results: [],
          };
        }


        getList(){
          const lists = props.lists || [];
          this.setState({results:lists})
        }

        componentDidMount(){
            this.getList();
        }

        render(){
            const results = this.state.results;
            return(
                <WrappedComponent results={results} {...this.props}/>
            )
        }
        
    }

    return withObjectList;
}

export default withObjectList;