import React from "react";
import { Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component<
  any,
  {
    isAuth: boolean;
  }
> {
  state = {
    isAuth: localStorage.getItem("isVal") !== "0",
  };
  render() {
    const Component = this.props.component;
    return this.state.isAuth ? (
      <Component
        paramsId={this.props.computedMatch.params.id}
        paramsId2={this.props.computedMatch.params.id2}
        paramsId3={this.props.computedMatch.params.id3}
      />
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}

export default ProtectedRoute;
