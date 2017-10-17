import os
from flask import request, jsonify, abort
from flask_app import create_app, db
from flask_app.models import User, Role, Document

config_name = os.getenv('FLASK_CONFIG')

app = create_app(config_name)

@app.route('/')
def index():
  return jsonify({ "message": "Welcome to Document Manager"})


@app.route('/users', methods=['POST'])
def create_user():
  user = User(
    email=str(request.form.get('email')),
    full_name=str(request.form.get('full_name')),
    password=str(request.form.get('password')))

  db.session.add(user)
  db.session.commit()
  response = jsonify({ "success": "user details saved successfully" })
  response.status_code = 201

  return response

@app.route('/documents', methods=['POST'])
def create_document():
  document = Document(
    title=str(request.form.get('title')),
    access=str(request.form.get('access')),
    content=str(request.form.get('content')),
    roleId=(request.form.get('roleId')),
    ownerId=(request.form.get('ownerId')))

  db.session.add(document)
  db.session.commit()
  response = jsonify({ "success": "document saved successfully" })
  response.status_code = 201

  return response

@app.route('/roles', methods=['POST'])
def create_role():
  role = Role(
    title=str(request.form.get('title')))
  print "role"

  db.session.add(role)
  db.session.commit()
  response = jsonify({
    'status': 'Role created successfully',
    'role': role.title
  })
  response.status_code = 201

  return response

if __name__ == '__main__':
  app.run()

