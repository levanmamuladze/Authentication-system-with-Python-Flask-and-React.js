"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask import request, jsonify, redirect, url_for
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    # Create a new user in the database
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify(message='User created successfully')

# Login route
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # Authenticate the user
    user = User.query.filter_by(email=email,password=password).first()
    # if user and user.check_password(password):
        # Generate an access token
    access_token = create_access_token(identity=user.email)
    return jsonify(access_token=access_token,email=email)
    # else:
    #     return jsonify(message='Invalid email or password'), 401

# Private route
@api.route('/private')
@jwt_required()
def private():
    current_user_id = get_jwt_identity()

    # Check if the user is valid
    user = User.query.get(current_user_id)
    if not user:
        return redirect(url_for('login'))

    return jsonify(message='Private dashboard')

# Logout route
@api.route('/logout')
def logout():
    return jsonify(message='Logout successful')