from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import MySQLdb.cursors, re, hashlib

app = Flask(__name__)

app.secret_key = 'r$W9#kLp2&QnX@5*8yZ$'

# Enter your database connection details below
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '@Arvi7777'
app.config['MYSQL_DB'] = 'ceo-application'

# Initialize MySQL
mysql = MySQL(app)

# http://localhost:5000/pythonlogin/ - the following will be our login page, which will use both GET and POST requests
@app.route('/login/', methods=['GET', 'POST'])
def login():
    # Output message if something goes wrong...
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        hash = password + app.secret_key
        hash = hashlib.sha1(hash.encode())
        password = hash.hexdigest()
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM `ceo_login_database` WHERE username = %s AND password = %s', (username, password,))
        # Fetch one record and return the result
        ceo_login_database = cursor.fetchone()
        print(ceo_login_database)
        # If account exists in accounts table in out database
        if ceo_login_database:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = ceo_login_database['id']
            session['username'] = ceo_login_database['username']
            # Redirect to home page
            msg = 'Logged in successfully!'
            print(msg)
            return 'Logged in successfully!'
        else:
            # Account doesnt exist or username/password incorrect
            msg = 'Incorrect username/password!'
            print(msg)

    return render_template('login.html', msg='')

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)