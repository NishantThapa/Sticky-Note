import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { userInfo } from "os";
class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidUpdate() {
    var textarea;
    if (this.state.editing) {
      textarea = this._newText;
      textarea.focus();
      textarea.select();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.children !== nextProps.children || this.state !== nextState
    );
  }
  edit() {
    this.setState({
      editing: true,
    });
  }
  remove() {
    this.props.onRemove(this.props.index);
  }
  save(e) {
    e.preventDefault();
    this.props.onChange(this._newText.value, this.props.index);
    this.setState({
      editing: false,
    });
  }
  renderForm() {
    return (
      <div className="note">
        <form onSubmit={this.save}>
          <textarea
            ref={(input) => (this._newText = input)}
            defaultValue={this.props.children}
            style={{width:145}}
          />
          <button id="save">save</button>
        </form>
      </div>
    );
  }
  renderDisplay() {
    return (
      <div className="note">
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.edit} id="edit">
            <FaPencilAlt />
          </button>
          <button onClick={this.remove} id="remove">
            <FaTrash />
          </button>
        </span>
      </div>
    );
  }

  render() {
    return this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}
export default Note;
