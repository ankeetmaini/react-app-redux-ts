import React, { Component } from "react";
import { Dispatch } from "redux";
import { AppState } from "../reducers";
import AppActions from "../actions/Actions";
import { GetConnectDispatchPropsType } from "../utils/actionCreatorTypes";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// state type, contains only one field of type string
type State = {
  todo: string;
};

// to determine the type of state props that will be provided by redux
type TStateProps = ReturnType<typeof mapStateToProps>;
// needed to properly type dispatch props type
type TBindActionCreators = typeof AppActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type AllProps = TStateProps & TDispatchProps;

class Todos extends Component<AllProps, State> {
  state = {
    todo: ""
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todo: e.target.value });
  };

  submit = (e: React.FormEvent) => {
    e.preventDefault();
    // triggering the redux action here
    this.props.addTodo(this.state.todo);
    // clear the text box
    this.setState({ todo: "" });
  };

  render() {
    return (
      <div>
        <h1>All Todos</h1>
        <form onSubmit={this.submit}>
          <input
            type="text"
            value={this.state.todo}
            onChange={this.handleChange}
          />
        </form>
        <div>
          <h3>pending todos</h3>
          <button onClick={this.props.removeTodos}>Clear Todos</button>
          <ol>
            {this.props.todos.map(t => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          {!this.props.todos.length && <h4>Add some TODOs</h4>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  todos: state.todos
});
// binding our actions with dispatch for thunk.
// pretty much dumb boilerplate
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(AppActions, dispatch);

/**
 * connect takes in 4 generic types
 * 1. state props you need from redux
 * 2. dispatch props from redux to trigger actions
 * 3. own props that you need from your parent component
 * 4. app state that we dervied previously for combineReducers
 */
export default connect<TStateProps, TDispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
