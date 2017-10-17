/* global $ */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * DocumentCard component.
 * @returns {String} The HTML markup for the DocumentCard component
 */
const DocumentCard = ({ document, deleteDocument, currentUser, id }) => {
  const deleteModalId = `deleteModal${id}`;
  return (
    <div className="col m3 s12 documentCard">
      <div className="card small white darken-10">
        <div className="card-content black-text">
          <span className="card-title truncate title">{document.title}</span>
          <br />
          <div>Opened: {new Date(document.createdAt).toDateString()}</div>
          <div>Access: {document.access}</div>
        </div>
        <div className="card-action">
          <Link to={`/view/${document.id}`}>
            <span className="indigo-text" id="documentView">View</span>
          </Link>
        </div>
        {currentUser.id === document.ownerId && <div className="card-action">
          <a
            className="deleteModalTrigger"
            href={`#${deleteModalId}`}
            onClick={() => $(`#${deleteModalId}`).modal()}
          >
            <i className="material-icons indigo-text">delete</i>
          </a>
          <Link to={`/edit/${document.id}`}>
            <i className="material-icons edit indigo-text">edit</i>
          </Link>
          <Link to={`/view/${document.id}`}>
            <span className="indigo-text" id="documentView">View</span>
          </Link>
          <div id={deleteModalId} className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete?</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  deleteDocument(document.id);
                }
                  }
                className={`modal-action modal-close waves-effect delete
                waves-green btn-flat`}
              >
                Yes
              </button>
              <button
                className={`modal-action modal-close 
                waves-effect waves-green btn-flat`}
              >
                No
              </button>
            </div>
          </div>
        </div>}

      </div>
    </div>
  );
};
DocumentCard.propTypes = {
  document: PropTypes.shape({
    title: '',
    content: ''
  }).isRequired,
  deleteDocument: PropTypes.func,
  id: PropTypes.number.isRequired,
  currentUser: PropTypes.shape({ id: '' }).isRequired,
};

DocumentCard.defaultProps = {
  document: null,
  deleteDocument: null
};

export default DocumentCard;
