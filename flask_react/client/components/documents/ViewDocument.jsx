/* global $ */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {
  updateDocument,
  searchDocumentById,
  fetchAllUserDocument
} from '../../actions/documentActions';

/**
 * @export
 * @class ViewDocument
 * @extends {React.Component}
 */
export class ViewDocument extends React.Component {
  /**
   * Creates an instance of ViewDocument.
   * @param {object} props
   * @memberOf ViewDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      access: '',
      title: '',
      editorState: '',
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  /**
   * Get all documents a user has access to on component mount
   * @memberOf ViewDocument
   * @return {void}
   */
  componentDidMount() {
    $('select').material_select();
    this.props.searchDocumentById(this.props.match.params.id).then(() => {
      this.setState({
        access: this.props.document.access,
        title: this.props.document.title,
        editorState:
        EditorState.createWithContent(convertFromHTML(this
          .props.document.content)),
      });
    });
  }

  /**
   * @param {string} editorState
   * @returns {void}
   * @memberOf CreateDocument
   */
  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      content: convertToHTML(editorState.getCurrentContent())
    });
  }

  /**
   * @returns {String} The HTML markup for the DocumentForm
   * @memberOf CreateDocument
   */
  render() {
    const { title, content, access, editorState } = this.state;
    const document = { title, content, access, editorState };
    return (
      <div className="documentForm">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="title"
              name="title"
              value={`Document Title - ${document.title}`}
              type="text"
              className="validate titleField"
              placeholder="Enter document title"
              readOnly
            />
          </div>
        </div>
        <Editor
          onEditorStateChange={this.onEditorStateChange}
          editorState={document.editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          readOnly="readOnly"
        />
        <Link
          className="waves-effect cancel waves-light btn right indigo"
          to="/document"
        >
          Cancel
      </Link>
      </div>
    );
  }
}
ViewDocument.propTypes = {
  document:
  PropTypes.shape({ access: '', title: '', content: '' }).isRequired,
  searchDocumentById: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: '' }).isRequired
};

const mapStateToProps = state => ({
  document: state.documents.document,
  currentUser: state.auth.user
});

export default connect(mapStateToProps, {
  updateDocument, searchDocumentById, fetchAllUserDocument
})(ViewDocument);
