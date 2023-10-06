from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import MySQLdb.cursors, re, hashlib

app = Flask(__name__)

app.secret_key = 'r$W9#kLp2&QnX@5*8yZ$'

# Database connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '@Arvi7777'
app.config['MYSQL_DB'] = 'ceo-application'

# Initialize MySQL
mysql = MySQL(app)

@app.route('/login', methods=['GET', 'POST'])
def login():
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
            return redirect (url_for('landingPage'))
        else:
            # username/password incorrect
            msg = 'Incorrect username/password!'
    return render_template('login.html', msg='')

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect (url_for('login'))

@app.route('/register', methods = ['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'mail' in request.form:
        username = request.form['username']
        password = request.form['password']
        mail = request.form['mail']
        # Check if account exists using MySQL
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM `ceo_login_database` WHERE username = %s', (username,))
        ceo_login_database = cursor.fetchone()
        # If ceo_login_database exists show error and validation checks
        if ceo_login_database:
            msg = 'Account already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', mail):
            msg = 'Invalid email address!'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers!'
        elif not username or not password or not mail:
            msg = 'Please fill out the form!'
        else:
            # Hash the password
            hash = password + app.secret_key
            hash = hashlib.sha1(hash.encode())
            password = hash.hexdigest()
            # ceo_login_database doesn't exist, and the form data is valid, so insert the new ceo_login_database into the ceo_login_databases table
            cursor.execute('INSERT INTO `ceo_login_database` VALUES (NULL, %s, %s, %s)', (username, password, mail,))
            mysql.connection.commit()
            msg = 'You have successfully registered!'
            return redirect(url_for('login'))
    elif request.method == 'POST':
        msg = 'Incomplete Form'
    return render_template('register.html', msg = msg)

@app.route('/home/landing-page')
def landingPage():
    if 'loggedin' in session:
        revenue_data = [
            ('week-1',20),
            ('week-2',40),
            ('week-3',30),
            ('week-4',50)
        ]
        label = [row[0] for row in revenue_data]
        value = [row[1] for row in revenue_data]




        return render_template('landing_page.html',
                               username = session['username'],
                               labels = label,
                               values = value)


    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)