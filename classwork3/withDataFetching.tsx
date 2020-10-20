import React, { Component, ComponentType } from "react";

interface Props {
  dataSource?: string;
}
interface State {
  results: any[];
  loading: boolean;
  error: string;
}

const withDataFetching = (props: Props) => (
  WrappedComponent: ComponentType<State>
) => {
  class WithDataFetching extends Component<Props, State> {
    constructor() {
      super(props);
      this.state = {
        results: [],
        loading: true,
        error: "",
      };
    }

    async fetchData() {
      if (props.dataSource) {
        try {
          const data = await fetch(props.dataSource);
          const json = await data.json();
          if (json) {
            this.setState({
              results: json,
              loading: false,
            });
          }
        } catch (error) {
          this.setState({
            loading: false,
            error: error.message,
          });
        }
      }
    }

    async componentDidMount() {
      this.fetchData();
    }

    render() {
      const { results, loading, error } = this.state;

      return (
        <WrappedComponent
          results={results}
          loading={loading}
          error={error}
          {...this.props}
        />
      );
    }
  }

  return WithDataFetching;
};

export default withDataFetching;
