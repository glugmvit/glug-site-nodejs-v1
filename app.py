from flask import Flask, request, render_template, session, redirect, flash, url_for
from pymongo import MongoClient
import time
import bcrypt
app = Flask(__name__)
app.secret_key = 's3cReTk3Y'


connection = MongoClient("< your mongodb link >")


@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html')

# Internal server error, 500, can be tested only in non-debug mode


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('error.html'), 500


@app.route('/', methods=['GET'])
def index():
    if 'username' in session:
        return render_template("index.html", name = session['username'])
    return render_template("index.html")


@app.route('/about')
def about():
    if 'username' in session:
        return render_template("about.html", name = session['username'])
    return render_template("about.html")


@app.route('/team')
def team():
    if 'username' in session:
        return render_template("team.html", name = session['username'])
    return render_template("team.html")


@app.route('/journey')
def journey():
    if 'username' in session:
        return render_template("journey.html", name = session['username'])
    return render_template("journey.html")

@app.route('/signout')
def signout():
    session.clear()
    return redirect(url_for('login'))
@app.route('/contact')
def contact():
    return render_template("contact-us.html")
@app.route('/registration', methods=['GET', 'POST'])
def send():
    db = connection.glug.registration
    #db.ensure_index('usn',unique=True)
    if request.method == 'POST':
        fname = request.form['fname']
        lname = request.form['lname']
        usn = request.form['usn']
        email = request.form['email']
        number = request.form['number']
        year = request.form['year']
        branch = request.form['branch']

        x = [fname, lname, usn, email, number, year, branch]
        user = {
            'fname': fname,
            'lname': lname,
            'usn': usn,
            'email': email,
            'number': number,
            'year': year,
            'branch': branch
        }
        try:
        	db.insert(user)
        except:
        	flash('USN Already Exists!')
        	print('USN Already Exists!') #For Debugging
        	return redirect(url_for('send'))
        connection.close()
        print('inserted the registration into database.')
        # comented this render_templete sice there was a difficulty in comming back from the confirm.html to index.html
        # return render_template("confirm.html", lst= x)
    elif request.method == 'GET':
        return render_template("registration.html")
    return render_template("index.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'username' in session:
        return render_template("login.html", name = session['username'])
    if request.method == 'POST':
        db = connection.glug.user_data
        login_user = db.find_one({'name': request.form['username']})
        if login_user:
            if bcrypt.hashpw(request.form['password'].encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password'].encode('utf-8'):
                session['username']=request.form['username']
                connection.close()
                return render_template("index.html",name = session['username'],msg = session['username'])
        connection.close()
        return render_template("login.html",msg = 'Invalid username or password')
    return render_template("login.html")



@app.route('/signup', methods=['GET','POST'])
def signup():
    if 'username' in session:
        return render_template("signup.html", name = session['username'])
    if request.method == 'POST':
        db = connection.glug.user_data
        existing_user = db.find_one({'name': request.form['username']})
        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
            curyear = int(time.strftime("%Y")[2:4])
            usn = request.form['usn']
            yr = (int(usn[3:5]))
            year = curyear - yr + 1
            if usn[5:7].upper() != 'ME':
                branch = usn[5:7].upper() + "E"
            else:
                branch = usn[5:7].upper()
            user = {
                'fname': request.form['firstname'],
                'lname': request.form['lastname'],
                'usn': usn,
                'email': request.form['email'],
                'branch': branch,
                'year': year,
                'number': request.form['number'],
                'name': request.form['username'],
                'password': hashpass
            }
            db.insert(user)
            connection.close()
            session['username'] = request.form['username']
            return render_template("index.html", name=session['username'], msg=session['username'])
        return render_template("signup.html", msg='username already exists')
    return render_template("signup.html")

if __name__ == "__main__":
    app.run(debug=True)
