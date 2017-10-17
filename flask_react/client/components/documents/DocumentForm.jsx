/* global Materialize */
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * DocumentForm component.
 * @returns {String} The HTML markup for the DocumentForm component
 */
const DocumentForm = ({
  document,
  onSubmit,
  onChange,
  onEditorStateChange,
  error,
}) => (
  <div className="documentForm">
    <div className="row">
      <div className="input-field col s12">
        <input
          id="title"
          name="title"
          onChange={onChange}
          value={document.title}
          type="text"
          className="validate titleField"
          placeholder="Enter document title"
        />
      </div>
      {error.message && Materialize.toast(error.message, 2000)}

      <div
        className="input-field col s12"
      >
        <select
          name="access"
          onChange={onChange}
          className="browser-default titleField"
          value={document.access}
        >
          <option value="" disabled>Select document access</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Role">Role</option>
        </select>
      </div>
    </div>
    <Editor
      onEditorStateChange={onEditorStateChange}
      editorState={document.editorState}
      toolbarClassName="home-toolbar"
      wrapperClassName="home-wrapper"
      editorClassName="home-editor"
    />
    <button
      className="waves-effect submit edit-Document waves-light btn right indigo"
      onClick={onSubmit}
    >
      Save
    </button>
    <Link
      className="waves-effect cancel waves-light btn right indigo"
      to="/document"
    >
      Cancel
    </Link>
  </div>
);

DocumentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
  error: PropTypes.shape({ message: '' }).isRequired,
  document: PropTypes.shape({
    title: '',
    access: ''
  }).isRequired,
};
export default DocumentForm;
