import React, { Component } from "react";
import { AppState } from "../reducers";
import { Dispatch, bindActionCreators } from "redux";
import AppActions from "../actions/Actions";
import { GetConnectDispatchPropsType } from "../utils/actionCreatorTypes";
import { connect } from "react-redux";

type TStateProps = ReturnType<typeof mapStateToProps>;
// needed to properly type dispatch props type
type TBindActionCreators = typeof AppActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

class Doggos extends Component<TStateProps & TDispatchProps> {
  render() {
    const {
      asyncStatus,
      doggos: [doggo]
    } = this.props.doggo;
    return (
      <div>
        <h1>Love Doggos</h1>
        <button onClick={this.props.getDoggo}>Get me a cute Doggo</button>
        <div style={{ margin: 10 }}>
          {asyncStatus === "INIT" && "Click the button to see a cute dog"}
          {asyncStatus === "LOADING" && "Loading..."}
          {asyncStatus === "SUCCESS" && <img src={doggo.message} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  doggo: state.doggos
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(AppActions, dispatch);

export default connect<TStateProps, TDispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Doggos);
